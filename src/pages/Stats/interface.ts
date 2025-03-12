import { Player } from '../Players/interface';
import { Test, TestMetricsInterface } from '../tests/interface copy';

export interface PlayerStat {
  playerId: string;
  player: Pick<Player, 'firstName' | 'lastName'>;
  sessionTests: {test: Pick<Test, 'id' | 'name'>}[];
  tests: SessionStat[];
}

export interface SessionStat {
    id: string;
    testId: string;
    testName: string;
    sessionId: string;
    metrics: TestMetricsInterface;
    result: string | null;
    recorderAt: string;
}
