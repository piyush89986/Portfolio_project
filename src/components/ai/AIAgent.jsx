import React, { useState, useRef, useEffect } from "react";
import { RECRUITER_PROMPT_CHIPS } from "./aiKnowledge";

const AIAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome-msg",
      sender: "ai",
      text: "👋 Hi! Ask me anything about Piyush's skills, projects, work experience, or how to get in touch.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const triggerRef = useRef(null);

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const handleClickOutside = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const [sessionId] = useState(() => {
    try {
      let sid = sessionStorage.getItem("portfolio_ai_session_id");
      if (!sid) {
        sid = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        sessionStorage.setItem("portfolio_ai_session_id", sid);
      }
      return sid;
    } catch {
      return `session_${Date.now()}`;
    }
  });

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    let responseText = "";

    try {
      // Call Node.js backend / Vercel Serverless Function
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.response) {
        responseText = data.response;
      } else {
        responseText =
          data.error ||
          "⚠️ Unable to get a response from AI. Please check if your OPENAI_API_KEY is configured on Vercel or in server/.env.";
      }
    } catch (err) {
      responseText =
        "⚠️ Connection to AI service failed. Please make sure the server/deployment is running.";
    }

    const aiMessageId = `ai-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Stream/Typewriter effect
    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: aiMessageId,
        sender: "ai",
        text: responseText,
        timestamp,
      },
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "ai",
        text: "Chat refreshed! What else would you like to know about Piyush?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  // Helper to parse markdown links and bold formatting
  const renderFormattedText = (text) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      // Parse markdown links [text](url)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <a
            key={`link-${lineIdx}-${match.index}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00cea8] underline font-semibold hover:text-white transition-colors"
          >
            {match[1]}
          </a>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const formattedLine = parts.length > 0 ? parts : line;

      if (line.startsWith("### ")) {
        return (
          <h4 key={lineIdx} className="text-white font-bold text-base mt-2 mb-1">
            {line.replace("### ", "")}
          </h4>
        );
      }
      if (line.startsWith("• ")) {
        return (
          <div key={lineIdx} className="flex items-start gap-1.5 ml-2 my-0.5 text-sm text-secondary">
            <span className="text-[#915EFF] font-bold">•</span>
            <span>{formattedLine}</span>
          </div>
        );
      }
      return (
        <p key={lineIdx} className="my-1 text-sm text-white-100 leading-relaxed">
          {formattedLine}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Orb */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center">
        <button
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          className={`relative p-3.5 sm:p-4 rounded-full bg-tertiary/90 border border-[#915EFF]/60 shadow-[0_0_25px_rgba(145,94,255,0.45)] backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center group ${
            isOpen ? "rotate-90 bg-[#915EFF] text-white" : "text-[#915EFF]"
          }`}
          aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
          title="Ask about Piyush"
        >
          {/* Pulsing halo */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full animate-ping opacity-30 bg-[#915EFF]" />
          )}

          {isOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xl">✨</span>
              <span className="text-xs font-bold text-white tracking-wide pr-1">Ask AI</span>
            </div>
          )}
        </button>
      </div>

      {/* AI Chat Window Modal */}
      {isOpen && (
        <div
          ref={modalRef}
          className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[620px] h-[80vh] bg-tertiary/95 border border-[#915EFF]/35 shadow-[0_25px_70px_-15px_rgba(145,94,255,0.3)] rounded-3xl overflow-hidden flex flex-col z-50 backdrop-blur-2xl animate-fade-in"
        >
          {/* Clean Modern Header: Just icon & "Ask about Piyush" */}
          <div className="px-5 py-4 bg-black-100/90 border-b border-[#915EFF]/20 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-[#915EFF]/40 bg-[#915EFF]/15 shadow-inner">
              <span className="text-base">🤖</span>
            </div>
            <h3 className="text-white font-semibold text-[16px] tracking-wide">
              Ask about Piyush
            </h3>
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-4 py-2.5 bg-black-200/60 border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {RECRUITER_PROMPT_CHIPS.map((chip) => (
              <button
                key={chip.id}
                onClick={() => handleSendMessage(chip.query)}
                className="whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium bg-black-100 border border-[#915EFF]/25 hover:border-[#915EFF] hover:text-[#915EFF] text-secondary transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
              const isAi = msg.sender === "ai";
              return (
                <div key={msg.id} className={`flex items-start gap-2.5 ${isAi ? "justify-start" : "justify-end"}`}>
                  {isAi && (
                    <div className="w-7 h-7 rounded-xl bg-[#915EFF]/20 border border-[#915EFF]/40 flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      ✨
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-sm shadow-md ${
                      isAi
                        ? "bg-black-100/90 border border-white/10 text-white-100 rounded-tl-sm"
                        : "bg-gradient-to-r from-[#804dee] to-[#915EFF] text-white font-medium rounded-tr-sm shadow-md"
                    }`}
                  >
                    {isAi ? renderFormattedText(msg.text) : msg.text}
                    <div className={`text-[10px] mt-1.5 text-right ${isAi ? "text-secondary/60" : "text-white/70"}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#915EFF]/20 border border-[#915EFF]/40 flex items-center justify-center shrink-0 text-xs">
                  ✨
                </div>
                <div className="bg-black-100/90 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#915EFF] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-[#915EFF] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-[#915EFF] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-black-100/90 border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about skills, projects, experience..."
                className="flex-1 bg-tertiary/90 border border-[#915EFF]/30 focus:border-[#915EFF] text-white placeholder:text-secondary/70 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className={`p-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer border-none ${
                  inputMessage.trim() && !isTyping
                    ? "bg-[#915EFF] text-white shadow-[0_0_15px_rgba(145,94,255,0.5)] hover:scale-105 active:scale-95"
                    : "bg-tertiary text-secondary/40 cursor-not-allowed"
                }`}
                title="Send Message"
                aria-label="Send"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAgent;
