import { motion } from "framer-motion";
import { CalendarDays, Check, ChevronLeft, Clock, Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import type { SkillOverlapItem } from "../../matching/types/matching.types";
import type { AvailableSlots } from "../types/session.types";
import { formatDateTime, formatSuggestionDate, formatSuggestionTime, toDateTimeLocalValue } from "../utils/sessionDate";

type StepPanelProps = {
  children: ReactNode;
  panelKey: string;
};

function StepPanel({ children, panelKey }: StepPanelProps) {
  return (
    <motion.div
      key={panelKey}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
    >
      {children}
    </motion.div>
  );
}

export function BookingProgress({ step }: { step: number }) {
  return (
    <div className="mb-5 grid grid-cols-3 gap-2">
      {["Skill", "Time", "Confirm"].map((label, index) => (
        <div
          key={label}
          className={`rounded-lg border px-3 py-2 text-center text-sm font-bold ${
            step >= index + 1
              ? "border-indigo-400/40 bg-indigo-500/15 text-indigo-100"
              : "border-slate-700/60 bg-slate-900/40 text-slate-500"
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

export function SkillStep({
  learnableSkills,
  onSelectSkill,
}: {
  learnableSkills: SkillOverlapItem[];
  onSelectSkill: (skillId: string) => void;
}) {
  return (
    <StepPanel panelKey="skill">
      {learnableSkills.length === 0 ? (
        <div className="rounded-lg border border-amber-400/30 bg-amber-400/10 p-4 text-sm font-semibold text-amber-100">
          This match does not include bookable skill IDs yet. Refresh matches after the backend update is running.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {learnableSkills.map((skill) => (
            <motion.button
              key={skill.skillId}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectSkill(skill.skillId!)}
              className="rounded-lg border border-slate-700/60 bg-slate-900/70 p-4 text-left transition hover:border-indigo-400/60 hover:bg-indigo-500/10"
            >
              <p className="font-heading text-lg font-bold text-white">{skill.skillName}</p>
              <p className="mt-1 text-sm font-semibold text-slate-400">{skill.proficiency}</p>
            </motion.button>
          ))}
        </div>
      )}
    </StepPanel>
  );
}

export function TimeStep({
  availableSlots,
  scheduledAt,
  onBack,
  onContinue,
  onScheduledAtChange,
}: {
  availableSlots: AvailableSlots;
  scheduledAt: string;
  onBack: () => void;
  onContinue: () => void;
  onScheduledAtChange: (value: string) => void;
}) {
  return (
    <StepPanel panelKey="time">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        Skill
      </button>
      <div className="rounded-lg border border-slate-700/60 bg-slate-900/50 p-4">
        <label className="block text-sm font-semibold text-slate-300" htmlFor="booking-time">
          Custom request time
        </label>
        <input
          id="booking-time"
          type="datetime-local"
          value={scheduledAt}
          min={toDateTimeLocalValue(new Date())}
          onChange={(event) => onScheduledAtChange(event.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        {availableSlots.slots.length > 0 ? (
          <div className="mt-5 space-y-3">
            <p className="text-sm font-bold text-slate-300">Receiver availability</p>
            <div className="max-h-56 space-y-3 overflow-y-auto pr-1">
              {availableSlots.slots.map((day) => (
                <div key={day.date} className="rounded-lg border border-slate-700/60 bg-slate-950/40 p-3">
                  <div className="mb-2 flex items-center gap-2 text-sm font-bold text-white">
                    <CalendarDays className="h-4 w-4 text-teal-300" aria-hidden="true" />
                    {formatSuggestionDate(day.date)}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {day.times.map((time) => (
                      <button
                        key={`${day.date}-${time}`}
                        type="button"
                        onClick={() => onScheduledAtChange(`${day.date}T${time}`)}
                        className="rounded-xl border border-teal-400/30 bg-teal-400/10 px-3 py-2 text-sm font-bold text-teal-100 transition hover:bg-teal-400/20"
                      >
                        {formatSuggestionTime(day.date, time)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-4 rounded-lg border border-slate-700/60 bg-slate-950/40 px-3 py-2 text-sm font-semibold text-slate-400">
            No matching availability suggestions found. You can still enter a custom time.
          </p>
        )}
        <button
          type="button"
          onClick={onContinue}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500/15 px-4 py-3 text-sm font-bold text-indigo-100 transition hover:bg-indigo-500/25"
        >
          <Clock className="h-4 w-4" aria-hidden="true" />
          Continue
        </button>
      </div>
    </StepPanel>
  );
}

export function ConfirmStep({
  isBooking,
  notes,
  scheduledAt,
  selectedSkill,
  teacherName,
  onBack,
  onNotesChange,
  onSubmit,
}: {
  isBooking: boolean;
  notes: string;
  scheduledAt: string;
  selectedSkill?: SkillOverlapItem;
  teacherName: string;
  onBack: () => void;
  onNotesChange: (notes: string) => void;
  onSubmit: () => void;
}) {
  return (
    <StepPanel panelKey="confirm">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        Time
      </button>
      <div className="rounded-lg border border-slate-700/60 bg-slate-900/60 p-4">
        <div className="grid gap-3 text-sm sm:grid-cols-3">
          <div>
            <p className="font-bold text-slate-500">Skill</p>
            <p className="mt-1 font-heading font-bold text-white">{selectedSkill?.skillName}</p>
          </div>
          <div>
            <p className="font-bold text-slate-500">Teacher</p>
            <p className="mt-1 font-heading font-bold text-white">{teacherName}</p>
          </div>
          <div>
            <p className="font-bold text-slate-500">Time</p>
            <p className="mt-1 font-heading font-bold text-white">{formatDateTime(scheduledAt)}</p>
          </div>
        </div>
        <label className="mt-5 block text-sm font-semibold text-slate-300" htmlFor="session-notes">
          Notes
        </label>
        <textarea
          id="session-notes"
          value={notes}
          onChange={(event) => onNotesChange(event.target.value)}
          maxLength={500}
          rows={4}
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          placeholder="What would you like to focus on?"
        />
      </div>
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSubmit}
        disabled={isBooking}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-teal-400 px-5 py-3 font-bold text-white shadow-glow transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isBooking ? (
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
        ) : (
          <Check className="h-5 w-5" aria-hidden="true" />
        )}
        Send Request
      </motion.button>
    </StepPanel>
  );
}
