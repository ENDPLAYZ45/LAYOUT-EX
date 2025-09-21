import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, TrendingUp, Users, MapPin } from 'lucide-react';
import { LeaderboardEntry } from '../types';

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockLeaderboard: LeaderboardEntry[] = [
      {
        id: '1',
        zone: 'Zone A - Manhattan Central',
        cleanlinessScore: 94,
        lastUpdated: new Date(),
        badge: '🏆',
        rank: 1
      },
      {
        id: '2',
        zone: 'Zone B - Brooklyn Heights',
        cleanlinessScore: 91,
        lastUpdated: new Date(),
        badge: '🥈',
        rank: 2
      },
      {
        id: '3',
        zone: 'Zone C - Queens Park',
        cleanlinessScore: 88,
        lastUpdated: new Date(),
        badge: '🥉',
        rank: 3
      },
      {
        id: '4',
        zone: 'Zone D - Bronx River',
        cleanlinessScore: 85,
        lastUpdated: new Date(),
        badge: '⭐',
        rank: 4
      },
      {
        id: '5',
        zone: 'Zone E - Staten Island',
        cleanlinessScore: 82,
        lastUpdated: new Date(),
        badge: '⭐',
        rank: 5
      },
      {
        id: '6',
        zone: 'Zone F - Upper West Side',
        cleanlinessScore: 79,
        lastUpdated: new Date(),
        badge: '⭐',
        rank: 6
      },
      {
        id: '7',
        zone: 'Zone G - Financial District',
        cleanlinessScore: 76,
        lastUpdated: new Date(),
        badge: '⭐',
        rank: 7
      },
      {
        id: '8',
        zone: 'Zone H - Williamsburg',
        cleanlinessScore: 73,
        lastUpdated: new Date(),
        badge: '⭐',
        rank: 8
      }
    ];
    
    setLeaderboard(mockLeaderboard);
  }, [selectedPeriod]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <TrendingUp className="w-6 h-6 text-blue-500" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const getProgressBarColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-yellow-500';
    if (score >= 70) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🏆 Zone Cleanliness Leaderboard
          </h1>
          <p className="text-gray-600">
            See how your zone ranks in maintaining a clean and sustainable environment
          </p>
        </div>

        {/* Period Selection */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md border border-gray-200">
            {['week', 'month', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-md font-medium capitalize transition-colors ${
                  selectedPeriod === period
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                This {period}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {leaderboard.slice(0, 3).map((entry, index) => (
            <div
              key={entry.id}
              className={`relative bg-white rounded-xl shadow-lg p-6 text-center border-2 ${
                index === 0 ? 'border-yellow-300 transform scale-105' :
                index === 1 ? 'border-gray-300' :
                'border-amber-300'
              }`}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-400' :
                  'bg-amber-600'
                }`}>
                  {entry.rank}
                </div>
              </div>
              
              <div className="mt-4">
                <div className="text-4xl mb-2">{entry.badge}</div>
                <h3 className="font-bold text-gray-900 mb-2">{entry.zone}</h3>
                <div className={`text-3xl font-bold mb-2 ${getScoreColor(entry.cleanlinessScore)}`}>
                  {entry.cleanlinessScore}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getProgressBarColor(entry.cleanlinessScore)}`}
                    style={{ width: `${entry.cleanlinessScore}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Leaderboard */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-green-600 to-blue-600">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Complete Rankings
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {leaderboard.map((entry) => (
              <div
                key={entry.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(entry.rank)}
                      <span className="text-lg font-bold text-gray-600">
                        #{entry.rank}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {entry.zone}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Updated {entry.lastUpdated.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(entry.cleanlinessScore)}`}>
                        {entry.cleanlinessScore}%
                      </div>
                      <div className="text-sm text-gray-500">Cleanliness Score</div>
                    </div>
                    
                    <div className="w-24">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(entry.cleanlinessScore)}`}
                          style={{ width: `${entry.cleanlinessScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            How Cleanliness Scores Work
          </h3>
          <div className="text-blue-800 space-y-2">
            <p>• Scores are calculated based on bin fill levels, citizen feedback, and collection efficiency</p>
            <p>• Regular feedback submissions help improve your zone's ranking</p>
            <p>• Zones with fewer overflowing bins and better maintenance score higher</p>
            <p>• Rankings update daily based on real-time data and community engagement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;