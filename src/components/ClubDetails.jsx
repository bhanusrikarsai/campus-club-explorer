import React, { useState } from 'react';
import {
  Share2,
  Heart,
  X,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Check,
  UserPlus
} from 'lucide-react';
import { CategoryBadge } from './ClubCard';

export function EventItem({ event, clubName, isRsvpd, onToggleRsvp }) {
  return (
    <div className="p-3.5 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-start space-x-3">
        <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-xl px-2.5 py-2 text-center min-w-[50px] shrink-0">
          <span className="text-[10px] uppercase font-bold tracking-wider block">
            {event.date.split(' ')[0]}
          </span>
          <span className="text-base font-extrabold leading-none">
            {event.date.split(' ')[1]}
          </span>
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-900 mb-0.5">{event.title}</h4>
          {clubName && <p className="text-[11px] text-indigo-600 font-medium mb-1">{clubName}</p>}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{event.time}</span>
            </span>
            <span className="flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>{event.room}</span>
            </span>
            <span className="flex items-center space-x-1 text-slate-600 font-medium">
              <Users className="w-3 h-3 text-slate-400" />
              <span>{event.rsvps + (isRsvpd ? 1 : 0)} Attending</span>
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onToggleRsvp(event.id)}
        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 self-start sm:self-center ${
          isRsvpd
            ? 'bg-emerald-600 text-white shadow-sm'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
        }`}
      >
        {isRsvpd ? '✓ RSVP Attending' : '+ RSVP'}
      </button>
    </div>
  );
}

export function JoinApplicationModal({ club, isOpen, onClose, onConfirmJoin }) {
  const [name, setName] = useState('Alex Rivers');
  const [email, setEmail] = useState('a.rivers@apex.edu');
  const [major, setMajor] = useState('Computer Science');
  const [year, setYear] = useState('Sophomore');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !club) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirmJoin(club.id);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`p-6 bg-gradient-to-r ${club.categoryTheme} text-white relative`}>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
          <span className="text-[11px] uppercase tracking-wider font-bold bg-white/20 px-2 py-0.5 rounded-full mb-2 inline-block">
            Member Enrollment
          </span>
          <h3 className="text-xl font-black">{club.name}</h3>
          <p className="text-xs text-white/90 mt-1">
            Express interest to receive meeting updates, Discord invites, and project allocations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Full Student Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Campus Email (@apex.edu)</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Class Standing</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 bg-white"
              >
                <option value="Freshman">Freshman (1st Year)</option>
                <option value="Sophomore">Sophomore (2nd Year)</option>
                <option value="Junior">Junior (3rd Year)</option>
                <option value="Senior">Senior (4th Year)</option>
                <option value="Graduate">Graduate Student</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Major / Area of Study</label>
            <input
              type="text"
              required
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Why do you want to join? (Optional)
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Tell the leadership what you hope to learn or work on..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center space-x-1.5 transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Registering...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Submit Interest Form</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ClubDetails({
  club,
  isOpen,
  onClose,
  isSaved,
  isJoined,
  onToggleSave,
  onOpenJoinForm,
  onLeaveClub,
  rsvpEvents,
  onToggleRsvp,
  onShareClub
}) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !club) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Banner Header */}
        <div
          className={`relative h-40 sm:h-48 bg-gradient-to-r ${club.categoryTheme} p-6 flex flex-col justify-between text-white`}
        >
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center space-x-2">
              <CategoryBadge category={club.category} />
              {club.isRecruiting && (
                <span className="bg-emerald-500/90 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
                  Recruiting until {club.recruitmentDeadline}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onShareClub(club)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition"
                title="Share club details"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onToggleSave(club.id)}
                className={`p-2 rounded-full backdrop-blur-sm transition ${
                  isSaved
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
                title={isSaved ? 'Bookmarked' : 'Add bookmark'}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="z-10">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1">
              {club.name}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 font-medium max-w-xl">
              {club.tagline}
            </p>
          </div>
        </div>

        {/* Modal Nav Tabs */}
        <div className="flex items-center border-b border-slate-200 px-6 bg-slate-50/60 text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 transition ${
              activeTab === 'overview'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Overview & Story
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`py-3 px-3 border-b-2 transition flex items-center space-x-1.5 ${
              activeTab === 'events'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <span>Upcoming Workshops & Events</span>
            <span className="bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded-full text-[10px]">
              {club.upcomingEvents.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('leadership')}
            className={`py-3 px-3 border-b-2 transition ${
              activeTab === 'leadership'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Leadership Team
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 text-sm">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Meeting Cadence
                  </span>
                  <div className="flex items-center space-x-2 text-slate-900 font-semibold text-xs">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    <span>{club.meetingCadence}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Meeting Location
                  </span>
                  <div className="flex items-center space-x-2 text-slate-900 font-semibold text-xs">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    <span className="truncate">{club.location}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Club Community
                  </span>
                  <div className="flex items-center space-x-2 text-slate-900 font-semibold text-xs">
                    <Users className="w-4 h-4 text-indigo-500" />
                    <span>
                      {club.membersCount} Members (Est. {club.founded})
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  About Our Mission
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                  {club.description}
                </p>
              </div>

              {/* Requirements & Joining info */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Requirements & Eligibility
                </h4>
                <ul className="space-y-2">
                  {club.requirements.map((req, i) => (
                    <li
                      key={i}
                      className="flex items-start space-x-2.5 text-xs text-slate-600"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Key Skills & Focus Areas
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {club.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold border border-indigo-100/80"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                All Apex students are invited to drop in on our workshops and
                meetings. RSVP to sync with your calendar!
              </p>
              <div className="space-y-3">
                {club.upcomingEvents.map((ev) => (
                  <EventItem
                    key={ev.id}
                    event={ev}
                    isRsvpd={rsvpEvents.includes(ev.id)}
                    onToggleRsvp={onToggleRsvp}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leadership' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Connect with our executive board for questions regarding
                recruitment, project teams, and sponsorships.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {club.leadership.map((lead, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl border border-slate-200/90 bg-slate-50/50 flex items-center space-x-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {lead.avatar}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">
                        {lead.name}
                      </h5>
                      <p className="text-[11px] font-semibold text-indigo-600">
                        {lead.role}
                      </p>
                      <p className="text-[10px] text-slate-400">{lead.major}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-indigo-900 block">
                    Have specific questions?
                  </span>
                  <span className="text-xs text-indigo-700">
                    Official contact: {club.contactEmail}
                  </span>
                </div>
                <a
                  href={`mailto:${club.contactEmail}`}
                  className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition"
                >
                  Email E-Board
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom Controls */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 transition"
          >
            Close
          </button>

          <div className="flex items-center space-x-2">
            {isJoined && (
              <button
                onClick={() => onLeaveClub(club.id)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition"
              >
                Leave Club
              </button>
            )}

            {isJoined ? (
              <span className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-sm">
                <Check className="w-4 h-4" />
                <span>You are an Enrolled Member</span>
              </span>
            ) : (
              <button
                onClick={() => onOpenJoinForm(club)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition flex items-center space-x-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>Express Interest / Join Now</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}