import { Check, X } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { addReaction, deleteMessage, editMessage } from "../api/chatApi";
import { messageUpdated } from "../store/chatSlice";
import type { Message } from "../types/chat.types";
import { EmojiReactionPicker } from "./EmojiReactionPicker";
import { MessageActions } from "./MessageActions";

export function MessageBubble({ message, isOwnMessage }: { message: Message; isOwnMessage: boolean }) {
  const dispatch = useAppDispatch();
  const [showReactions, setShowReactions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const [isSaving, setIsSaving] = useState(false);

  const updateMessage = (updatedMessage: Message) => {
    const conversationId = updatedMessage.conversationId ?? message.conversationId;
    if (!conversationId) return;
    dispatch(messageUpdated({ ...updatedMessage, conversationId }));
  };

  const handleReaction = async (emoji: string) => {
    const updatedMessage = await addReaction(message.id, emoji);
    updateMessage(updatedMessage);
    setShowReactions(false);
  };

  const handleEditStart = () => {
    setShowReactions(false);
    setEditContent(message.content);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setEditContent(message.content);
    setIsEditing(false);
  };

  const handleEditSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextContent = editContent.trim();
    if (!nextContent || nextContent === message.content) {
      handleEditCancel();
      return;
    }

    setIsSaving(true);
    try {
      const updatedMessage = await editMessage(message.id, nextContent);
      updateMessage(updatedMessage);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this message?")) return;

    setIsSaving(true);
    try {
      const updatedMessage = await deleteMessage(message.id);
      updateMessage(updatedMessage);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`group flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[78%] rounded-lg px-4 py-3 ${isOwnMessage ? "bg-indigo-500 text-white" : "glass-dark text-slate-100"}`}>
        {isEditing ? (
          <form className="space-y-2" onSubmit={handleEditSubmit}>
            <textarea
              value={editContent}
              onChange={(event) => setEditContent(event.target.value)}
              className="min-h-20 w-full resize-none rounded-xl border border-white/20 bg-slate-950/25 px-3 py-2 text-sm text-white outline-none transition focus:border-white/60 focus:ring-1 focus:ring-white/50"
              maxLength={2000}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={handleEditCancel} className="grid h-8 w-8 place-items-center rounded-lg text-white/80 transition hover:bg-white/10" title="Cancel">
                <X className="h-4 w-4" />
              </button>
              <button type="submit" disabled={isSaving} className="grid h-8 w-8 place-items-center rounded-lg bg-white/15 text-white transition hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-60" title="Save">
                <Check className="h-4 w-4" />
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-start gap-2">
            <p className="break-words text-sm leading-6">{message.isDeleted ? "Message deleted" : message.content}</p>
            {isOwnMessage && !message.isDeleted ? <MessageActions onEdit={handleEditStart} onDelete={handleDelete} /> : null}
            {!isOwnMessage && !message.isDeleted ? <MessageActions onReact={() => setShowReactions((value) => !value)} /> : null}
          </div>
        )}
        <div className="mt-2 flex items-center justify-between gap-3 text-[11px] text-slate-300">
          <span>{new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          {message.isEdited && !message.isDeleted ? <span>edited</span> : null}
        </div>
        {message.reactions?.length ? (
          <div className="mt-2 flex flex-wrap gap-1">
            {message.reactions.map((reaction) => (
              <span key={`${reaction.userId}-${reaction.emoji}`} className="rounded-full bg-slate-950/30 px-2 py-0.5 text-xs">
                {reaction.emoji}
              </span>
            ))}
          </div>
        ) : null}
        {showReactions ? <div className="mt-2"><EmojiReactionPicker onSelect={handleReaction} /></div> : null}
      </div>
    </div>
  );
}
