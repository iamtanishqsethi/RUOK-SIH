import React from 'react';
import TherapistCard from './TherapistCard';
import { ScrollArea } from '../ui/scroll-area';
import type { ITherapist } from '../../utils/types';

interface TherapistSelectorProps {
  therapists: ITherapist[];
  selectedTherapistId: string | null;
  onSelectTherapist: (therapistId: string) => void;
  isLoading: boolean;
}

const TherapistSelector: React.FC<TherapistSelectorProps> = ({
  therapists,
  selectedTherapistId,
  onSelectTherapist,
  isLoading,
}) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 pt-sans-bold text-white">Therapist</h2>
      <ScrollArea className="h-[400px] pr-4">
        {isLoading ? (
          <div className="text-center text-neutral-500 pt-sans-regular">Loading therapists...</div>
        ) : therapists.length === 0 ? (
          <div className="text-center text-neutral-500 pt-sans-regular">No therapists available.</div>
        ) : (
          <div className="space-y-4">
            {therapists.map((t) => {
              const normalized = {
                ...t,
                avatar: t.avatar ?? undefined,
                photoUrl: t.photoUrl ?? undefined,
                specialization: t.specialization ?? undefined,
                bio: t.bio ?? undefined,
              };
              return (
                <TherapistCard
                  key={t._id}
                  therapist={normalized}
                  isSelected={selectedTherapistId === t._id}
                  onSelect={onSelectTherapist}
                />
              );
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default TherapistSelector;