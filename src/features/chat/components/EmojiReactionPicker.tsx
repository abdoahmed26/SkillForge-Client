const emojis = ["👍", "🔥", "👏", "💡", "🎯"];

export function EmojiReactionPicker({ onSelect }: { onSelect: (emoji: string) => void }) {
  return (
    <div className="flex gap-1 rounded-lg border border-white/10 bg-slate-900/95 p-1 shadow-soft">
      {emojis.map((emoji) => (
        <button key={emoji} type="button" onClick={() => onSelect(emoji)} className="grid h-9 w-9 place-items-center rounded-lg text-lg transition hover:bg-slate-800">
          {emoji}
        </button>
      ))}
    </div>
  );
}
