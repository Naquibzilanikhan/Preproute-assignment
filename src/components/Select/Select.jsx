import { forwardRef, useId } from 'react';
import Icon from '../Icon/Icon.jsx';
import styles from './Select.module.css';

const Select = forwardRef(function Select(
  { label, error, options = [], placeholder = 'Choose from Drop-down', id, className, value, ...rest },
  ref
) {
  const reactId = useId();
  const selectId = id ?? reactId;
  const errorId = `${selectId}-err`;
  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      {label && <label htmlFor={selectId} className={styles.label}>{label}</label>}
      <div className={styles.wrap}>
        <select
          id={selectId}
          ref={ref}
          className={[styles.select, error && styles.selectError, !value && styles.selectEmpty].filter(Boolean).join(' ')}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          value={value ?? ''}
          {...rest}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((opt) => {
            const v = typeof opt === 'object' ? opt.value : opt;
            const label = typeof opt === 'object' ? opt.label : opt;
            return <option key={v} value={v}>{label}</option>;
          })}
        </select>
        <Icon name="chevron-down" className={styles.chev} />
      </div>
      {error && <div id={errorId} className={styles.error}>{error}</div>}
    </div>
  );
});

export default Select;
