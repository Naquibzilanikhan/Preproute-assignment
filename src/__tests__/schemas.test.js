import { describe, it, expect } from 'vitest'
import { loginSchema } from '../schemas/login.schema.js'
import { chapterwiseSchema } from '../schemas/chapterwise.schema.js'
import { questionSchema } from '../schemas/question.schema.js'
import { publishSchema } from '../schemas/publish.schema.js'

describe('loginSchema', () => {
  it('rejects empty', () => {
    expect(loginSchema.safeParse({}).success).toBe(false);
  });
  it('accepts valid', () => {
    expect(loginSchema.safeParse({ userId: 'abc', password: 'secret1' }).success).toBe(true);
  });
});

describe('chapterwiseSchema', () => {
  const valid = {
    subject: 'English', testName: 'Quiz', topic: 'Grammar', subTopic: 'Application',
    duration: 60, difficulty: 'easy',
    marking: { wrong: -1, unattempted: 0, correct: 5 },
    numQuestions: 50,
  };
  it('accepts valid', () => expect(chapterwiseSchema.safeParse(valid).success).toBe(true));
  it('rejects zero questions', () => {
    expect(chapterwiseSchema.safeParse({ ...valid, numQuestions: 0 }).success).toBe(false);
  });
});

describe('questionSchema', () => {
  it('requires 4 options', () => {
    const r = questionSchema.safeParse({
      type: 'mcq', body: 'q?', options: ['a', 'b', 'c'], correctIndex: 0,
      difficulty: 'easy', topic: 't', subTopic: 's',
    });
    expect(r.success).toBe(false);
  });
  it('accepts valid 4-option mcq', () => {
    const r = questionSchema.safeParse({
      type: 'mcq', body: 'q?', options: ['a', 'b', 'c', 'd'], correctIndex: 0,
      difficulty: 'easy', topic: 't', subTopic: 's',
    });
    expect(r.success).toBe(true);
  });
});

describe('publishSchema', () => {
  it('schedule without date is invalid', () => {
    const r = publishSchema.safeParse({ publishMode: 'schedule', liveUntil: 'always' });
    expect(r.success).toBe(false);
  });
  it('custom without end is invalid', () => {
    const r = publishSchema.safeParse({ publishMode: 'now', liveUntil: 'custom' });
    expect(r.success).toBe(false);
  });
  it('publishMode now + liveUntil 1w is valid', () => {
    expect(publishSchema.safeParse({ publishMode: 'now', liveUntil: '1w' }).success).toBe(true);
  });
});
