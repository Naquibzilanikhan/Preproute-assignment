import { createContext, useReducer, useEffect, useMemo, useCallback } from 'react';
import { readJSON, writeJSON, remove } from '../lib/storage.js';

const STORAGE_KEY = 'preproute.draft.v1';

export function emptyQuestion({ topic = '', subTopic = '', difficulty = 'easy' } = {}) {
  return {
    type: 'mcq',
    body: '',
    options: ['', '', '', ''],
    correctIndex: 0,
    solution: '',
    difficulty,
    topic,
    subTopic,
  };
}

export const initialTcState = {
  draft: null,
  questions: [],
  activeQuestionIndex: 0,
  publish: null,
};

export function tcReducer(state, action) {
  switch (action.type) {
    case 'SET_DRAFT': {
      const draft = action.payload;
      const questions = Array.from({ length: draft.numQuestions }, () =>
        emptyQuestion({ topic: draft.topic, subTopic: draft.subTopic, difficulty: draft.difficulty })
      );
      return { ...state, draft, questions, activeQuestionIndex: 0 };
    }
    case 'UPDATE_QUESTION': {
      const { index, patch } = action.payload;
      const questions = state.questions.map((q, i) => (i === index ? { ...q, ...patch } : q));
      return { ...state, questions };
    }
    case 'RESET_QUESTION': {
      const { index } = action.payload;
      const base = state.draft
        ? emptyQuestion({ topic: state.draft.topic, subTopic: state.draft.subTopic, difficulty: state.draft.difficulty })
        : emptyQuestion();
      const questions = state.questions.map((q, i) => (i === index ? base : q));
      return { ...state, questions };
    }
    case 'SET_ACTIVE_INDEX':
      return {
        ...state,
        activeQuestionIndex: Math.max(0, Math.min(action.payload, Math.max(0, state.questions.length - 1))),
      };
    case 'SET_PUBLISH':
      return { ...state, publish: action.payload };
    case 'CLEAR_ALL':
      return initialTcState;
    default:
      return state;
  }
}

export const TestCreationContext = createContext(null);

export function TestCreationProvider({ children }) {
  const [state, dispatch] = useReducer(tcReducer, initialTcState, (s) => readJSON(STORAGE_KEY, s));

  useEffect(() => {
    if (state.draft) writeJSON(STORAGE_KEY, state);
    else remove(STORAGE_KEY);
  }, [state]);

  const setDraft = useCallback((draft) => dispatch({ type: 'SET_DRAFT', payload: draft }), []);
  const updateQuestion = useCallback((index, patch) => dispatch({ type: 'UPDATE_QUESTION', payload: { index, patch } }), []);
  const resetQuestion = useCallback((index) => dispatch({ type: 'RESET_QUESTION', payload: { index } }), []);
  const setActiveIndex = useCallback((i) => dispatch({ type: 'SET_ACTIVE_INDEX', payload: i }), []);
  const setPublish = useCallback((p) => dispatch({ type: 'SET_PUBLISH', payload: p }), []);
  const clearAll = useCallback(() => dispatch({ type: 'CLEAR_ALL' }), []);

  const value = useMemo(
    () => ({ ...state, setDraft, updateQuestion, resetQuestion, setActiveIndex, setPublish, clearAll }),
    [state, setDraft, updateQuestion, resetQuestion, setActiveIndex, setPublish, clearAll]
  );

  return <TestCreationContext.Provider value={value}>{children}</TestCreationContext.Provider>;
}
