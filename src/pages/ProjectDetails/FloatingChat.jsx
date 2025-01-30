import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import React, { useState, useEffect, useRef } from "react";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { XIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChatByProject,
  fetchChatMessages,
  sendMessage,
} from "@/Redux/Chat/Action";
import { store } from "@/Redux/Store";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const scrollRef = useRef(null);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  // Automatically scroll to the bottom when a new message is added
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [message]);

  const dispatch = useDispatch();
  const { auth, chat } = useSelector((store) => store);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchChatByProject(id));
  }, []);

  useEffect(() => {
    dispatch(fetchChatMessages(chat.chat?.id));
  }, []);

  const handleSendMessage = () => {
    dispatch(
      sendMessage({
        senderId: auth.user?.id,
        projectId: id,
        content: message,
      })
    );

    if (message.trim()) {
      // Logic for sending message (Here, I added it in the component's state as an example)
      console.log("message", message);
      setMessage("");
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <Card className="fixed bottom-5 right-5 z-50 shadow-2xl border-2 ">
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
          <ScrollArea className="flex-1 p-4 space-y-3 h-96">
            <div ref={scrollRef}>
              {chat.messages?.map((item, index) =>
                item.sender.id !== auth.user.id ? (
                  <div className="flex gap-2 mb-2 justify-start" key={item}>
                    <Avatar>
                      <AvatarFallback>{item.sender.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2 py-2 px-5 border rounded-se-2xl rounded-es-xl">
                      <p className="text-sm font-bold text-violet-400">
                        {item.sender.fullName}
                      </p>
                      <p className="text-gray-300">{item.content}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 mb-2 justify-end" key={item}>
                    <div className="space-y-2 py-2 px-5 border rounded-se-2xl rounded-x-xl">
                      <p>{item.sender.fullName}</p>
                      <p className="text-gray-300">{item.content}</p>
                    </div>
                    <Avatar>
                      <AvatarFallback>{item.sender.fullName[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                )
              )}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="relative p-0">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={handleMessageChange}
              className="py-7 border-t outline-none focus:outline-none rounded-none border-b-0 border-x-0"
            />
            <Button
              onClick={handleSendMessage}
              className="absolute right-2 top-3 rounded-full"
              size="icon"
              variant="ghost"
            >
              <PaperPlaneIcon />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default FloatingChat;
