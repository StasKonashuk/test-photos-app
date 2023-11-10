/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';

import './styles.scss';

export interface ButtonProps {
  value?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  wrapperClassName?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button(props: ButtonProps) {
  const {
    value,
    type = 'button',
    className,
    wrapperClassName,
    disabled = false,
    onClick,
    ...otherProps
  } = props;
  const [buttonClasses, setButtonClasses] = useState(['button']);

  useEffect(() => {
    const newButtonClasses = ['button'];

    if (wrapperClassName) {
      newButtonClasses.push(wrapperClassName);
    }

    if (className) {
      newButtonClasses.push(className);
    }

    setButtonClasses(newButtonClasses);
  }, [className]);

  return (
    <div className={wrapperClassName || ''}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={buttonClasses.join(' ')}
        type={type}
        {...otherProps}>
        {value}
      </button>
    </div>
  );
}
