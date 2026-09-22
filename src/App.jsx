import React, { useState, useMemo, useEffect } from 'react';
import FilterBar from './components/FilterBar';
import ClubCard from './components/ClubCard';
import ClubDetails, { JoinApplicationModal, EventItem } from './components/ClubDetails';
import {
  Compass,
  Bookmark,
  Calendar,
  Sparkles,
  Flame,
  Layers,
  Users,
  Award,
  Search,
  RotateCcw,
  UserPlus,
  Code2,
  Rocket,
  Palette,
  Dumbbell,
  Globe,
  Gamepad2,
  ChevronRight,
  X
} from 'lucide-react';
import './App.css';

const INITIAL_CLUBS = [
  {
    id: 'club-1',
    name: 'Apex Algobots & AI Society',
    category: 'Coding',
    categoryColor: 'bg-blue-100 text-blue-700 border-blue-200',
    categoryTheme: 'from-blue-600 to-indigo-700',
    tagline: 'Building neural nets, competitive robotics, and autonomous campus rovers.',
    description: 'We are the premier tech guild at Apex State University. From building autonomous navigation bots to hosting 48-hour hackathons and hosting paper reading groups on generative models, we bridge academic theory with real engineering experience.',
    membersCount: 148,
    meetingCadence: 'Every Thursday, 6:00 PM',
    location: 'Turing Hall, Rm 304 & Discord',
    isRecruiting: true,
    recruitmentDeadline: 'Sept 30',
    accentColor: 'indigo',
    tags: ['Artificial Intelligence', 'Robotics', 'Python', 'Hackathons', 'Open Source'],
    leadership: [
      { name: 'Elena Vance', role: 'President', major: 'CS & Robotics, Senior', avatar: 'EV' },
      { name: 'Kavita Patel', role: 'Tech Lead', major: 'Data Science, Junior', avatar: 'KP' },
      { name: 'Marcus Chen', role: 'Operations', major: 'Elec. Engineering, Senior', avatar: 'MC' }
    ],
    upcomingEvents: [
      { id: 'ev-1', title: 'Intro to Autonomous Navigation with ROS2', date: 'Oct 04', time: '6:30 PM', room: 'Turing 304', rsvps: 42 },
      { id: 'ev-2', title: 'Fall ApexHackathon 2026 Pitch & Team Forming', date: 'Oct 15', time: '5:00 PM', room: 'Student Union Ballroom', rsvps: 110 }
    ],
    requirements: ['Open to all majors & skill levels', 'No prior coding required for beginner track', 'Regular weekly participation encouraged'],
    contactEmail: 'algobots@apex.edu',
    founded: 2019
  },
  {
    id: 'club-2',
    name: 'Apex Venture Lab & Incubator',
    category: 'Entrepreneurship',
    categoryColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    categoryTheme: 'from-emerald-600 to-teal-700',
    tagline: 'Student-led micro-funds, startup accelerators, and angel pitch nights.',
    description: 'Venture Lab provides aspiring founders with seed micro-grants, legal incorporation clinics, mentorship from Silicon Valley alumni, and weekly teardowns of business models. Over $1.2M raised by member alumni.',
    membersCount: 95,
    meetingCadence: 'Tuesdays at 7:00 PM',
    location: 'Keller Innovation Center, Rm 110',
    isRecruiting: true,
    recruitmentDeadline: 'Oct 08',
    accentColor: 'emerald',
    tags: ['Startups', 'Venture Capital', 'Product Design', 'Pitching', 'Networking'],
    leadership: [
      { name: 'David Kim', role: 'Managing Partner', major: 'Economics & CS, Senior', avatar: 'DK' },
      { name: 'Sophia Reynolds', role: 'Head of Accelerator', major: 'Finance, Junior', avatar: 'SR' }
    ],
    upcomingEvents: [
      { id: 'ev-3', title: 'From Dorm to Seed Round: Alumni Panel', date: 'Oct 02', time: '7:00 PM', room: 'Keller 110', rsvps: 64 },
      { id: 'ev-4', title: 'Apex Shark Tank Demo Night', date: 'Nov 12', time: '6:00 PM', room: 'Alumni Auditorium', rsvps: 180 }
    ],
    requirements: ['Passion for venture building', 'Willingness to present ideas', 'Team player mindset'],
    contactEmail: 'venturelab@apex.edu',
    founded: 2017
  },
  {
    id: 'club-3',
    name: 'Prism Digital Arts & Animation',
    category: 'Arts',
    categoryColor: 'bg-purple-100 text-purple-700 border-purple-200',
    categoryTheme: 'from-fuchsia-600 to-purple-800',
    tagline: '3D modeling, Blender jams, indie game assets, and gallery exhibitions.',
    description: 'A vibrant collective for digital artists, concept illustrators, motion designers, and Blender sculptors. We host live speed-sculpts, UI/UX design crits, and produce an annual campus digital art showcase and zine.',
    membersCount: 112,
    meetingCadence: 'Wednesdays at 5:30 PM',
    location: 'Fine Arts Complex, Studio B-12',
    isRecruiting: true,
    recruitmentDeadline: 'Rolling',
    accentColor: 'purple',
    tags: ['Blender 3D', 'Digital Illustration', 'UI/UX', 'Concept Art', 'Game Assets'],
    leadership: [
      { name: 'Maya Lin', role: 'Creative Director', major: 'Digital Media Arts, Senior', avatar: 'ML' },
      { name: 'Liam O’Connor', role: 'Workshop Coordinator', major: 'Graphic Design, Junior', avatar: 'LO' }
    ],
    upcomingEvents: [
      { id: 'ev-5', title: 'Hands-On Blender: Hard Surface Sci-Fi Props', date: 'Oct 07', time: '5:30 PM', room: 'Studio B-12', rsvps: 38 },
      { id: 'ev-6', title: 'Mid-Semester Portfolio Review & Pizza', date: 'Oct 21', time: '6:00 PM', room: 'Gallery Lounge', rsvps: 45 }
    ],
    requirements: ['Any digital or traditional artists welcome', 'Free tablet loaners available upon request'],
    contactEmail: 'prismarts@apex.edu',
    founded: 2020
  },
  {
    id: 'club-4',
    name: 'Apex Velocity Trail & Track Club',
    category: 'Sports',
    categoryColor: 'bg-amber-100 text-amber-800 border-amber-200',
    categoryTheme: 'from-amber-500 to-orange-600',
    tagline: 'Casual trail jogs, weekend sunrise 5Ks, and half-marathon conditioning.',
    description: 'We believe running is best shared! We organize 3 pace groups for all levels: beginner run-walkers, intermediate tempo runners, and trail adventurers. Post-run boba and bagels every Saturday morning are an institution.',
    membersCount: 220,
    meetingCadence: 'Mon/Thu 7:00 AM & Sat 8:30 AM',
    location: 'South Quad Fountain Plaza',
    isRecruiting: true,
    recruitmentDeadline: 'Open Year-Round',
    accentColor: 'amber',
    tags: ['Fitness', 'Running', 'Mental Health', 'Outdoors', 'Community'],
    leadership: [
      { name: 'Zack Taylor', role: 'Captain', major: 'Kinesiology, Senior', avatar: 'ZT' },
      { name: 'Amara Nwosu', role: 'Pace Leader', major: 'Biology, Junior', avatar: 'AN' }
    ],
    upcomingEvents: [
      { id: 'ev-7', title: 'Campus Sunset 5K & Acai Bowl Social', date: 'Oct 05', time: '6:00 PM', room: 'South Quad Fountain', rsvps: 88 },
      { id: 'ev-8', title: 'Redwood Valley Trail Half-Day Excursion', date: 'Oct 18', time: '7:30 AM', room: 'Bus Loop 2', rsvps: 52 }
    ],
    requirements: ['Running shoes and enthusiasm', 'Zero mileage experience required!'],
    contactEmail: 'velocity@apex.edu',
    founded: 2018
  },
  {
    id: 'club-5',
    name: 'EcoApex Sustainability Collective',
    category: 'Social Impact',
    categoryColor: 'bg-teal-100 text-teal-800 border-teal-200',
    categoryTheme: 'from-teal-600 to-emerald-800',
    tagline: 'Zero-waste advocacy, campus rooftop farm, and renewable energy policy.',
    description: 'Championing environmental justice and sustainable campus policies. EcoApex manages the Student Union rooftop honeybee apiary, organizes monthly local river cleanups, and works directly with university administrators on net-zero goals.',
    membersCount: 88,
    meetingCadence: 'Mondays at 6:30 PM',
    location: 'Green Science Quad, Greenhouse 2',
    isRecruiting: false,
    recruitmentDeadline: 'Spring 2027',
    accentColor: 'teal',
    tags: ['Sustainability', 'Climate Action', 'Urban Farming', 'Policy', 'Volunteering'],
    leadership: [
      { name: 'Tara Al-Mansoor', role: 'Chairperson', major: 'Environmental Science, Senior', avatar: 'TA' },
      { name: 'Chloe Becker', role: 'Garden Manager', major: 'Agronomy, Junior', avatar: 'CB' }
    ],
    upcomingEvents: [
      { id: 'ev-9', title: 'Autumn Harvest & Organic Herb Distillation', date: 'Oct 09', time: '4:00 PM', room: 'Greenhouse 2', rsvps: 34 }
    ],
    requirements: ['Interest in environmental stewardship', '1 volunteer shift per month'],
    contactEmail: 'ecoapex@apex.edu',
    founded: 2016
  },
  {
    id: 'club-6',
    name: 'Apex Esports & Gaming Syndicate',
    category: 'Gaming',
    categoryColor: 'bg-rose-100 text-rose-700 border-rose-200',
    categoryTheme: 'from-rose-600 to-red-800',
    tagline: 'Varsity collegiate esports, casual LAN parties, and board game marathons.',
    description: 'Home of the national title-holding Apex Phoenixes. We host weekly Smash Ultimate locals, Valorant and Rocket League intramurals, plus a 400+ board game library in the gaming den with consoles and high-spec rigs.',
    membersCount: 310,
    meetingCadence: 'Fridays from 7:00 PM onwards',
    location: 'Gamers Den, Student Center B-4',
    isRecruiting: true,
    recruitmentDeadline: 'Oct 15',
    accentColor: 'rose',
    tags: ['Esports', 'Smash Bros', 'Valorant', 'Board Games', 'LAN Parties'],
    leadership: [
      { name: 'Jordan Rivera', role: 'Syndicate Lead', major: 'Computer Engineering, Senior', avatar: 'JR' },
      { name: 'Samira Gomez', role: 'Tournament Director', major: 'Communications, Junior', avatar: 'SG' }
    ],
    upcomingEvents: [
      { id: 'ev-10', title: 'Inter-Collegiate Smash Bros Ultimate Open', date: 'Oct 11', time: '6:30 PM', room: 'Student Center B-4', rsvps: 96 },
      { id: 'ev-11', title: 'Midnight Board Game & Pizza Marathon', date: 'Oct 24', time: '8:00 PM', room: 'Student Lounge', rsvps: 60 }
    ],
    requirements: ['Respect for community guidelines', 'Open to competitive and casual gamers alike'],
    contactEmail: 'esports@apex.edu',
    founded: 2015
  },
  {
    id: 'club-7',
    name: 'DevCraft Web & Mobile Studio',
    category: 'Coding',
    categoryColor: 'bg-blue-100 text-blue-700 border-blue-200',
    categoryTheme: 'from-sky-600 to-blue-700',
    tagline: 'Shipping real applications for campus clubs, non-profits, and students.',
    description: 'We operate like a modern boutique digital agency within the university. Teams of designers, developers, and product leads collaborate on live web and mobile apps that serve the local campus community.',
    membersCount: 130,
    meetingCadence: 'Wednesdays at 7:00 PM',
    location: 'Lovelace CS Lab, Rm 102',
    isRecruiting: true,
    recruitmentDeadline: 'Oct 05',
    accentColor: 'sky',
    tags: ['React', 'TypeScript', 'Tailwind', 'Mobile Apps', 'Portfolio Building'],
    leadership: [
      { name: 'Nate Thorne', role: 'Lead Architect', major: 'CS, Senior', avatar: 'NT' },
      { name: 'Aaliyah Jackson', role: 'Design Lead', major: 'Cognitive Science, Junior', avatar: 'AJ' }
    ],
    upcomingEvents: [
      { id: 'ev-12', title: 'Ship Your First Full-Stack App in 90 Minutes', date: 'Oct 06', time: '7:00 PM', room: 'Lovelace 102', rsvps: 58 }
    ],
    requirements: ['Git basics or willingness to learn', 'Commitment to one semester-long project sprint'],
    contactEmail: 'devcraft@apex.edu',
    founded: 2021
  },
  {
    id: 'club-8',
    name: 'The Daily Quill Newspaper & Audio',
    category: 'Arts',
    categoryColor: 'bg-purple-100 text-purple-700 border-purple-200',
    categoryTheme: 'from-violet-600 to-purple-800',
    tagline: 'Independent investigative journalism, student culture podcasts, and photoessays.',
    description: 'The award-winning independent voice of Apex State University since 1954. We train writers, editors, audio engineers, and photographers to tell compelling stories that hold institutions accountable and celebrate student creativity.',
    membersCount: 64,
    meetingCadence: 'Sundays at 4:00 PM',
    location: 'Old Hall Media Lab, Rm 20',
    isRecruiting: true,
    recruitmentDeadline: 'Oct 12',
    accentColor: 'violet',
    tags: ['Journalism', 'Podcasting', 'Photography', 'Writing', 'Publishing'],
    leadership: [
      { name: 'Hannah Wright', role: 'Editor-in-Chief', major: 'Journalism & History, Senior', avatar: 'HW' },
      { name: 'Leo Castiglione', role: 'Podcast Producer', major: 'Sound Arts, Senior', avatar: 'LC' }
    ],
    upcomingEvents: [
      { id: 'ev-13', title: 'Investigative Pitch Session & Coffee Hour', date: 'Oct 08', time: '4:00 PM', room: 'Old Hall 20', rsvps: 22 }
    ],
    requirements: ['Curiosity and ethical storytelling', 'All colleges and majors encouraged'],
    contactEmail: 'dailyquill@apex.edu',
    founded: 1954
  }
];

const CATEGORIES = [
  { id: 'All', label: 'All Fields', icon: Compass },
  { id: 'Coding', label: 'Coding & Tech', icon: Code2 },
  { id: 'Entrepreneurship', label: 'Business & Ventures', icon: Rocket },
  { id: 'Arts', label: 'Arts & Media', icon: Palette },
  { id: 'Sports', label: 'Sports & Fitness', icon: Dumbbell },
  { id: 'Social Impact', label: 'Social & Eco Impact', icon: Globe },
  { id: 'Gaming', label: 'Gaming & Esports', icon: Gamepad2 }
];

function StatCard({ icon: Icon, value, label, subtext, color = 'blue' }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100'
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex items-center space-x-3.5 hover:shadow-md transition-shadow">
      <div className={`p-2.5 rounded-xl border ${colorMap[color] || colorMap.blue}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="flex items-baseline space-x-1.5">
          <span className="text-xl font-bold text-slate-900 tracking-tight">{value}</span>
        </div>
        <p className="text-xs font-semibold text-slate-700">{label}</p>
        {subtext && <p className="text-[10px] text-slate-400 font-medium">{subtext}</p>}
      </div>
    </div>
  );
}

function ToastNotification({ toast, onDismiss }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 duration-200">
      <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center justify-between space-x-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-100">{toast.message}</p>
            {toast.subtext && <p className="text-[11px] text-slate-400">{toast.subtext}</p>}
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [clubs, setClubs] = useState(INITIAL_CLUBS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [recruitingOnly, setRecruitingOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [activeTab, setActiveTab] = useState('discover'); // 'discover' | 'my-clubs' | 'calendar'

  // User engagement state
  const [savedClubIds, setSavedClubIds] = useState(['club-1', 'club-4']);
  const [joinedClubIds, setJoinedClubIds] = useState(['club-1']);
  const [rsvpEvents, setRsvpEvents] = useState(['ev-1', 'ev-7']);

  // Modals & Notifications state
  const [selectedClubForDetail, setSelectedClubForDetail] = useState(null);
  const [clubForJoinForm, setClubForJoinForm] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showNotification = (message, subtext = '') => {
    setToast({ message, subtext, id: Date.now() });
  };

  const categoryCounts = useMemo(() => {
    const counts = { All: clubs.length };
    clubs.forEach((club) => {
      counts[club.category] = (counts[club.category] || 0) + 1;
    });
    return counts;
  }, [clubs]);

  const filteredClubs = useMemo(() => {
    return clubs
      .filter((club) => {
        // Category filter
        if (selectedCategory !== 'All' && club.category !== selectedCategory) {
          return false;
        }
        // Recruiting filter
        if (recruitingOnly && !club.isRecruiting) {
          return false;
        }
        // Search query across name, tagline, description, tags, category
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchName = club.name.toLowerCase().includes(q);
          const matchTagline = club.tagline.toLowerCase().includes(q);
          const matchDesc = club.description.toLowerCase().includes(q);
          const matchCat = club.category.toLowerCase().includes(q);
          const matchTags = club.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchTagline && !matchDesc && !matchCat && !matchTags) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'members') {
          return b.membersCount - a.membersCount;
        }
        return b.membersCount - a.membersCount;
      });
  }, [clubs, selectedCategory, recruitingOnly, searchQuery, sortBy]);

  const allEvents = useMemo(() => {
    const events = [];
    clubs.forEach((club) => {
      club.upcomingEvents.forEach((ev) => {
        events.push({
          ...ev,
          clubName: club.name,
          category: club.category
        });
      });
    });
    return events;
  }, [clubs]);

  const handleToggleSave = (clubId) => {
    setSavedClubIds((prev) => {
      const exists = prev.includes(clubId);
      const targetClub = clubs.find((c) => c.id === clubId);
      if (exists) {
        showNotification(`Removed ${targetClub?.name || 'Club'} from saved`);
        return prev.filter((id) => id !== clubId);
      } else {
        showNotification(`Saved ${targetClub?.name || 'Club'} to your bookmarks! ❤️`);
        return [...prev, clubId];
      }
    });
  };

  const handleConfirmJoin = (clubId) => {
    setJoinedClubIds((prev) => {
      if (!prev.includes(clubId)) {
        const targetClub = clubs.find((c) => c.id === clubId);
        showNotification(
          `Welcome to ${targetClub?.name}! 🎉`,
          'Your interest was recorded. Check your student inbox for Discord & meeting links.'
        );
        return [...prev, clubId];
      }
      return prev;
    });
  };

  const handleLeaveClub = (clubId) => {
    setJoinedClubIds((prev) => prev.filter((id) => id !== clubId));
    const targetClub = clubs.find((c) => c.id === clubId);
    showNotification(`You have left ${targetClub?.name}.`);
    if (selectedClubForDetail?.id === clubId) {
      setSelectedClubForDetail(null);
    }
  };

  const handleToggleRsvp = (eventId) => {
    setRsvpEvents((prev) => {
      const exists = prev.includes(eventId);
      if (exists) {
        showNotification('RSVP cancelled for this workshop');
        return prev.filter((id) => id !== eventId);
      } else {
        showNotification('RSVP confirmed! Event saved to your student schedule. 📅');
        return [...prev, eventId];
      }
    });
  };

  const handleShareClub = (club) => {
    showNotification(`Copied share link for "${club.name}"! 🔗`);
  };

  const handleSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * clubs.length);
    setSelectedClubForDetail(clubs[randomIndex]);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setRecruitingOnly(false);
    setSortBy('popular');
  };

  const myJoinedClubs = clubs.filter((c) => joinedClubIds.includes(c.id));
  const mySavedClubs = clubs.filter((c) => savedClubIds.includes(c.id));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* University & App Brand */}
            <div
              className="flex items-center space-x-3.5 cursor-pointer"
              onClick={() => setActiveTab('discover')}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                <Compass className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                    CAMPUS CLUB EXPLORER
                  </span>
                  <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Fall 2026
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Apex State University • Student Life & Activities
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => setActiveTab('discover')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                  activeTab === 'discover'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Explore</span>
              </button>

              <button
                onClick={() => setActiveTab('my-clubs')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 relative ${
                  activeTab === 'my-clubs'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>My Clubs</span>
                {(joinedClubIds.length > 0 || savedClubIds.length > 0) && (
                  <span className="w-5 h-5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white flex items-center justify-center ml-1">
                    {joinedClubIds.length + savedClubIds.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition hidden sm:flex items-center space-x-1.5 ${
                  activeTab === 'calendar'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Events</span>
              </button>

              <button
                onClick={handleSurpriseMe}
                className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/80 hover:bg-amber-100 transition flex items-center space-x-1"
                title="Open a random club detail"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="hidden md:inline">Surprise Me</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 pt-8 pb-6 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100/70 text-indigo-800 mb-3">
                <Flame className="w-3.5 h-3.5 text-indigo-600" />
                <span>Fall Involvement Week is Live!</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Find Your Tribe at Apex.
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-1.5 max-w-2xl">
                Discover student organizations, attend workshops, level up your resume, and connect with peers across engineering, business, the arts, and beyond.
              </p>
            </div>

            {/* Quick university metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
              <StatCard
                icon={Layers}
                value={clubs.length}
                label="Recognized Clubs"
                subtext="6 Core Categories"
                color="blue"
              />
              <StatCard
                icon={Users}
                value="2,400+"
                label="Active Members"
                subtext="Campus-Wide"
                color="emerald"
              />
              <StatCard
                icon={Calendar}
                value={allEvents.length}
                label="Events This Month"
                subtext="Workshops & Jams"
                color="purple"
              />
              <StatCard
                icon={Award}
                value={joinedClubIds.length}
                label="Your Memberships"
                subtext={`${savedClubIds.length} Bookmarked`}
                color="amber"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog & Tabs */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* VIEW 1: DISCOVER CLUBS */}
        {activeTab === 'discover' && (
          <div>
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              recruitingOnly={recruitingOnly}
              onToggleRecruiting={() => setRecruitingOnly(!recruitingOnly)}
              sortBy={sortBy}
              onSortChange={setSortBy}
              categoryCounts={categoryCounts}
              onResetFilters={resetFilters}
              totalResults={filteredClubs.length}
              categories={CATEGORIES}
            />

            {filteredClubs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClubs.map((club) => (
                  <ClubCard
                    key={club.id}
                    club={club}
                    isSaved={savedClubIds.includes(club.id)}
                    isJoined={joinedClubIds.includes(club.id)}
                    onToggleSave={handleToggleSave}
                    onViewDetails={(c) => setSelectedClubForDetail(c)}
                    onQuickJoin={(c) => setClubForJoinForm(c)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center max-w-lg mx-auto shadow-sm my-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-indigo-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1.5">No clubs matched your search</h3>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  We couldn't find any organizations matching{' '}
                  {searchQuery && <span className="font-semibold text-slate-800">"{searchQuery}"</span>}
                  {selectedCategory !== 'All' && <span> in {selectedCategory}</span>}. Try broadening your keywords or clearing the active filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition inline-flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Clear All Filters</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: MY CLUBS & SAVED */}
        {activeTab === 'my-clubs' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-black text-slate-900">My Student Dashboard</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Keep track of all the clubs you belong to and review organizations you've bookmarked for later.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('discover')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
              >
                <span>Browse Directory</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Joined Clubs */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  {myJoinedClubs.length}
                </div>
                <h3 className="text-base font-bold text-slate-900">Enrolled Memberships</h3>
              </div>

              {myJoinedClubs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myJoinedClubs.map((club) => (
                    <ClubCard
                      key={club.id}
                      club={club}
                      isSaved={savedClubIds.includes(club.id)}
                      isJoined={true}
                      onToggleSave={handleToggleSave}
                      onViewDetails={(c) => setSelectedClubForDetail(c)}
                      onQuickJoin={(c) => setClubForJoinForm(c)}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-white border border-dashed border-slate-300 text-center">
                  <UserPlus className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-700">You haven't joined any clubs yet</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Explore the catalog and submit an interest form to join meetings!
                  </p>
                  <button
                    onClick={() => setActiveTab('discover')}
                    className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition"
                  >
                    Find Clubs to Join
                  </button>
                </div>
              )}
            </div>

            {/* Saved Bookmarks */}
            <div className="pt-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs">
                  {mySavedClubs.length}
                </div>
                <h3 className="text-base font-bold text-slate-900">Bookmarked Clubs</h3>
              </div>

              {mySavedClubs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mySavedClubs.map((club) => (
                    <ClubCard
                      key={club.id}
                      club={club}
                      isSaved={true}
                      isJoined={joinedClubIds.includes(club.id)}
                      onToggleSave={handleToggleSave}
                      onViewDetails={(c) => setSelectedClubForDetail(c)}
                      onQuickJoin={(c) => setClubForJoinForm(c)}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-white border border-dashed border-slate-300 text-center">
                  <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-700">No bookmarked clubs</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Click the heart icon on any club card to save it for quick reference!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: CAMPUS CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Campus Involvement Calendar</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Upcoming workshops, pitch sessions, runs, and hackathons hosted by clubs this month.
                </p>
              </div>
              <div className="text-xs text-slate-500 bg-white px-3 py-2 rounded-xl border border-slate-200">
                You have RSVP'd to <strong className="text-indigo-600">{rsvpEvents.length}</strong> events
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allEvents.map((ev) => (
                <EventItem
                  key={ev.id}
                  event={ev}
                  clubName={ev.clubName}
                  isRsvpd={rsvpEvents.includes(ev.id)}
                  onToggleRsvp={handleToggleRsvp}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modals & Dialogs */}
      <ClubDetails
        club={selectedClubForDetail}
        isOpen={Boolean(selectedClubForDetail)}
        onClose={() => setSelectedClubForDetail(null)}
        isSaved={selectedClubForDetail ? savedClubIds.includes(selectedClubForDetail.id) : false}
        isJoined={selectedClubForDetail ? joinedClubIds.includes(selectedClubForDetail.id) : false}
        onToggleSave={handleToggleSave}
        onOpenJoinForm={(c) => {
          setSelectedClubForDetail(null);
          setClubForJoinForm(c);
        }}
        onLeaveClub={handleLeaveClub}
        rsvpEvents={rsvpEvents}
        onToggleRsvp={handleToggleRsvp}
        onShareClub={handleShareClub}
      />

      <JoinApplicationModal
        club={clubForJoinForm}
        isOpen={Boolean(clubForJoinForm)}
        onClose={() => setClubForJoinForm(null)}
        onConfirmJoin={handleConfirmJoin}
      />

      <ToastNotification toast={toast} onDismiss={() => setToast(null)} />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              A
            </div>
            <div>
              <p className="font-bold text-slate-800">Apex State University Student Union</p>
              <p className="text-[11px] text-slate-400">Office of Student Organizations & Engagement</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-slate-500">
            <button onClick={() => setActiveTab('discover')} className="hover:text-indigo-600">
              Club Directory
            </button>
            <button onClick={() => setActiveTab('calendar')} className="hover:text-indigo-600">
              Calendar
            </button>
            <a href="mailto:clubs@apex.edu" className="hover:text-indigo-600">
              Register New Club
            </a>
            <span className="text-slate-300">|</span>
            <span className="text-slate-400 font-medium">© 2026 Apex State</span>
          </div>
        </div>
      </footer>
    </div>
  );
}