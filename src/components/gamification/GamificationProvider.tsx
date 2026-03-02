// Gamification system for attendance tracking
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Zap, Award, Medal, Flame, TrendingUp } from 'lucide-react';
import type { Achievement, UserStats, LeaderboardEntry, GamificationContextType } from '../../types/gamification';

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export { GamificationContext };

interface GamificationProviderProps {
  children: React.ReactNode;
  userId: string;
}

export const GamificationProvider: React.FC<GamificationProviderProps> = ({
  children,
  userId
}) => {
  const [userStats, setUserStats] = useState<UserStats>({
    level: 1,
    points: 0,
    streak: 0,
    totalAttendance: 0,
    perfectAttendance: 0,
    achievementsUnlocked: 0,
    nextLevelPoints: 100
  });

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leaderboard] = useState<LeaderboardEntry[]>([]);

  // Initialize achievements
  useEffect(() => {
    const initialAchievements: Achievement[] = [
      {
        id: 'first_attendance',
        title: 'First Day',
        description: 'Mark your first attendance',
        icon: <Star className="w-6 h-6" />,
        category: 'attendance',
        rarity: 'common',
        points: 10,
        progress: 0,
        maxProgress: 1,
        isUnlocked: false
      },
      {
        id: 'week_streak',
        title: 'Week Warrior',
        description: 'Maintain a 7-day attendance streak',
        icon: <Flame className="w-6 h-6" />,
        category: 'streak',
        rarity: 'rare',
        points: 50,
        progress: 0,
        maxProgress: 7,
        isUnlocked: false
      },
      {
        id: 'perfect_month',
        title: 'Perfect Month',
        description: 'Achieve perfect attendance for a month',
        icon: <Trophy className="w-6 h-6" />,
        category: 'attendance',
        rarity: 'epic',
        points: 100,
        progress: 0,
        maxProgress: 30,
        isUnlocked: false
      },
      {
        id: 'early_bird',
        title: 'Early Bird',
        description: 'Mark attendance before 9 AM for 10 days',
        icon: <Target className="w-6 h-6" />,
        category: 'performance',
        rarity: 'rare',
        points: 75,
        progress: 0,
        maxProgress: 10,
        isUnlocked: false
      },
      {
        id: 'speed_demon',
        title: 'Speed Demon',
        description: 'Complete all tasks within 5 minutes for a week',
        icon: <Zap className="w-6 h-6" />,
        category: 'performance',
        rarity: 'legendary',
        points: 200,
        progress: 0,
        maxProgress: 35,
        isUnlocked: false
      },
      {
        id: 'helping_hand',
        title: 'Helping Hand',
        description: 'Help 5 classmates with their assignments',
        icon: <Award className="w-6 h-6" />,
        category: 'special',
        rarity: 'rare',
        points: 60,
        progress: 0,
        maxProgress: 5,
        isUnlocked: false
      },
      {
        id: 'master_attendant',
        title: 'Master Attendant',
        description: 'Achieve 95% attendance rate for a semester',
        icon: <Medal className="w-6 h-6" />,
        category: 'attendance',
        rarity: 'epic',
        points: 150,
        progress: 0,
        maxProgress: 95,
        isUnlocked: false
      },
      {
        id: 'rising_star',
        title: 'Rising Star',
        description: 'Improve performance by 20% in a month',
        icon: <TrendingUp className="w-6 h-6" />,
        category: 'performance',
        rarity: 'rare',
        points: 80,
        progress: 0,
        maxProgress: 20,
        isUnlocked: false
      }
    ];

    setTimeout(() => setAchievements(initialAchievements), 0);
  }, []);

  // Load user stats from localStorage
  useEffect(() => {
    try {
      const savedStats = localStorage.getItem(`gamification_${userId}`);
      if (savedStats) {
        setTimeout(() => setUserStats(JSON.parse(savedStats)), 0);
      }
    } catch (error) {
      console.error('Failed to load gamification data:', error);
    }
  }, [userId]);

  // Save user stats to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`gamification_${userId}`, JSON.stringify(userStats));
    } catch (error) {
      console.error('Failed to save gamification data:', error);
    }
  }, [userStats, userId]);

  // Update stats
  const updateStats = useCallback((newStats: Partial<UserStats>) => {
    setUserStats(prev => ({ ...prev, ...newStats }));
  }, []);

  // Unlock achievement
  const unlockAchievement = useCallback((achievementId: string) => {
    setAchievements(prev => 
      prev.map(achievement => 
        achievement.id === achievementId 
          ? { ...achievement, isUnlocked: true, progress: achievement.maxProgress }
          : achievement
      )
    );
  }, []);

  // Add points
  const addPoints = useCallback((points: number) => {
    setUserStats(prev => {
      const newPoints = prev.points + points;
      const newLevel = Math.floor(newPoints / 100) + 1;
      return {
        ...prev,
        points: newPoints,
        level: newLevel,
        nextLevelPoints: newLevel * 100
      };
    });
  }, []);

  // Increment streak
  const incrementStreak = useCallback(() => {
    setUserStats(prev => ({ ...prev, streak: prev.streak + 1 }));
  }, []);

  // Reset streak
  const resetStreak = useCallback(() => {
    setUserStats(prev => ({ ...prev, streak: 0 }));
  }, []);

  const value: GamificationContextType = {
    userStats,
    achievements,
    leaderboard,
    updateStats,
    unlockAchievement,
    addPoints,
    incrementStreak,
    resetStreak
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
};

// Achievement Card Component
interface AchievementCardProps {
  achievement: Achievement;
  className?: string;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  className = ''
}) => {
  const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`
        relative p-4 rounded-lg border-2 transition-all duration-300
        ${achievement.isUnlocked 
          ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' 
          : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'
        }
        ${className}
      `}
    >
      <div className="flex items-start space-x-3">
        <div className={`
          p-2 rounded-lg
          ${achievement.isUnlocked 
            ? 'bg-yellow-400 text-white' 
            : 'bg-gray-300 dark:bg-gray-600 text-gray-500'
          }
        `}>
          {achievement.icon}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className={`font-semibold ${
              achievement.isUnlocked 
                ? 'text-gray-900 dark:text-gray-100' 
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              {achievement.title}
            </h3>
            <span className={`
              text-xs px-2 py-1 rounded-full font-medium
              ${achievement.rarity === 'legendary' 
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                : achievement.rarity === 'epic'
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                : achievement.rarity === 'rare'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }
            `}>
              {achievement.rarity}
            </span>
          </div>
          
          <p className={`text-sm mb-2 ${
            achievement.isUnlocked 
              ? 'text-gray-700 dark:text-gray-300' 
              : 'text-gray-500 dark:text-gray-400'
          }`}>
            {achievement.description}
          </p>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500 dark:text-gray-400">Progress</span>
              <span className="text-gray-700 dark:text-gray-300">
                {achievement.progress}/{achievement.maxProgress}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className={`
                  h-2 rounded-full
                  ${achievement.isUnlocked 
                    ? 'bg-yellow-400' 
                    : 'bg-blue-500'
                  }
                `}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {achievement.points} points
            </span>
            {achievement.isUnlocked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-green-500"
              >
                <Trophy className="w-4 h-4" />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// User Level Display
interface UserLevelDisplayProps {
  userStats: UserStats;
  className?: string;
}

export const UserLevelDisplay: React.FC<UserLevelDisplayProps> = ({
  userStats,
  className = ''
}) => {
  const progressPercentage = ((userStats.points % 100) / 100) * 100;

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="text-center">
        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          {userStats.level}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">Level</div>
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-700 dark:text-gray-300">
            {userStats.points} XP
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {userStats.nextLevelPoints} XP
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-primary-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};

// Streak Display
interface StreakDisplayProps {
  streak: number;
  className?: string;
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({
  streak,
  className = ''
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Flame className="w-5 h-5 text-orange-500" />
      </motion.div>
      <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {streak}
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        day streak
      </span>
    </div>
  );
};

// Points Display
interface PointsDisplayProps {
  points: number;
  className?: string;
}

export const PointsDisplay: React.FC<PointsDisplayProps> = ({
  points,
  className = ''
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Star className="w-5 h-5 text-yellow-500" />
      <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {points.toLocaleString()}
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        points
      </span>
    </div>
  );
};
