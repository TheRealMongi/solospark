import React from 'react';
import { Instagram, Twitter, Linkedin } from 'lucide-react';

interface PlatformTogglesProps {
  selectedPlatforms: string[];
  onChange: (platforms: string[]) => void;
  disabled?: boolean;
}

// Platform configuration with icons and labels
const platforms = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    color: 'bg-amber-500 hover:bg-amber-600',
    activeColor: 'bg-amber-600',
    inactiveColor: 'bg-slate-200 hover:bg-slate-300 text-slate-500',
  },
  {
    id: 'x',
    name: 'X',
    icon: Twitter,
    color: 'bg-sky-500 hover:bg-sky-600',
    activeColor: 'bg-sky-600',
    inactiveColor: 'bg-slate-200 hover:bg-slate-300 text-slate-500',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'bg-indigo-500 hover:bg-indigo-600',
    activeColor: 'bg-indigo-600',
    inactiveColor: 'bg-slate-200 hover:bg-slate-300 text-slate-500',
  },
];

const PlatformToggles: React.FC<PlatformTogglesProps> = ({
  selectedPlatforms,
  onChange,
  disabled = false,
}) => {
  // Toggle a platform selection
  const togglePlatform = (platformId: string) => {
    if (disabled) return;
    
    if (selectedPlatforms.includes(platformId)) {
      onChange(selectedPlatforms.filter(id => id !== platformId));
    } else {
      onChange([...selectedPlatforms, platformId]);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <label className="text-sm font-medium text-slate-700">
        Select platforms
      </label>
      <div className="flex flex-wrap gap-3">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id);
          const Icon = platform.icon;
          
          return (
            <button
              key={platform.id}
              type="button"
              onClick={() => togglePlatform(platform.id)}
              disabled={disabled}
              className={`
                flex items-center px-4 py-2 rounded-md transition-all duration-200
                ${isSelected ? platform.color : platform.inactiveColor}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              aria-pressed={isSelected}
              aria-label={`Toggle ${platform.name}`}
            >
              <Icon className="w-5 h-5 mr-2" />
              <span className={isSelected ? 'text-white' : ''}>
                {platform.name}
              </span>
            </button>
          );
        })}
      </div>
      {selectedPlatforms.length === 0 && !disabled && (
        <p className="text-sm text-red-500 mt-1">
          Select at least one platform
        </p>
      )}
    </div>
  );
};

export default PlatformToggles;
