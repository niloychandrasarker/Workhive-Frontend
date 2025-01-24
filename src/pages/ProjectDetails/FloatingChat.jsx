import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Input } from "@/components/ui/input"; // ShadCN Input
import { ScrollArea } from "@/components/ui/scroll-area"; // ShadCN ScrollArea
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { XIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const FloatingChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: "Niloy Sarker", text: "How are you?" },
        { id: 2, sender: "Samiul Kabir", text: "Fine? What are you doing?" },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const scrollRef = useRef(null); // Using useRef for managing the ScrollArea

    const toggleChat = () => {
        setIsOpen((prev) => !prev);
    };

    // Automatically scroll to the bottom when messages change
    useEffect(() => {
        console.log(scrollRef)
            // scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages((prev) => [
                ...prev,
                { id: prev.length + 1, sender: "You", text: newMessage.trim() },
            ]);
            setNewMessage("");
        }
    };

    return (
        <Card className="fixed bottom-5 right-5 z-50 shadow-2xl border-2">
            {/* Chat Toggle Button */}
            {!isOpen && (
                <Button
                    onClick={toggleChat}
                    className="flex items-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg"
                >
                    <ChatBubbleLeftEllipsisIcon className="w-6 h-6" />
                    Chat
                </Button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="h-[30rem] shadow-lg rounded-lg flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center px-4 py-2 border-b">
                        <h3 className="font-semibold">Chat</h3>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleChat}
                            className="p-1 hover:bg-gray-400 rounded-full w-5 h-5"
                            aria-label="Close Chat"
                        >
                            <XIcon className="text-gray-600" />
                        </Button>
                    </div>

                    {/* Messages Section */}
                    <ScrollArea

                        className="flex-1 p-4 space-y-3 h-96 "
                    >
                        <div  ref={scrollRef} >
                        {messages.map((message, index) =>
                            index % 2 === 0 ? (
                                <div className="flex gap-2 mb-2 justify-start" key={message.id}>
                                    <Avatar>
                                        <AvatarFallback>N</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-2 py-2 px-5 border rounded-se-2xl rounded-es-xl">
                                        <p className="text-sm font-bold text-violet-400">
                                            {message.sender}
                                        </p>
                                        <p className="text-gray-400">{message.text}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-2 mb-2 justify-end" key={message.id}>
                                    <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-ee-xl">
                                        <p className="text-sm font-bold text-violet-400">
                                            {message.sender}
                                        </p>
                                        <p className="text-gray-400">{message.text}</p>
                                    </div>
                                    <Avatar>
                                        <AvatarFallback>N</AvatarFallback>
                                    </Avatar>
                                </div>
                            )
                        )}
                        </div>
                    </ScrollArea>

                    {/* Message Input */}
                    <div className="flex items-center gap-2 px-4 py-2 border-t">
                        <Input
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-1"
                            aria-label="Type a message"
                        />
                        <Button
                            size="sm"
                            onClick={handleSendMessage}
                            className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-4 py-2"
                        >
                            Send
                        </Button>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default FloatingChat;
