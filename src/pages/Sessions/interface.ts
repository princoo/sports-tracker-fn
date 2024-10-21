import { Test } from "../tests/interface copy";

export interface Session {
  id: string;
  date: string;
  isActive: boolean;
  status: SessionStatus;
  createdAt: string;
  tests: Test[];
  updatedAt: string;
}
export enum SessionStatus {
  SCHEDULED = 'SCHEDULED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

export interface SessionPayload {
  date: string;
  tests: string[];
}
