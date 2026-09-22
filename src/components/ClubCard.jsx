import React from 'react';
import {
  Clock,
  Heart,
  CheckCircle2,
  MapPin,
  Users,
  ChevronRight,
  Check,
  UserPlus
} from 'lucide-react';

export function CategoryBadge({ category }) {
  const getBadgeClass = (cat) => {
    switch (cat) {
      case 'Coding':
        return 'bg-blue-50 text-blue-700 border-blue-200/80';
      case 'Entrepreneurship':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'Arts':
        return 'bg-purple-50 text-purple-700 border-purple-200/80';
      case 'Sports':
        return 'bg-amber-50 text-amber-800 border-amber-200/80';
      case 'Social Impact':
        return 'bg-teal-50 text-teal-800 border-teal-200/80';
      case 'Gaming':
        return 'bg-rose-50 text-rose-700 border-rose-200/80';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeClass(
        category
      )}`}
    >
      {category}
    </span>
  );
}

export default function ClubCard({
  club,
  isSaved,
  isJoined,
  onToggleSave,
  onViewDetails,
  onQuickJoin
}) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-lg hover:border-slate-300 transition-all flex flex-col justify-between relative">
      {/* Top Banner Gradient with Accent */}
      <div
        className={`h-24 bg-gradient-to-r ${club.categoryTheme} p-3.5 flex justify-between items-start relative`}
      >
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none transform translate-x-10 -translate-y-8" />

        {/* Recruitment status pill */}
        <div className="z-10">
          {club.isRecruiting ? (
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/90 text-white backdrop-blur-md shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>Recruiting ({club.recruitmentDeadline})</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/40 text-slate-200 backdrop-blur-md">
              <Clock className="w-3 h-3 text-slate-300" />
              <span>Waitlist Only</span>
            </span>
          )}
        </div>

        {/* Bookmark Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(club.id);
          }}
          className={`z-10 p-2 rounded-full backdrop-blur-md transition ${
            isSaved
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-black/30 text-white hover:bg-black/50'
          }`}
          title={isSaved ? 'Remove from bookmarks' : 'Bookmark this club'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Main Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Header with Title and Category */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <CategoryBadge category={club.category} />
          {isJoined && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              <CheckCircle2 className="w-3 h-3 text-indigo-600" />
              <span>MEMBER</span>
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-1.5">
          {club.name}
        </h3>

        <p className="text-xs text-slate-600 line-clamp-2 mb-3.5 leading-relaxed">
          {club.tagline}
        </p>

        {/* Meeting & Location Info */}
        <div className="space-y-1.5 mb-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{club.meetingCadence}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{club.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              <strong className="font-semibold text-slate-700">
                {club.membersCount}
              </strong>{' '}
              active members
            </span>
          </div>
        </div>

        {/* Tag chips */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2 mb-4">
          {club.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md font-medium transition"
            >
              #{tag}
            </span>
          ))}
          {club.tags.length > 3 && (
            <span className="text-[10px] px-1.5 py-0.5 text-slate-400 font-medium">
              +{club.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-4 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onViewDetails(club)}
          className="text-xs font-semibold text-slate-700 hover:text-indigo-600 flex items-center space-x-1 py-1.5 transition"
        >
          <span>Explore Details</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {isJoined ? (
          <button
            onClick={() => onViewDetails(club)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition flex items-center space-x-1"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Enrolled</span>
          </button>
        ) : (
          <button
            onClick={() => onQuickJoin(club)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-indigo-600 shadow-sm transition flex items-center space-x-1"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Join</span>
          </button>
        )}
      </div>
    </div>
  );
}