import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '../../../components/Button/Button.jsx';
import Card from '../../../components/Card/Card.jsx';
import Icon from '../../../components/Icon/Icon.jsx';
import { useTestCreation } from '../../../hooks/useTestCreation.js';

export default function Success() {
  const navigate = useNavigate();
  const { publish, clearAll } = useTestCreation();

  useEffect(() => {
    if (!publish) navigate('/test-creation', { replace: true });
  }, [publish, navigate]);

  return (
    <Card style={{ maxWidth: 540, margin: '40px auto', textAlign: 'center' }}>
      <div style={{ display: 'inline-grid', placeItems: 'center', color: 'var(--color-success)' }}>
        <Icon name="check-circle" size={48} color="var(--color-success)" />
      </div>
      <h1 style={{ fontSize: 20, fontWeight: 700, marginTop: 16 }}>Test published</h1>
      <p style={{ color: 'var(--color-text-muted)', marginTop: 8 }}>
        Your test is {publish?.publishMode === 'now' ? 'now live.' : 'scheduled.'} You can manage it from Test Tracking.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
        <Button
          variant="secondary"
          onClick={() => {
            clearAll();
            navigate('/test-creation');
          }}
        >
          Create another
        </Button>
        <Button onClick={() => navigate('/test-tracking')}>Go to Test Tracking</Button>
      </div>
    </Card>
  );
}
