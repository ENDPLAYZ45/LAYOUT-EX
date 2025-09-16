import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Recycle, TrendingUp, ArrowRight, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import StatCard from '../components/Charts/StatCard';

const Home: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Active Bins', value: '1,247', icon: Recycle, trend: { value: 5.2, isPositive: true } },
    { title: 'Active Citizens', value: '3,429', icon: Users, trend: { value: 12.1, isPositive: true } },
    { title: 'Zones Covered', value: '12', icon: MapPin, trend: { value: 0, isPositive: true } },
    { title: 'Efficiency Score', value: '94%', icon: TrendingUp, trend: { value: 3.4, isPositive: true } },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Smart Waste Management
              </span>
              <br />
              <span className="text-gray-900">for Cleaner Cities</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of citizens in making our cities cleaner and smarter through data-driven 
              waste management and community engagement.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user ? (
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <Link
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}
              <Link
                to="/leaderboard"
                className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-all duration-200"
              >
                View Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How EcoWaste Makes a Difference
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform combines smart technology with community engagement to create cleaner, 
            more efficient waste management systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl bg-white shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Bin Tracking</h3>
            <p className="text-gray-600">
              Real-time monitoring of bin fill levels and locations for optimized collection routes 
              and reduced operational costs.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-white shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Engagement</h3>
            <p className="text-gray-600">
              Gamified system that rewards citizens for reporting issues and maintaining clean 
              neighborhoods through points and leaderboards.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-white shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Analytics</h3>
            <p className="text-gray-600">
              Advanced analytics and machine learning algorithms provide insights for better 
              decision making and predictive maintenance.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Make Your City Cleaner?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join our community of environmental champions and start making a difference today.
          </p>
          {!user && (
            <Link
              to="/login"
              className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 shadow-lg"
            >
              <Star className="w-5 h-5" />
              <span>Join EcoWaste</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;