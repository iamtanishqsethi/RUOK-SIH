import { useRef, type KeyboardEvent } from "react";
import { useChat } from "./useChat";
import {Button} from "@/components/ui/button.tsx";
import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button.tsx";
import { useNavigate } from "react-router-dom";
import {CheckCircle} from "lucide-react";
import {RainbowButton} from "@/components/magicui/rainbow-button.tsx";

interface UIProps {
    hidden?: boolean;
    [key: string]: any;
}

export const UI = ({ hidden = false, ...props }: UIProps) => {
    const input = useRef<HTMLInputElement>(null);
    const { chat, loading, cameraZoomed, setCameraZoomed, message,isGuest,hasCheckin } = useChat();
    const navigate = useNavigate();
    const sendMessage = async () => {
        const text = input?.current?.value;
        if (!text || loading || message) return;

        try {
            await chat(text);
            if (input.current) {
                input.current.value = "";
            }
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const toggleGreenScreen = () => {
        const body = document.querySelector("body");
        if (body) {
            body.classList.toggle("greenScreen");
        }
    };

    if (hidden) {
        return null;
    }

    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none"
            {...props}
        >
            <div className="w-full flex flex-col items-end justify-center gap-4">
                <button
                    onClick={() => setCameraZoomed(!cameraZoomed)}
                    className="pointer-events-auto bg-zinc-800 hover:bg-zinc-900 text-white p-4 rounded-md transition-colors duration-200"
                    aria-label={cameraZoomed ? "Zoom out camera" : "Zoom in camera"}
                >
                    {cameraZoomed ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                            />
                        </svg>
                    )}
                </button>

                <button
                    onClick={toggleGreenScreen}
                    className="pointer-events-auto bg-zinc-800 hover:bg-zinc-900 text-white p-4 rounded-md transition-colors duration-200"
                    aria-label="Toggle green screen"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                        />
                    </svg>
                </button>
            </div>

            <div className="relative flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto mb-16">

                {!isGuest?
                    (<>
                        {!hasCheckin &&
                            <div className={'absolute -top-12 w-full flex flex-col items-center bottom-0'}>
                                <RainbowButton
                                    onClick={() => navigate("/main/checkin")}
                                    className="rounded-full text-white font-secondary hover:scale-105 transition-transform ease-in-out duration-150"
                                >
                                    <CheckCircle/>
                                    <span>Check In</span>
                                </RainbowButton>
                            </div>
                        }
                        <input
                    className={"file:text-foreground placeholder:text-muted-foreground selection:bg-primary " +
                        "selection:text-primary-foreground dark:bg-zinc-800/50 border-input flex h-9 w-full min-w-0 " +
                        "rounded-full border bg-transparent px-4 py-2 text-base shadow-xs transition-[color,box-shadow] " +
                        "outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium " +
                        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring " +
                        "focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 " +
                        "aria-invalid:border-destructive"}
                    placeholder="Type a message..."
                    ref={input}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                />
                    <Button
                    disabled={loading || !!message}
                onClick={sendMessage}
                className={` rounded-full p-6 ${
                    loading || message
                        ? "cursor-not-allowed opacity-30"
                        : "hover:shadow-lg active:scale-95"
                }`}
                aria-label="Send message"
            >
                {loading ? "Sending..." : "Send"}
            </Button></>)
                    :(
                        <div className="w-full text-center flex flex-col items-center gap-4">
                            <div className="text-sm px-6 sm:text-base bg-zinc-300/40 dark:bg-zinc-800/40 backdrop-blur-2xl rounded-2xl w-full min-h-[5rem] flex items-center justify-center text-center text-white">
                                Please log in or create an account to chat with Sage.
                            </div>
                            <InteractiveHoverButton
                                onClick={() => navigate("/login")}
                                className="text-sm sm:text-base font-secondary font-medium border-2 border-zinc-600 dark:border-zinc-800"
                            >
                                Login to Begin
                            </InteractiveHoverButton>
                        </div>
                    )
            }
            </div>
        </div>
    );
};