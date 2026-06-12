import { describe, it, expect, beforeEach } from 'vitest'
import { readJSON, writeJSON, remove } from '../lib/storage.js'

describe('storage', () => {
  beforeEach(() => localStorage.clear())

  it('writes and reads JSON values', () => {
    writeJSON('k', { a: 1 })
    expect(readJSON('k')).toEqual({ a: 1 })
  })

  it('returns fallback when key is missing', () => {
    expect(readJSON('missing', { default: true })).toEqual({ default: true })
  })

  it('returns fallback when stored JSON is corrupt', () => {
    localStorage.setItem('k', 'not-json{')
    expect(readJSON('k', null)).toBeNull()
  })

  it('remove deletes the key', () => {
    writeJSON('k', 1)
    remove('k')
    expect(readJSON('k', null)).toBeNull()
  })
})
