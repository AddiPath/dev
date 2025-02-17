import React from 'react';
import { Bot, MessageSquare, Sparkles } from 'lucide-react';

export function GracePreview() {
  const exampleConversation = [
    {
      role: 'user',
      content: "I'm feeling more tired than usual today. Should I adjust my medication?"
    },
    {
      role: 'assistant',
      content: "While I can't provide medical advice, increased fatigue can be significant with Addison's. Consider checking your recent stress levels and salt intake. It's best to discuss any medication adjustments with your doctor. Would you like to log these symptoms in your wellness tracker?"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
          <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Meet Grace</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Your AI Addison's Support Agent</p>
        </div>
      </div>

      <div className="space-y-4">
        {exampleConversation.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
          Key Features
        </h4>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <li className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
            24/7 support and guidance
          </li>
          <li className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
            Medication reminders and tracking
          </li>
          <li className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
            Symptom analysis and logging
          </li>
          <li className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
            Emergency protocol assistance
          </li>
        </ul>
      </div>
    </div>
  );
}