import React from 'react';
import {
  Search,
  X,
  SlidersHorizontal,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

export default function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  recruitingOnly,
  onToggleRecruiting,
  sortBy,
  onSortChange,
  categoryCounts,
  onResetFilters,
  totalResults,
  categories
}) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/90 mb-8 space-y-4">
      {/* Top Search & Controls Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search clubs by name, keywords, tech, topics (e.g., 'Python', 'Trail', 'Design')..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800 placeholder-slate-400 transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Toggles */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* Recruitment Toggle */}
          <button
            onClick={onToggleRecruiting}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
              recruitingOnly
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm ring-1 ring-emerald-400'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                recruitingOnly ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
              }`}
            />
            <span>Recruiting Now</span>
          </button>

          {/* Sort Dropdown */}
          <div className="relative flex items-center">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="pl-8 pr-7 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="name">Name (A - Z)</option>
              <option value="members">Highest Membership</option>
            </select>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none rotate-90" />
          </div>

          {/* Active Filter Clear if filters present */}
          {(searchQuery || selectedCategory !== 'All' || recruitingOnly) && (
            <button
              onClick={onResetFilters}
              className="flex items-center space-x-1 px-2.5 py-2 text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none text-xs">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] ?? 0;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap flex items-center space-x-1.5 px-3 py-1.5 rounded-full font-medium transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-900'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-300' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isSelected ? 'bg-slate-700 text-indigo-200' : 'bg-slate-200/90 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result feedback */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <span>
          Showing <strong className="text-slate-800 font-semibold">{totalResults}</strong> campus club{totalResults === 1 ? '' : 's'}
        </span>
        {selectedCategory !== 'All' && (
          <span className="text-slate-400">
            Filtered by: <span className="font-semibold text-indigo-600">{selectedCategory}</span>
          </span>
        )}
      </div>
    </div>
  );
}