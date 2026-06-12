import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Badge from '../../../components/Badge/Badge.jsx';
import Button from '../../../components/Button/Button.jsx';
import Icon from '../../../components/Icon/Icon.jsx';
import ChapterwiseSummaryCard from '../ChapterwiseSummaryCard.jsx';
import EditTestModal from '../EditTestModal.jsx';
import PublishToggle from './PublishToggle.jsx';
import ScheduleFields from './ScheduleFields.jsx';
import LiveUntilGroup from './LiveUntilGroup.jsx';
import { publishSchema } from '../../../schemas/publish.schema.js';
import { useTestCreation } from '../../../hooks/useTestCreation.js';
import styles from './publish.module.css';

function combineDateTime(date, timeStr) {
  if (!date || !timeStr) return undefined;
  const [h, m] = timeStr.split(':').map(Number);
  const out = new Date(date);
  out.setHours(h, m, 0, 0);
  return out;
}

export default function Publish() {
  const { draft, questions, setPublish } = useTestCreation();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState(null);
  const [scheduleTime, setScheduleTime] = useState('');
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState('');
  const [submitError, setSubmitError] = useState(null);

  const {
    control, handleSubmit, formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(publishSchema),
    defaultValues: {
      publishMode: 'now',
      scheduledAt: undefined,
      liveUntil: 'always',
      customEnd: undefined,
    },
  });

  const publishMode = useWatch({ control, name: 'publishMode' });

  if (!draft) return <Navigate to="/test-creation" replace />;

  function onSubmit(values) {
    setSubmitError(null);
    const payload = {
      ...values,
      scheduledAt:
        values.publishMode === 'schedule' ? combineDateTime(scheduleDate, scheduleTime) : undefined,
      customEnd:
        values.liveUntil === 'custom' ? combineDateTime(endDate, endTime) : undefined,
    };
    const parsed = publishSchema.safeParse(payload);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      setSubmitError(first?.message || 'Please fix the errors above');
      return;
    }
    setPublish(parsed.data);
    console.log('PUBLISH PAYLOAD', { draft, questions, publish: parsed.data });
    navigate('/test-creation/success');
  }

  const doneCount = questions.filter((q) => q?.body && q.options?.every(Boolean)).length;
  const allDone = doneCount === questions.length;

  return (
    <div className={styles.page}>
      <div className={styles.crumb}>Test creation</div>
      <div className={styles.title}>
        <h2>Test created</h2>
        <Badge tone="success" leadingIcon={<Icon name="check-circle" size={14} />}>
          {allDone
            ? `All ${questions.length} Questions done`
            : `Questions ${doneCount}/${questions.length}`}
        </Badge>
      </div>

      <ChapterwiseSummaryCard onEdit={() => setEditOpen(true)} />

      <form noValidate onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="publishMode"
          control={control}
          render={({ field }) => <PublishToggle value={field.value} onChange={field.onChange} />}
        />

        {publishMode === 'schedule' && (
          <ScheduleFields
            date={scheduleDate}
            time={scheduleTime}
            onDateChange={setScheduleDate}
            onTimeChange={setScheduleTime}
            dateError={errors.scheduledAt?.message}
          />
        )}

        <Controller
          name="liveUntil"
          control={control}
          render={({ field }) => (
            <LiveUntilGroup
              value={field.value}
              onChange={field.onChange}
              endDate={endDate}
              endTime={endTime}
              onEndDateChange={setEndDate}
              onEndTimeChange={setEndTime}
              endDateError={errors.customEnd?.message}
            />
          )}
        />

        {submitError && <div role="alert" className={styles.error}>{submitError}</div>}

        <div className={styles.footer}>
          <Button variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>Confirm</Button>
        </div>
      </form>

      <EditTestModal open={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  );
}
