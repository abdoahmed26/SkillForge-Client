import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoginFormData, loginSchema } from "../validations/loginSchema";
import { GradientButton } from "../../../components/common/GradientButton";

export function LoginForm() {
  const { login, isLoading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginFormData) => login(data);

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
        {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
      </div>
      <div>
        <div className="mb-1.5 flex items-center justify-between gap-3">
          <label className="block text-sm font-medium text-slate-300" htmlFor="password">
            Password
          </label>
          <Link className="text-xs font-semibold text-teal-400 transition-colors hover:text-teal-300" to="/forgot-password">
            Forgot password?
          </Link>
        </div>
        <input 
          id="password" 
          type="password" 
          className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-white placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-slate-800 focus:ring-1 focus:ring-indigo-500" 
          placeholder="••••••••"
          {...register("password")} 
        />
        {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password.message}</p>}
      </div>
      {error && <p className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">{error}</p>}
      <GradientButton
        variant="primary"
        type="submit" 
        disabled={isLoading} 
        className="mt-2 w-full"
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </GradientButton>
      <p className="text-center text-sm text-slate-400">
        Don&apos;t have an account?{" "}
        <Link className="font-semibold text-teal-400 transition-colors hover:text-teal-300" to="/register">
          Register
        </Link>
      </p>
    </form>
  );
}
