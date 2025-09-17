import React from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface TimeSlotPickerProps {
  availableTimeSlots: string[];
  selectedTimeSlot: string | null;
  onSelectTimeSlot: (time: string) => void;
  isLoading: boolean;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  availableTimeSlots,
  selectedTimeSlot,
  onSelectTimeSlot,
  isLoading,
}) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 pt-sans-bold text-white">Time</h2>
      <div className="p-4 bg-[#1A1A1A] border border-neutral-800 rounded-lg shadow-sm"> {/* Replaced Card with div */}
        <ScrollArea className="h-[400px]">
          {isLoading ? (
            <div className="text-center text-neutral-500 py-4 pt-sans-regular">Loading slots...</div>
          ) : availableTimeSlots.length === 0 ? (
            <div className="text-center text-neutral-500 py-4 pt-sans-regular">No available slots for this date.</div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {availableTimeSlots.map((time) => (
                <Button
                  key={time}
                  // We'll use a custom class for styling instead of Shadcn variants directly
                  className={cn(
                    "w-full h-10 px-4 py-2 text-base rounded-md transition-colors duration-200 pt-sans-regular",
                    "bg-[#333333] text-white hover:bg-[#444444]", // Default state
                    selectedTimeSlot === time
                      ? "bg-[#6E3EF2] text-white hover:bg-[#6E3EF2]/90" // Selected state
                      : ""
                  )}
                  onClick={() => onSelectTimeSlot(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default TimeSlotPicker;