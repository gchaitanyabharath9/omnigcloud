"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

type Message = {
    role: 'bot' | 'user';
    text: string;
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'bot', text: 'Identity Verified. Welcome effectively to the Sovereign Command Console. How can I assist with your cloud modernization?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg = inputValue;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInputValue('');

        // Simulate AI response
        setTimeout(() => {
            let response = "I'm processing that request against our knowledge base.";
            if (userMsg.toLowerCase().includes('pricing') || userMsg.toLowerCase().includes('cost')) {
                response = "We offer flexible sovereignty tiers. Our 'Core' plan starts at 4% of managed spend, while 'Federal' editions include air-gapped support. Would you like a cost analysis?";
            } else if (userMsg.toLowerCase().includes('demo')) {
                response = "I can initiate a live environment sandbox. Please check the 'Live Experience' section or click 'App' to start your trial.";
            } else if (userMsg.toLowerCase().includes('compliance') || userMsg.toLowerCase().includes('gdpr')) {
                response = "Our Engine is pre-certified for GDPR, HIPAA, and SOC-2 Type II. We automatically remediate drift to ensure continuous audit readiness.";
            }

            setMessages(prev => [...prev, { role: 'bot', text: response }]);
        }, 1000);
    };

    return (
        <>
            {/* Floating Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        position: 'fixed',
                        bottom: '2rem',
                        right: '2rem',
                        width: '3.5rem',
                        height: '3.5rem',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        border: 'none',
                        boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
                        color: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 9999,
                        transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <MessageSquare size={24} fill="#000" />
                    <span style={{ position: 'absolute', top: 0, right: 0, width: '12px', height: '12px', background: 'red', borderRadius: '50%', border: '2px solid #000' }}></span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '350px',
                    height: '500px',
                    background: 'rgba(5, 10, 20, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--card-border)',
                    borderRadius: '1rem',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 9999,
                    overflow: 'hidden',
                    animation: 'fadeIn 0.3s ease-out'
                }}>
                    {/* Header */}
                    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Sparkles size={16} color="var(--primary)" />
                            <span style={{ fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.5px' }}>SOVEREIGN AI</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--foreground)', cursor: 'pointer', opacity: 0.7 }}>
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="custom-scrollbar" style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {messages.map((msg, i) => (
                            <div key={i} style={{ display: 'flex', gap: '0.5rem', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                                {msg.role === 'bot' && (
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Bot size={14} color="#000" />
                                    </div>
                                )}
                                <div style={{
                                    maxWidth: '80%',
                                    padding: '0.75rem',
                                    borderRadius: msg.role === 'user' ? '1rem 1rem 0 1rem' : '0 1rem 1rem 1rem',
                                    background: msg.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                    color: msg.role === 'user' ? '#000' : 'var(--foreground)',
                                    fontSize: '0.85rem',
                                    lineHeight: '1.4',
                                    fontWeight: 500
                                }}>
                                    {msg.text}
                                </div>
                                {msg.role === 'user' && (
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <User size={14} color="#fff" />
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div style={{ padding: '1rem', borderTop: '1px solid var(--card-border)' }}>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about pricing, compliance..."
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 2.5rem 0.75rem 1rem',
                                    background: 'rgba(0,0,0,0.3)',
                                    border: '1px solid var(--card-border)',
                                    borderRadius: '2rem',
                                    color: 'var(--foreground)',
                                    fontSize: '0.9rem',
                                    outline: 'none'
                                }}
                            />
                            <button
                                onClick={handleSend}
                                style={{
                                    position: 'absolute',
                                    right: '5px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'var(--primary)',
                                    border: 'none',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <Send size={14} color="#000" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
