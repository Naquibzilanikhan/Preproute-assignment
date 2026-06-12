import { useId } from 'react';
import styles from './RadioGroup.module.css';

export default function RadioGroup({ name, value, onChange, options, legend, columns = 0, className }) {
  const groupId = useId();
  return (
    <fieldset className={[styles.group, className].filter(Boolean).join(' ')}>
      {legend && <legend className={styles.legend}>{legend}</legend>}
      <div className={styles.list} data-columns={columns || undefined}>
        {options.map((opt) => {
          const id = `${groupId}-${opt.value}`;
          const checked = value === opt.value;
          return (
            <label key={opt.value} htmlFor={id} className={[styles.item, checked && styles.itemChecked].filter(Boolean).join(' ')}>
              <input
                id={id}
                type="radio"
                name={name}
                value={opt.value}
                checked={checked}
                onChange={() => onChange?.(opt.value)}
                className={styles.input}
              />
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.label}>{opt.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
