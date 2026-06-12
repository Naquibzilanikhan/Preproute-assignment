import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.jsx';
import ChapterwiseForm from './ChapterwiseForm.jsx';
import PYQ from './tabs/PYQ.jsx';
import MockTest from './tabs/MockTest.jsx';
import { useTestCreation } from '../../hooks/useTestCreation.js';
import styles from './TestCreation.module.css';

const TABS = [
  { id: 'chapterwise', label: 'Chapterwise' },
  { id: 'pyq', label: 'PYQ' },
  { id: 'mock', label: 'Mock Test' },
];

export default function TestCreation() {
  const [tab, setTab] = useState('chapterwise');
  const navigate = useNavigate();
  const { setDraft, draft } = useTestCreation();

  function handleSubmit(values) {
    setDraft(values);
    navigate('/test-creation/questions');
  }

  function handleCancel() {
    navigate('/dashboard');
  }

  const tabLabel = TABS.find((t) => t.id === tab).label;

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          { label: 'Test Creation', to: '/test-creation' },
          { label: 'Create Test' },
          { label: tabLabel },
        ]}
      />
      <div role="tablist" aria-label="Test type" className={styles.tabs}>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={[styles.tab, tab === t.id && styles.tabActive].filter(Boolean).join(' ')}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className={styles.body}>
        {tab === 'chapterwise' && (
          <ChapterwiseForm
            defaultValues={draft ?? undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Next"
          />
        )}
        {tab === 'pyq' && <PYQ />}
        {tab === 'mock' && <MockTest />}
      </div>
    </div>
  );
}
