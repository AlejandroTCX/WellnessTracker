import React from 'react';

interface MenuItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}


const MenuItem: React.FC<MenuItemProps> = ({ href, icon, label }) => {
  return (
    <a href={href} className="flex items-center space-x-3 rounded-lg px-3 py-2 text-white hover:bg-white/10">
      {icon}
      <span>{label}</span>
    </a>
  );
};

export default MenuItem;
