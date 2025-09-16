import React, { useState } from 'react';
import { Star, Send, X } from 'lucide-react';
import { Bin } from '../../types';

interface FeedbackFormProps {
  bin: Bin | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: { binId: string; rating: number; comment: string }) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ bin, isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bin && rating > 0) {
      onSubmit({
        binId: bin._id,
        rating,
        comment,
      });
      setRating(0);
      setComment('');
      onClose();
    }
  };

  if (!isOpen || !bin) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Feedback for Bin {bin.binId}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Location: {bin.location.address}</p>
            <p className="text-sm text-gray-600">Current Fill Level: {bin.fillLevel}%</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rate the cleanliness and condition
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Additional Comments (Optional)
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              placeholder="Share your thoughts about this bin's condition, surrounding area cleanliness, or any issues..."
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={rating === 0}
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Feedback</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;