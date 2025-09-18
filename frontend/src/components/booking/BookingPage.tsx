import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const mockTherapists = [
  {
    _id: '1',
    name: 'Dr. Manindar Bhatinda',
    email: 'mandoctorhu@gmail.com',
    specialization: 'Clinical Psychology',
  },
  {
    _id: '2',
    name: 'Dr. Ishani',
    email: 'isha2@gmail.com',
    specialization: 'Behavioral Therapy',
  },
  {
    _id: '3',
    name: 'Dr. Gargi Sharma',
    email: 'dr@gmail.com',
    specialization: 'Family Counseling',
  },
];

const generateTimeSlots = (startHour = 9, endHour = 17, intervalMin = 60) => {
  const slots: string[] = [];
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  for (let h = startHour; h < endHour; h += Math.floor(intervalMin / 60)) {
    const hour = h;
    const ampm = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    slots.push(`${pad(displayHour)}:00 ${ampm}`);
  }
  return slots;
};

const mockedBookedSlotsForDate = (therapistId: string, day: number) => {
  if (!therapistId) return [];
  if (therapistId === '1' && day === 6) return ['11:00 am'];
  if (therapistId === '2' && day === 6) return ['02:00 pm'];
  if (therapistId === '3' && day === 6) return ['09:00 am', '03:00 pm'];
  return [];
};

const BookingPage = () => {
  const [therapists, setTherapists] = useState<any[]>([]);
  const [selectedTherapistId, setSelectedTherapistId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number>(6); 
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState(false);

  const timeSlots = generateTimeSlots(9, 18); 

  useEffect(() => {
    setTherapists(mockTherapists);
    setSelectedTherapistId('1'); 
  }, []);

  const handleSelectTherapist = (therapistId: string) => {
    setSelectedTherapistId(therapistId);
    setSelectedTime(null); 
  };

  const handleSelectTime = (time: string) => {
    const booked = mockedBookedSlotsForDate(selectedTherapistId ?? '', selectedDate);
    if (booked.includes(time)) return;
    setSelectedTime(time === selectedTime ? null : time);
  };

  const handleBookAppointment = () => {
    if (!selectedTherapistId || !selectedTime) {
      alert('Please select both a therapist and a time slot');
      return;
    }
    const selectedTherapist = therapists.find(t => t._id === selectedTherapistId);
    alert(`Booking appointment with ${selectedTherapist?.name} on September ${selectedDate} at ${selectedTime}`);
    setSelectedTime(null);
    setSelectedTherapistId(null);
  };

  const handleDiscard = () => {
    setSelectedTherapistId(null);
    setSelectedTime(null);
  };

  const renderCalendar = () => {
    const days: React.ReactNode[] = [];
    const daysInMonth = 30;

    days.push(
      <div key="prev-31" className="text-neutral-500 p-2 text-center text-sm">31</div>
    );

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDate;
      days.push(
        <div
          key={day}
          onClick={() => { setSelectedDate(day); setSelectedTime(null); }}
          className={`p-2 text-center cursor-pointer rounded-md transition-colors text-sm ${
            isSelected
              ? 'bg-white text-black font-medium'
              : 'text-white hover:bg-neutral-700'
          }`}
        >
          {day}
        </div>
      );
    }

    for (let day = 1; day <= 4; day++) {
      days.push(
        <div key={`next-${day}`} className="text-neutral-500 p-2 text-center text-sm">{day}</div>
      );
    }

    return days;
  };

  const bookedSlots = mockedBookedSlotsForDate(selectedTherapistId ?? '', selectedDate);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 max-w-6xl w-full mx-auto">
      <div className="">
        <h1 className="text-4xl font-bold mb-8 text-center font-mynabali-serif">Book a therapist</h1>

        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-6">
            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-neutral-800">
              <h2 className="text-xl font-semibold mb-4 text-white">Therapist</h2>
              <div className="space-y-3">
                {therapists.map((therapist) => (
                  <div
                    key={therapist._id}
                    onClick={() => handleSelectTherapist(therapist._id)}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedTherapistId === therapist._id
                        ? 'bg-[#8B5CF6] bg-opacity-20 border border-[#8B5CF6]'
                        : 'hover:bg-neutral-800 border border-transparent'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white font-medium text-sm">
                      {therapist.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-sm">{therapist.name}</h3>
                      <p className="text-xs text-neutral-400">{therapist.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1A1A1A] rounded-2xl p-6 space-y-3 border border-neutral-800">
              <button className="w-full bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg py-3 flex items-center justify-center gap-2 transition-colors">
                <Phone size={16} />
                Call
              </button>
              <button className="w-full bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg py-3 flex items-center justify-center gap-2 transition-colors">
                <MessageSquare size={16} />
                Text
              </button>
              <button className="w-full bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg py-3 flex items-center justify-center gap-2 transition-colors">
                <Calendar size={16} />
                Sessions
              </button>
            </div>
          </div>

          <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-neutral-800 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <button className="p-2 hover:bg-neutral-700 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold text-white">September 2025</h2>
              <button className="p-2 hover:bg-neutral-700 rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-3">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-neutral-400 text-center py-2 text-sm font-medium">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {renderCalendar()}
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleDiscard}
                className="px-8 py-2.5 bg-neutral-600 hover:bg-neutral-500 text-white rounded-full transition-colors"
              >
                Discard
              </button>
              <button
                onClick={handleBookAppointment}
                className="px-8 py-2.5 bg-white hover:bg-gray-100 text-black rounded-full font-medium transition-colors"
              >
                Book
              </button>
            </div>
          </div>

          <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-neutral-800">
            <h2 className="text-xl font-semibold mb-4 text-white">Time</h2>
            <div className="space-y-2 max-h-[60vh] overflow-auto">
              {timeSlots.map((time) => {
                const isBooked = bookedSlots.includes(time);
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    onClick={() => handleSelectTime(time)}
                    disabled={isBooked}
                    className={`w-full p-3 rounded-lg cursor-pointer transition-colors text-center font-medium ${
                      isBooked
                        ? 'bg-neutral-800 text-neutral-400 cursor-not-allowed line-through'
                        : isSelected
                          ? 'bg-[#8B5CF6] text-white'
                          : 'bg-neutral-700 text-white hover:bg-neutral-600'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
