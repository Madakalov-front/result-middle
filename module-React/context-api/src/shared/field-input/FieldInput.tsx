import type { InputHTMLAttributes } from "react";
import { clsx } from "clsx";

import styles from "./FieldInput.module.scss";
import type { TablerIcon } from "@tabler/icons-react";

type SizeVariant = "xs" | "sm" | "md" | "lg" | "xl";

type SizeIcon = Record<SizeVariant, number>;

export interface FieldInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label?: string;
  description?: string;
  required?: boolean;
  error?: string;
  variant?: "default" | "filled" | "unstyled";
  radiusInput?: SizeVariant;
  sizeInput?: SizeVariant;
  Icon?: TablerIcon;
}

const sizeIcon: SizeIcon = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};

export const FieldInput = ({
  placeholder,
  label,
  description,
  required,
  error,
  variant = "default",
  radiusInput = "sm",
  sizeInput = "sm",
  Icon,
  ...props
}: FieldInputProps) => {
  return (
    <div
      className={clsx(
        styles["field"],
        sizeInput && styles[`field--size-${sizeInput}`],
      )}
    >
      {label && (
        <label htmlFor={`${props.name}_id`} className={styles["field__label"]}>
          {label}
        </label>
      )}
      {description && (
        <span className={styles["field__desc"]}>{description}</span>
      )}
      <div
        className={clsx(
          styles["field__input-wrapper"],
          variant && styles[`field__input-wrapper--variant-${variant}`],
          radiusInput && styles[`field__input-wrapper--radius-${radiusInput}`],
          error && styles["field__input-wrapper--error"],
        )}
      >
        {Icon && (
          <Icon size={sizeIcon[sizeInput]} className={styles["field__icon"]} />
        )}
        <input
          type="text"
          id={`${props.name}_id`}
          className={styles["field__input"]}
          placeholder={placeholder}
          required={required}
          {...props}
        />
      </div>
      {error && <span className={styles["field__error"]}>{error}</span>}
    </div>
  );
};
