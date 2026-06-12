import { forwardRef, useId } from 'react';
import Icon from '../Icon/Icon.jsx';
import styles from './NumberStepper.module.css';

const NumberStepper = forwardRef(function NumberStepper(
  { label, value, onChange, step = 1, min, max, displaySign = false, ...rest },
  ref
) {
  const id = useId();
  const num = Number(value ?? 0);
  const clamp = (n) => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const display = displaySign && num > 0 ? `+${num}` : String(num);
  return (
    <div className={styles.wrap}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <div className={styles.box}>
        <input
          ref={ref}
          id={id}
          type="text"
          inputMode="numeric"
          value={display}
          onChange={(e) => {
            const cleaned = e.target.value.replace(/[^\d-]/g, '');
            const v = Number(cleaned);
            onChange?.(clamp(Number.isFinite(v) ? v : 0));
          }}
          className={styles.input}
          {...rest}
        />
        <div className={styles.spinners}>
          <button
            type="button"
            aria-label="Increase"
            className={styles.spinBtn}
            onClick={() => onChange?.(clamp(num + step))}
          >
            <Icon name="chevron-down" size={12} className={styles.up} />
          </button>
          <button
            type="button"
            aria-label="Decrease"
            className={styles.spinBtn}
            onClick={() => onChange?.(clamp(num - step))}
          >
            <Icon name="chevron-down" size={12} />
          </button>
        </div>
      </div>
    </div>
  );
});

export default NumberStepper;
