export function OnlineStatusDot({ isOnline }: { isOnline: boolean }) {
  return (
    <span
      className={`block h-3 w-3 rounded-full ring-2 ring-slate-950 ${isOnline ? "bg-teal-400 shadow-glow-secondary" : "bg-slate-500"}`}
      title={isOnline ? "Online" : "Offline"}
    />
  );
}
