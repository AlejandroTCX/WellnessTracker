import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Target, Dumbbell, Coffee, Gamepad, Code } from 'lucide-react';

const data = [
  { name: 'Mon', weight: 78, calories: 2200, workout: 60 },
  { name: 'Tue', weight: 77.8, calories: 2150, workout: 45 },
  { name: 'Wed', weight: 77.5, calories: 2300, workout: 75 },
  { name: 'Thu', weight: 77.3, calories: 2100, workout: 60 },
  { name: 'Fri', weight: 77.1, calories: 2250, workout: 90 },
];

function Dashboard() {
  return (
    <div className="space-y-8 width-full">
      {/* Profile Section */}
      <div className="rounded-lg bg-white/10 p-6 backdrop-blur">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">Personal Profile</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-300">Age</p>
                <p className="text-lg font-semibold">25 years</p>
              </div>
              <div>
                <p className="text-sm text-gray-300">Height</p>
                <p className="text-lg font-semibold">173 cm</p>
              </div>
              <div>
                <p className="text-sm text-gray-300">Weight</p>
                <p className="text-lg font-semibold">78 kg</p>
              </div>
              <div>
                <p className="text-sm text-gray-300">BMI</p>
                <p className="text-lg font-semibold">26.1</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center rounded-full bg-white/20 px-3 py-1">
              <Code className="mr-2 h-4 w-4" />
              <span className="text-sm">Developer</span>
            </div>
            <div className="flex items-center rounded-full bg-white/20 px-3 py-1">
              <Activity className="mr-2 h-4 w-4" />
              <span className="text-sm">Runner</span>
            </div>
            <div className="flex items-center rounded-full bg-white/20 px-3 py-1">
              <Dumbbell className="mr-2 h-4 w-4" />
              <span className="text-sm">Gym</span>
            </div>
            <div className="flex items-center rounded-full bg-white/20 px-3 py-1">
              <Coffee className="mr-2 h-4 w-4" />
              <span className="text-sm">Coffee</span>
            </div>
            <div className="flex items-center rounded-full bg-white/20 px-3 py-1">
              <Gamepad className="mr-2 h-4 w-4" />
              <span className="text-sm">Gaming</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weight Tracking */}
        <div className="rounded-lg bg-white/10 p-6">
          <h3 className="mb-4 text-xl font-semibold">Weight Progress</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#34568B', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="weight" stroke="#4FD1C5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Workout Duration */}
        <div className="rounded-lg bg-white/10 p-6">
          <h3 className="mb-4 text-xl font-semibold">Workout Duration (minutes)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#34568B', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="workout" stroke="#F6AD55" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white/10 p-6">
          <div className="flex items-center">
            <Target className="h-10 w-10 text-emerald-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-300">Weekly Goal Progress</p>
              <p className="text-2xl font-bold">75%</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white/10 p-6">
          <div className="flex items-center">
            <Activity className="h-10 w-10 text-blue-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-300">Active Days</p>
              <p className="text-2xl font-bold">5/7</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white/10 p-6">
          <div className="flex items-center">
            <Dumbbell className="h-10 w-10 text-purple-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-300">Workouts This Week</p>
              <p className="text-2xl font-bold">4</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white/10 p-6">
          <div className="flex items-center">
            <Coffee className="h-10 w-10 text-yellow-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-300">Coffee Today</p>
              <p className="text-2xl font-bold">2 cups</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;