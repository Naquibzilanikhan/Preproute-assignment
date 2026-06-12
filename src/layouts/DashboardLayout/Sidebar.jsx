import { NavLink, useLocation, matchPath } from 'react-router-dom';
import Icon from '../../components/Icon/Icon.jsx';
import QuestionListPanel from './QuestionListPanel.jsx';
import styles from './Sidebar.module.css';

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/test-creation', label: 'Test Creation', icon: 'pencil' },
  { to: '/test-tracking', label: 'Test Tracking', icon: 'notebook' },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const onQuestions = matchPath('/test-creation/questions', pathname);

  return (
    <aside className={styles.bar}>
      <div className={styles.brand}>PrepRoute</div>
      <nav className={styles.nav} aria-label="Primary">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/test-creation'}
            className={({ isActive }) =>
              [styles.link, isActive && styles.linkActive].filter(Boolean).join(' ')
            }
          >
            <Icon name={item.icon} size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      {onQuestions && <QuestionListPanel />}
    </aside>
  );
}
