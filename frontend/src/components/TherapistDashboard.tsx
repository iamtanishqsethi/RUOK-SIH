import { useSelector } from "react-redux";
import type { User, Message, Patient, ChatState } from "@/utils/types.ts";
import { BentoGrid } from "../components/magicui/bento-grid";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  Video, 
  FileText, 
  MessageCircle,
  X,
  Send,
  Smile,
  Paperclip
} from "lucide-react";
import WeeklyWeb from "@/components/Dashboard/WeeklyWeb";
import WeeklyBox from "@/components/Dashboard/WeeklyBox";

const mockChatData: { [key: string]: Message[] } = {
  "riya123@gmail.com": [
    { id: 1, sender: 'patient', text: "Hi, I've been feeling anxious about my upcoming presentation.", timestamp: new Date(Date.now() - 1000 * 60 * 30), status: 'read' },
    { id: 2, sender: 'therapist', text: "I understand. Let's work through some breathing exercises to help with your anxiety.", timestamp: new Date(Date.now() - 1000 * 60 * 25), status: 'read' },
    { id: 3, sender: 'patient', text: "That would be great, thank you!", timestamp: new Date(Date.now() - 1000 * 60 * 20), status: 'delivered' }
  ],
  "johndoe@gmail.com": [
    { id: 1, sender: 'patient', text: "Hello doctor, I wanted to discuss my sleep patterns.", timestamp: new Date(Date.now() - 1000 * 60 * 45), status: 'read' },
    { id: 2, sender: 'therapist', text: "Of course! Can you tell me more about what's been happening with your sleep?", timestamp: new Date(Date.now() - 1000 * 60 * 40), status: 'read' }
  ],
  "prabh03@gmail.com": [
    { id: 1, sender: 'therapist', text: "How are you feeling after our last session?", timestamp: new Date(Date.now() - 1000 * 60 * 60), status: 'read' },
    { id: 2, sender: 'patient', text: "Much better! The techniques you taught me are really helping.", timestamp: new Date(Date.now() - 1000 * 60 * 55), status: 'read' }
  ],
  "reshi@gmail.com": [
    { id: 1, sender: 'patient', text: "I've been practicing the mindfulness exercises you suggested.", timestamp: new Date(Date.now() - 1000 * 60 * 35), status: 'read' }
  ],
  "vshar23@gmail.com": [
    { id: 1, sender: 'patient', text: "Can we schedule a follow-up session?", timestamp: new Date(Date.now() - 1000 * 60 * 15), status: 'delivered' }
  ]
};

const mockSchedule = [
  { time: "10:00 am", patient: "Riya", email: "riya123@gmail.com", type: "call" },
  { time: "11:00 am", patient: "Prabhat", email: "prabh03@gmail.com", type: "video" },
  { time: "12:00 pm", patient: null, email: null, type: null },
  { time: "01:00 pm", patient: null, email: null, type: null },
  { time: "02:00 pm", patient: "Rishi", email: "reshi@gmail.com", type: "video" },
  { time: "03:00 pm", patient: "Vinayak", email: "vshar23@gmail.com", type: "video" },
];

const mockChatPatients: Patient[] = [
  { name: "Riya", email: "riya123@gmail.com" },
  { name: "Anon", email: "johndoe@gmail.com" },
  { name: "Prabhat", email: "prabh03@gmail.com" },
  { name: "Rishi", email: "reshi@gmail.com" },
  { name: "Vinayak", email: "vshar23@gmail.com" },
];

const mockSessionData = {
  patientName: "Hena",
  email: "hen4u@gmail.com",
  institution: "Maharaja Agrasen Inst.",
  sessionDate: "15 september 2025",
  sessionTime: "9:00 am",
  sessionMode: "Call"
};

const PatientChat: React.FC<{ isOpen: boolean; onClose: () => void; patient: Patient | null }> = ({ isOpen, onClose, patient }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && patient) {
      setMessages(mockChatData[patient.email] || []);
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, patient]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && patient) {
      const message: Message = {
        id: messages.length + 1,
        sender: 'therapist',
        text: newMessage,
        timestamp: new Date(),
        status: 'sent'
      };
      const updatedMessages = [...messages, message];
      setMessages(updatedMessages);
      mockChatData[patient.email] = updatedMessages;
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!patient) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Card className="w-80 h-96 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] flex flex-col overflow-hidden">
            
            <div className="flex items-center justify-between p-3 border-b border-border bg-background">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-medium">
                  {patient.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium text-sm">{patient.name}</h3>
                  <p className="text-xs text-muted-foreground">online</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                  <Phone className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                  <Video className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose} className="p-1 h-6 w-6">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-background">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground text-sm py-8">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Start a conversation with {patient.name}</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'therapist' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[75%]`}>
                      <div
                        className={`px-3 py-2 rounded-lg text-sm ${
                          message.sender === 'therapist'
                            ? 'bg-primary text-primary-foreground rounded-br-sm'
                            : 'bg-muted text-foreground rounded-bl-sm'
                        }`}
                      >
                        {message.text}
                      </div>
                      <div className={`text-xs text-muted-foreground mt-1 ${
                        message.sender === 'therapist' ? 'text-right' : 'text-left'
                      }`}>
                        {formatTime(message.timestamp)}
                        {message.sender === 'therapist' && (
                          <span className="ml-1">
                            {message.status === 'read' && '✓✓'}
                            {message.status === 'delivered' && '✓'}
                            {message.status === 'sent' && '→'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-border bg-background">
              <div className="flex items-end gap-2">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Message ${patient.name}...`}
                    className="w-full p-2 pr-16 border border-border rounded-lg bg-background text-foreground text-sm resize-none min-h-[36px] max-h-20 focus:outline-none focus:ring-1 focus:ring-ring"
                    rows={1}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="p-1 h-5 w-5">
                      <Smile className="h-3 w-3 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1 h-5 w-5">
                      <Paperclip className="h-3 w-3 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="sm"
                  className="px-2 py-2 h-9"
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TherapistDashboard = () => {
  const user = useSelector((store: { user: null | User }) => store.user);
  const [chatState, setChatState] = useState<ChatState>({ isOpen: false, patient: null });

  const openChat = (patient: Patient) => {
    setChatState({ isOpen: true, patient });
  };

  const closeChat = () => {
    setChatState({ isOpen: false, patient: null });
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col min-h-screen w-full p-4 sm:p-6 lg:p-8 overflow-y-auto"
      >
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold p-4 sm:p-6 font-mynabali-serif">
          Therapist Dashboard : {user?.firstName || "Name of the therapist"}
        </h1>
        
        <BentoGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 lg:grid-rows-12 p-4 sm:p-6 font-secondary gap-4">
          <ScheduleCalendarBox openChat={openChat} />
          <ChatBox openChat={openChat} />
          <SessionDetailsBox />
          <WeeklyWeb />
          <WeeklyBox />
          <ActivityTagsBox />
          <PlaceTagsBox />
          <PeopleTagsBox />
        </BentoGrid>

        <PatientChat
          isOpen={chatState.isOpen}
          onClose={closeChat}
          patient={chatState.patient}
        />
      </motion.div>
    </AnimatePresence>
  );
};

const ScheduleCalendarBox: React.FC<{ openChat: (patient: Patient) => void }> = ({ openChat }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  return (
    <div className="group relative h-full flex flex-col overflow-hidden rounded-xl col-span-1 sm:col-span-2 lg:col-start-1 lg:col-end-5 lg:row-start-1 lg:row-end-7 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="font-semibold">
            {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h2>
          <Button variant="ghost" size="sm" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-1">
          <div className="flex-1 p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="bg-transparent p-0"
            />
            <Button className="mt-4 w-full bg-muted text-muted-foreground hover:bg-muted/80">
              Block further bookings on this day
            </Button>
          </div>

          <div className="flex-1 border-l border-border">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-lg">Schedule</h3>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[300px]">
              {mockSchedule.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border-b border-border/50 last:border-b-0">
                  <span className="font-medium text-sm">{appointment.time}</span>
                  {appointment.patient ? (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        {appointment.type === "call" && <Phone className="h-4 w-4" />}
                        {appointment.type === "video" && <Video className="h-4 w-4" />}
                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm">
                          {appointment.patient.charAt(0)}
                        </div>
                        <div className="text-xs">
                          <div className="font-medium">{appointment.patient}</div>
                          <div className="text-muted-foreground">{appointment.email}</div>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-1"
                        onClick={() => openChat({ name: appointment.patient!, email: appointment.email! })}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="w-16 h-8 bg-muted rounded"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};

const ChatBox: React.FC<{ openChat: (patient: Patient) => void }> = ({ openChat }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl col-span-1 sm:col-span-2 lg:col-start-5 lg:col-end-9 lg:row-start-1 lg:row-end-7 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-lg">Chat with</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        {mockChatPatients.map((patient, index) => (
          <div key={index} className="flex items-center gap-3 p-3 border-b border-border/50 last:border-b-0 hover:bg-muted/50 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">
              {patient.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">{patient.name}</div>
              <div className="text-xs text-muted-foreground">{patient.email}</div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1"
              onClick={() => openChat(patient)}
            >
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

const SessionDetailsBox = () => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl col-span-1 sm:col-span-2 lg:col-start-1 lg:col-end-4 lg:row-start-7 lg:row-end-10 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
      <Card className="bg-transparent border-0 h-full">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl font-medium">
              {mockSessionData.patientName.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm">{mockSessionData.patientName}</h3>
              <p className="text-xs text-muted-foreground">{mockSessionData.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5" />
            <span className="font-medium">{mockSessionData.institution}</span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Session Date</span>
              <span>: {mockSessionData.sessionDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Session Timing</span>
              <span>: {mockSessionData.sessionTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Session mode</span>
              <span>: {mockSessionData.sessionMode}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ActivityTagsBox = () => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl col-span-1 lg:col-start-1 lg:col-end-4 lg:row-start-10 lg:row-end-13 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">Activity Tags</h3>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <FileText className="h-16 w-16 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No activity tags</p>
        </div>
      </div>
    </div>
  );
};

const PlaceTagsBox = () => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl col-span-1 lg:col-start-4 lg:col-end-7 lg:row-start-10 lg:row-end-13 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">Place Tags</h3>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full h-24 bg-red-500 rounded flex items-center justify-center">
          <span className="text-white text-sm font-medium">hujdo place</span>
        </div>
      </div>
    </div>
  );
};

const PeopleTagsBox = () => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl col-span-1 lg:col-start-7 lg:col-end-10 lg:row-start-10 lg:row-end-13 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">People Tags</h3>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full space-y-2">
          <div className="h-8 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-medium">Blue tag</span>
          </div>
          <div className="h-8 bg-green-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-medium">Green tag</span>
          </div>
          <div className="h-8 bg-yellow-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-medium">sumit</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistDashboard;