import React, { useEffect, useRef } from 'react';

export function Message({ messages, currentUserId }) {
  const chatEndRef = useRef(null);
  function formatMessageDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ' ' +
           date.toLocaleTimeString('en-US');
  }

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-grow overflow-y-auto mb-6">
      {messages.map(message => (
        <div key={message._id} className={`flex ${message.sender._id === currentUserId ? 'justify-end' : 'justify-start'}`}>
          <div className={`w-content h-auto text-white text-xl p-4 rounded-3xl mb-3 ${message.sender._id === currentUserId ? 'bg-gray-600 mr-9' : 'bg-gray-900 ml-9'}`}>
            <p>{message.content}</p>
            <p className='text-sm mt-2'>{formatMessageDate(message.createdAt)}</p>
          </div>
        </div>
      ))}
      <div ref={chatEndRef}></div>
    </div>
  );
}
