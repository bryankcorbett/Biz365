const ShinyText = ({ src, alt, disabled = false, speed = 5, className = '' }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`relative overflow-hidden ${disabled ? '' : 'animate-shine'} ${className}`}
      style={{
        '--shine-duration': animationDuration,
      }}
    >
      <img 
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default ShinyText;
