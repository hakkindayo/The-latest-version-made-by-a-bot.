import React, { useMemo } from 'react';
import { Trophy, Star, BarChart3, Target } from 'lucide-react';
import { ChallengeWithProgress } from '../types';
import { formatXP } from '../utils';

interface QuestStatisticsProps {
  challenges: ChallengeWithProgress[];
}

const QuestStatistics: React.FC<QuestStatisticsProps> = ({ challenges }) => {
  const stats = useMemo(() => {
    const totalXP = challenges.reduce((sum, challenge) => sum + challenge.xp, 0);
    const completedXP = challenges
      .filter(c => c.completed)
      .reduce((sum, challenge) => sum + challenge.xp, 0);
    
    const questTypes = challenges.reduce((acc, challenge) => {
      acc[challenge.questType] = (acc[challenge.questType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const currentChapter = challenges[0]?.chapter || "5";
    const currentSeason = challenges[0]?.season || "1";

    return {
      totalXP,
      completedXP,
      questTypes,
      currentChapter,
      currentSeason
    };
  }, [challenges]);

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <Trophy className="w-6 h-6" />
          <span className="text-purple-200">総XP</span>
        </div>
        <div className="text-2xl font-bold">{formatXP(stats.totalXP)} XP</div>
        <div className="text-sm text-purple-200 mt-1">
          獲得済み: {formatXP(stats.completedXP)} XP
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <Star className="w-6 h-6" />
          <span className="text-blue-200">シーズン情報</span>
        </div>
        <div className="text-2xl font-bold">
          Chapter {stats.currentChapter}
        </div>
        <div className="text-sm text-blue-200 mt-1">
          Season {stats.currentSeason}
        </div>
      </div>

      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <BarChart3 className="w-6 h-6" />
          <span className="text-emerald-200">クエスト種類</span>
        </div>
        <div className="text-2xl font-bold">
          {Object.keys(stats.questTypes).length}種類
        </div>
        <div className="text-sm text-emerald-200 mt-1">
          全{challenges.length}クエスト
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-4 text-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <Target className="w-6 h-6" />
          <span className="text-amber-200">進捗状況</span>
        </div>
        <div className="text-2xl font-bold">
          {((challenges.filter(c => c.completed).length / challenges.length) * 100).toFixed(1)}%
        </div>
        <div className="text-sm text-amber-200 mt-1">
          完了: {challenges.filter(c => c.completed).length}/{challenges.length}
        </div>
      </div>
    </div>
  );
};

export default QuestStatistics;