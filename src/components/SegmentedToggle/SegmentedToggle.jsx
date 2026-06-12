import styles from './SegmentedToggle.module.css';

export default function SegmentedToggle({ value, onChange, options, ariaLabel = 'Toggle' }) {
  return (
    <div role="tablist" aria-label={ariaLabel} className={styles.wrap}>
      {options.map((opt) => (
        <button
          key={opt.value}
          role="tab"
          type="button"
          aria-selected={value === opt.value}
          className={[styles.btn, value === opt.value && styles.active].filter(Boolean).join(' ')}
          onClick={() => onChange?.(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
