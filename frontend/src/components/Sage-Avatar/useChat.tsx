import {createContext, useContext, useEffect, useState, type ReactNode, useRef} from "react";
import { useGetDayCheckIn } from "@/utils/hooks/useGetDayCheckIn.ts";
import { useSelector } from "react-redux";
import type {Feedback, User} from "@/utils/types.ts";
import {BASE_URL} from "@/utils/constants.ts";
import axios from "axios";
import {toast} from "sonner";



interface Message {
    id: string;
    text: string;
    audio: string;
    animation: string;
    facialExpression: string;
    lipsync: {
        mouthCues: Array<{
            start: number;
            end: number;
            value: string;
        }>;
    };

}

interface ChatContextType {
    chat: (messageText: string) => Promise<void>;
    message: Message | null;
    onMessagePlayed: () => void;
    loading: boolean;
    cameraZoomed: boolean;
    setCameraZoomed: (zoomed: boolean) => void;
    isGuest: boolean;
    hasCheckin: boolean|undefined;
}

interface ChatProviderProps {
    children: ReactNode;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: ChatProviderProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<Message | null>(null);
    const [loading, setLoading] = useState(false);
    const [cameraZoomed, setCameraZoomed] = useState(true);

    const user = useSelector((state: { user: User | null }) => state.user);
    const isGuest = !!user?.isGuest

    const dayCheckIns = useGetDayCheckIn();
    const feedbacks = useSelector((state: { feedback: Feedback[] | null }) => state.feedback || []);
    const [chatHistory, setChatHistory] = useState<{ from: "user" | "bot"; text: string }[]>([]);

    const hasCheckin = dayCheckIns && dayCheckIns.length > 0;

    const hasInitiated = useRef(false)

    useEffect(() => {
        const initiateChat = async () => {

            if (hasInitiated.current||isGuest || messages.length > 0) {
                return;
            }
            hasInitiated.current = true;
            setLoading(true);
            const hasCheckIn = dayCheckIns && dayCheckIns.length > 0;


            const initialPrompt = hasCheckIn
                ? "INITIAL_GREETING_WITH_CHECKIN"
                : "INITIAL_GREETING_NO_CHECKIN";


            await chat(initialPrompt);
            setLoading(false);
        };

        initiateChat();
    }, [ isGuest,messages,hasCheckin]);

    const chat = async (messageText: string): Promise<void> => {
        if (!messageText.trim()) return;

        setLoading(true);
        const newHistory:{ from: "user" | "bot"; text: string }[] = [...chatHistory, { from: "user", text: messageText }];
        setChatHistory(newHistory);
        try {
            const response = await axios.post(`${BASE_URL}/chat`,
              {
                    message: messageText,
                    dayCheckIns,
                    feedbacks,
                    chatHistory: newHistory,
                },
                {withCredentials: true}
            );

            const newMessages = response?.data?.messages;

            if (Array.isArray(newMessages)) {
                setMessages((prevMessages) => [...prevMessages, ...newMessages])
                const botMessage = newMessages[0]?.text || "";
                setChatHistory(prev => [...prev, { from: "bot", text: botMessage }]);
            } else {
                console.error("Invalid response format: messages should be an array");
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.log(err)
                toast.error(err.response?.data.message|| err.message)
            } else {
                toast.error("Internal server error");
            }
        } finally {
            setLoading(false);
        }
    };

    const onMessagePlayed = () => {
        setMessages((prevMessages) => prevMessages.slice(1));
    };

    useEffect(() => {
        if (messages.length > 0) {
            setMessage(messages[0]);
        } else {
            setMessage(null);
        }
    }, [messages]);

    return (
        <ChatContext.Provider
            value={{
                chat,
                message,
                onMessagePlayed,
                loading,
                cameraZoomed,
                setCameraZoomed,
                isGuest,
                hasCheckin
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = (): ChatContextType => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};