import RadioGroup from '../../../components/RadioGroup/RadioGroup.jsx';
import DatePicker from '../../../components/DatePicker/DatePicker.jsx';
import TimePicker from '../../../components/TimePicker/TimePicker.jsx';

const OPTIONS = [
  { value: 'always', label: 'Always Available' },
  { value: '3w', label: '3 Weeks' },
  { value: '1w', label: '1 Week' },
  { value: '1m', label: '1 Month' },
  { value: '2w', label: '2 Weeks' },
  { value: 'custom', label: 'Custom Duration' },
];

export default function LiveUntilGroup({
  value, onChange,
  endDate, endTime, onEndDateChange, onEndTimeChange,
  endDateError, endTimeError,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h3 style={{ fontSize: 14, fontWeight: 600 }}>Live Until</h3>
        <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginTop: 4 }}>
          Choose how long this test should remain available on the platform.
        </p>
      </div>
      <RadioGroup name="liveUntil" columns={2} value={value} onChange={onChange} options={OPTIONS} />
      {value === 'custom' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <DatePicker
            value={endDate}
            onChange={onEndDateChange}
            placeholder="Select End Date"
            error={endDateError}
          />
          <TimePicker
            value={endTime}
            onChange={onEndTimeChange}
            placeholder="Select End Time"
            error={endTimeError}
          />
        </div>
      )}
    </div>
  );
}
