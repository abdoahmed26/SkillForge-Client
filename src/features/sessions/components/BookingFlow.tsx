import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { bookSession, clearBookingState, fetchAvailableSlots } from "../store/sessionsSlice";
import type { BookingMatchedUser } from "../types/session.types";
import { toDateTimeLocalValue } from "../utils/sessionDate";
import { BookingProgress, ConfirmStep, SkillStep, TimeStep } from "./BookingSteps";

type BookingFlowProps = {
  matchedUser: BookingMatchedUser;
  onClose: () => void;
  onBooked?: () => void;
};

export function BookingFlow({ matchedUser, onClose, onBooked }: BookingFlowProps) {
  const dispatch = useAppDispatch();
  const { availableSlots, isBooking, bookingError } = useAppSelector((state) => state.sessions);
  const [step, setStep] = useState(1);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [scheduledAt, setScheduledAt] = useState(() =>
    toDateTimeLocalValue(new Date(Date.now() + 60 * 60 * 1000)),
  );
  const [notes, setNotes] = useState("");
  const teacherName = matchedUser.matchedUser.displayName || matchedUser.matchedUser.username;

  const learnableSkills = useMemo(
    () => matchedUser.skillOverlap.canTeachMe.filter((skill) => skill.skillId),
    [matchedUser.skillOverlap.canTeachMe],
  );
  const selectedSkill = learnableSkills.find((skill) => skill.skillId === selectedSkillId);

  useEffect(() => {
    return () => {
      dispatch(clearBookingState());
    };
  }, [dispatch]);

  const handleSelectSkill = (skillId: string) => {
    setSelectedSkillId(skillId);
    void dispatch(
      fetchAvailableSlots({
        teacherId: matchedUser.matchedUser.userId,
        skillId,
      }),
    );
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!selectedSkillId || !scheduledAt) {
      return;
    }

    try {
      await dispatch(
        bookSession({
          teacherId: matchedUser.matchedUser.userId,
          skillId: selectedSkillId,
          scheduledAt: new Date(scheduledAt).toISOString(),
          notes: notes.trim() || undefined,
        }),
      ).unwrap();
      toast.success("Booking request sent");
      onBooked?.();
      onClose();
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Unable to book session");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/80 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          className="glass-dark relative max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-lg"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
        >
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="relative flex items-center justify-between border-b border-slate-700/60 p-5">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-teal-300">Book Session</p>
              <h2 className="font-heading text-2xl font-black text-white">{teacherName}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
              aria-label="Close booking flow"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative p-5">
            <BookingProgress step={step} />

            {bookingError ? (
              <div className="mb-4 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">
                {bookingError}
              </div>
            ) : null}

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <SkillStep learnableSkills={learnableSkills} onSelectSkill={handleSelectSkill} />
              ) : null}

              {step === 2 ? (
                <TimeStep
                  availableSlots={availableSlots}
                  scheduledAt={scheduledAt}
                  onBack={() => setStep(1)}
                  onContinue={() => setStep(3)}
                  onScheduledAtChange={setScheduledAt}
                />
              ) : null}

              {step === 3 ? (
                <ConfirmStep
                  isBooking={isBooking}
                  notes={notes}
                  scheduledAt={scheduledAt}
                  selectedSkill={selectedSkill}
                  teacherName={teacherName}
                  onBack={() => setStep(2)}
                  onNotesChange={setNotes}
                  onSubmit={() => void handleSubmit()}
                />
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
