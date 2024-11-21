import React, { Suspense } from 'react';
import { Loader } from 'lucide-react';
import SearchBar from './components/SearchBar';
import LoadingDisplay from './components/LoadingDisplay';
import ChallengeList from './components/ChallengeList';
import QuestStatistics from './components/QuestStatistics';
import { useChallenges } from './hooks/useChallenges';

const ErrorDisplay = React.lazy(() => import('./components/ErrorDisplay'));
const EmptyState = React.lazy(() => import('./components/EmptyState'));

function App() {
  const {
    challenges,
    loading,
    error,
    handleRetry,
    toggleChallengeCompletion,
    searchTerm,
    setSearchTerm,
    filteredChallenges
  } = useChallenges();

  if (loading) {
    return <LoadingDisplay />;
  }

  if (error) {
    return (
      <Suspense fallback={<LoadingDisplay />}>
        <ErrorDisplay message={error} onRetry={handleRetry} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">
            フォートナイトクエスト
          </h1>
        </div>

        <QuestStatistics challenges={challenges} />
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        
        <Suspense 
          fallback={
            <div className="flex justify-center items-center">
              <Loader className="animate-spin h-6 w-6 text-blue-500" />
            </div>
          }
        >
          {filteredChallenges.length > 0 ? (
            <ChallengeList 
              challenges={filteredChallenges}
              onToggleCompletion={toggleChallengeCompletion}
            />
          ) : (
            <EmptyState />
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default App;