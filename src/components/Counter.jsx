import { useState, useEffect } from 'react';

function Digit({ value, fontSize, fontWeight, textColor }) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (displayValue !== value) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setIsAnimating(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [value, displayValue]);

  const digitStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    color: textColor,
    fontVariantNumeric: 'tabular-nums',
    transition: 'all 0.3s ease',
    transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
    display: 'inline-block',
    minWidth: '1ch',
    textAlign: 'center'
  };

  return <span style={digitStyle}>{displayValue}</span>;
}

export default function Counter({
  value,
  fontSize = 60,
  textColor = 'black',
  fontWeight = 900,
  onIncrement,
  onDecrement,
  min = 0,
  max = 999
}) {
  // Format value to always show 3 digits (000, 001, 010, 100, etc.)
  const formattedValue = value.toString().padStart(3, '0');
  const digits = formattedValue.split('');

  const buttonStyle = {
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    border: '2px solid black',
    backgroundColor: 'white',
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '16px',
    fontWeight: 'bold'
  };

  const counterStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '0 8px',
    minHeight: '32px'
  };

  return (
    <div className="flex items-center gap-4">
      {/* Minus Button */}
      <button
        type="button"
        style={buttonStyle}
        onClick={onDecrement}
        disabled={value <= min}
        className="hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        −
      </button>

      {/* Counter Display */}
      <div style={counterStyle}>
        {digits.map((digit, index) => (
          <Digit 
            key={index} 
            value={parseInt(digit)} 
            fontSize={fontSize}
            fontWeight={fontWeight}
            textColor={textColor}
          />
        ))}
      </div>

      {/* Plus Button */}
      <button
        type="button"
        style={buttonStyle}
        onClick={onIncrement}
        disabled={value >= max}
        className="hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
}
