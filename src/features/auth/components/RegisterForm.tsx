import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { RegisterFormData, registerSchema } from "../validations/registerSchema";
import { GradientButton } from "../../../components/common/GradientButton";

export function RegisterForm() {
  const { register: registerAccount, isLoading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = (data: RegisterFormData) => registerAccount(data);

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="username">
          Username
        </label>
        <input 
          id="username" 
          className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-white placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-slate-800 focus:ring-1 focus:ring-indigo-500" 
          placeholder="johndoe"
          {...register("username")} 
        />
        {errors.username && <p className="mt-1.5 text-xs text-red-400">{errors.username.message}</p>}
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
        {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="password">
          Password
        </label>
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
        {isLoading ? "Creating account..." : "Create Account"}
      </GradientButton>
      <p className="text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link className="font-semibold text-teal-400 transition-colors hover:text-teal-300" to="/login">
          Sign In
        </Link>
      </p>
    </form>
  );
}
