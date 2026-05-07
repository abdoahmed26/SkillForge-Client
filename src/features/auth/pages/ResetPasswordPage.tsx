import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { resetPassword } from "../store/authSlice";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../validations/passwordSchemas";

export function ResetPasswordPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({ resolver: zodResolver(resetPasswordSchema) });
  const token = watch("token");

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setValue("token", token);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await dispatch(resetPassword({ token: data.token, newPassword: data.newPassword })).unwrap();
      toast.success("Password reset successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Unable to reset password");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="font-heading text-2xl font-bold text-white">Reset password</h2>
        <p className="mt-2 text-sm text-slate-400">Choose a new password for your account.</p>
      </div>
      <input type="hidden" {...register("token")} />
      {!token || errors.token ? (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300">
          This reset link is missing or invalid. Request a new password reset email.
        </p>
      ) : null}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="newPassword">
          New password
        </label>
        <input
          id="newPassword"
          type="password"
          className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-white placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-slate-800 focus:ring-1 focus:ring-indigo-500"
          {...register("newPassword")}
        />
        {errors.newPassword ? <p className="mt-1.5 text-xs text-red-400">{errors.newPassword.message}</p> : null}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="confirmPassword">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-white placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-slate-800 focus:ring-1 focus:ring-indigo-500"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword ? <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword.message}</p> : null}
      </div>

      <button
        type="submit"
        disabled={isLoading || !token}
        className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-teal-400 px-4 py-3 font-semibold text-white shadow-glow transition-all hover:scale-[1.01] hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Resetting..." : "Reset password"}
      </button>
    </form>
  );
}
