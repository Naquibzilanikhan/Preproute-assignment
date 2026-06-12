import { describe, it, expect } from 'vitest'
import { tcReducer, initialTcState, emptyQuestion } from '../context/TestCreationContext.jsx'

const baseDraft = {
  subject: 'English', testName: 't', topic: 'Grammar', subTopic: 'Application',
  duration: 30, difficulty: 'easy',
  marking: { wrong: -1, unattempted: 0, correct: 5 },
};

describe('tcReducer', () => {
  it('SET_DRAFT seeds questions of correct length', () => {
    const next = tcReducer(initialTcState, {
      type: 'SET_DRAFT',
      payload: { ...baseDraft, numQuestions: 3 },
    });
    expect(next.questions).toHaveLength(3);
    expect(next.questions[0]).toEqual(emptyQuestion({ topic: 'Grammar', subTopic: 'Application', difficulty: 'easy' }));
  });

  it('UPDATE_QUESTION updates by index', () => {
    const state = tcReducer(initialTcState, {
      type: 'SET_DRAFT', payload: { ...baseDraft, numQuestions: 2 },
    });
    const next = tcReducer(state, { type: 'UPDATE_QUESTION', payload: { index: 1, patch: { body: 'Hi' } } });
    expect(next.questions[1].body).toBe('Hi');
    expect(next.questions[0].body).toBe('');
  });

  it('RESET_QUESTION resets one back to empty', () => {
    let s = tcReducer(initialTcState, {
      type: 'SET_DRAFT', payload: { ...baseDraft, numQuestions: 2 },
    });
    s = tcReducer(s, { type: 'UPDATE_QUESTION', payload: { index: 0, patch: { body: 'X' } } });
    const r = tcReducer(s, { type: 'RESET_QUESTION', payload: { index: 0 } });
    expect(r.questions[0].body).toBe('');
  });

  it('CLEAR_ALL resets to initial', () => {
    expect(tcReducer({ ...initialTcState, draft: {}, questions: [{}] }, { type: 'CLEAR_ALL' })).toEqual(initialTcState);
  });
});
