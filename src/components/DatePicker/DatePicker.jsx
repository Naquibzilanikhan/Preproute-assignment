import { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import Icon from '../Icon/Icon.jsx';
import styles from './DatePicker.module.css';

export default function DatePicker({ label, value, onChange, placeholder = 'Select Date', error }) {
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
      >
        <span className={value ? styles.value : styles.placeholder}>
          {value ? format(value, 'PP') : placeholder}
        </span>
        <Icon name="calendar" size={16} />
      </button>
      {open && (
        <div className={styles.pop} role="dialog" aria-label="Choose date">
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(d) => {
              onChange(d);
              setOpen(false);
            }}
            weekStartsOn={1}
          />
        </div>
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
