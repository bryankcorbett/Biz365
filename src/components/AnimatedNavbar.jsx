import React, { useRef } from "react";

const AnimatedNavbar = ({ navigationItems = [] }) => {
  return (
    <div className="inline-flex gap-8 items-center">
      {navigationItems.map((item, index) => (
        <NavItem key={index} href={item.href} label={item.label} />
      ))}
    </div>
  );
};

function NavItem({ href, label }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    // spotlight follow
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);

    // subtle magnetic pull
    const tx = (x - r.width / 2) / 12;
    const ty = (y - r.height / 2) / 12;
    el.style.transform = `translate(${tx}px, ${ty}px)`;
  };

  const onLeave = () => {
    ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative cursor-pointer rounded-md px-4 py-2 transition-transform duration-200"
      style={{
        // transparent base + small spotlight (kept tight so header pe band na lage)
        background:
          "radial-gradient(80px 80px at var(--x, 50%) var(--y, 50%), hsla(0, 0%, 98%, 1.00), transparent 60%)",
      }}
    >
      {/* Link */}
      <a
        href={href}
        rel="noopener noreferrer"
        className="relative z-10 inline-block text-sm font-medium text-neutral-800
                   transition-all duration-300 group-hover:-translate-y-0.5"
      >
        {label}

        {/* Underline swipe */}
        <span
          className="absolute left-0 -bottom-0.5 h-[2px] w-0 rounded-full
                     bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400
                     transition-all duration-300 group-hover:w-full"
        />
      </a>

      {/* Soft glow (trimmed so band na bane) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-md opacity-0
                   transition-opacity duration-300 group-hover:opacity-100"
        style={{
          filter: "blur(10px)",
          background:
            "linear-gradient(90deg, rgba(99,102,241,0.12), rgba(217,70,239,0.12), rgba(34,211,238,0.12))",
        }}
      />
    </div>
  );
}

export default AnimatedNavbar;
