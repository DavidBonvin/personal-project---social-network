import React from "react";

export default function TextArea({
  className,
  name,
  placeholder,
  value,
  description,
  cols,
  rows,
  id,
  onChange,
}) {
  return (
    <>
      <textarea
        name={name}
        className={`border-2 border-gradient-v rounded-lg ${className}`}
        placeholder={placeholder}
        value={value}
        cols={cols}
        rows={rows}
        id={id}
        onChange={onChange}
        style={{ resize: "none" }}
      ></textarea>
      {description && <div className="text-xs">{description}</div>}
    </>
  );
}
