import axios from 'axios';
import { Challenge, ApiResponse, ApiChallenge } from '../types';
import { getQuestType } from '../utils';

const API_KEY = import.meta.env.VITE_FORTNITE_API_KEY;

const api = axios.create({
  baseURL: 'https://fortniteapi.io/v3/challenges',
  timeout: 10000,
  headers: {
    'Authorization': API_KEY
  }
});

const transformChallenge = (apiChallenge: ApiChallenge, currentChapter: string, currentSeason: string): Challenge => ({
  id: apiChallenge.id || Math.random().toString(36).substr(2, 9),
  name: apiChallenge.name,
  description: apiChallenge.description,
  xp: apiChallenge.xp || 5000,
  questType: getQuestType(apiChallenge.name),
  storyContext: apiChallenge.storyContext,
  chapter: currentChapter,
  season: currentSeason
});

const getMockChallenges = (currentChapter: string, currentSeason: string): Challenge[] => [
  {
    id: '1',
    name: 'バトルロイヤル: 敵プレイヤーの撃破',
    description: 'バトルロイヤルで敵プレイヤーを3人撃破する',
    xp: 10000,
    questType: '週間クエスト',
    storyContext: 'バトルロイヤルでの戦闘スキルを証明しよう',
    chapter: currentChapter,
    season: currentSeason
  },
  {
    id: '2',
    name: 'バトルロイヤル: 宝箱を開ける',
    description: 'バトルロイヤルで宝箱を5個開ける',
    xp: 5000,
    questType: 'デイリークエスト',
    chapter: currentChapter,
    season: currentSeason
  },
  {
    id: '3',
    name: 'バトルロイヤル: 武器の収集',
    description: 'レア以上のレアリティの武器を3個集める',
    xp: 7000,
    questType: 'デイリークエスト',
    chapter: currentChapter,
    season: currentSeason
  },
  {
    id: '4',
    name: 'バトルロイヤル: 距離のある撃破',
    description: '50m以上離れた場所から敵プレイヤーを撃破する',
    xp: 15000,
    questType: '週間クエスト',
    storyContext: '狙撃の腕前を見せつけよう',
    chapter: currentChapter,
    season: currentSeason
  }
];

export const fetchChallenges = async (): Promise<Challenge[]> => {
  if (!API_KEY) {
    throw new Error('APIキーが設定されていません。.envファイルを確認してください。');
  }

  try {
    const response = await api.get<ApiResponse>('', {
      params: { 
        lang: 'ja',
        season: 'current'
      }
    });

    if (!response.data || !response.data.challenges) {
      console.warn('APIからクエストデータを取得できませんでした。モックデータを使用します。');
      return getMockChallenges("5", "1");
    }

    // APIレスポンスからチャプターとシーズン情報を取得
    const currentChapter = response.data.chapter?.toString() || "5";
    const currentSeason = response.data.season?.toString() || "1";

    const challenges = response.data.challenges
      .filter(quest => quest.name && quest.description)
      .map(quest => transformChallenge(quest, currentChapter, currentSeason));

    if (challenges.length === 0) {
      console.warn('有効なクエストデータが見つかりませんでした。モックデータを使用します。');
      return getMockChallenges(currentChapter, currentSeason);
    }

    return challenges;

  } catch (error) {
    console.error('API Error:', error);
    
    if (axios.isAxiosError(error)) {
      const errorMessage = (() => {
        if (error.code === 'ECONNABORTED') {
          return 'APIリクエストがタイムアウトしました。ネットワーク接続を確認してください。';
        }
        
        if (!error.response) {
          return 'APIサーバーに接続できません。インターネット接続を確認してください。';
        }
        
        switch (error.response.status) {
          case 401:
            return 'APIキーが無効です。正しいAPIキーを設定してください。';
          case 403:
            return 'APIへのアクセスが拒否されました。APIキーの権限を確認してください。';
          case 404:
            return 'クエストデータが見つかりません。シーズンが変更された可能性があります。';
          case 429:
            return 'APIリクエスト制限に達しました。しばらく待ってから再試行してください。';
          case 500:
            return 'APIサーバーでエラーが発生しました。しばらく待ってから再試行してください。';
          default:
            return `APIエラー (${error.response.status}): ${error.response.data?.message || '不明なエラー'}`;
        }
      })();

      throw new Error(errorMessage);
    }
    
    throw new Error('予期せぬエラーが発生しました。詳細はコンソールを確認してください。');
  }
};