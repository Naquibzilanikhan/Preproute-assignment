import DatePicker from '../../../components/DatePicker/DatePicker.jsx';
import TimePicker from '../../../components/TimePicker/TimePicker.jsx';

export default function ScheduleFields({ date, time, onDateChange, onTimeChange, dateError, timeError }) {
  return (
    <>
      <h3 style={{ fontSize: 14, fontWeight: 600 }}>Select Date and Time</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <DatePicker value={date} onChange={onDateChange} placeholder="Select Date" error={dateError} />
        <TimePicker value={time} onChange={onTimeChange} placeholder="Select Time" error={timeError} />
      </div>
    </>
  );
}
