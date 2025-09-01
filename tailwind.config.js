module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "orbai-templateframerwebsiteblack-40":
          "var(--orbai-templateframerwebsiteblack-40)",
        "orbai-templateframerwebsiteblack-55":
          "var(--orbai-templateframerwebsiteblack-55)",
        "orbai-templateframerwebsitelink-water-7":
          "var(--orbai-templateframerwebsitelink-water-7)",
        "orbai-templateframerwebsitewhite-30":
          "var(--orbai-templateframerwebsitewhite-30)",
        "orbai-templateframerwebsitewhite-wild-sand":
          "var(--orbai-templateframerwebsitewhite-wild-sand)",
        "orbai-templateframerwebsitewild-sand":
          "var(--orbai-templateframerwebsitewild-sand)",
        "orbai-templateframerwebsitewild-sand-20":
          "var(--orbai-templateframerwebsitewild-sand-20)",
        wwwsightfulcomblack: "var(--wwwsightfulcomblack)",
        wwwsightfulcomwhite: "var(--wwwsightfulcomwhite)",
        "wwwsightfulcomwhite-02": "var(--wwwsightfulcomwhite-02)",
        // Brand Gold Theme
        gold: {
          50: "#fffdf2",
          100: "#fef9e3",
          200: "#fef2c7",
          300: "#fde68a",
          400: "#fcd34d",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        brand: {
          primary: "#f59e0b", // Gold 500
          secondary: "#1f2937", // Gray 800
          accent: "#d97706", // Gold 600
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "muskymore-biz365-ai-inter-regular":
          "var(--muskymore-biz365-ai-inter-regular-font-family)",
        "orbai-template-framer-website-inter-medium":
          "var(--orbai-template-framer-website-inter-medium-font-family)",
        "orbai-template-framer-website-semantic-heading-1":
          "var(--orbai-template-framer-website-semantic-heading-1-font-family)",
        "orbai-template-framer-website-semantic-heading-2":
          "var(--orbai-template-framer-website-semantic-heading-2-font-family)",
        "orbai-template-framer-website-semantic-heading-4":
          "var(--orbai-template-framer-website-semantic-heading-4-font-family)",
        "orbai-template-framer-website-semantic-link":
          "var(--orbai-template-framer-website-semantic-link-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.8" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "0.9" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "bounce-in": {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "star-movement-bottom": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(-100%, 0%)", opacity: "0" },
        },
        "star-movement-top": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(100%, 0%)", opacity: "0" },
        },
        "star-movement-right": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(0%, -100%)", opacity: "0" },
        },
        "star-movement-left": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(0%, 100%)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-up": "fade-up 0.8s ease-out",
        "slide-in": "slide-in 0.6s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        "shimmer": "shimmer 2s ease-in-out infinite",
        "bounce-in": "bounce-in 0.8s ease-out",
        "spin": "spin 20s linear infinite",
        "star-movement-bottom": "star-movement-bottom linear infinite alternate",
        "star-movement-top": "star-movement-top linear infinite alternate",
        "star-movement-right": "star-movement-right linear infinite alternate",
        "star-movement-left": "star-movement-left linear infinite alternate",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};
