import Select from '../../../components/Select/Select.jsx';
import RadioGroup from '../../../components/RadioGroup/RadioGroup.jsx';
import { getTopics, getSubTopics } from '../../../mocks/catalog.js';
import { useTestCreation } from '../../../hooks/useTestCreation.js';

export default function QuestionSettings({ question, onChange }) {
  const { draft } = useTestCreation();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
      <h3 style={{ fontSize: 14, fontWeight: 600 }}>Question settings</h3>
      <div>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 8 }}>
          Level of Difficulty
        </label>
        <RadioGroup
          name="q-difficulty"
          columns={3}
          value={question.difficulty}
          onChange={(v) => onChange({ difficulty: v })}
          options={[
            { value: 'easy', label: 'Easy' },
            { value: 'medium', label: 'Medium' },
            { value: 'difficult', label: 'Difficult' },
          ]}
        />
      </div>
      <Select
        label="Topic"
        placeholder="Select from Drop-down"
        value={question.topic}
        options={getTopics(draft?.subject)}
        onChange={(e) => onChange({ topic: e.target.value, subTopic: '' })}
      />
      <Select
        label="Sub-topic"
        placeholder="Select from Drop-down"
        value={question.subTopic}
        options={getSubTopics(question.topic)}
        onChange={(e) => onChange({ subTopic: e.target.value })}
      />
    </div>
  );
}
