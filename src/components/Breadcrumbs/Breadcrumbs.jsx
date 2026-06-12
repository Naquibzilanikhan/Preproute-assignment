import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.wrap}>
      {items.map((it, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className={styles.item}>
            {it.to && !isLast ? (
              <Link to={it.to}>{it.label}</Link>
            ) : (
              <span aria-current={isLast ? 'page' : undefined}>{it.label}</span>
            )}
            {!isLast && <span className={styles.sep}>/</span>}
          </span>
        );
      })}
    </nav>
  );
}
