import React from 'react';
import { Loader } from 'lucide-react';

const LoadingDisplay: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <Loader className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">クエストを読み込み中...</h2>
        <p className="text-gray-500">しばらくお待ちください</p>
      </div>
    </div>
  );
};

export default LoadingDisplay;