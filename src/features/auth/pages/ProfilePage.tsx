import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { ChangePasswordForm } from "../components/ChangePasswordForm";
import { updateProfile, uploadAvatar } from "../store/authSlice";
import { Camera } from "lucide-react";
import { ReviewList } from "../../reviews/components/ReviewList";
import { loadUserReviews } from "../../reviews/store/reviewsSlice";
import { AnimatedPage } from "../../../components/common/AnimatedPage";
import { GradientButton } from "../../../components/common/GradientButton";

const profileSchema = z.object({
  displayName: z.string().max(100, "Display name must be 100 characters or fewer").optional(),
  bio: z.string().max(500, "Bio must be 500 characters or fewer").optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfilePage() {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);
  const { response: reviewResponse, isLoading: isReviewsLoading } = useAppSelector((state) => state.reviews);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({ resolver: zodResolver(profileSchema) });

  useEffect(() => {
    reset({
      displayName: user?.displayName ?? "",
      bio: user?.bio ?? "",
    });
  }, [reset, user]);

  useEffect(() => {
    if (user?.id) {
      void dispatch(loadUserReviews({ userId: user.id }));
    }
  }, [dispatch, user?.id]);

  const onSubmit = async (data: ProfileFormData) => {
    await dispatch(updateProfile(data)).unwrap();
    toast.success("Profile saved successfully");
  };

  const onAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    await dispatch(uploadAvatar(file)).unwrap();
    toast.success("Avatar updated successfully");
  };

  return (
    <AnimatedPage className="space-y-8">
      <motion.section 
        className="grid gap-8 lg:grid-cols-[300px_1fr]"
      >
        <aside className="rounded-[2rem] border border-white/10 glass-dark p-8 shadow-soft">
          <div className="relative mx-auto h-36 w-36">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.username} className="h-full w-full rounded-full object-cover shadow-md ring-4 ring-slate-800" />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-teal-400 text-5xl font-bold text-white shadow-md ring-4 ring-slate-800">
                {user?.username?.[0]?.toUpperCase() ?? "S"}
              </div>
            )}
            <label className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg ring-4 ring-slate-800 transition-transform hover:scale-110 hover:bg-indigo-400">
              <Camera className="h-5 w-5" />
              <input className="hidden" type="file" accept="image/jpeg,image/png,image/webp" onChange={onAvatarChange} />
            </label>
          </div>
          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold text-white">{user?.displayName || user?.username}</h2>
            <p className="text-sm font-medium text-indigo-300">Level {user?.level ?? 1} Developer</p>
          </div>
          <div className="mt-8 rounded-xl bg-slate-800/50 p-4 border border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-400">XP</span>
              <span className="font-bold text-teal-400">{user?.xp ?? 0}</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-700">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-teal-400" style={{ width: '15%' }} />
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-slate-800/50 p-4 border border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-400">Rating</span>
              <span className="font-bold text-teal-400">
                {Number(user?.averageRating ?? reviewResponse?.averageRating ?? 0).toFixed(1)}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {user?.totalReviewCount ?? reviewResponse?.totalReviewCount ?? 0} reviews received
            </p>
          </div>
        </aside>
        <form className="rounded-[2rem] border border-white/10 glass-dark p-8 shadow-soft" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
          <p className="mt-1 text-sm text-slate-400">Update your personal information and bio.</p>
          
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-300">Username</label>
              <input value={user?.username ?? ""} disabled className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-slate-400 opacity-70 cursor-not-allowed" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-300">Email</label>
              <input value={user?.email ?? ""} disabled className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-slate-400 opacity-70 cursor-not-allowed" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-semibold text-slate-300" htmlFor="displayName">
                Display Name
              </label>
              <input 
                id="displayName" 
                className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-white placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:bg-slate-800 focus:ring-1 focus:ring-indigo-500" 
                {...register("displayName")} 
              />
              {errors.displayName && <p className="mt-1.5 text-xs text-red-400">{errors.displayName.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-semibold text-slate-300" htmlFor="bio">
                Bio
              </label>
              <textarea 
                id="bio" 
                rows={4} 
                className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-white placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:bg-slate-800 focus:ring-1 focus:ring-indigo-500" 
                placeholder="Tell others about your skills and goals..."
                {...register("bio")} 
              />
              {errors.bio && <p className="mt-1.5 text-xs text-red-400">{errors.bio.message}</p>}
            </div>
          </div>
          {error && <p className="mt-6 rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm font-medium text-red-400">{error}</p>}
          
          <div className="mt-8 flex justify-end">
            <GradientButton 
              variant="primary"
              type="submit" 
              disabled={isLoading} 
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </GradientButton>
          </div>
        </form>
        <div className="lg:col-span-2">
          <ChangePasswordForm />
        </div>
        <div className="lg:col-span-2">
          <div className="mb-4">
            <h2 className="font-heading text-2xl font-bold text-white">Reviews Received</h2>
            <p className="mt-1 text-sm text-slate-400">Feedback other users added after completed sessions.</p>
          </div>
          <ReviewList response={reviewResponse} isLoading={isReviewsLoading} />
        </div>
      </motion.section>
    </AnimatedPage>
  );
}
