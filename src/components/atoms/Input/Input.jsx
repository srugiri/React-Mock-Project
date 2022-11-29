import React from "react";

export default function Input({
  type,
  onChangeHandler,
  ariaLable,
  id,
  name,
  required,
  className,
  onInput,
  value,
  placeholder,
  disabled,
}) {
  return (
    <input
      onInput={onInput}
      value={value}
      type={type}
      id={id}
      name={name}
      className={className}
      required={required}
      onChange={onChangeHandler}
      aria-labelledby={ariaLable}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
