import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import {
  AvailabilityDayCard,
  AvailabilityForm,
  AvailabilitySkeleton,
  EmptyAvailabilityState,
} from "../components/AvailabilityEditor";
import {
  createAvailabilitySlot,
  editAvailabilitySlot,
  fetchMyAvailability,
  removeAvailabilitySlot,
  saveMyAvailability,
} from "../store/sessionsSlice";
import type { AvailabilitySlot } from "../types/session.types";
import { addMinutesToTime, availabilityDays, availabilityTimes } from "../utils/availabilityTime";

export function AvailabilityPage() {
  const dispatch = useAppDispatch();
  const { myAvailability, isAvailabilityLoading, isAvailabilitySaving, error } = useAppSelector(
    (state) => state.sessions,
  );
  const [editingSlot, setEditingSlot] = useState<AvailabilitySlot | null>(null);
  const [dayOfWeek, setDayOfWeek] = useState(0);
  const [startTime, setStartTime] = useState("09:00");
  const [durationMinutes, setDurationMinutes] = useState<30 | 60>(60);

  useEffect(() => {
    void dispatch(fetchMyAvailability());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const groupedSlots = useMemo(
    () =>
      availabilityDays.map((day) => ({
        ...day,
        slots: myAvailability.filter((slot) => slot.dayOfWeek === day.value),
      })),
    [myAvailability],
  );
  const selectableTimes =
    editingSlot || durationMinutes === 30 ? availabilityTimes : availabilityTimes.slice(0, -1);

  const resetForm = () => {
    setEditingSlot(null);
    setDayOfWeek(0);
    setStartTime("09:00");
    setDurationMinutes(60);
  };

  const handleEdit = (slot: AvailabilitySlot) => {
    setEditingSlot(slot);
    setDayOfWeek(slot.dayOfWeek);
    setStartTime(slot.startTime);
    setDurationMinutes(30);
  };

  const buildMergedSlots = () => {
    const requestedSlots = [
      { dayOfWeek, startTime },
      { dayOfWeek, startTime: addMinutesToTime(startTime, 30) },
    ];

    return [...myAvailability, ...requestedSlots].reduce<{ dayOfWeek: number; startTime: string }[]>(
      (acc, slot) => {
        const exists = acc.some(
          (existing) => existing.dayOfWeek === slot.dayOfWeek && existing.startTime === slot.startTime,
        );
        if (!exists) {
          acc.push({ dayOfWeek: slot.dayOfWeek, startTime: slot.startTime });
        }
        return acc;
      },
      [],
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (editingSlot) {
        await dispatch(
          editAvailabilitySlot({
            slotId: editingSlot.id,
            data: { dayOfWeek, startTime },
          }),
        ).unwrap();
        toast.success("Availability updated");
      } else if (durationMinutes === 60) {
        await dispatch(saveMyAvailability({ slots: buildMergedSlots() })).unwrap();
        await dispatch(fetchMyAvailability()).unwrap();
        toast.success("Availability added");
      } else {
        await dispatch(createAvailabilitySlot({ dayOfWeek, startTime })).unwrap();
        toast.success("Availability added");
      }
      resetForm();
    } catch (submitError) {
      toast.error(typeof submitError === "string" ? submitError : "Unable to save availability");
    }
  };

  const handleDelete = async (slotId: string) => {
    try {
      await dispatch(removeAvailabilitySlot(slotId)).unwrap();
      if (editingSlot?.id === slotId) {
        resetForm();
      }
      toast.success("Availability deleted");
    } catch (deleteError) {
      toast.error(typeof deleteError === "string" ? deleteError : "Unable to delete availability");
    }
  };

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-teal-300">Weekly Schedule</p>
          <h1 className="font-heading text-4xl font-black text-white">My Availability</h1>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-bold text-indigo-100">
          <CalendarClock className="h-4 w-4" aria-hidden="true" />
          {myAvailability.length} slots
        </span>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <AvailabilityForm
          dayOfWeek={dayOfWeek}
          durationMinutes={durationMinutes}
          editingSlot={editingSlot}
          isSaving={isAvailabilitySaving}
          selectableTimes={selectableTimes}
          startTime={startTime}
          onCancelEdit={resetForm}
          onDayChange={setDayOfWeek}
          onDurationChange={setDurationMinutes}
          onStartTimeChange={setStartTime}
          onSubmit={handleSubmit}
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="space-y-4"
        >
          {isAvailabilityLoading ? (
            <AvailabilitySkeleton />
          ) : myAvailability.length === 0 ? (
            <EmptyAvailabilityState />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {groupedSlots.map((day, dayIndex) =>
                day.slots.length > 0 ? (
                  <AvailabilityDayCard
                    key={day.value}
                    day={day}
                    index={dayIndex}
                    onDelete={(slotId) => void handleDelete(slotId)}
                    onEdit={handleEdit}
                  />
                ) : null,
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
