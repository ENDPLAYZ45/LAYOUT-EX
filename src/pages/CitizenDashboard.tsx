import React, { useState, useEffect } from 'react';
import { MapPin, MessageSquare, TrendingUp, Award, Plus } from 'lucide-react';
import BinMap from '../components/Maps/BinMap';
import FeedbackForm from '../components/Feedback/FeedbackForm';
import StatCard from '../components/Charts/StatCard';
import { Bin, Feedback } from '../types';
import { useAuth } from '../contexts/AuthContext';

const CitizenDashboard: React.FC = () => {
  const { user } = useAuth();
  const [bins, setBins] = useState<Bin[]>([]);
  const [selectedBin, setSelectedBin] = useState<Bin | null>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [recentFeedback, setRecentFeedback] = useState<Feedback[]>([]);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockBins: Bin[] = [
      {
        id: '1',
        binId: 'BIN001',
        location: { lat: 40.7128, lng: -74.0060, address: '123 Main St, New York, NY' },
        fillLevel: 85,
        lastEmptied: new Date('2024-01-15'),
        zone: 'Zone A',
        status: 'normal',
        capacity: 100
      },
      {
        id: '2',
        binId: 'BIN002',
        location: { lat: 40.7580, lng: -73.9855, address: '456 Park Ave, New York, NY' },
        fillLevel: 95,
        lastEmptied: new Date('2024-01-14'),
        zone: 'Zone A',
        status: 'full',
        capacity: 100
      },
      {
        id: '3',
        binId: 'BIN003',
        location: { lat: 40.7505, lng: -73.9934, address: '789 Broadway, New York, NY' },
        fillLevel: 45,
        lastEmptied: new Date('2024-01-16'),
        zone: 'Zone B',
        status: 'normal',
        capacity: 100
      },
      {
        id: '4',
        binId: 'BIN004',
        location: { lat: 40.7282, lng: -73.7949, address: '321 Queens Blvd, Queens, NY' },
        fillLevel: 78,
        lastEmptied: new Date('2024-01-13'),
        zone: 'Zone B',
        status: 'maintenance',
        capacity: 100
      }
    ];
    setBins(mockBins);
  }, []);

  const handleBinSelect = (bin: Bin) => {
    setSelectedBin(bin);
    setShowFeedbackForm(true);
  };

  const handleFeedbackSubmit = (feedback: { binId: string; rating: number; comment: string }) => {
    // In real app, submit to backend
    console.log('Feedback submitted:', feedback);
    
    // Add to recent feedback
    const newFeedback: Feedback = {
      id: Date.now().toString(),
      userId: user?.id || '',
      binId: feedback.binId,
      rating: feedback.rating,
      comment: feedback.comment,
      timestamp: new Date(),
      status: 'pending'
    };
    
    setRecentFeedback(prev => [newFeedback, ...prev.slice(0, 4)]);
    setShowFeedbackForm(false);
    setSelectedBin(null);
  };

  const stats = [
    { title: 'Your Points', value: user?.points || 0, icon: Award, color: 'bg-gradient-to-r from-yellow-500 to-orange-500' },
    { title: 'Feedback Given', value: recentFeedback.length, icon: MessageSquare, color: 'bg-gradient-to-r from-blue-500 to-purple-500' },
    { title: 'Zone Rank', value: '#3', icon: TrendingUp, color: 'bg-gradient-to-r from-green-500 to-blue-500' },
    { title: 'Nearby Bins', value: bins.length, icon: MapPin, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Help keep {user?.zone} clean and earn points for your contributions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Nearby Waste Bins</h2>
                <button
                  onClick={() => setShowFeedbackForm(true)}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Give Feedback</span>
                </button>
              </div>
              
              <div className="h-96 rounded-lg overflow-hidden">
                <BinMap 
                  bins={bins} 
                  onBinSelect={handleBinSelect}
                  selectedBin={selectedBin}
                />
              </div>

              {/* Map Legend */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Low Fill (&lt;50%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Medium Fill (50-70%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>High Fill (70-90%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Overflow (&gt;90%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span>Maintenance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Feedback */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Feedback</h3>
              
              {recentFeedback.length > 0 ? (
                <div className="space-y-3">
                  {recentFeedback.map((feedback) => (
                    <div key={feedback._id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Bin {bins.find(b => b._id === feedback.binId)?.binId}</span>
                        <div className="flex text-yellow-400">
                          {Array.from({ length: feedback.rating }).map((_, i) => (
                            <span key={i}>⭐</span>
                          ))}
                        </div>
                      </div>
                      {feedback.comment && (
                        <p className="text-sm text-gray-600">{feedback.comment}</p>
                      )}
                      <span className="text-xs text-gray-500">
                        {feedback.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No feedback given yet. Help improve your neighborhood by providing feedback!
                </p>
              )}
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Achievements</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    🌟
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Feedback Champion</p>
                    <p className="text-sm text-gray-600">Submitted 5+ feedback reports</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    🏆
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Zone Guardian</p>
                    <p className="text-sm text-gray-600">Top contributor in your zone</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackForm
        bin={selectedBin}
        isOpen={showFeedbackForm}
        onClose={() => {
          setShowFeedbackForm(false);
          setSelectedBin(null);
        }}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
};

export default CitizenDashboard;