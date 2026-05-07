import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import type { Socket } from "socket.io-client";

export function MessageInput({ conversationId, socket }: { conversationId: string | null; socket: Socket | null }) {
  const [content, setContent] = useState("");
  const canSend = Boolean(conversationId && content.trim());

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!canSend) return;
    socket?.emit("chat:send_message", { conversationId, content: content.trim() });
    setContent("");
  };

  return (
    <form onSubmit={submit} className="flex gap-2 border-t border-white/10 p-3">
      <textarea
        value={content}
        onChange={(event) => {
          setContent(event.target.value.slice(0, 2000));
          if (conversationId) socket?.emit("chat:typing", { conversationId });
        }}
        onBlur={() => conversationId && socket?.emit("chat:stop_typing", { conversationId })}
        className="min-h-12 flex-1 resize-none rounded-lg border border-slate-700/70 bg-slate-800/70 px-3 py-3 text-sm text-white outline-none focus:border-indigo-500"
        placeholder="Type a message"
      />
      <button type="submit" disabled={!canSend} className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-r from-indigo-500 to-teal-400 text-white shadow-glow disabled:opacity-40" title="Send">
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
}
