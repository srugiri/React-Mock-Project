import React from "react";

export default function Img({ src, alt, className, bg, ariaLabel }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      bg={bg}
      aria-label={ariaLabel}
    />
  );
}
