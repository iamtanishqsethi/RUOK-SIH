import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const backendUrl = "http://localhost:3000";

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

    const chat = async (messageText: string): Promise<void> => {
        if (!messageText.trim()) return;

        setLoading(true);
        try {
            const response = await fetch(`${backendUrl}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: messageText }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const newMessages = data.messages;

            if (Array.isArray(newMessages)) {
                setMessages((prevMessages) => [...prevMessages, ...newMessages]);
            } else {
                console.error("Invalid response format: messages should be an array");
            }
        } catch (err) {
            console.error("Error fetching chat response:", err);
            // Optionally set an error state or show user notification
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