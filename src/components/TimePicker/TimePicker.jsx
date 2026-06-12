import { useEffect, useRef, useState } from 'react';
import Icon from '../Icon/Icon.jsx';
import styles from './TimePicker.module.css';

function generateSlots(stepMin = 30) {
  const out = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += stepMin) {
      const hh = String(h).padStart(2, '0');
      const mm = String(m).padStart(2, '0');
      out.push(`${hh}:${mm}`);
    }
  }
  return out;
}

const SLOTS = generateSlots();

export default function TimePicker({ label, value, onChange, placeholder = 'Select Time', error }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div className={styles.field} ref={ref}>
      {label && <label className={styles.label}>{label}</label>}
      <button
        type="button"
        className={[styles.trigger, error && styles.triggerError].filter(Boolean).join(' ')}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
      >
        <span className={value ? styles.value : styles.placeholder}>{value || placeholder}</span>
        <Icon name="chevron-down" size={16} />
      </button>
      {open && (
        <ul className={styles.list} role="listbox">
          {SLOTS.map((slot) => (
            <li key={slot}>
              <button
                type="button"
                role="option"
                aria-selected={value === slot}
                className={[styles.opt, value === slot && styles.optActive].filter(Boolean).join(' ')}
                onClick={() => {
                  onChange(slot);
                  setOpen(false);
                }}
              >
                {slot}
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
