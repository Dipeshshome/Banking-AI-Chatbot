import React from 'react';

const QuickReplies = ({ replies, onReply }) => {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {replies.map((reply, idx) => (
        <button
          key={idx}
          onClick={() => onReply(reply)}
          className="quick-reply-btn"
        >
          {reply}
        </button>
      ))}
    </div>
  );
};

export default QuickReplies;