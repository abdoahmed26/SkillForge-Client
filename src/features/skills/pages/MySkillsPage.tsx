import { AnimatePresence, motion } from "framer-motion";
import { Plus, Sparkles, X } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { suggestSkill } from "../api/skillsApi";
import { SkillAutocomplete } from "../components/SkillAutocomplete";
import { SkillChip } from "../components/SkillChip";
import {
  addUserSkill,
  fetchMySkills,
  removeUserSkill,
  updateUserSkill,
} from "../store/skillsSlice";
import {
  ProficiencyLevel,
  SkillCategory,
  SkillType,
  type Skill,
  type UserSkill,
} from "../types/skill.types";

const proficiencyOptions = Object.values(ProficiencyLevel);
const categoryOptions = Object.values(SkillCategory);

export function MySkillsPage() {
  const dispatch = useAppDispatch();
  const { mySkills, isLoading, error } = useAppSelector((state) => state.skills);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<UserSkill | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [type, setType] = useState(SkillType.TEACH);
  const [proficiency, setProficiency] = useState(ProficiencyLevel.BEGINNER);
  const [suggestionName, setSuggestionName] = useState("");
  const [suggestionCategory, setSuggestionCategory] = useState(SkillCategory.FRONTEND);

  useEffect(() => {
    void dispatch(fetchMySkills());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const teachSkills = useMemo(
    () => mySkills.filter((skill) => skill.type === SkillType.TEACH),
    [mySkills],
  );
  const learnSkills = useMemo(
    () => mySkills.filter((skill) => skill.type === SkillType.LEARN),
    [mySkills],
  );

  const closeAdd = () => {
    setIsAddOpen(false);
    setSelectedSkill(null);
    setType(SkillType.TEACH);
    setProficiency(ProficiencyLevel.BEGINNER);
    setSuggestionName("");
  };

  const handleAdd = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedSkill) {
      toast.error("Choose a skill first");
      return;
    }
    await dispatch(addUserSkill({ skillId: selectedSkill.id, type, proficiency })).unwrap();
    toast.success("Skill added");
    closeAdd();
  };

  const handleEdit = async (event: FormEvent) => {
    event.preventDefault();
    if (!editingSkill) {
      return;
    }
    await dispatch(
      updateUserSkill({
        id: editingSkill.id,
        data: { proficiency },
      }),
    ).unwrap();
    toast.success("Skill updated");
    setEditingSkill(null);
  };

  const handleSuggest = async () => {
    if (!suggestionName.trim()) {
      return;
    }
    await suggestSkill({ name: suggestionName.trim(), category: suggestionCategory });
    toast.success("Skill suggested! It will appear after admin approval.");
    setSuggestionName("");
    closeAdd();
  };

  const renderGroup = (title: string, skills: UserSkill[]) => (
    <section className="rounded-lg glass-dark p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold text-white">{title}</h2>
        <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-bold text-slate-400">
          {skills.length}
        </span>
      </div>
      {skills.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {skills.map((userSkill) => (
            <motion.div key={userSkill.id} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
              <SkillChip
                userSkill={userSkill}
                onEdit={() => {
                  setEditingSkill(userSkill);
                  setProficiency(userSkill.proficiency);
                }}
                onRemove={() => {
                  void dispatch(removeUserSkill(userSkill.id))
                    .unwrap()
                    .then(() => toast.success("Skill removed"));
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 text-sm text-slate-400">
          No skills here yet.
        </p>
      )}
    </section>
  );

  return (
    <section className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-indigo-400">
            Profile Skills
          </p>
          <h1 className="mt-2 font-heading text-4xl font-black text-white">
            My Skills
          </h1>
        </div>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-teal-400 px-5 py-3 text-sm font-bold text-white shadow-glow transition hover:opacity-90"
        >
          <Plus className="h-5 w-5" />
          Add Skill
        </motion.button>
      </div>

      {isLoading ? (
        <div className="rounded-lg glass-dark p-8 text-slate-300">Loading skills...</div>
      ) : (
        <>
          {renderGroup("Skills I Teach", teachSkills)}
          {renderGroup("Skills I Want to Learn", learnSkills)}
        </>
      )}

      <AnimatePresence>
        {isAddOpen && (
          <motion.div className="fixed inset-0 z-[100] flex items-end bg-slate-950/80 backdrop-blur-sm sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.form onSubmit={handleAdd} className="glass-dark w-full rounded-t-lg p-5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:p-6" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }}>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-heading text-2xl font-bold text-white">Add Skill</h2>
                <button type="button" onClick={closeAdd} className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white" aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-5">
                <SkillAutocomplete
                  onSelect={setSelectedSkill}
                  onNoResults={(query) => setSuggestionName(query)}
                />
                {suggestionName && (
                  <div className="rounded-lg border border-indigo-400/30 bg-indigo-500/10 p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-bold text-indigo-100">
                      <Sparkles className="h-4 w-4" />
                      Suggest "{suggestionName}"
                    </div>
                    <select value={suggestionCategory} onChange={(event) => setSuggestionCategory(event.target.value as SkillCategory)} className="mb-3 w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white">
                      {categoryOptions.map((category) => (
                        <option key={category} value={category}>{category.replace("_", " ")}</option>
                      ))}
                    </select>
                    <button type="button" onClick={handleSuggest} className="rounded-xl bg-gradient-to-r from-indigo-500 to-teal-400 px-4 py-2 text-sm font-bold text-white">
                      Submit Suggestion
                    </button>
                  </div>
                )}
                <div className="grid grid-cols-2 rounded-xl border border-slate-700 bg-slate-800/40 p-1">
                  {[SkillType.TEACH, SkillType.LEARN].map((item) => (
                    <button key={item} type="button" onClick={() => setType(item)} className={`rounded-lg px-4 py-2 text-sm font-bold ${type === item ? "bg-gradient-to-r from-indigo-500 to-teal-400 text-white" : "text-slate-400"}`}>
                      {item}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {proficiencyOptions.map((item) => (
                    <button key={item} type="button" onClick={() => setProficiency(item)} className={`rounded-xl border px-3 py-2 text-sm font-bold ${proficiency === item ? "border-teal-300 bg-teal-500/20 text-teal-100" : "border-slate-700 bg-slate-800/70 text-slate-300"}`}>
                      {item}
                    </button>
                  ))}
                </div>
                <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-teal-400 px-4 py-3 text-sm font-bold text-white shadow-glow">
                  Add to Profile
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}

        {editingSkill && (
          <motion.div className="fixed inset-0 z-[100] flex items-end bg-slate-950/80 backdrop-blur-sm sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.form onSubmit={handleEdit} className="glass-dark w-full rounded-t-lg p-5 sm:mx-auto sm:max-w-md sm:rounded-lg sm:p-6" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }}>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-heading text-2xl font-bold text-white">Edit Skill</h2>
                <button type="button" onClick={() => setEditingSkill(null)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white" aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {proficiencyOptions.map((item) => (
                  <button key={item} type="button" onClick={() => setProficiency(item)} className={`rounded-xl border px-3 py-2 text-sm font-bold ${proficiency === item ? "border-teal-300 bg-teal-500/20 text-teal-100" : "border-slate-700 bg-slate-800/70 text-slate-300"}`}>
                    {item}
                  </button>
                ))}
              </div>
              <button type="submit" className="mt-5 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-teal-400 px-4 py-3 text-sm font-bold text-white shadow-glow">
                Save Changes
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
