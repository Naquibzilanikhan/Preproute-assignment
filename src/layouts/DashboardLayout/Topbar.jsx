import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, matchPath } from 'react-router-dom';
import Icon from '../../components/Icon/Icon.jsx';
import Button from '../../components/Button/Button.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import styles from './Topbar.module.css';

export default function Topbar() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const onQuestionsPage = matchPath('/test-creation/questions', pathname);

  useEffect(() => {
    const onDoc = (e) => {
      if (!menuRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <header className={styles.bar}>
      <div className={styles.left}>
        {onQuestionsPage && (
          <button type="button" className={styles.iconBtn} aria-label="Refresh">
            <Icon name="refresh" size={18} />
          </button>
        )}
      </div>
      <div className={styles.right}>
        {onQuestionsPage && (
          <Button onClick={() => navigate('/test-creation/publish')}>Publish</Button>
        )}
        <button type="button" className={styles.bell} aria-label="Notifications">
          <Icon name="bell" size={20} />
        </button>
        <div className={styles.userMenu} ref={menuRef}>
          <button
            type="button"
            className={styles.userBtn}
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={open}
          >
            <span className={styles.avatar} aria-hidden="true">{user?.name?.[0] ?? '?'}</span>
            <span className={styles.userText}>
              <span className={styles.userName}>{user?.name ?? 'User'}</span>
              <span className={styles.userRole}>{user?.role ?? ''}</span>
            </span>
            <Icon name="chevron-down" size={14} />
          </button>
          {open && (
            <div role="menu" className={styles.menu}>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
