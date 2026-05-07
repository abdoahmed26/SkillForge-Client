import type { Conversation } from "../types/chat.types";
import { OnlineStatusDot } from "./OnlineStatusDot";

export function ConversationItem({ conversation, isActive, onClick }: { conversation: Conversation; isActive: boolean; onClick: () => void }) {
  const name = conversation.participant.displayName ?? conversation.participant.username;
  return (
    <button type="button" onClick={onClick} className={`flex min-h-16 w-full items-center gap-3 rounded-lg p-3 text-left transition ${isActive ? "bg-indigo-500/20" : "hover:bg-slate-800/70"}`}>
      <div className="relative h-11 w-11 shrink-0 rounded-full bg-gradient-to-tr from-indigo-500 to-teal-400">
        {conversation.participant.avatarUrl ? <img src={conversation.participant.avatarUrl} alt={name} className="h-full w-full rounded-full object-cover" /> : null}
        <span className="absolute -bottom-0.5 -right-0.5"><OnlineStatusDot isOnline={conversation.participant.isOnline} /></span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-white">{name}</p>
        <p className="truncate text-xs text-slate-400">{conversation.lastMessagePreview ?? "No messages yet"}</p>
      </div>
      {conversation.unreadCount ? <span className="rounded-full bg-teal-400 px-2 py-0.5 text-xs font-black text-slate-950">{conversation.unreadCount}</span> : null}
    </button>
  );
}
