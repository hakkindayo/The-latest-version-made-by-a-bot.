import React from 'react';
import { ChallengeWithProgress } from '../types';
import ChallengeCard from './ChallengeCard';

interface ChallengeListProps {
  challenges: ChallengeWithProgress[];
  onToggleCompletion: (id: string) => void;
}

const ChallengeList: React.FC<ChallengeListProps> = ({ challenges, onToggleCompletion }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {challenges.map((challenge) => (
        <ChallengeCard 
          key={challenge.id} 
          challenge={challenge}
          onToggleCompletion={onToggleCompletion}
        />
      ))}
    </div>
  );
};

export default ChallengeList;