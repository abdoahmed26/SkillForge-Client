export function TypingIndicator({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;
  return (
    <div className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-400">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-400" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-400 [animation-delay:120ms]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-400 [animation-delay:240ms]" />
    </div>
  );
}
