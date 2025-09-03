import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ToastProvider';
import { ROUTES, SUCCESS_MESSAGES } from '../constants';
import { Renderer, Program, Mesh, Triangle, Vec3 } from "ogl";
import ShinyText from '../components/ShinyText';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, isLoading, error, clearError, isAuthenticated, user } = useAuth();
  const { showToast } = useToast();
  const ctnDom = useRef(null);

  // Get next parameter for redirect after login
  const next = searchParams.get('next');

  // Animate form on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsFormVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Clear auth error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Show toast on error
  useEffect(() => {
    if (error) {
      showToast('error', error);
    }
  }, [error, showToast]);

  // Handle navigation after successful login
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.onboardingCompleted) {
        // User completed onboarding - go to external dashboard
        window.location.href = ROUTES.DASHBOARD;
      } else {
        // User needs to complete onboarding
        if (next && next.startsWith('/onboarding/')) {
          navigate(next, { replace: true });
        } else {
          navigate(ROUTES.ONBOARDING.STEP1, { replace: true });
        }
      }
    }
  }, [isAuthenticated, user, navigate, next]);

  // WebGL Orb Effect (copied from HeroSection)
  useEffect(() => {
    const container = ctnDom.current;
    if (!container) return;

    const vert = /* glsl */ `
      precision highp float;
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const frag = /* glsl */ `
      precision highp float;

      uniform float iTime;
      uniform vec3 iResolution;
      uniform float hue;
      uniform float hover;
      uniform float rot;
      uniform float hoverIntensity;
      varying vec2 vUv;

      vec3 rgb2yiq(vec3 c) {
        float y = dot(c, vec3(0.299, 0.587, 0.114));
        float i = dot(c, vec3(0.596, -0.274, -0.322));
        float q = dot(c, vec3(0.211, -0.523, 0.312));
        return vec3(y, i, q);
      }
      
      vec3 yiq2rgb(vec3 c) {
        float r = c.x + 0.956 * c.y + 0.621 * c.z;
        float g = c.x - 0.272 * c.y - 0.647 * c.z;
        float b = c.x - 1.106 * c.y + 1.703 * c.z;
        return vec3(r, g, b);
      }
      
      vec3 adjustHue(vec3 color, float hueDeg) {
        float hueRad = hueDeg * 3.14159265 / 180.0;
        vec3 yiq = rgb2yiq(color);
        float cosA = cos(hueRad);
        float sinA = sin(hueRad);
        float i = yiq.y * cosA - yiq.z * sinA;
        float q = yiq.y * sinA + yiq.z * cosA;
        yiq.y = i;
        yiq.z = q;
        return yiq2rgb(yiq);
      }

      vec3 hash33(vec3 p3) {
        p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
        p3 += dot(p3, p3.yxz + 19.19);
        return -1.0 + 2.0 * fract(vec3(
          p3.x + p3.y,
          p3.x + p3.z,
          p3.y + p3.z
        ) * p3.zyx);
      }

      float snoise3(vec3 p) {
        const float K1 = 0.333333333;
        const float K2 = 0.166666667;
        vec3 i = floor(p + (p.x + p.y + p.z) * K1);
        vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
        vec3 e = step(vec3(0.0), d0 - d0.yzx);
        vec3 i1 = e * (1.0 - e.zxy);
        vec3 i2 = 1.0 - e.zxy * (1.0 - e);
        vec3 d1 = d0 - (i1 - K2);
        vec3 d2 = d0 - (i2 - K1);
        vec3 d3 = d0 - 0.5;
        vec4 h = max(0.6 - vec4(
          dot(d0, d0),
          dot(d1, d1),
          dot(d2, d2),
          dot(d3, d3)
        ), 0.0);
        vec4 n = h * h * h * h * vec4(
          dot(d0, hash33(i)),
          dot(d1, hash33(i + i1)),
          dot(d2, hash33(i + i2)),
          dot(d3, hash33(i + 1.0))
        );
        return dot(vec4(31.316), n);
      }

      vec4 extractAlpha(vec3 colorIn) {
        float a = max(max(colorIn.r, colorIn.g), colorIn.b);
        return vec4(colorIn.rgb / (a + 1e-5), a);
      }

      const vec3 baseColor1 = vec3(0.611765, 0.262745, 0.996078);
      const vec3 baseColor2 = vec3(0.298039, 0.760784, 0.913725);
      const vec3 baseColor3 = vec3(0.062745, 0.078431, 0.600000);
      const float innerRadius = 0.6;
      const float noiseScale = 0.65;

      float light1(float intensity, float attenuation, float dist) {
        return intensity / (1.0 + dist * attenuation);
      }
      float light2(float intensity, float attenuation, float dist) {
        return intensity / (1.0 + dist * dist * attenuation);
      }

      vec4 draw(vec2 uv) {
        vec3 color1 = adjustHue(baseColor1, hue);
        vec3 color2 = adjustHue(baseColor2, hue);
        vec3 color3 = adjustHue(baseColor3, hue);
        
        float ang = atan(uv.y, uv.x);
        float len = length(uv);
        float invLen = len > 0.0 ? 1.0 / len : 0.0;
        
        float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;
        float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);
        float d0 = distance(uv, (r0 * invLen) * uv);
        float v0 = light1(1.0, 10.0, d0);
        v0 *= smoothstep(r0 * 1.05, r0, len);
        float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;
        
        float a = iTime * -1.0;
        vec2 pos = vec2(cos(a), sin(a)) * r0;
        float d = distance(uv, pos);
        float v1 = light2(1.5, 5.0, d);
        v1 *= light1(1.0, 50.0, d0);
        
        float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);
        float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);
        
        vec3 col = mix(color1, color2, cl);
        col = mix(color3, col, v0);
        col = (col + v1) * v2 * v3;
        col = clamp(col, 0.0, 1.0);
        
        return extractAlpha(col);
      }

      vec4 mainImage(vec2 fragCoord) {
        vec2 center = iResolution.xy * 0.5;
        float size = min(iResolution.x, iResolution.y);
        vec2 uv = (fragCoord - center) / size * 2.0;
        
        float angle = rot;
        float s = sin(angle);
        float c = cos(angle);
        uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);
        
        uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);
        uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);
        
        return draw(uv);
      }

      void main() {
        vec2 fragCoord = vUv * iResolution.xy;
        vec4 col = mainImage(fragCoord);
        gl_FragColor = vec4(col.rgb * col.a, col.a);
      }
    `;

         const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
     const gl = renderer.gl;
     gl.clearColor(0, 0, 0, 0);
     container.appendChild(gl.canvas);
     
     // Set initial size
     renderer.setSize(container.clientWidth, container.clientHeight);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Vec3(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height
          ),
        },
        hue: { value: 0 },
        hover: { value: 0 },
        rot: { value: 0 },
        hoverIntensity: { value: 0.2 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

         function resize() {
       if (!container) return;
       const width = container.clientWidth;
       const height = container.clientHeight;
       renderer.setSize(width, height);
       program.uniforms.iResolution.value.set(width, height, width / height);
     }
    window.addEventListener("resize", resize);
    resize();

    let targetHover = 0;
    let lastTime = 0;
    let currentRot = 0;
    const rotationSpeed = 0.3;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = rect.width;
      const height = rect.height;
      const size = Math.min(width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const uvX = ((x - centerX) / size) * 2.0;
      const uvY = ((y - centerY) / size) * 2.0;

      if (Math.sqrt(uvX * uvX + uvY * uvY) < 0.8) {
        targetHover = 1;
      } else {
        targetHover = 0;
      }
    };

    const handleMouseLeave = () => {
      targetHover = 0;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    let rafId;
    const update = (t) => {
      rafId = requestAnimationFrame(update);
      const dt = (t - lastTime) * 0.001;
      lastTime = t;
      program.uniforms.iTime.value = t * 0.001;
      program.uniforms.hue.value = 0;
      program.uniforms.hoverIntensity.value = 0.2;

      const effectiveHover = targetHover;
      program.uniforms.hover.value += (effectiveHover - program.uniforms.hover.value) * 0.1;

      if (effectiveHover > 0.5) {
        currentRot += dt * rotationSpeed;
      }
      program.uniforms.rot.value = currentRot;

      renderer.render({ scene: mesh });
    };
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  // Handle input changes with animation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Redirect to external dashboard instead of using auth flow
      window.location.href = ROUTES.DASHBOARD;
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
         <div className="min-h-screen relative overflow-hidden bg-gray-50">
                    {/* Hero Section Orb - Full Screen */}
        <div style={{ width: '100vw', height: '105vh', position: 'fixed', top: -30, left: 0, zIndex: 1, pointerEvents: 'auto' }}> 
          <div ref={ctnDom} className="orb-container w-full h-full hover:scale-95 transition-transform duration-300 ease-out" style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'auto' }} />
        </div>
      
             {/* Main Content - Inside the Orb */}
       <div className="relative z-10 min-h-screen flex flex-col px-6 py-8 pointer-events-none">
                 <div 
           className={`w-full max-w-md mx-auto transform transition-all duration-1000 ease-out pointer-events-auto ${
             isFormVisible 
               ? 'translate-y-0 opacity-100 scale-100' 
               : 'translate-y-8 opacity-0 scale-95'
           }`}
         >
                               {/* Logo */}
          <div className="text-center mb-6 animate-fade-in">
            <div className="inline-flex items-center justify-center w-32 h-20 mb-2">
              <ShinyText 
                src="./public/logo.png"
                alt="Biz365 Logo"
                disabled={false} 
                speed={3} 
                className="w-full h-full"
              />
            </div>
             <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome back</h1>
             <p className="text-gray-600">Sign in to your Biz365 account</p>
            

          </div>

                     {/* Form Card */}
                      <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-5 animate-scale-in">
                         <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2 animate-slide-in" style={{ animationDelay: '100ms' }}>
                                 <label 
                   htmlFor="email" 
                   className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                 >
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  Email Address
                </label>
                <div className="relative">
                                     <input
                     type="email"
                     id="email"
                     name="email"
                     className={`w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 text-gray-800 placeholder-gray-500 ${
                       errors.email 
                         ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-900/20' 
                         : 'border-gray-600 focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20'
                     }`}
                     value={formData.email}
                     onChange={handleInputChange}
                     placeholder="Enter your email"
                     disabled={isLoading}
                   />
                  {formData.email && !errors.email && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 animate-fade-in flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2 animate-slide-in" style={{ animationDelay: '200ms' }}>
                                 <label 
                   htmlFor="password" 
                   className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                 >
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Password
                </label>
                <div className="relative">
                                     <input
                     type="password"
                     id="password"
                     name="password"
                     className={`w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 text-gray-800 placeholder-gray-500 ${
                       errors.password 
                         ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-900/20' 
                         : 'border-gray-600 focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20'
                     }`}
                     value={formData.password}
                     onChange={handleInputChange}
                     placeholder="Enter your password"
                     disabled={isLoading}
                   />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 animate-fade-in flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="animate-slide-in" style={{ animationDelay: '300ms' }}>
                                 <button
                   type="submit"
                   disabled={isLoading}
                   className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                 >
                  {isLoading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </div>
                  )}
                  <div className="relative flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Signing In...
                      </>
                    ) : (
                      <>
                        Sign In
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>

                         {/* Footer Links */}
             <div className="mt-6 space-y-3 text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
              <Link 
                to={ROUTES.FORGOT_PASSWORD} 
                className="text-sm text-gold-600 hover:text-gold-700 font-medium hover:underline transition-colors"
              >
                Forgot your password?
              </Link>
              
                             <div className="flex items-center">
                 <div className="flex-1 border-t border-gray-300"></div>
                 <span className="px-4 text-sm text-gray-500">or</span>
                 <div className="flex-1 border-t border-gray-300"></div>
               </div>
               
               <p className="text-sm text-gray-600">
                 Don't have an account?{' '}
                <Link 
                  to={ROUTES.SIGNUP} 
                  className="text-gold-600 hover:text-gold-700 font-semibold hover:underline transition-colors"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>

                     {/* Back to Home */}
           <div className="text-center mt-4 animate-fade-in" style={{ animationDelay: '500ms' }}>
             <Link 
               to="/" 
               className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
             >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
