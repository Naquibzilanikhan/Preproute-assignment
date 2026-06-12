import Badge from '../../components/Badge/Badge.jsx';
import Card from '../../components/Card/Card.jsx';
import Chip from '../../components/Chip/Chip.jsx';
import Icon from '../../components/Icon/Icon.jsx';
import { useTestCreation } from '../../hooks/useTestCreation.js';
import styles from './ChapterwiseSummaryCard.module.css';

function capitalize(s) {
  return s ? s[0].toUpperCase() + s.slice(1) : '';
}

export default function ChapterwiseSummaryCard({ onEdit, totalMarks }) {
  const { draft, questions } = useTestCreation();
  if (!draft) return null;
  const marks = totalMarks ?? (Number(draft.numQuestions) * Number(draft.marking?.correct ?? 0));
  return (
    <Card className={styles.card}>
      <div className={styles.headRow}>
        <Badge tone="primaryDark">Chapter Wise</Badge>
        <button type="button" className={styles.edit} aria-label="Edit test" onClick={onEdit}>
          <Icon name="pencil" size={16} />
        </button>
      </div>
      <div className={styles.titleRow}>
        <strong className={styles.chapter}>Chapter 1</strong>
        <Badge tone={draft.difficulty}>{capitalize(draft.difficulty)}</Badge>
      </div>
      <dl className={styles.meta}>
        <div className={styles.row}><dt>Subject</dt><dd>: {draft.subject}</dd></div>
        <div className={styles.row}><dt>Topic</dt><dd>: <Chip>{draft.topic}</Chip></dd></div>
        <div className={styles.row}><dt>Sub Topic</dt><dd>: <Chip>{draft.subTopic}</Chip></dd></div>
      </dl>
      <div className={styles.stats}>
        <span><Icon name="clock" size={14} /> {draft.duration} Min</span>
        <span><Icon name="file-text" size={14} /> {questions.length || draft.numQuestions} Q&apos;s</span>
        <span><Icon name="award" size={14} /> {marks} Marks</span>
      </div>
    </Card>
  );
}
