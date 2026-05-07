import { motion } from "framer-motion";
import { Grid2X2, List, SearchX, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { CategoryCarousel } from "../components/CategoryCarousel";
import { EmptyState } from "../components/EmptyState";
import { FilterSidebar } from "../components/FilterSidebar";
import { SearchBar } from "../components/SearchBar";
import { SkillCard } from "../components/SkillCard";
import { SkillDetailModal } from "../components/SkillDetailModal";
import { SkillSkeleton } from "../components/SkillSkeleton";
import { SortSelector } from "../components/SortSelector";
import {
  clearMarketplace,
  clearSelectedSkill,
  fetchCategories,
  fetchMarketplaceSkills,
  fetchSkillDetail,
  setFilter,
} from "../store/skillsSlice";
import type { SkillFilters } from "../types/skill.types";

export function MarketplacePage() {
  const dispatch = useAppDispatch();
  const {
    marketplace,
    categories,
    selectedSkill,
    filters,
    isMarketplaceLoading,
    isDetailLoading,
  } = useAppSelector((state) => state.skills);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const debouncedSearch = useDebounce(filters.search, 300);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const { category, type, proficiency, sort } = filters;

  const requestParams = useMemo(
    () => ({
      category,
      type,
      proficiency,
      sort,
      search: debouncedSearch || undefined,
      limit: 20,
    }),
    [category, type, proficiency, sort, debouncedSearch],
  );

  const refreshMarketplace = useCallback(
    (nextFilters: Partial<SkillFilters> = {}) => {
      dispatch(setFilter(nextFilters));
      dispatch(clearMarketplace());
    },
    [dispatch],
  );

  useEffect(() => {
    void dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearMarketplace());
    void dispatch(fetchMarketplaceSkills(requestParams));
  }, [dispatch, requestParams]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (
        entry.isIntersecting &&
        marketplace.hasMore &&
        marketplace.nextCursor &&
        !isMarketplaceLoading
      ) {
        void dispatch(
          fetchMarketplaceSkills({
            ...requestParams,
            cursor: marketplace.nextCursor,
          }),
        );
      }
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [
    dispatch,
    isMarketplaceLoading,
    marketplace.hasMore,
    marketplace.nextCursor,
    requestParams,
  ]);

  const activePills = [
    filters.category && { label: filters.category.replace("_", " "), key: "category" },
    filters.type && { label: filters.type, key: "type" },
    filters.proficiency && { label: filters.proficiency, key: "proficiency" },
  ].filter(Boolean) as Array<{ label: string; key: keyof SkillFilters }>;

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-indigo-400">
            Explore
          </p>
          <h1 className="mt-2 font-heading text-4xl font-black text-white">
            Skill Marketplace
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <SortSelector
            value={filters.sort}
            onChange={(sort) => refreshMarketplace({ sort })}
          />
          <div className="flex rounded-xl border border-slate-700 bg-slate-800/70 p-1">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`rounded-lg px-3 py-2 transition ${
                viewMode === "grid"
                  ? "bg-slate-700 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
              aria-label="Grid view"
              aria-pressed={viewMode === "grid"}
              title="Grid view"
            >
              <Grid2X2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`rounded-lg px-3 py-2 transition ${
                viewMode === "list"
                  ? "bg-slate-700 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
              aria-label="List view"
              aria-pressed={viewMode === "list"}
              title="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <CategoryCarousel
        categories={categories}
        selectedCategory={filters.category}
        onSelect={(category) => refreshMarketplace({ category })}
      />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <FilterSidebar
          filters={filters}
          categories={categories}
          onFilterChange={refreshMarketplace}
        />

        <div className="space-y-5">
          <SearchBar
            value={filters.search}
            onChange={(search) => dispatch(setFilter({ search }))}
            isLoading={filters.search !== debouncedSearch}
          />

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
            <span>
              Showing {marketplace.items.length} of {marketplace.totalCount} skills
            </span>
            {activePills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {activePills.map((pill) => (
                  <button
                    type="button"
                    key={pill.key}
                    onClick={() => refreshMarketplace({ [pill.key]: null })}
                    className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-100"
                  >
                    {pill.label}
                    <X className="h-3 w-3" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {marketplace.items.length === 0 && !isMarketplaceLoading ? (
            <EmptyState
              title="No skills found"
              description="Try a different search term or clear your filters."
              icon={SearchX}
            />
          ) : (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
              className={
                viewMode === "grid"
                  ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                  : "grid gap-3"
              }
            >
              {marketplace.items.map((skill) => (
                <motion.div key={skill.id} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
                  <SkillCard
                    skill={skill}
                    variant={viewMode}
                    onClick={() => void dispatch(fetchSkillDetail(skill.id))}
                  />
                </motion.div>
              ))}
              {isMarketplaceLoading &&
                Array.from({ length: 6 }).map((_, index) => (
                  <SkillSkeleton key={`skeleton-${index}`} variant={viewMode} />
                ))}
            </motion.div>
          )}

          <div ref={sentinelRef} className="h-4" />
          {!marketplace.hasMore && marketplace.items.length > 0 && (
            <p className="py-6 text-center text-sm font-semibold text-slate-500">
              You've reached the end
            </p>
          )}
        </div>
      </div>

      <SkillDetailModal
        skill={selectedSkill}
        isOpen={Boolean(selectedSkill) || isDetailLoading}
        onClose={() => dispatch(clearSelectedSkill())}
      />
    </section>
  );
}
