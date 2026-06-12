import { useContext } from 'react';
import { TestCreationContext } from '../context/TestCreationContext.jsx';

export function useTestCreation() {
  const ctx = useContext(TestCreationContext);
  if (!ctx) throw new Error('useTestCreation must be used within a TestCreationProvider');
  return ctx;
}
