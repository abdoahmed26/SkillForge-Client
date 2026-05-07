import { motion } from "framer-motion";
import { CalendarClock, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import type { FormEvent } from "react";
import {
  availabilityDays,
  formatAvailabilityTime,
} from "../utils/availabilityTime";
import type { AvailabilitySlot } from "../types/session.types";

type AvailabilityFormProps = {
  dayOfWeek: number;
  durationMinutes: 30 | 60;
  editingSlot: AvailabilitySlot | null;
  isSaving: boolean;
  selectableTimes: string[];
  startTime: string;
  onCancelEdit: () => void;
  onDayChange: (dayOfWeek: number) => void;
  onDurationChange: (duration: 30 | 60) => void;
  onStartTimeChange: (startTime: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function AvailabilityForm({
  dayOfWeek,
  durationMinutes,
  editingSlot,
  isSaving,
  selectableTimes,
  startTime,
  onCancelEdit,
  onDayChange,
  onDurationChange,
  onStartTimeChange,
  onSubmit,
}: AvailabilityFormProps) {
  return (
    <motion.form
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={onSubmit}
      className="glass-dark relative h-fit overflow-hidden rounded-lg p-5"
    >
      <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="relative">
        <h2 className="font-heading text-xl font-bold text-white">
          {editingSlot ? "Update Slot" : "Add Availability"}
        </h2>

        <label className="mt-5 block text-sm font-semibold text-slate-300" htmlFor="availability-day">
          Day
        </label>
        <select
          id="availability-day"
          value={dayOfWeek}
          onChange={(event) => onDayChange(Number(event.target.value))}
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        >
          {availabilityDays.map((day) => (
            <option key={day.value} value={day.value}>
              {day.label}
            </option>
          ))}
        </select>

        <label className="mt-4 block text-sm font-semibold text-slate-300" htmlFor="availability-time">
          Start Time
        </label>
        <select
          id="availability-time"
          value={startTime}
          onChange={(event) => onStartTimeChange(event.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        >
          {selectableTimes.map((time) => (
            <option key={time} value={time}>
              {formatAvailabilityTime(time)}
            </option>
          ))}
        </select>

        {!editingSlot ? (
          <>
            <label className="mt-4 block text-sm font-semibold text-slate-300" htmlFor="availability-duration">
              Duration
            </label>
            <div
              id="availability-duration"
              className="mt-2 grid grid-cols-2 gap-2 rounded-xl border border-slate-700 bg-slate-800/40 p-1"
            >
              {[
                { value: 60, label: "60 min" },
                { value: 30, label: "30 min" },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => onDurationChange(item.value as 30 | 60)}
                  className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
                    durationMinutes === item.value
                      ? "bg-indigo-500/25 text-indigo-100"
                      : "text-slate-400 hover:bg-slate-700/70 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </>
        ) : null}

        <div className="mt-5 flex gap-3">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSaving}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-teal-400 px-4 py-3 text-sm font-bold text-white shadow-glow transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Plus className="h-4 w-4" aria-hidden="true" />
            )}
            {editingSlot ? "Update" : "Add"}
          </motion.button>
          {editingSlot ? (
            <button
              type="button"
              onClick={onCancelEdit}
              className="grid h-12 w-12 place-items-center rounded-xl border border-slate-700 bg-slate-800/60 text-slate-300 transition hover:bg-slate-700 hover:text-white"
              aria-label="Cancel edit"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>
    </motion.form>
  );
}

type AvailabilityDayCardProps = {
  day: { value: number; label: string; slots: AvailabilitySlot[] };
  index: number;
  onDelete: (slotId: string) => void;
  onEdit: (slot: AvailabilitySlot) => void;
};

export function AvailabilityDayCard({ day, index, onDelete, onEdit }: AvailabilityDayCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="glass-dark relative overflow-hidden rounded-lg p-4"
    >
      <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-teal-400/10 blur-3xl" />
      <div className="relative">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-heading text-lg font-bold text-white">{day.label}</h2>
          <span className="rounded-full bg-teal-400/10 px-3 py-1 text-xs font-bold text-teal-100">
            {day.slots.length}
          </span>
        </div>
        <div className="space-y-2">
          {day.slots.map((slot) => (
            <div
              key={slot.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-slate-700/60 bg-slate-900/60 px-3 py-2"
            >
              <span className="text-sm font-bold text-slate-100">
                {formatAvailabilityTime(slot.startTime)} - {formatAvailabilityTime(slot.endTime)}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(slot)}
                  className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 transition hover:bg-indigo-500/15 hover:text-indigo-100"
                  aria-label={`Edit ${day.label} ${slot.startTime}`}
                >
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(slot.id)}
                  className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 transition hover:bg-red-500/15 hover:text-red-200"
                  aria-label={`Delete ${day.label} ${slot.startTime}`}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function AvailabilitySkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="h-32 animate-pulse rounded-lg bg-slate-800/60" />
      ))}
    </div>
  );
}

export function EmptyAvailabilityState() {
  return (
    <div className="glass-dark rounded-lg p-8 text-center">
      <CalendarClock className="mx-auto h-10 w-10 text-teal-300" aria-hidden="true" />
      <h2 className="mt-3 font-heading text-xl font-bold text-white">No availability yet</h2>
      <p className="mt-2 text-sm text-slate-400">Add your first weekly slot to start receiving bookings.</p>
    </div>
  );
}
