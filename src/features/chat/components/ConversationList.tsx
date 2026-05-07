import { EmptyState } from "../../../components/common/EmptyState";
import { LoadingSkeleton } from "../../../components/common/LoadingSkeleton";
import type { Conversation } from "../types/chat.types";
import { ConversationItem } from "./ConversationItem";

export function ConversationList({ conversations, activeId, isLoading, onSelect }: { conversations: Conversation[]; activeId: string | null; isLoading: boolean; onSelect: (id: string) => void }) {
  if (isLoading) return <LoadingSkeleton className="h-96 border border-white/10 bg-slate-900/70" />;
  if (!conversations.length) return <EmptyState title="No conversations" description="Accepted matches will appear here when a chat is ready." />;

  return (
    <div className="space-y-2">
      {conversations.map((conversation) => (
        <ConversationItem key={conversation.id} conversation={conversation} isActive={conversation.id === activeId} onClick={() => onSelect(conversation.id)} />
      ))}
    </div>
  );
}
