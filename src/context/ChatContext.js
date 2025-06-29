import React, { createContext, useContext, useReducer } from 'react';
import { generateId } from '../utils/helpers';
import { MESSAGE_TYPES } from '../utils/constants';

const ChatContext = createContext();

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case 'SET_TYPING':
      return {
        ...state,
        isTyping: action.payload,
      };
    case 'SET_AI_PROCESSING':
      return {
        ...state,
        aiProcessing: action.payload,
      };
    case 'UPDATE_CONTEXT':
      return {
        ...state,
        conversationContext: { ...state.conversationContext, ...action.payload },
      };
    case 'CLEAR_CHAT':
      return {
        ...state,
        messages: [],
        conversationContext: {},
      };
    default:
      return state;
  }
};

const initialState = {
  messages: [],
  isTyping: false,
  aiProcessing: false,
  conversationContext: {
    lastIntent: null,
    entities: {},
    sentiment: 'neutral',
    conversationFlow: []
  }
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const addMessage = (type, text, options = {}) => {
    const message = {
      id: generateId(),
      type,
      text,
      timestamp: new Date(),
      ...options
    };
    dispatch({ type: 'ADD_MESSAGE', payload: message });
    return message;
  };

  const setTyping = (typing) => {
    dispatch({ type: 'SET_TYPING', payload: typing });
  };

  const setAiProcessing = (processing) => {
    dispatch({ type: 'SET_AI_PROCESSING', payload: processing });
  };

  const updateContext = (context) => {
    dispatch({ type: 'UPDATE_CONTEXT', payload: context });
  };

  const clearChat = () => {
    dispatch({ type: 'CLEAR_CHAT' });
  };

  const value = {
    ...state,
    addMessage,
    setTyping,
    setAiProcessing,
    updateContext,
    clearChat
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};