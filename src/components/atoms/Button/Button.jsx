import React from "react";
import { StyledButton } from "./StyledButton";

const Button = ({
  onClickHandler,
  className,
  children,
  ariaLabel,
  disabled,
  bg,
  text,
  type,
  role,
  ariaLabelledby,
}) => (
  <StyledButton
    bg={bg}
    text={text}
    disabled={disabled}
    className={className}
    type={type}
    onClick={onClickHandler}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledby}
    role={role}
  >
    {children}
  </StyledButton>
);

export default Button;
