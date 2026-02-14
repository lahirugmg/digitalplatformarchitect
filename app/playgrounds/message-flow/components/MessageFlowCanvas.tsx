'use client'

import { useEffect, useState } from 'react'
import EmptyCanvas from '../../components/shared/EmptyCanvas';

interface Message {
  id: number;
  from: string;
  to: string;
  progress: number;
  type: 'request' | 'response' | 'event';
}

interface MessageFlowCanvasProps {
  pattern: string;
  isRunning: boolean;
}

export default function MessageFlowCanvas({ pattern, isRunning }: MessageFlowCanvasProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!isRunning) {
      setMessages([]);
      return;
    }

    const interval = setInterval(() => {
      setMessages((prev) => {
        // Remove completed messages
        const active = prev.filter((m) => m.progress < 100);

        // Add new message based on pattern
        const newMessage = generateMessage(pattern);
        return [...active, newMessage];
      });
    }, 1500); // New message every 1.5 seconds

    return () => clearInterval(interval);
  }, [isRunning, pattern]);

  // Animate message progress
  useEffect(() => {
    if (!isRunning) return;

    const animation = setInterval(() => {
      setMessages((prev) =>
        prev.map((msg) => ({
          ...msg,
          progress: Math.min(msg.progress + 2, 100),
        }))
      );
    }, 30);

    return () => clearInterval(animation);
  }, [isRunning]);

  const generateMessage = (pattern: string): Message => {
    const id = Date.now();

    switch (pattern) {
      case 'pub-sub':
        return {
          id,
          from: 'Publisher',
          to: ['Sub A', 'Sub B', 'Sub C'][Math.floor(Math.random() * 3)],
          progress: 0,
          type: 'event',
        };
      case 'request-reply':
        return {
          id,
          from: Math.random() > 0.5 ? 'Client' : 'Server',
          to: Math.random() > 0.5 ? 'Server' : 'Client',
          progress: 0,
          type: Math.random() > 0.5 ? 'request' : 'response',
        };
      case 'event-driven':
        return {
          id,
          from: 'Event Source',
          to: ['Listener 1', 'Listener 2', 'Listener 3'][Math.floor(Math.random() * 3)],
          progress: 0,
          type: 'event',
        };
      default: // point-to-point
        return {
          id,
          from: 'Service A',
          to: 'Service B',
          progress: 0,
          type: 'request',
        };
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Pattern Visualization */}
      <div className="relative w-full max-w-4xl h-96">
        {pattern === 'point-to-point' && <PointToPointViz messages={messages} />}
        {pattern === 'pub-sub' && <PubSubViz messages={messages} />}
        {pattern === 'request-reply' && <RequestReplyViz messages={messages} />}
        {pattern === 'event-driven' && <EventDrivenViz messages={messages} />}
      </div>

      {!isRunning && (
        <EmptyCanvas
          icon="⚡"
          title="Ready to Send Messages"
          instructions={[`Click "Send Messages" to see the ${pattern.replace('-', ' ')} pattern in action`]}
        />
      )}
    </div>
  );
}
function PointToPointViz({ messages }: { messages: Message[] }) {
  return (
    <div className="flex items-center justify-between h-full px-20">
      <ServiceNode name="Service A" color="blue" />
      <div className="flex-1 relative h-2 mx-8">
        <div className="absolute inset-0 bg-slate-200 rounded-full" />
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-lg transition-all"
            style={{ left: `${msg.progress}%` }}
          />
        ))}
      </div>
      <ServiceNode name="Service B" color="green" />
    </div>
  )
}

function PubSubViz({ messages }: { messages: Message[] }) {
  const subscribers = ['Sub A', 'Sub B', 'Sub C']

  return (
    <div className="flex h-full items-center">
      <div className="w-1/3 flex items-center justify-center">
        <ServiceNode name="Publisher" color="purple" />
      </div>
      <div className="flex-1 relative">
        {subscribers.map((sub, index) => {
          const angle = (index - 1) * 40 // -40, 0, 40 degrees
          const subMessages = messages.filter((m) => m.to === sub)

          return (
            <div key={sub} className="absolute left-0 w-full" style={{ top: `${30 + angle}%` }}>
              <div className="flex items-center">
                <div className="flex-1 relative h-2">
                  <div className="absolute inset-0 bg-slate-200 rounded-full" />
                  {subMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full shadow-lg"
                      style={{ left: `${msg.progress}%` }}
                    />
                  ))}
                </div>
                <div className="ml-4">
                  <ServiceNode name={sub} color="cyan" size="sm" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function RequestReplyViz({ messages }: { messages: Message[] }) {
  return (
    <div className="flex items-center justify-between h-full px-20">
      <ServiceNode name="Client" color="blue" />
      <div className="flex-1 relative h-20 mx-8">
        {/* Request path (top) */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-slate-200 rounded-full" />
        {messages
          .filter((m) => m.type === 'request')
          .map((msg) => (
            <div
              key={msg.id}
              className="absolute top-0 w-4 h-4 bg-blue-500 rounded-full shadow-lg"
              style={{ left: `${msg.progress}%` }}
            />
          ))}

        {/* Reply path (bottom) */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-slate-200 rounded-full" />
        {messages
          .filter((m) => m.type === 'response')
          .map((msg) => (
            <div
              key={msg.id}
              className="absolute bottom-0 w-4 h-4 bg-green-500 rounded-full shadow-lg"
              style={{ right: `${msg.progress}%` }}
            />
          ))}

        {/* Arrow labels */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-slate-500 whitespace-nowrap">
          Request →
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-slate-500 whitespace-nowrap">
          ← Response
        </div>
      </div>
      <ServiceNode name="Server" color="green" />
    </div>
  )
}

function EventDrivenViz({ messages }: { messages: Message[] }) {
  const listeners = ['Listener 1', 'Listener 2', 'Listener 3']

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex items-center mb-8">
        <div className="w-48">
          <ServiceNode name="Event Source" color="amber" />
        </div>
      </div>

      {listeners.map((listener, index) => {
        const listenerMessages = messages.filter((m) => m.to === listener)

        return (
          <div key={listener} className="flex items-center mb-4">
            <div className="w-48 text-right pr-4">
              <div className="inline-block bg-slate-100 px-3 py-2 rounded-lg text-sm font-medium">
                Event Emitted
              </div>
            </div>
            <div className="flex-1 relative h-2">
              <div className="absolute inset-0 bg-slate-200 rounded-full" />
              {listenerMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-500 rounded-full shadow-lg"
                  style={{ left: `${msg.progress}%` }}
                />
              ))}
            </div>
            <div className="ml-4 w-32">
              <ServiceNode name={listener} color="teal" size="sm" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ServiceNode({
  name,
  color,
  size = 'md',
}: {
  name: string
  color: string
  size?: 'sm' | 'md'
}) {
  const colors = {
    blue: 'bg-blue-100 border-blue-500 text-blue-700',
    green: 'bg-green-100 border-green-500 text-green-700',
    purple: 'bg-purple-100 border-purple-500 text-purple-700',
    cyan: 'bg-cyan-100 border-cyan-500 text-cyan-700',
    amber: 'bg-amber-100 border-amber-500 text-amber-700',
    teal: 'bg-teal-100 border-teal-500 text-teal-700',
  }

  const sizeClasses = size === 'sm' ? 'px-3 py-2 text-xs' : 'px-4 py-3 text-sm'

  return (
    <div
      className={`${colors[color as keyof typeof colors]} border-2 rounded-lg font-semibold shadow-md ${sizeClasses}`}
    >
      {name}
    </div>
  )
}
