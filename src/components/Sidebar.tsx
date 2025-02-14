import React from 'react';
import { Activity, Apple, Dumbbell, Target, Menu } from 'lucide-react';
import MenuItem from './Menuitem';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Botón de menú en móviles */}
      <button 
        className="fixed top-4 left-4 z-50 md:hidden bg-[#34568B] p-2 rounded-full text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full bg-[#34568B] p-4 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-3/4 md:w-64 z-50 md:translate-x-0`}
      >
        <div className="space-y-4">
          <MenuItem href="/" icon={<Activity className="h-6 w-6" />} label="Dashboard" />
          <MenuItem href="/diet" icon={<Apple className="h-6 w-6" />} label="Diet Tracking" />
          <MenuItem href="/workout" icon={<Dumbbell className="h-6 w-6" />} label="Workout Routine" />
          <MenuItem href="/goals" icon={<Target className="h-6 w-6" />} label="Goals" />
        </div>
      </div>

      {/* Fondo oscuro al abrir el sidebar */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
