import SegmentedToggle from '../../../components/SegmentedToggle/SegmentedToggle.jsx';

export default function PublishToggle({ value, onChange }) {
  return (
    <SegmentedToggle
      ariaLabel="Publish mode"
      value={value}
      onChange={onChange}
      options={[
        { value: 'now', label: 'Publish Now' },
        { value: 'schedule', label: 'Schedule Publish' },
      ]}
    />
  );
}
