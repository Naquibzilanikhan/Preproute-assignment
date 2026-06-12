import { useState } from 'react';
import Modal from '../../components/Modal/Modal.jsx';
import SegmentedToggle from '../../components/SegmentedToggle/SegmentedToggle.jsx';
import ChapterwiseForm from './ChapterwiseForm.jsx';
import { useTestCreation } from '../../hooks/useTestCreation.js';

export default function EditTestModal({ open, onClose }) {
  const { draft, setDraft } = useTestCreation();
  const [tab, setTab] = useState('chapterwise');

  function handleSave(values) {
    setDraft(values);
    onClose?.();
  }

  return (
    <Modal open={open} onClose={onClose} title="Edit Test creation" width={860}>
      <SegmentedToggle
        ariaLabel="Test type"
        value={tab}
        onChange={setTab}
        options={[
          { value: 'chapterwise', label: 'Chapter Wise' },
          { value: 'pyq', label: 'PYQ' },
          { value: 'mock', label: 'Mock Test' },
        ]}
      />
      <div style={{ marginTop: 20 }}>
        {tab === 'chapterwise' && draft && (
          <ChapterwiseForm
            defaultValues={draft}
            onSubmit={handleSave}
            onCancel={onClose}
            submitLabel="Save"
          />
        )}
        {tab !== 'chapterwise' && (
          <p style={{ padding: 24, color: 'var(--color-text-muted)' }}>Coming soon.</p>
        )}
      </div>
    </Modal>
  );
}
