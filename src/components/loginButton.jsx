import React from "react";

/**
 * Login Button with Hover Effect - Updated with new design
 * Features:
 * - White background with black text and border
 * - Hover: lift + translate with shadow effect
 * - Active press state with scale down
 * - Smooth transitions
 * - Respects prefers-reduced-motion
 */
const LoginPulseButton = ({
  children = "Login",
  className = "",
  speed = "2s",
  onClick,
  disabled = false,
  type = "button",
  ...rest
}) => {
  return (
    <>
      <style>{`
        .login-pulse-btn {
          background-color: white;
          color: black;
          border-radius: 10em;
          font-size: 17px;
          font-weight: 600;
          padding: 0.6em 1.5em;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          border: 1px solid black;
          box-shadow: 0 0 0 0 black;
          appearance: none;
          outline: none;
          position: relative;
          isolation: isolate;
        }

        .login-pulse-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-pulse-btn:hover:not(:disabled) {
          transform: translateY(-4px) translateX(-2px);
          box-shadow: 2px 5px 0 0 black;
        }

        .login-pulse-btn:active:not(:disabled) {
          transform: translateY(2px) translateX(1px);
          box-shadow: 0 0 0 0 black;
        }

        .login-pulse-btn:focus-visible {
          outline: 3px solid rgba(0, 0, 0, .35);
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          .login-pulse-btn { 
            transition: none;
          }
        }
      `}</style>
      
      <button
        className={`login-pulse-btn ${className}`}
        type={type}
        onClick={onClick}
        disabled={disabled}
        style={{ '--speed': speed }}
        {...rest}
      >
        {children}
      </button>
    </>
  );
};

export default LoginPulseButton;