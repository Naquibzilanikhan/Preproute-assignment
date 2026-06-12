import styles from './Badge.module.css';

export default function Badge({ tone = 'neutral', children, leadingIcon, className }) {
  const toneCls = styles[tone] ?? styles.neutral;
  return (
    <span className={[styles.badge, toneCls, className].filter(Boolean).join(' ')}>
      {leadingIcon}
      {children}
    </span>
  );
}
