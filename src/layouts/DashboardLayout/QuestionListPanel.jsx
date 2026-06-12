import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from '../../components/Icon/Icon.jsx';
import QuestionPill from '../../components/QuestionPill/QuestionPill.jsx';
import { useTestCreation } from '../../hooks/useTestCreation.js';
import styles from './QuestionListPanel.module.css';

function isDone(q) {
  return Boolean(q?.body && q.options?.every(Boolean) && Number.isInteger(q.correctIndex));
}

export default function QuestionListPanel() {
  const { questions, activeQuestionIndex, setActiveIndex } = useTestCreation();
  const [, setSearchParams] = useSearchParams();
  const [collapsed, setCollapsed] = useState(false);

  if (!questions.length) return null;

  return (
    <div className={styles.panel}>
      <button
        type="button"
        className={styles.head}
        onClick={() => setCollapsed((v) => !v)}
        aria-expanded={!collapsed}
      >
        <span>Question creation</span>
        <Icon name={collapsed ? 'chevron-right' : 'chevron-double-left'} size={14} />
      </button>
      {!collapsed && (
        <>
          <div className={styles.count}>Total Questions : {questions.length}</div>
          <ul className={styles.list}>
            {questions.map((q, i) => (
              <li key={i}>
                <QuestionPill
                  label={`Question ${i + 1}`}
                  status={isDone(q) ? 'done' : 'pending'}
                  active={i === activeQuestionIndex}
                  onClick={() => {
                    setActiveIndex(i);
                    setSearchParams({ q: String(i + 1) });
                  }}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
