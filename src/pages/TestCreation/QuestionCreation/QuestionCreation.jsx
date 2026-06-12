import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs.jsx';
import Button from '../../../components/Button/Button.jsx';
import Icon from '../../../components/Icon/Icon.jsx';
import ChapterwiseSummaryCard from '../ChapterwiseSummaryCard.jsx';
import EditTestModal from '../EditTestModal.jsx';
import QuestionEditor from './QuestionEditor.jsx';
import QuestionSettings from './QuestionSettings.jsx';
import { useTestCreation } from '../../../hooks/useTestCreation.js';
import styles from './QuestionCreation.module.css';

export default function QuestionCreation() {
  const {
    draft, questions, activeQuestionIndex,
    updateQuestion, resetQuestion, setActiveIndex,
  } = useTestCreation();
  const [params, setParams] = useSearchParams();
  const [editOpen, setEditOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const qParam = Number(params.get('q'));
    if (qParam && qParam - 1 !== activeQuestionIndex && qParam - 1 < questions.length && qParam - 1 >= 0) {
      setActiveIndex(qParam - 1);
    }
  }, [params, activeQuestionIndex, questions.length, setActiveIndex]);

  if (!draft) return <Navigate to="/test-creation" replace />;
  const question = questions[activeQuestionIndex];
  if (!question) return null;

  function go(delta) {
    const next = Math.max(0, Math.min(activeQuestionIndex + delta, questions.length - 1));
    setActiveIndex(next);
    setParams({ q: String(next + 1) });
  }

  function handleReset() {
    if (window.confirm('Reset this question to empty?')) {
      resetQuestion(activeQuestionIndex);
    }
  }

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          { label: 'Test Creation', to: '/test-creation' },
          { label: 'Create Test' },
          { label: 'Chapter Wise' },
        ]}
      />
      <ChapterwiseSummaryCard onEdit={() => setEditOpen(true)} />

      <div className={styles.qHead}>
        <h2 className={styles.qTitle}>
          Question {activeQuestionIndex + 1}/{questions.length}
        </h2>
        <div className={styles.qActions}>
          <Button variant="secondary" size="sm" onClick={() => console.log('TODO: + MCQ')}>
            <Icon name="plus" size={14} /> MCQ
          </Button>
          <Button variant="secondary" size="sm" onClick={() => console.log('TODO: CSV')}>
            <Icon name="download" size={14} /> CSV
          </Button>
        </div>
      </div>

      <QuestionEditor
        question={question}
        onChange={(patch) => updateQuestion(activeQuestionIndex, patch)}
        onResetAll={handleReset}
      />

      <div className={styles.pager}>
        <button
          type="button"
          aria-label="Previous"
          className={styles.pagerBtn}
          onClick={() => go(-1)}
          disabled={activeQuestionIndex === 0}
        >
          <Icon name="chevron-left" size={18} />
        </button>
        <button
          type="button"
          aria-label="Next"
          className={styles.pagerBtn}
          onClick={() => go(1)}
          disabled={activeQuestionIndex === questions.length - 1}
        >
          <Icon name="chevron-right" size={18} />
        </button>
      </div>

      <QuestionSettings
        question={question}
        onChange={(patch) => updateQuestion(activeQuestionIndex, patch)}
      />

      <div className={styles.footer}>
        <Button
          variant="danger"
          onClick={() => {
            if (window.confirm('Exit test creation?')) navigate('/test-creation');
          }}
        >
          Exit Test Creation
        </Button>
        <Button
          onClick={() => go(1)}
          disabled={activeQuestionIndex === questions.length - 1}
        >
          Next
        </Button>
      </div>

      <EditTestModal open={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  );
}
