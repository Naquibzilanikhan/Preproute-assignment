import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { chapterwiseSchema } from '../../schemas/chapterwise.schema.js';
import { SUBJECTS, getTopics, getSubTopics } from '../../mocks/catalog.js';
import Input from '../../components/Input/Input.jsx';
import Select from '../../components/Select/Select.jsx';
import RadioGroup from '../../components/RadioGroup/RadioGroup.jsx';
import NumberStepper from '../../components/NumberStepper/NumberStepper.jsx';
import Button from '../../components/Button/Button.jsx';
import styles from './ChapterwiseForm.module.css';

const DEFAULTS = {
  subject: '',
  testName: '',
  topic: '',
  subTopic: '',
  duration: '',
  difficulty: 'easy',
  marking: { wrong: -1, unattempted: 0, correct: 5 },
  numQuestions: '',
};

export default function ChapterwiseForm({
  defaultValues = DEFAULTS,
  onSubmit,
  onCancel,
  submitLabel = 'Next',
}) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(chapterwiseSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const subject = useWatch({ control, name: 'subject' });
  const topic = useWatch({ control, name: 'topic' });
  const topicOptions = useMemo(() => getTopics(subject), [subject]);
  const subTopicOptions = useMemo(() => getSubTopics(topic), [topic]);

  const numQuestions = useWatch({ control, name: 'numQuestions' });
  const correct = useWatch({ control, name: 'marking.correct' });
  const totalMarks = (Number(numQuestions) || 0) * (Number(correct) || 0);

  return (
    <form noValidate className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.grid}>
        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <Select
              label="Subject"
              options={SUBJECTS}
              error={errors.subject?.message}
              value={field.value}
              onChange={(e) => {
                field.onChange(e.target.value);
                setValue('topic', '', { shouldValidate: false });
                setValue('subTopic', '', { shouldValidate: false });
              }}
              onBlur={field.onBlur}
            />
          )}
        />
        <Input
          label="Name of Test"
          placeholder="Enter name of Test"
          error={errors.testName?.message}
          {...register('testName')}
        />
        <Controller
          name="topic"
          control={control}
          render={({ field }) => (
            <Select
              label="Topic"
              options={topicOptions}
              error={errors.topic?.message}
              value={field.value}
              onChange={(e) => {
                field.onChange(e.target.value);
                setValue('subTopic', '', { shouldValidate: false });
              }}
              onBlur={field.onBlur}
              disabled={!subject}
            />
          )}
        />
        <Controller
          name="subTopic"
          control={control}
          render={({ field }) => (
            <Select
              label="Sub Topic"
              options={subTopicOptions}
              error={errors.subTopic?.message}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              onBlur={field.onBlur}
              disabled={!topic}
            />
          )}
        />
        <Input
          label="Duration (Minutes)"
          placeholder="Enter the time"
          type="number"
          min="1"
          error={errors.duration?.message}
          {...register('duration')}
        />
        <Controller
          name="difficulty"
          control={control}
          render={({ field }) => (
            <div>
              <label className={styles.label}>Test Difficulty Level</label>
              <RadioGroup
                name="difficulty"
                columns={3}
                value={field.value}
                onChange={field.onChange}
                options={[
                  { value: 'easy', label: 'Easy' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'difficult', label: 'Difficult' },
                ]}
              />
            </div>
          )}
        />
      </div>

      <div className={styles.markingTitle}>Marking Scheme:</div>
      <div className={styles.markingGrid}>
        <Controller
          name="marking.wrong"
          control={control}
          render={({ field }) => (
            <NumberStepper
              label="Wrong Answer"
              value={field.value}
              onChange={field.onChange}
              displaySign
              step={1}
            />
          )}
        />
        <Controller
          name="marking.unattempted"
          control={control}
          render={({ field }) => (
            <NumberStepper
              label="Unattempted"
              value={field.value}
              onChange={field.onChange}
              displaySign
              step={1}
            />
          )}
        />
        <Controller
          name="marking.correct"
          control={control}
          render={({ field }) => (
            <NumberStepper
              label="Correct Answer"
              value={field.value}
              onChange={field.onChange}
              displaySign
              step={1}
            />
          )}
        />
        <Input
          label="No of Questions"
          placeholder="Ex:250 Marks"
          type="number"
          min="1"
          error={errors.numQuestions?.message}
          {...register('numQuestions')}
        />
        <Input
          label="Total Marks"
          placeholder="Ex:250 Marks"
          readOnly
          tabIndex={-1}
          value={totalMarks || ''}
          onChange={() => {}}
        />
      </div>

      <div className={styles.footer}>
        {onCancel && (
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        )}
        <Button type="submit" disabled={isSubmitting}>{submitLabel}</Button>
      </div>
    </form>
  );
}
