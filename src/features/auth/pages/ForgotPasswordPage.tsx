import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { forgotPassword } from "../store/authSlice";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../validations/passwordSchemas";

export function ForgotPasswordPage() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const response = await dispatch(forgotPassword(data)).unwrap();
      toast.success(response.message);
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Unable to request password reset");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="font-heading text-2xl font-bold text-white">Forgot password</h2>
        <p className="mt-2 text-sm text-slate-400">
          Enter your email and we will send you a reset link.
        </p>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-white placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-slate-800 focus:ring-1 focus:ring-indigo-500"
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email ? <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p> : null}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-teal-400 px-4 py-3 font-semibold text-white shadow-glow transition-all hover:scale-[1.01] hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Sending..." : "Send reset link"}
      </button>

      <p className="text-center text-sm text-slate-400">
        Remember your password?{" "}
        <Link className="font-semibold text-teal-400 transition-colors hover:text-teal-300" to="/login">
          Sign in
        </Link>
      </p>
    </form>
  );
}
