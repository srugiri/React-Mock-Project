import React from "react";

export default function Label({ children, HTMLfor, className }) {
  return (
    <label htmlFor={HTMLfor} className={className}>
      {children}
    </label>
  );
}
