import React from 'react';
import { User, Activity } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="border-b border-white/10 bg-[#34568B]/95 backdrop-blur supports-[backdrop-filter]:bg-[#34568B]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Activity className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">WellnessTracker</span>
            </div>
          </div>
          <div className="flex items-center">
            <button className="rounded-full bg-white/10 p-2 hover:bg-white/20">
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
