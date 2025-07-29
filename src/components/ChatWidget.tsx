import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useDarcyChat } from '@/hooks/useDarcyChat';

const ChatWidget: React.FC = () => {
  const { isOpen, messages, isTyping, toggleChat, sendMessage, clearChat } = useDarcyChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Botão flutuante do chat */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
          size="icon"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Widget do chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 h-96 md:w-96 md:h-[500px]">
          <Card className="h-full flex flex-col bg-background border shadow-xl">
            {/* Header do chat */}
            <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">D</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Darcy</h3>
                  <p className="text-xs opacity-90">Assistente Virtual</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={clearChat}
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Área de mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground text-sm py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Olá! Sou a Darcy 👋</p>
                  <p>Como posso te ajudar hoje?</p>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {!message.isUser && (
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary">D</span>
                        </div>
                        <span className="text-xs font-medium text-primary">Darcy</span>
                      </div>
                    )}
                    <p className="leading-relaxed">{message.texto}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Indicador de digitação */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-lg text-sm max-w-[80%]">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary">D</span>
                      </div>
                      <span className="text-xs font-medium text-primary">Darcy</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input de mensagem */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatWidget;