import styles from './Chip.module.css';

export default function Chip({ children, tone = 'orange' }) {
  return <span className={[styles.chip, styles[tone]].filter(Boolean).join(' ')}>{children}</span>;
}
