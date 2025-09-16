import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Recycle, TrendingUp, MapPin, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import StatCard from '../components/Charts/StatCard';
import { Bin, Feedback } from '../types';

const AdminDashboard: React.FC = () => {
  const [bins, setBins] = useState<Bin[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockBins: Bin[] = [
      {
        _id: '1',
        binId: 'BIN001',
        location: { lat: 40.7128, lng: -74.0060, address: '123 Main St' },
        fillLevel: 85,
        lastEmptied: new Date('2024-01-15'),
        zone: 'Zone A',
        status: 'normal',
        capacity: 100
      },
      {
        _id: '2',
        binId: 'BIN002',
        location: { lat: 40.7580, lng: -73.9855, address: '456 Park Ave' },
        fillLevel: 95,
        lastEmptied: new Date('2024-01-14'),
        zone: 'Zone A',
        status: 'full',
        capacity: 100
      },
      // Add more mock bins...
    ];
    setBins(mockBins);

    const mockFeedback: Feedback[] = [
      {
        _id: '1',
        userId: '1',
        binId: '1',
        rating: 4,
        comment: 'Bin is generally clean but could use more frequent collection',
        timestamp: new Date('2024-01-16'),
        status: 'reviewed'
      },
      {
        _id: '2',
        userId: '2',
        binId: '2',
        rating: 2,
        comment: 'Overflowing and attracting pests',
        timestamp: new Date('2024-01-16'),
        status: 'pending'
      }
    ];
    setFeedback(mockFeedback);
  }, []);

  // Analytics data
  const zoneData = [
    { name: 'Zone A', bins: 45, fillLevel: 78, efficiency: 92 },
    { name: 'Zone B', bins: 38, fillLevel: 65, efficiency: 88 },
    { name: 'Zone C', bins: 52, fillLevel: 82, efficiency: 95 },
    { name: 'Zone D', bins: 31, fillLevel: 70, efficiency: 85 },
  ];

  const weeklyData = [
    { day: 'Mon', collections: 24, feedback: 8 },
    { day: 'Tue', collections: 31, feedback: 12 },
    { day: 'Wed', collections: 28, feedback: 15 },
    { day: 'Thu', collections: 35, feedback: 10 },
    { day: 'Fri', collections: 42, feedback: 18 },
    { day: 'Sat', collections: 38, feedback: 22 },
    { day: 'Sun', collections: 25, feedback: 14 },
  ];

  const statusData = [
    { name: 'Normal', value: 120, color: '#10B981' },
    { name: 'Full', value: 25, color: '#F59E0B' },
    { name: 'Overflow', value: 8, color: '#EF4444' },
    { name: 'Maintenance', value: 13, color: '#6B7280' },
  ];

  const stats = [
    {
      title: 'Total Bins',
      value: bins.length,
      icon: Recycle,
      trend: { value: 5.2, isPositive: true },
      color: 'bg-gradient-to-r from-green-500 to-blue-500'
    },
    {
      title: 'Avg Fill Level',
      value: '73%',
      icon: TrendingUp,
      trend: { value: 2.1, isPositive: false },
      color: 'bg-gradient-to-r from-blue-500 to-purple-500'
    },
    {
      title: 'Active Zones',
      value: '12',
      icon: MapPin,
      trend: { value: 0, isPositive: true },
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      title: 'User Feedback',
      value: feedback.length,
      icon: Users,
      trend: { value: 15.3, isPositive: true },
      color: 'bg-gradient-to-r from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Monitor and manage waste collection operations across all zones
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Zone Performance */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Zone Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={zoneData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="efficiency" fill="#10B981" name="Efficiency %" />
                <Bar dataKey="fillLevel" fill="#3B82F6" name="Avg Fill Level %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Activity */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="collections" stroke="#10B981" strokeWidth={3} name="Collections" />
                <Line type="monotone" dataKey="feedback" stroke="#F59E0B" strokeWidth={3} name="Feedback" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bin Status Distribution */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bin Status Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Bin BIN002 Overflow</p>
                  <p className="text-xs text-gray-600">Zone A • 2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">High Fill Level</p>
                  <p className="text-xs text-gray-600">Zone C • 4 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Collection Completed</p>
                  <p className="text-xs text-gray-600">Zone B • 6 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Feedback */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Feedback</h3>
            <div className="space-y-3">
              {feedback.slice(0, 3).map((item) => (
                <div key={item._id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Bin {bins.find(b => b._id === item.binId)?.binId}</span>
                    <div className="flex text-yellow-400">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <span key={i} className="text-xs">⭐</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{item.comment}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      {item.timestamp.toLocaleDateString()}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;