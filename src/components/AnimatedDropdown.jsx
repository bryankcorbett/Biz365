import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const AnimatedItem = ({ children, delay = 0, index, onMouseEnter, onClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.1, triggerOnce: false });
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.3, delay }}
      className="mb-2 cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

const AnimatedDropdown = ({
  options = [],
  value = '',
  onChange,
  placeholder = 'Select an option',
  className = '',
  itemClassName = '',
  showGradients = true,
  enableArrowNavigation = true,
  displayScrollbar = false,
  disabled = false
}) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

  // Find the index of the current value
  const currentIndex = options.findIndex(option => 
    (typeof option === 'string' ? option : option.value) === value
  );

  const handleScroll = e => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));
  };

  const handleItemClick = (option, index) => {
    const optionValue = typeof option === 'string' ? option : option.value;
    const optionLabel = typeof option === 'string' ? option : option.label;
    
    if (onChange) {
      onChange({ target: { value: optionValue } });
    }
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        setSelectedIndex(currentIndex >= 0 ? currentIndex : 0);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      setSelectedIndex(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setKeyboardNav(true);
      setSelectedIndex(prev => Math.min(prev + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setKeyboardNav(true);
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < options.length) {
        e.preventDefault();
        handleItemClick(options[selectedIndex], selectedIndex);
      }
    }
  };

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !dropdownRef.current) return;
    const container = dropdownRef.current;
    const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`);
    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: 'smooth'
        });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  const selectedOption = options.find(option => 
    (typeof option === 'string' ? option : option.value) === value
  );
  const displayValue = selectedOption 
    ? (typeof selectedOption === 'string' ? selectedOption : selectedOption.label)
    : placeholder;

  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        zIndex: 9999,
        isolation: 'isolate'
      }}
    >
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl focus:outline-none focus:border-black focus:ring-4 focus:ring-black/20 transition-all duration-300 text-black hover:bg-gray-50 hover:border-gray-800 text-left flex items-center justify-between disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <span className={value ? 'text-black' : 'text-gray-500'}>
          {displayValue}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <>
          {/* Backdrop to ensure dropdown appears above everything */}
          <div 
            className="fixed inset-0" 
            style={{ zIndex: 99998 }}
            onClick={() => setIsOpen(false)}
          />
          <div 
            className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-black rounded-xl shadow-lg shadow-black/20 max-h-60 overflow-hidden transform translate-y-0"
            style={{ 
              zIndex: 99999,
              position: 'absolute',
              isolation: 'isolate'
            }}
          >
          <div
            ref={dropdownRef}
            className={`max-h-60 overflow-y-auto p-2 ${
              displayScrollbar
                ? '[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-[4px]'
                : 'scrollbar-hide'
            }`}
            onScroll={handleScroll}
            style={{
              scrollbarWidth: displayScrollbar ? 'thin' : 'none',
              scrollbarColor: '#d1d5db #ffffff'
            }}
          >
            {options.map((option, index) => {
              const optionValue = typeof option === 'string' ? option : option.value;
              const optionLabel = typeof option === 'string' ? option : option.label;
              const isSelected = optionValue === value;
              
              return (
                <AnimatedItem
                  key={index}
                  delay={index * 0.05}
                  index={index}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => handleItemClick(option, index)}
                >
                  <div className={`p-3 rounded-lg transition-all duration-200 ${
                    isSelected 
                      ? 'bg-black text-white' 
                      : selectedIndex === index 
                        ? 'bg-gray-100 text-black' 
                        : 'bg-white text-black hover:bg-gray-50'
                  } ${itemClassName}`}>
                    <p className="m-0 text-sm font-medium">{optionLabel}</p>
                  </div>
                </AnimatedItem>
              );
            })}
          </div>
          
          {/* Gradients */}
          {showGradients && (
            <>
              <div
                className="absolute top-0 left-0 right-0 h-[50px] bg-gradient-to-b from-white to-transparent pointer-events-none transition-opacity duration-300 ease"
                style={{ opacity: topGradientOpacity }}
              ></div>
              <div
                className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-white to-transparent pointer-events-none transition-opacity duration-300 ease"
                style={{ opacity: bottomGradientOpacity }}
              ></div>
            </>
          )}
          </div>
        </>
      )}
    </div>
  );
};

export default AnimatedDropdown;
