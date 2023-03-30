import React from "react";

export default function InputBis({
  className,
  type,
  placeholder,
  name,
  value,
  description,
  onChange,
  onBlur,
  id,
}) {
  return (
    <>
      <input
        className={`border-2 border-gradient-v rounded-lg ${className}`}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        id={id}
      />
      {description && <div className="text-xs">{description}</div>}
    </>
  );
}
