import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  Code, Activity, Dumbbell, Coffee, Gamepad, Music, Book, Camera, Palette, Beer, Bike, Rocket, Utensils, Film, ShoppingCart, HeartPulse, Globe, Moon, Smile 
} from 'lucide-react';

const ACTIVITIES = [
  { id: 'developer', icon: Code, label: 'Developer' },
  { id: 'runner', icon: Activity, label: 'Runner' },
  { id: 'gym', icon: Dumbbell, label: 'Gym' },
  { id: 'coffee', icon: Coffee, label: 'Coffee Lover' },
  { id: 'gaming', icon: Gamepad, label: 'Gaming' },
  { id: 'music', icon: Music, label: 'Music Lover' },
  { id: 'reading', icon: Book, label: 'Reading' },
  { id: 'photography', icon: Camera, label: 'Photography' },

  { id: 'art', icon: Palette, label: 'Art & Design' },
  { id: 'beer', icon: Beer, label: 'Beer Enthusiast' },

  { id: 'mtb', icon: Bike, label: 'Mountain Biking' },
  { id: 'padel', icon: Rocket, label: 'Padel' },
  { id: 'cooking', icon: Utensils, label: 'Cooking' },
  { id: 'movies', icon: Film, label: 'Movies' },
  { id: 'shopping', icon: ShoppingCart, label: 'Shopping' },
  { id: 'fitness', icon: HeartPulse, label: 'Fitness' },
  { id: 'adventure', icon: Globe, label: 'Adventure' },
  { id: 'nightlife', icon: Moon, label: 'Nightlife' },
  { id: 'socializing', icon: Smile, label: 'Socializing' }
];
function ProfileSetup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    age: 25,
    height: 173,
    weight: 78,
    profession: 'Developer',
    activities: ['developer', 'runner', 'gym', 'coffee', 'gaming'],
  });

  const handleActivityToggle = (activityId: string) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.includes(activityId)
        ? prev.activities.filter((id) => id !== activityId)
        : [...prev.activities, activityId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          age: formData.age,
          height: formData.height,
          weight: formData.weight,
          profession: formData.profession,
          activities: formData.activities,
        });

      if (profileError) throw profileError;
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#34568B] px-4">
      <div className="max-w-2xl w-full space-y-8 bg-white/10 p-8 rounded-xl backdrop-blur-sm">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Complete Your Profile</h2>
          <p className="mt-2 text-gray-300">
            Tell us about yourself to personalize your experience
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="age" className="text-sm font-medium text-gray-300">
                Age
              </label>
              <input
                type="number"
                id="age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white"
              />
            </div>

            <div>
              <label htmlFor="height" className="text-sm font-medium text-gray-300">
                Height (cm)
              </label>
              <input
                type="number"
                id="height"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white"
              />
            </div>

            <div>
              <label htmlFor="weight" className="text-sm font-medium text-gray-300">
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white"
              />
            </div>

            <div>
              <label htmlFor="profession" className="text-sm font-medium text-gray-300">
                Profession
              </label>
              <input
                type="text"
                id="profession"
                value={formData.profession}
                onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                className="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300">Activities</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {ACTIVITIES.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleActivityToggle(id)}
                  className={`flex items-center space-x-2 rounded-full px-4 py-2 text-sm transition-colors ${
                    formData.activities.includes(id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Complete Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileSetup;