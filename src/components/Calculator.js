import React, { useState } from 'react';
import { create, all } from 'mathjs'; // Import math.js
import './Calculator.css';

const Calculator = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [displayValue, setDisplayValue] = useState('');

  const math = create(all); // Create a math.js instance

  const toggleMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleButtonClick = (value) => {
    setDisplayValue(prevValue => prevValue + value);
  };

  const handleClear = () => {
    setDisplayValue('');
  };

  const handleEvaluate = () => {
    try {
      const result = math.evaluate(displayValue); // Use math.js to evaluate expression
      setDisplayValue(result.toString());
    } catch (error) {
      setDisplayValue('Error');
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C',
  ];

  return (
    <div className={`calculator ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="mode-toggle" onClick={toggleMode}>
        {isDarkMode ? '🌜':'🌞'}
      </div>
      <div className="upper-half">
        <div className="display">
          <span className="display-text">{displayValue}</span>
        </div>
      </div>
      <div className="lower-half">
        {buttons.map((button, index) => (
          <button
            key={index}
            className={isNaN(button) ? 'operator' : 'number'}
            onClick={() => {
              if (button === 'C') {
                handleClear();
              } else if (button === '=') {
                handleEvaluate();
              } else {
                handleButtonClick(button);
              }
            }}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
