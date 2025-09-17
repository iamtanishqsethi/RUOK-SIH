import React from 'react';
import { Calendar } from '../ui/calendar';
import { Card } from '../ui/card';
import { cn } from '../../lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react'; 

interface CalendarPickerProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  disabledDates?: Date[]; 
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({ selectedDate, onSelectDate, disabledDates }) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 pt-sans-bold text-white">
        {selectedDate ? selectedDate.toLocaleString('en-US', { month: 'long', year: 'numeric' }) : 'Select Date'}
      </h2>
      <div className="p-4 bg-[#1A1A1A] border border-neutral-800 rounded-lg shadow-sm"> 
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSelectDate}
          disabled={(date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date < today;
          }}
          initialFocus
          classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4 w-full",
            caption: "flex justify-center pt-1 relative items-center mb-4",
            caption_label: "text-lg font-bold pt-sans-bold text-white",
            nav: "space-x-1 flex items-center",
            nav_button: cn(
              "h-9 w-9 bg-transparent p-0 opacity-100 hover:bg-neutral-800 rounded-lg text-white",
            ),
            nav_button_previous: "absolute left-2",
            nav_button_next: "absolute right-2",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell:
              "text-neutral-500 rounded-md w-9 font-normal text-sm pt-sans-regular", 
            row: "flex w-full mt-2",
            cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md [&:has([aria-selected])]:bg-transparent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: cn(
              "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-lg",
              "pt-sans-regular text-white hover:bg-neutral-800",
            ),
            day_range_start: "day-range-start",
            day_range_end: "day-range-end",
            day_selected:
              "bg-[#6E3EF2] text-white hover:bg-[#6E3EF2] hover:text-white focus:bg-[#6E3EF2] focus:text-white rounded-lg", // Specific selected style
            day_today: "bg-neutral-700 text-white rounded-lg", 
            day_outside: "text-neutral-600 opacity-70", 
            day_disabled: "text-neutral-700 opacity-50", 
            day_range_middle:
              "aria-selected:bg-neutral-800 aria-selected:text-white", 
            day_hidden: "invisible",
            caption_dropdowns: "flex gap-1",
            dropdown: "flex items-center",
            vhidden: "hidden", 
          }}
          components={{
            Chevron: ({ orientation, ...props }: any) => {
              const className = props.className ?? 'h-5 w-5';
              return orientation === 'left' ? (
                <ChevronLeft className={className} aria-label="Previous month" />
              ) : (
                <ChevronRight className={className} aria-label="Next month" />
              );
            },
          }}
        />
      </div>
    </div>
  );
};

export default CalendarPicker;