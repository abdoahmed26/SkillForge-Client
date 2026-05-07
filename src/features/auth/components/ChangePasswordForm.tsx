import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { updatePassword } from "../store/authSlice";
import {
  updatePasswordSchema,
  type UpdatePasswordFormData,
} from "../validations/passwordSchemas";

export function ChangePasswordForm() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordFormData>({ resolver: zodResolver(updatePasswordSchema) });

  const onSubmit = async (data: UpdatePasswordFormData) => {
    try {
      await dispatch(
        updatePassword({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      ).unwrap();
      reset();
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Unable to update password");
    }
  };

  return (
    <form className="glass-dark rounded-lg p-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-indigo-500/15 text-indigo-200">
          <KeyRound className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-heading text-xl font-bold text-white">Update Password</h2>
          <p className="text-sm text-slate-400">Change the password for your account.</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-300" htmlFor="currentPassword">
            Current password
          </label>
          <input
            id="currentPassword"
            type="password"
            className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            {...register("currentPassword")}
          />
          {errors.currentPassword ? <p className="mt-1.5 text-xs text-red-400">{errors.currentPassword.message}</p> : null}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-300" htmlFor="newPassword">
            New password
          </label>
          <input
            id="newPassword"
            type="password"
            className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            {...register("newPassword")}
          />
          {errors.newPassword ? <p className="mt-1.5 text-xs text-red-400">{errors.newPassword.message}</p> : null}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-300" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword ? <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword.message}</p> : null}
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-gradient-to-r from-indigo-500 to-teal-400 px-5 py-3 text-sm font-bold text-white shadow-glow transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Updating..." : "Update password"}
        </button>
      </div>
    </form>
  );
}
