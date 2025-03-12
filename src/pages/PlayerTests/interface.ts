import { SessionStatus } from '../Sessions/interface';
import { Test } from '../tests/interface copy';

export interface SessionTest {
  id: string;
  sessionId: string;
  testId: string;
  createdAt: string;
  updatedAt: string;
  test: Test;
}
export interface ActiveSession {
  id: string;
  date: string;
  isActive: boolean;
  status: SessionStatus;
  createdAt: string;
  tests: SessionTest[];
  updatedAt: string;
}
export interface SelectSitePayload {
  id: string;
}
export interface TestMetricsPayload {
  player: string;
  accuracy: number | null;
  bodyPosition: number | null;
  totalTime: number | null;
  attempts: number | null;
  successes: number | null;
  power: number | null;
  conesTouched: number | null;
  foot: 'LEFT' | 'RIGHT' | null;
  errors: number | null;
  distance: number | null;
  ballControll: number | null;
  }
