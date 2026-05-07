import { MessageCircle } from "lucide-react";
import { EmptyState } from "../../../components/common/EmptyState";
import { useAppSelector } from "../../../hooks/useAppHooks";
import { ConversationList } from "../components/ConversationList";
import { MessageBubble } from "../components/MessageBubble";
import { MessageInput } from "../components/MessageInput";
import { TypingIndicator } from "../components/TypingIndicator";
import { useChatSocket } from "../hooks/useChatSocket";
import { useConversations } from "../hooks/useConversations";

export function ChatPage() {
  const socket = useChatSocket();
  const userId = useAppSelector((state) => state.auth.user?.id);
  const { conversations, activeConversationId, messagesByConversation, typingByConversation, isLoading, setActiveConversation } = useConversations();
  const activeConversation = conversations.find((conversation) => conversation.id === activeConversationId);
  const messages = activeConversationId ? messagesByConversation[activeConversationId] ?? [] : [];

  return (
    <section className="grid min-h-[72vh] gap-4 lg:grid-cols-[340px_1fr]">
      <aside className="glass-dark rounded-lg p-3">
        <h1 className="px-2 pb-3 font-heading text-2xl font-bold text-white">Chat</h1>
        <ConversationList conversations={conversations} activeId={activeConversationId} isLoading={isLoading} onSelect={setActiveConversation} />
      </aside>
      <div className="glass-dark flex min-h-[72vh] flex-col overflow-hidden rounded-lg">
        {activeConversation ? (
          <>
            <header className="border-b border-white/10 p-4">
              <h2 className="font-heading text-lg font-bold text-white">{activeConversation.participant.displayName ?? activeConversation.participant.username}</h2>
            </header>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.length ? messages.map((message) => <MessageBubble key={message.id} message={message} isOwnMessage={message.senderId === userId} />) : <EmptyState icon={MessageCircle} title="No messages yet" description="Send the first message when you are ready." />}
              <TypingIndicator isVisible={Boolean(activeConversationId && typingByConversation[activeConversationId]?.length)} />
            </div>
            <MessageInput conversationId={activeConversationId} socket={socket} />
          </>
        ) : (
          <div className="grid flex-1 place-items-center p-6">
            <EmptyState icon={MessageCircle} title="Select a conversation" description="Choose a match from the list to open the message history." />
          </div>
        )}
      </div>
    </section>
  );
}
