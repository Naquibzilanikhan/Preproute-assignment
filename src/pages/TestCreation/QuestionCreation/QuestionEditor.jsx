import RichTextEditor from '../../../components/RichTextEditor/RichTextEditor.jsx';
import Icon from '../../../components/Icon/Icon.jsx';
import styles from './QuestionEditor.module.css';

export default function QuestionEditor({ question, onChange, onResetAll }) {
  function setOption(i, text) {
    const options = question.options.map((v, idx) => (idx === i ? text : v));
    onChange({ options });
  }

  function clearOption(i) {
    setOption(i, '');
  }

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.resetAll} onClick={onResetAll}>
        <Icon name="trash" size={14} /> Delete All Edits
      </button>
      <RichTextEditor value={question.body} onChange={(html) => onChange({ body: html })} />
      <div className={styles.optionsLabel}>Type the options below</div>
      <ul className={styles.options}>
        {question.options.map((opt, i) => (
          <li key={i} className={styles.optionRow}>
            <label className={styles.radio}>
              <input
                type="radio"
                name="correct"
                checked={question.correctIndex === i}
                onChange={() => onChange({ correctIndex: i })}
              />
              <span className={styles.dot} aria-hidden="true" />
            </label>
            <input
              type="text"
              value={opt}
              placeholder="Type Option here"
              onChange={(e) => setOption(i, e.target.value)}
              className={styles.optionInput}
              aria-label={`Option ${i + 1}`}
            />
            <button
              type="button"
              aria-label={`Clear option ${i + 1}`}
              className={styles.del}
              onClick={() => clearOption(i)}
            >
              <Icon name="trash" size={14} />
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.solutionLabel}>Add Solution</div>
      <RichTextEditor
        value={question.solution}
        onChange={(html) => onChange({ solution: html })}
        minHeight={120}
      />
    </div>
  );
}
