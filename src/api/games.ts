const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export type SubmitScoreRequest = {
  userId: string;
  gameType: string;
  score: number;
};

export type LeaderboardEntry = {
  displayName: string;
  score: number;
  date: string;
  rank: number;
};

/**
 * Submit a score for a game
 */
export async function submitScore(request: SubmitScoreRequest): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/games/score`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to submit score');
  }
}

/**
 * Get the leaderboard for a specific game
 */
export async function getLeaderboard(gameType: string): Promise<LeaderboardEntry[]> {
  const response = await fetch(`${API_BASE_URL}/api/games/leaderboard/${gameType}`);
  if (!response.ok) {
    throw new Error('Failed to fetch leaderboard');
  }
  return response.json();
}
