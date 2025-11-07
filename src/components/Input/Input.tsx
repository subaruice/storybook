import { forwardRef, useState, useEffect, type InputHTMLAttributes, type ChangeEvent } from "react";
import styles from "./Input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    clearable?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ type = "text", clearable = false, value: controlledValue, onChange, ...rest }, ref) => {
        const isControlled = controlledValue !== undefined;
        const [uncontrolledValue, setUncontrolledValue] = useState<string>("");
        useEffect(() => {
            if (isControlled) return;
        }, [isControlled]);

        const currentValue = isControlled ? (controlledValue as string) : uncontrolledValue;

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (!isControlled) setUncontrolledValue(e.target.value);
            onChange?.(e);
        };

        const handleClear = () => {
            if (!isControlled) {
                setUncontrolledValue("");
                const ev = {
                    target: { value: "" },
                } as unknown as ChangeEvent<HTMLInputElement>;
                onChange?.(ev);
            } else {
                const ev = {
                    target: { value: "" },
                } as unknown as ChangeEvent<HTMLInputElement>;
                onChange?.(ev);
            }
        };
        const [showPassword, setShowPassword] = useState(false);
        const toggleShowPassword = () => setShowPassword((prev) => !prev);
        const effectiveType = type === "password" && showPassword ? "text" : type;

        return (
            <div className={styles.wrapper}>
                <div className={styles.field}>
                    <input
                        {...rest}
                        ref={ref}
                        type={effectiveType}
                        value={currentValue}
                        onChange={handleChange}
                        className={styles.input}
                        aria-invalid={rest["aria-invalid"]}
                    />
                    {type === "password" && (
                        <button
                            type="button"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            onClick={toggleShowPassword}
                            className={`${styles.iconButton} ${styles.rightMost}`}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    )}
                    {clearable && currentValue && (
                        <button
                            type="button"
                            aria-label="Clear input"
                            onClick={handleClear}
                            className={styles.iconButton}
                        >
                            ✖
                        </button>
                    )}
                </div>
            </div>
        );
    }
);

Input.displayName = "Input";
