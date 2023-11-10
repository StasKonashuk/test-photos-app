import React, { ChangeEvent, useEffect, useState } from 'react';

import './styles.scss';

interface InputProps {
  value?: string;
  label?: string;
  name?: string;
  id?: string;
  type?: string;
  defaultValue?: string;
  className?: string;
  placeholder?: string;
  wrapperClassName?: string;
  onFocus?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errorMsg?: string;
  multiline?: boolean;
  focused?: boolean;
  register?: any;
}

export function Input(props: InputProps) {
  const {
    className,
    placeholder,
    wrapperClassName,
    name,
    errorMsg,
    type,
    id,
    register,
    label,
    ...otherProps
  } = props;

  const [inputClasses, setInputClasses] = useState(['input']);
  const [wrapperClasses, setWrapperClasses] = useState(['input-wrapper']);

  useEffect(() => {
    const newClasses = ['input'];

    if (className) {
      newClasses.push(className);
    }

    setInputClasses(newClasses);
  }, [className]);

  useEffect(() => {
    const newWrapperClasses = ['input-wrapper'];

    if (wrapperClassName) {
      newWrapperClasses.push(wrapperClassName);
    }

    setWrapperClasses(newWrapperClasses);
  }, [wrapperClassName]);
  return (
    <div className={wrapperClasses.join(' ')}>
      {label && (
        <label className="input-label" htmlFor={id}>
          {label}:
        </label>
      )}
      <input
        id={id}
        className={inputClasses.join(' ')}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        {...otherProps}
      />
      {errorMsg && <p className="error-text">{errorMsg}</p>}
    </div>
  );
}
