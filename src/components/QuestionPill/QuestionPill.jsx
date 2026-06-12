import Icon from '../Icon/Icon.jsx';
import styles from './QuestionPill.module.css';

export default function QuestionPill({ label, status = 'pending', active = false, onClick }) {
  const cls = [styles.pill, styles[status], active && styles.active].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} onClick={onClick} aria-current={active ? 'true' : undefined}>
      <span className={styles.left}>
        {status === 'done' && <Icon name="check-circle" size={14} className={styles.tick} />}
        {label}
      </span>
      <Icon name="chevron-right" size={14} />
    </button>
  );
}
