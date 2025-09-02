const ShinyText = ({ src, alt, disabled = false, speed = 5, className = '' }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`relative overflow-hidden ${disabled ? '' : 'animate-shine'} ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        animationDuration: animationDuration
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
