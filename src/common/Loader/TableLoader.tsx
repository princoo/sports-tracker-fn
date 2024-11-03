import React from 'react';

export default function TableLoader() {
  return (
    <div>
      <div className="flex flex-row gap-1">
        <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce"></div>
        <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce [animation-delay:-.1s]"></div>
        <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce [animation-delay:-.3s]"></div>
      </div>
    </div>
  );
}
