import React from 'react';
import { Card } from '../ui/card'; // We'll style the card div directly
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '../../lib/utils';

interface Therapist {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  specialization?: string;
}

interface TherapistCardProps {
  therapist: Therapist;
  isSelected: boolean;
  onSelect: (therapistId: string) => void;
}

const TherapistCard: React.FC<TherapistCardProps> = ({ therapist, isSelected, onSelect }) => {
  return (
    <div
      className={cn(
        "flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-all duration-200",
        "bg-[#1A1A1A] text-white border border-transparent", // Dark background for card
        isSelected
          ? "border-[#6E3EF2] bg-[#6E3EF2]/20" // Specific border color and subtle background for selected
          : "hover:bg-neutral-800" // Hover effect
      )}
      onClick={() => onSelect(therapist._id)}
    >
      <Avatar className="h-12 w-12 border border-neutral-700"> {/* Subtle border for avatar */}
        <AvatarImage src={therapist.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${therapist.name}`} alt={therapist.name} />
        <AvatarFallback className="bg-[#6E3EF2] text-white pt-sans-bold">{therapist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="text-lg font-semibold pt-sans-bold">{therapist.name}</h3>
        <p className="text-neutral-400 text-sm pt-sans-regular">{therapist.email}</p>
        {therapist.specialization && (
          <p className="text-neutral-500 text-xs pt-sans-regular-italic">{therapist.specialization}</p>
        )}
      </div>
    </div>
  );
};

export default TherapistCard;