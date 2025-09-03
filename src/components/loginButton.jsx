import React from "react";

/**
 * Login Pulse Button - Final React component matching HTML demo exactly
 * Features:
 * - Black pill button with continuous black pulse ring animation
 * - Hover: lift + scale + enhanced shadow + glow
 * - Active press state with scale down
 * - Keyboard focus ring for accessibility
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
      <style jsx>{`
        .login-pulse-btn {
          --btn-bg: #000;
          --btn-fg: #fff;
          --pulse: rgba(0, 0, 0, .30);
          --shadow: rgba(0, 0, 0, .20);
          --shadow-strong: rgba(0, 0, 0, .35);

          appearance: none;
          border: none;
          outline: none;
          cursor: pointer;

          background: var(--btn-bg);
          color: var(--btn-fg);
          border-radius: 9999px;
          padding: 14px 32px;
          font-weight: 700;
          letter-spacing: .2px;
          font-size: 1rem;
          line-height: 1;

          position: relative;
          isolation: isolate;
          transition: transform .22s cubic-bezier(.2, .8, .2, 1), 
                      box-shadow .22s cubic-bezier(.2, .8, .2, 1), 
                      filter .22s ease;

          box-shadow: 0 6px 18px -6px var(--shadow);
        }

        .login-pulse-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-pulse-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          z-index: -1;
          box-shadow: 0 0 0 0 var(--pulse);
          animation: pulse-ring var(--speed, ${speed}) infinite;
        }

        .login-pulse-btn:hover:not(:disabled),
        .login-pulse-btn:focus-visible:not(:disabled) {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 18px 34px -10px var(--shadow-strong);
          filter: drop-shadow(0 0 10px rgba(0, 0, 0, .12));
        }

        .login-pulse-btn:active:not(:disabled) {
          transform: translateY(-1px) scale(0.99);
        }

        .login-pulse-btn:focus-visible {
          outline: 3px solid rgba(0, 0, 0, .35);
          outline-offset: 3px;
        }

        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 var(--pulse);
          }
          60% {
            box-shadow: 0 0 0 18px rgba(0, 0, 0, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .login-pulse-btn::after {
            animation: none;
          }
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
