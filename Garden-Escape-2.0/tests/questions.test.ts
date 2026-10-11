import { describe, it, expect } from 'vitest';
import { QUESTION_BANK, getQuestionsForTeam, getQuestionById } from '../src/data/questionBank';
import { TeamId } from '../src/types/game';

describe('Question Bank Tests (Part 6 & Part 12)', () => {
  it('contains at least 200 total questions', () => {
    expect(QUESTION_BANK.length).toBeGreaterThanOrEqual(200);
  });

  it('has exactly 50 unique questions for each of the four teams', () => {
    const teams: TeamId[] = ['HR', 'MARKETING', 'FINANCE', 'OPERATIONS'];
    teams.forEach((tid) => {
      const teamQuestions = getQuestionsForTeam(tid);
      expect(teamQuestions.length).toBe(50);
    });
  });

  it('has completely unique question IDs across the entire bank', () => {
    const ids = new Set<string>();
    QUESTION_BANK.forEach((q) => {
      expect(ids.has(q.id)).toBe(false);
      ids.add(q.id);
    });
    expect(ids.size).toBe(QUESTION_BANK.length);
  });

  it('has completely unique question text across the entire bank', () => {
    const texts = new Set<string>();
    QUESTION_BANK.forEach((q) => {
      expect(texts.has(q.question)).toBe(false);
      texts.add(q.question);
    });
    expect(texts.size).toBe(QUESTION_BANK.length);
  });

  it('ensures each question has exactly 4 options and valid correct answer reference', () => {
    const answerDistribution: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };

    QUESTION_BANK.forEach((q) => {
      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options.length).toBe(4);

      // Verify no duplicate options within the same question
      const uniqueOptions = new Set(q.options);
      expect(uniqueOptions.size).toBe(4);

      // Verify correct answer is within 0-3
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThanOrEqual(3);
      answerDistribution[q.correctAnswer]++;

      // Verify explanation exists
      expect(q.explanation.length).toBeGreaterThan(10);
    });

    // Ensure balanced distribution across options
    expect(answerDistribution[0]).toBe(50);
    expect(answerDistribution[1]).toBe(50);
    expect(answerDistribution[2]).toBe(50);
    expect(answerDistribution[3]).toBe(50);
  });

  it('getQuestionById returns the exact requested question', () => {
    const q1 = getQuestionById('hr_01');
    expect(q1).toBeDefined();
    expect(q1?.teamId).toBe('HR');

    const qInvalid = getQuestionById('non_existent');
    expect(qInvalid).toBeUndefined();
  });
});
