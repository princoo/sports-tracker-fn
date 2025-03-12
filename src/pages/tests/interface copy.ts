export interface Test {
  id: string;
  name: string;
  description: string;
  requiredMetrics: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TestPayload {
  name: string;
  description: string;
  requiredMetrics: string[];
}

export enum TestMetrics {
  accuracy = 'accuracy', // Accuracy of attempts (e.g., shooting or passing)
  bodyPosition = 'bodyPosition', // Player's BodyPosition during tests (e.g., while dribbling)
  totalTime = 'totalTime', // Time taken to complete a test (e.g., sprint, dribble)
  attempts = 'attempts', // Number of attempts (e.g., shots, passes, dribbles)
  successes = 'successes', // Number of successful attempts (e.g., goals, passes)
  power = 'power', // Power generated (e.g., shot power, jump power)
  conesTouched = 'conesTouched', // nbr of cones touched during tests (e.g., dribbling)
  foot = 'foot', // the foot used in a test (e.g., left or right)
  errors = 'errors', // errorsMade during the test
  distance = 'distance', // distance covered (e.g., in speed test)
  ballControll = 'ballControll', // how the player controls the ball during a test
}
export interface TestMetricsInterface {
  accuracy?: number;
  bodyPosition?: number;
  totalTime?: number;
  attempts?: number;
  successes?: number;
  power?: number;
  conesTouched?: number;
  foot?: 'LEFT' | 'RIGHT' | null;
  errors?: number;
  distance?: number;
  ballControll?: number;
}
