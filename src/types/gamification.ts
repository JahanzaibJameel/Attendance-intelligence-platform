export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'attendance' | 'streak' | 'performance' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
}

export interface UserStats {
  level: number;
  points: number;
  streak: number;
  totalAttendance: number;
  perfectAttendance: number;
  achievementsUnlocked: number;
  nextLevelPoints: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  level: number;
  streak: number;
  rank: number;
}

export interface GamificationContextType {
  userStats: UserStats;
  achievements: Achievement[];
  leaderboard: LeaderboardEntry[];
  updateStats: (stats: Partial<UserStats>) => void;
  unlockAchievement: (achievementId: string) => void;
  addPoints: (points: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
}
