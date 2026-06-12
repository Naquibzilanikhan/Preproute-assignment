import { forwardRef, useId } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(function Input({ label, error, hint, className, id, ...rest }, ref) {
  const reactId = useId();
  const inputId = id ?? reactId;
  const errorId = `${inputId}-err`;
  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
      <input
        id={inputId}
        ref={ref}
        className={[styles.input, error && styles.inputError].filter(Boolean).join(' ')}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
      {error && <div id={errorId} className={styles.error}>{error}</div>}
      {!error && hint && <div className={styles.hint}>{hint}</div>}
    </div>
  );
});

export default Input;
