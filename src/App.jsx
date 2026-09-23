import React, { useState, useEffect, useMemo, useRef } from 'react';
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  Calendar, Clock, MapPin, Users, Award, FileText, CheckCircle2,
  ChevronRight, Sparkles, Download, ExternalLink,
  Edit3, Save, RotateCcw, Plus, Trash2, X, Menu,
  Phone, Mail, Bell, Trophy, BookOpen, ShieldCheck,
  ArrowRight, Laptop, UserCheck, Zap, Cpu, Search,
  ChevronDown, HelpCircle, Terminal, Eye, Layers, Compass,
  Check, AlertTriangle, Building, Globe, Send, ShieldAlert,
  Flame, Monitor, Code2, Coffee, Wifi, Star
} from 'lucide-react';

/* =========================================================================
   1. BRANDING & ASSETS
   ========================================================================= */

function NIISOfficialCrest({ className = "w-24 h-24" }) {
  return (
    <div className={`relative flex items-center justify-center ${className} flex-shrink-0 mx-auto`}>
      <img
        src="/WhatsApp Image 2026-09-20 at 18.31.48.jpeg"
        alt="NIIS College Logo"
        className="w-full h-full object-contain drop-shadow-md"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/niis-logo.png";
        }}
      />
    </div>
  );
}

function NexusClubBadge() {
  return (
    <div className="flex items-center gap-2 bg-[#0a1f3d] border border-blue-400/30 px-3.5 py-1.5 rounded-full text-xs text-white shadow-sm">
      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
      <span className="font-mono font-black tracking-wider text-amber-300">NEXUS</span>
      <span className="text-slate-300 text-[11px] font-medium hidden sm:inline">Technical Club</span>
    </div>
  );
}

function HackathonEventEmblem({ className = "w-10 h-10" }) {
  return (
    <div className={`relative flex items-center justify-center ${className} flex-shrink-0`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <polygon points="50,6 92,27 92,73 50,94 8,73 8,27" fill="#091830" stroke="#3b82f6" strokeWidth="3.5" />
        <polygon points="50,15 82,32 82,68 50,85 18,68 18,32" fill="#0f2d59" opacity="0.8" />
        <path d="M 50 20 L 50 35 M 50 65 L 50 80 M 25 36 L 37 43 M 63 57 L 75 64 M 25 64 L 37 57 M 63 43 L 75 36" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="50" r="10" fill="#f59e0b" />
        <circle cx="50" cy="50" r="4.5" fill="#ffffff" />
      </svg>
    </div>
  );
}

/* =========================================================================
   2. INTERACTIVE PARTICLES
   ========================================================================= */
function HeroInteractiveNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(Math.floor(width / 22), 50);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      r: Math.random() * 1.5 + 1
    }));

    let mouse = { x: null, y: null };
    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.parentElement.addEventListener('mousemove', handleMouse);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.r, 0, Math.PI * 2);
        ctx.fillStyle = '#60a5fa';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 105) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.18 * (1 - dist / 105)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const mDist = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
          if (mDist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(245, 158, 11, ${0.25 * (1 - mDist / 130)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas && canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouse);
      }
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-45 z-0"
    />
  );
}

/* =========================================================================
   3. MASTER EXTENSIBLE CONTENT STATE
   ========================================================================= */
const INITIAL_CONTENT = {
  collegeName: "NIIS INSTITUTE OF BUSINESS ADMINISTRATION",
  affiliation: "(A Unit of NIIS Group of Institutions)",
  city: "Bhubaneswar, Odisha",
  eventName: "NIIS HACKATHON 2026",
  tagline: "Innovate | Build | Transform",
  subTagline: "Small ideas can create a big impact",
  organizer: "Nexus Tech-club, NIIS",
  eventDates: "30th September - 01st October 2026",
  countdownTarget: "2026-09-30T09:00:00",
  venue: "Auditorium & Innovation Labs, NIIS Campus, Sarada Vihar, Bhubaneswar",
  registrationDeadline: "25th September 2026",
  registrationUrl: "https://forms.google.com",
  rulebookUrl: "/brochure.pdf",

  announcements: [
    { id: 1, date: "15 Sep 2026", text: "Registrations for NIIS Hackathon 2026 are officially open! Early entries close 25th Sep." },
    { id: 2, date: "10 Sep 2026", text: "Official Problem Statements released across 6 Tracks by Nexus Club." },
    { id: 3, date: "05 Sep 2026", text: "Download official Brochure & Institutional Authorization Form (NOC Format)." },
    { id: 4, date: "25 Aug 2026", text: "Orientation Workshop & Problem Briefing Session declared for participants." }
  ],

  about: {
    heading: "Fostering Technology & Innovation at NIIS",
    subHeading: "A 36-hour sprint connecting young technocrats with mentors, incubation resources, and industrial challenges.",
    para1: "NIIS HACKATHON 2026 is an initiative by Nexus Tech-club at NIIS Institute of Business Administration. Designed to provide a premier competitive launchpad for undergraduate and postgraduate students from diverse streams including Computer Science, Information Technology, MCA, MBA, and Applied Sciences.",
    para2: "Modelled closely in spirit with state-level university frameworks like the BPUT Hackathon, our event challenges youth to transform theoretical blueprints into deployable, functional prototypes within 36 hours. Interdisciplinary teamwork, industry-standard mentoring, and real-world applicability are at the core of this challenge.",
    pillars: [
      { num: "01", title: "Ideate & Abstract", desc: "Identify genuine community bottlenecks in governance, MSME finance, smart campus, and healthcare." },
      { num: "02", title: "Build & Deploy (36h)", desc: "Develop working code, APIs, predictive ML models, or functional IoT circuitries during the sprint." },
      { num: "03", title: "Transform & Incubate", desc: "Pitch before expert panels with commercialization mentorship and seed grants at NIIS E-Cell." }
    ]
  },

  eventFlow: [
    { stage: "Stage 1", title: "Registration & Abstract Deck", desc: "Submit squad registration on Google Form and attach a 3-page problem-solving methodology abstract." },
    { stage: "Stage 2", title: "Technical Screening & Finalist Pass", desc: "Jury panel evaluates architecture viability. Shortlisted finalist squads receive campus entry passes." },
    { stage: "Stage 3", title: "36h Grand Finale at NIIS", desc: "36 hours continuous offline sprint, mentor checkpoints, live jury demos, and grand valedictory." }
  ],

  committeeMembers: [
    {
      id: "cm1",
      name: "Mr. Sai Sambit Nayak",
      role: "Trustee, NIIS Group",
      category: "Chief Patron",
      phone: "+91 98610 00000",
      email: "trustee@niisgroup.org",
      photo: ""
    },
    {
      id: "cm2",
      name: "Prof. R. K. Mohanty",
      role: "Faculty Convener, Dept. of Computer Science",
      category: "Convener",
      phone: "+91 94370 00000",
      email: "hackathon@niisgroup.org",
      photo: ""
    },
    {
      id: "cm3",
      name: "Satya Ranjan Rana",
      role: "President, Nexus Technical Club",
      category: "Student Lead",
      phone: "+91 7530914313",
      email: "nexus.tech@niis.edu.in",
      photo: ""
    },
    {
      id: "cm4",
      name: "Technical Executive Team",
      role: "Logistics, Network & Evaluation Desk",
      category: "Organizing Team",
      phone: "+91 70080 00000",
      email: "support@niisgroup.org",
      photo: ""
    }
  ],

  problemStatements: [
    {
      id: "NIIS-PS01",
      domain: "Smart Campus & AI",
      title: "Automated Academic Progression & Placement Readiness Predictor",
      shortDesc: "Design an intelligent ML engine integrating student metrics to provide early career skill recommendations.",
      fullDesc: "Institutions often struggle with early identification of students falling behind in technical proficiencies before campus placement season. Develop an ML model that digests semester grades, attendance, assignment logs, and extracurricular milestones to calculate a live Readiness Index with personalized learning roadmap suggestions.",
      difficulty: "Medium",
      technologies: "Python, FastAPI, Scikit-learn, React, PostgreSQL",
      deliverable: "Functional predictive dashboard with student risk categorization."
    },
    {
      id: "NIIS-PS02",
      domain: "FinTech & Business ERP",
      title: "Decentralized Micro-Invoicing and Audit Trial for MSME Supply Chains",
      shortDesc: "Build an intuitive platform supporting automated GST verification, fraud-proof transaction auditing and cash-flow modeling.",
      fullDesc: "Small local vendors and suppliers face critical working capital bottlenecks due to fragmented invoicing disputes. Create a multi-tenant accounting platform providing tamper-proof cryptographic audit receipts, automated GST validation via mock APIs, and predictive cash-flow forecasting.",
      difficulty: "Hard",
      technologies: "React, Node.js, Express, Web3/Solidity or Hyperledger, SQL",
      deliverable: "Multi-party invoice reconciliation prototype with automated ledger trail."
    },
    {
      id: "NIIS-PS03",
      domain: "Healthcare & MedTech",
      title: "Tele-Triage System with Offline Regional Language Interface",
      shortDesc: "Develop a lightweight progressive web application guiding rural healthcare staff through symptom triage with regional voice queries.",
      fullDesc: "Primary healthcare workers in remote districts often face spotty internet connectivity and linguistic barriers when triaging emergency symptoms. Build an offline-first PWA that accepts vernacular voice inputs, matches triage protocols locally via lightweight on-device inference, and queues sync jobs.",
      difficulty: "Hard",
      technologies: "PWA, Web Speech API, TensorFlow Lite, FastAPI, IndexedDB",
      deliverable: "Offline-capable mobile PWA with simulated vernacular audio intake."
    },
    {
      id: "NIIS-PS04",
      domain: "Smart Automation & IoT",
      title: "Real-time Campus Energy Footprint Optimization & IoT Gateway",
      shortDesc: "Create an IoT dashboard aggregating classroom electricity usage and predicting peak-hour automated power saving.",
      fullDesc: "Institutional buildings waste significant electrical energy in unoccupied classrooms and computer laboratories. Build an IoT telemetry system measuring power draw, correlating timetable schedules and occupancy sensors to execute automated relay cutoffs.",
      difficulty: "Medium",
      technologies: "ESP32/NodeMCU, MQTT Protocol, Node.js, React, Chart.js",
      deliverable: "Telemetry dashboard reading live MQTT broker feeds with simulated relays."
    },
    {
      id: "NIIS-PS05",
      domain: "Cybersecurity & Safety",
      title: "Phishing & Fake Govt Notice Detection Extension for Students",
      shortDesc: "Develop a browser extension & mobile scraper that verifies institutional circulars against official college cryptographic hashes.",
      fullDesc: "Malicious actors frequently circulate doctored holiday circulars and exam schedules across messaging apps. Construct a cross-browser extension that hashes circular PDFs and cross-checks them against a public digital notary maintained by authorized university registrars.",
      difficulty: "Medium",
      technologies: "Browser Extension APIs, Python NLP, SHA-256 Authentication, MongoDB",
      deliverable: "Working browser extension flagging verified vs forged PDF documents."
    },
    {
      id: "NIIS-PS06",
      domain: "Open Innovation",
      title: "Students' Choice: Breakthrough Solution for Societal or Industrial Impact",
      shortDesc: "Pitch original prototypes solving urgent bottlenecks in Agritech, Tourism, Governance or Disaster Management.",
      fullDesc: "Have a unique, validated problem statement outside the predefined tracks? Teams are free to submit original MVP prototypes addressing real community or commercial challenges, evaluated on innovation, technical depth, and scalability.",
      difficulty: "Open",
      technologies: "Any modern full-stack or hardware architecture",
      deliverable: "Functional working MVP with live presentation slide deck."
    }
  ],

  datesSchedule: [
    { label: "Registration Opens", date: "01 September 2026", status: "Completed" },
    { label: "Problem Statements Live", date: "10 September 2026", status: "Completed" },
    { label: "Registration Closes", date: "25 September 2026", status: "Active" },
    { label: "Round 1 Screening & Shortlist", date: "26 - 28 September 2026", status: "Upcoming" },
    { label: "Grand Finale (36h Non-stop)", date: "30 Sep - 01 Oct 2026", status: "Upcoming" },
    { label: "Valedictory & Prize Distribution", date: "01 October 2026, 05:00 PM", status: "Upcoming" }
  ],

  hackathonRoadmap: [
    { time: "Day 1 - 08:30 AM", title: "Reporting & Verification", desc: "Team check-in, physical ID verification, kit distribution and Wi-Fi onboarding at NIIS Innovation Labs." },
    { time: "Day 1 - 10:00 AM", title: "Inaugural Ceremony & Hack Begins", desc: "Welcome address by Hon'ble Chairperson, release of secret API keys, and timer commencement for 36 hours." },
    { time: "Day 1 - 03:00 PM", title: "Mentorship Checkpoint 1", desc: "Domain experts and faculty evaluators review team architecture diagrams and database schemas." },
    { time: "Day 1 - 09:00 PM", title: "Midway Progress Scrutiny", desc: "First elimination check; teams must show working local servers and initial endpoint integrations." },
    { time: "Day 1 - 11:30 PM", title: "Midnight Coding Sprints & Snacks", desc: "Late-night refreshments, energizer mini-games, and non-stop dev sprints with mentor support." },
    { time: "Day 2 - 08:00 AM", title: "Breakfast & Code Freeze Countdown", desc: "Morning breakfast provided; teams enter final UI polish, containerization, and repository cleanup." },
    { time: "Day 2 - 01:00 PM", title: "Final GitHub Commits & Code Freeze", desc: "Public repository locks. Presentation decks uploaded to jury evaluation portal." },
    { time: "Day 2 - 02:30 PM", title: "Live Grand Jury Presentations", desc: "Top finalist squads pitch 8-minute live demonstrations before the esteemed jury panel." },
    { time: "Day 2 - 05:30 PM", title: "Valedictory & Cash Prize Distribution", desc: "Announcement of Winners, medal and trophy handover, and closing felicitations." }
  ],

  prizes: [
    { rank: "Winner (1st Prize)", amount: "₹25,000", perk: "Official Champion Trophy + Gold Medals + Certificate of Excellence + Incubation Seat at NIIS E-Cell" },
    { rank: "1st Runner Up (2nd Prize)", amount: "₹15,000", perk: "Silver Trophy + Silver Medals + Merit Certificates + Technical Goodies & Tool Subscriptions" },
    { rank: "2nd Runner Up (3rd Prize)", amount: "₹10,000", perk: "Bronze Trophy + Bronze Medals + Merit Certificates + Cloud Developer Credits" },
  ],

  guidelines: {
    rule1Title: "1. Squad Eligibility & Composition",
    rule1Points: [
      "Each team must consist of 3 to 5 student members currently enrolled in any recognized College, Institute, or University.",
      "Interdisciplinary teams (e.g. BCA + BBA + B.Tech + MCA) are strongly encouraged.",
      "One member must be designated as the Team Leader for all official communication."
    ],
    rule2Title: "2. Institutional Authorization (Bonafide NOC)",
    rule2Desc: "Shortlisted finalist squads attending the 36-hour on-campus grand finale must produce valid college student ID cards along with an institutional authorization letter (NOC) countersigned by their Principal, Dean, or Head of Department.",
    rule3Title: "3. Hardware, Repository & Code Ethics",
    rule3Points: [
      "Participants must bring their own development laptops, extension cords, and hardware sensor kits.",
      "All code must be committed to a fresh public GitHub repository initiated at the Day 1 opening ceremony.",
      "Pre-existing proprietary products will result in immediate disqualification; standard open-source libraries and APIs are fully permissible."
    ]
  },

  faqs: [
    {
      q: "Who is eligible to participate in NIIS Hackathon 2026?",
      a: "Any bonafide undergraduate or postgraduate student currently enrolled in an accredited college, university, or polytechnic institution (BCA, BBA, B.Tech, MCA, MBA, B.Sc, Diploma) is fully eligible."
    },
    {
      q: "What is the team size policy?",
      a: "Teams must consist of 3 to 5 student members. Interdisciplinary squads are strongly encouraged."
    },
    {
      q: "Is there any registration fee to participate?",
      a: "No. Participation in NIIS Hackathon 2026 is completely free of charge. Shortlisted finalists are also provided complimentary campus accommodation, meals, and high-speed Wi-Fi."
    },
    {
      q: "Can teams submit pre-built software developed earlier?",
      a: "Strictly no. All functional code must be authored inside a fresh public GitHub repository initialized during the Day 1 kick-off. Use of standard open-source libraries and APIs is permitted."
    },
    {
      q: "What documents must finalists present at the venue?",
      a: "Each shortlisted finalist must carry a valid institutional student identity card along with a signed Bonafide/NOC authorization letter from their respective Principal or Head of Department."
    },
    {
      q: "Will all participants receive official certificates?",
      a: "Yes. Every candidate whose team successfully undergoes the 36-hour offline evaluation will receive a digitally verifiable Certificate of Participation endorsed by NIIS Institute of Business Administration."
    }
  ]
};

/* =========================================================================
   4. PERMANENT 3 LEADERS OF NIIS (NEVER OVERWRITTEN BY FIREBASE)
   ========================================================================= */
const PERMANENT_LEADERS = [
  {
    id: "leader-1",
    name: "Dr. Subhash Chandra Nayak",
    role: "Chairperson, NIIS Group of Institutions",
    badge: "Hon'ble Chairperson",
    photo: "/chairman.15c124f6375fe3d6762b.png",
    quote: "Celebrating 26 Years of Academic Excellence, we welcome aspiring innovators from colleges across the state to 36 hours of rigorous hands-on building. We assure state-of-the-art infrastructure, mentorship from seasoned industry architects, and incubation support for top working prototypes."
  },
  {
    id: "leader-2",
    name: "Prof. Smurtisudha Nayak",
    role: "Co-Founder, NIIS Group of Institutions",
    badge: "Respected Co-Founder",
    photo: "/trustee2.bdc730fa7ab69169ba18.png",
    quote: "Education thrives when theoretical foundations meet transformative action. Through NIIS Hackathon 2026, we aim to nurture problem solvers and entrepreneurial leaders who will leverage emerging technologies for inclusive community development."
  },
  {
    id: "leader-3",
    name: "Mr. Sai Sambit Nayak",
    role: "Trustee Member, NIIS Group of Institutions",
    badge: "Trustee Member",
    photo: "/DSC00445.JPG.jpeg",
    quote: "Modern industry demands agility, cross-disciplinary collaboration, and hands-on grit. Our vision with this hackathon is to empower young developers with industry-grade infrastructure, cloud toolsets, and institutional seed backing to take their solutions to market."
  }
];

/* =========================================================================
   5. PRIMARY APPLICATION COMPONENT
   ========================================================================= */
export default function App() {
  const [content, setContent] = useState(INITIAL_CONTENT);
  const [isSaving, setIsSaving] = useState(false);

  // UI Control States
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminTab, setAdminTab] = useState('general'); 
  const [adminDraft, setAdminDraft] = useState(INITIAL_CONTENT);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [activeFaq, setActiveFaq] = useState(null);
  const [modalTrack, setModalTrack] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTrack, setSearchTrack] = useState("");
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Admin PIN Protection States
  const [showPinModal, setShowPinModal] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Master Secret Password
  const ADMIN_SECRET_PIN = "NexusAdminAccess2026#NIIS"; 

  // Real-time Cloud Fetch from Firebase Firestore
  useEffect(() => {
    const fetchPortalContent = async () => {
      try {
        const docRef = doc(db, "portal", "hackathon2026");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const cloudData = docSnap.data();
          setContent(cloudData);
          setAdminDraft(cloudData);
        }
      } catch (err) {
        console.error("Cloud database fetch failed:", err);
      }
    };
    fetchPortalContent();
  }, []);

  const handleVerifyPin = (e) => {
    e.preventDefault();
    if (adminPinInput === ADMIN_SECRET_PIN) {
      setPinError(false);
      setAdminPinInput('');
      setShowPinModal(false);
      setAdminDraft(content);
      setShowAdmin(true); 
    } else {
      setPinError(true);
    }
  };

  // Live countdown timer
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const target = new Date(content.countdownTarget).getTime();
    const tick = () => {
      const diff = target - new Date().getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [content.countdownTarget]);

  // Track filter logic
  const domainList = useMemo(() => {
    const set = new Set(content.problemStatements.map(p => p.domain));
    return ['All', ...Array.from(set)];
  }, [content.problemStatements]);

  const filteredTracks = useMemo(() => {
    return content.problemStatements.filter(p => {
      const matchesDomain = selectedDomain === 'All' || p.domain === selectedDomain;
      const matchesSearch = p.title.toLowerCase().includes(searchTrack.toLowerCase()) ||
                            p.domain.toLowerCase().includes(searchTrack.toLowerCase()) ||
                            p.technologies.toLowerCase().includes(searchTrack.toLowerCase());
      return matchesDomain && matchesSearch;
    });
  }, [content.problemStatements, selectedDomain, searchTrack]);

  // Live Firebase Save (Sync across all devices instantly)
  const handleSaveAdmin = async () => {
    setIsSaving(true);
    try {
      const docRef = doc(db, "portal", "hackathon2026");
      await setDoc(docRef, adminDraft);
      setContent(adminDraft);
      setShowAdmin(false);
      alert("✅ All changes saved permanently to Cloud Database! Live for everyone instantly.");
    } catch (err) {
      console.error("Cloud Database Save Error:", err);
      alert("❌ Save failed: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(adminDraft, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = "niis_hackathon_content.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-800 font-sans flex flex-col selection:bg-blue-900 selection:text-white pb-14 relative">
      
      {/* Running Marquee Style */}
      <style>{`
        @keyframes bputMarquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-running-ticker {
          display: inline-block;
          white-space: nowrap;
          animation: bputMarquee 32s linear infinite;
        }
        .animate-running-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Copied URL Toast */}
      {copiedNotification && (
        <div className="fixed bottom-16 right-6 z-50 bg-[#0f2d59] text-white px-5 py-3 rounded-xl shadow-2xl border border-amber-400 flex items-center gap-3 text-xs animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Portal link copied to clipboard!</span>
        </div>
      )}

      {/* 1. TOP METADATA BAR */}
      <div className="w-full bg-[#091830] text-slate-300 text-xs border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3 text-[11px]">
            <span className="font-semibold text-amber-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {content.affiliation}
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-300 hidden md:inline">Approved by AICTE | Affiliated to BPUT, Odisha</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={handleShareLink}
              className="text-slate-400 hover:text-white transition flex items-center gap-1 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>Share Event</span>
            </button>
            <button
              onClick={() => {
                setPinError(false);
                setAdminPinInput('');
                setShowPinModal(true);
              }}
              className="font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold cursor-pointer"
            >
              <Edit3 className="w-3 h-3" />
              <span>Admin / Dynamic Editor</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. INSTITUTIONAL HEADER */}
      <header className="w-full bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5">
            <NIISOfficialCrest className="w-13 h-13 sm:w-16 sm:h-16" />
            <div>
              <h1 className="font-serif font-black text-[#0f2d59] text-base sm:text-xl lg:text-2xl tracking-tight leading-snug">
                {content.collegeName}
              </h1>
              <p className="text-xs text-slate-600 font-medium">
                {content.affiliation} • <span className="text-blue-700 font-semibold">{content.city}</span>
              </p>
              <p className="text-[10px] font-bold text-amber-700 tracking-wider uppercase hidden sm:block">
                Knowledge • Skills • Values
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <NexusClubBadge />
            <div className="hidden lg:flex items-center gap-2.5 border-l-2 border-slate-200 pl-4">
              <div className="text-right">
                <span className="text-3xl font-black text-[#0f2d59] font-serif leading-none block">26</span>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-tight block">Years of Excellence</span>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-blue-900 border border-slate-200 rounded-lg"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Navy Blue Nav */}
        <div className="w-full bg-[#0f2d59] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
            <nav className="hidden md:flex items-center space-x-6 py-3">
              <button
                onClick={() => {
                  const el = document.getElementById('home');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition text-slate-200 cursor-pointer"
              >
                Home
              </button>

              <a
                href={content.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-white transition font-bold"
              >
                Registration
              </a>

              <button
                onClick={() => {
                  const el = document.getElementById('about');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition text-slate-200 cursor-pointer"
              >
                About
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('leadership');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition text-slate-200 cursor-pointer"
              >
                Leadership Desk
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('tracks');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition text-slate-200 cursor-pointer"
              >
                Problem Statements
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('schedule');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition text-slate-200 cursor-pointer"
              >
                Event Flow
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('prizes');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition text-slate-200 cursor-pointer"
              >
                Prizes
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('guidelines');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition text-slate-200 cursor-pointer"
              >
                Guidelines
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('committee');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition text-slate-200 cursor-pointer"
              >
                Committee & Contacts
              </button>
            </nav>

            <span className="text-[11px] font-mono text-amber-300 font-bold hidden lg:inline py-3">
              Organized by {content.collegeName}
            </span>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-[#091830] border-t border-blue-900 px-4 py-3 space-y-2.5 text-xs">
              <button
                onClick={() => {
                  const el = document.getElementById('home');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-slate-200 font-medium hover:text-amber-300"
              >
                Home
              </button>
              <a
                href={content.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left text-amber-300 font-bold hover:underline"
              >
                Registration ↗
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById('about');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-slate-200 font-medium hover:text-amber-300"
              >
                About
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('leadership');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-slate-200 font-medium hover:text-amber-300"
              >
                Leadership Desk
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('tracks');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-slate-200 font-medium hover:text-amber-300"
              >
                Problem Statements
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('schedule');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-slate-200 font-medium hover:text-amber-300"
              >
                Event Flow
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('prizes');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-slate-200 font-medium hover:text-amber-300"
              >
                Prizes
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('guidelines');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-slate-200 font-medium hover:text-amber-300"
              >
                Guidelines
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('committee');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-slate-200 font-medium hover:text-amber-300"
              >
                Committee & Contacts
              </button>
            </div>
          )}
        </div>
      </header>

      {/* 3. HERO VIEWPORT */}
      <section id="home" className="w-full relative bg-gradient-to-b from-[#051124] via-[#0d2345] to-[#0a1c36] text-white py-16 sm:py-24 px-4 overflow-hidden border-b-4 border-amber-400">
        <HeroInteractiveNetwork />

        <div className="max-w-5xl mx-auto text-center space-y-7 relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-950/90 border border-blue-400/40 px-5 py-2 rounded-full text-xs font-mono text-amber-300 shadow-md">
            <HackathonEventEmblem className="w-4 h-4" />
            <span className="font-bold tracking-wider uppercase">
              Official 36 Hours of Hackathon Organised by the NIIS Institute of Business Administration
            </span>
          </div>

          <div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase font-sans drop-shadow-lg">
              {content.eventName}
            </h2>
            <p className="mt-2 text-lg sm:text-2xl font-bold uppercase tracking-widest text-blue-200">
              {content.tagline}
            </p>
            <p className="italic text-slate-300 font-serif text-sm sm:text-base mt-1">
              “{content.subTagline}”
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-200">
            <span className="bg-blue-950/80 border border-blue-700/60 px-4 py-2 rounded-lg flex items-center gap-2 shadow">
              <Calendar className="w-4 h-4 text-amber-400" /> {content.eventDates}
            </span>
            <span className="bg-blue-950/80 border border-blue-700/60 px-4 py-2 rounded-lg flex items-center gap-2 shadow">
              <MapPin className="w-4 h-4 text-amber-400" /> {content.venue}
            </span>
            <span className="bg-blue-950/80 border border-blue-700/60 px-4 py-2 rounded-lg flex items-center gap-2 shadow">
              <Trophy className="w-4 h-4 text-amber-400" /> ₹50,000+ Prize Pool
            </span>
          </div>

          {/* Clean 4-Column Countdown */}
          <div className="pt-2">
            <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase block mb-2 font-semibold">
              HACKATHON COMMENCES IN
            </span>
            <div className="inline-grid grid-cols-4 gap-2.5 bg-blue-950/90 border border-blue-800 p-3 rounded-2xl font-mono shadow-2xl">
              {[
                { label: 'DAYS', val: timeLeft.days },
                { label: 'HOURS', val: timeLeft.hours },
                { label: 'MINUTES', val: timeLeft.minutes },
                { label: 'SECONDS', val: timeLeft.seconds },
              ].map((t, i) => (
                <div key={i} className="px-3.5 sm:px-5 py-2.5 bg-[#06142a] border border-blue-900 rounded-xl text-center min-w-[70px] sm:min-w-[95px]">
                  <span className="text-2xl sm:text-4xl font-black text-white block leading-tight">
                    {String(t.val).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] text-blue-300 uppercase font-bold tracking-wider">{t.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href={content.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-[#0f2d59] font-black px-8 py-3.5 rounded-xl text-sm uppercase tracking-wider transition shadow-xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>Register Squad on Google Form</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#tracks"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/25 text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <FileText className="w-4 h-4 text-blue-300" />
              <span>Browse Problem Tracks</span>
            </a>
          </div>

        </div>
      </section>

      {/* 4. ABOUT SECTION (PERMANENT STATIC - CENTERED & BALANCED) */}
      <section id="about" className="w-full py-20 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto space-y-10 text-center">
          
          {/* Header */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              About The Event
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif font-black text-[#0f2d59] tracking-tight">
              Fostering Technology & Innovation at NIIS
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
              A 36-hour sprint connecting young technocrats with mentors, incubation resources, and industrial challenges.
            </p>
          </div>

          {/* Centered Explanatory Paragraphs */}
          <div className="max-w-3xl mx-auto space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed text-center">
            <p>
              <strong>NIIS HACKATHON 2026</strong> is an initiative by <strong>Nexus Tech-club</strong> at <strong>NIIS Institute of Business Administration</strong>. Designed to provide a premier competitive launchpad for undergraduate and postgraduate students from diverse streams including Computer Science, Information Technology, MCA, MBA, and Applied Sciences.
            </p>
            <p>
              Modelled closely in spirit with state-level university frameworks like the BPUT Hackathon, our event challenges youth to transform theoretical blueprints into deployable, functional prototypes within 36 hours. Interdisciplinary teamwork, industry-standard mentoring, and real-world applicability are at the core of this challenge.
            </p>
          </div>

          {/* Centered Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-[#0f2d59]">
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl shadow-xs">
              <Coffee className="w-4 h-4 text-amber-600" />
              <span>36h Free Meals & Lodging</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl shadow-xs">
              <Wifi className="w-4 h-4 text-blue-600" />
              <span>High-Speed Lab Connectivity</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl shadow-xs">
              <Flame className="w-4 h-4 text-rose-600" />
              <span>Zero Registration Fee</span>
            </div>
          </div>

          {/* 3 Pillars Grid - Balanced Full-Width Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 text-left">
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-blue-300 hover:shadow-xs transition space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#0f2d59] text-amber-300 font-bold font-mono text-xs flex items-center justify-center">
                01
              </div>
              <h4 className="text-sm font-bold text-[#0f2d59]">Ideate & Abstract</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Identify genuine community bottlenecks in governance, MSME finance, smart campus, and healthcare.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-blue-300 hover:shadow-xs transition space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#0f2d59] text-amber-300 font-bold font-mono text-xs flex items-center justify-center">
                02
              </div>
              <h4 className="text-sm font-bold text-[#0f2d59]">Build & Deploy (36h)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Develop working code, APIs, predictive ML models, or functional IoT circuitries during the sprint.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-blue-300 hover:shadow-xs transition space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#0f2d59] text-amber-300 font-bold font-mono text-xs flex items-center justify-center">
                03
              </div>
              <h4 className="text-sm font-bold text-[#0f2d59]">Transform & Incubate</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pitch before expert panels with commercialization mentorship and seed grants at NIIS E-Cell.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. LEADERSHIP DESK (PERMANENT 3 LEADERS: CHAIRPERSON, CO-FOUNDER, TRUSTEE) */}
      <section id="leadership" className="w-full py-16 px-4 sm:px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded">
              Leadership Desk
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#0f2d59]">
              Messages from the Institutional Leadership
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Inspirational vision and guidance from the honorable leadership of NIIS Group of Institutions.
            </p>
          </div>

          <div className="space-y-8">
            {PERMANENT_LEADERS.map((leader, index) => (
              <div 
                key={leader.id || index}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left hover:border-blue-300 transition"
              >
                {/* Photo Preview Box */}
                <div className="w-48 sm:w-56 h-60 sm:h-72 rounded-2xl overflow-hidden border-4 border-slate-100 shadow-md flex-shrink-0 bg-slate-100 flex items-center justify-center">
                  {leader.photo ? (
                    <img
                      src={leader.photo}
                      alt={leader.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/chairman.15c124f6375fe3d6762b.png";
                      }}
                    />
                  ) : (
                    <Users className="w-16 h-16 text-slate-300" />
                  )}
                </div>

                {/* Content & Quote */}
                <div className="space-y-4 flex-1">
                  <div>
                    <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded border border-amber-200 inline-block mb-1.5">
                      {leader.badge}
                    </span>
                    <h4 className="font-bold text-slate-900 text-xl sm:text-2xl leading-snug">
                      {leader.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      {leader.role}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic font-serif leading-relaxed pt-1">
                    “{leader.quote}”
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Official Message
                    </span>
                    <span className="text-xs font-bold text-blue-900 font-mono">
                      NIIS Group of Institutions
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. PROBLEM STATEMENTS / TRACKS */}
      <section id="tracks" className="w-full py-16 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded">
              Tracks & Challenges
            </span>
            <h3 className="text-3xl font-serif font-black text-[#0f2d59]">
              Explore Official Problem Statements
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Curated across 6 pivotal domains. Select a challenge to review the full problem scope.
            </p>
          </div>

          {/* Search & Domain Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {domainList.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDomain(d)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                    selectedDomain === d
                      ? 'bg-[#0f2d59] text-white shadow'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search tracks or tech stack..."
                value={searchTrack}
                onChange={(e) => setSearchTrack(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-900"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTracks.map((ps) => (
              <div key={ps.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-blue-700 transition flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-black text-[#0f2d59] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                      {ps.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      ps.difficulty === 'Hard' ? 'bg-red-50 text-red-700 border border-red-200' :
                      ps.difficulty === 'Medium' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {ps.difficulty}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    {ps.domain}
                  </span>

                  <h4 className="font-bold text-slate-900 text-sm leading-snug mb-2 group-hover:text-blue-900 transition">
                    {ps.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {ps.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 space-y-3">
                  <div className="text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">Stack:</span> {ps.technologies}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setModalTrack(ps)}
                      className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 rounded text-xs transition cursor-pointer"
                    >
                      View Details
                    </button>
                    
                    <a
                      href={content.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-[#0f2d59] hover:bg-blue-950 text-white font-bold py-2 rounded text-xs transition"
                    >
                      Apply Track
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. DYNAMIC EVENT FLOW & 36H TIMELINE */}
      <section id="schedule" className="w-full py-16 px-4 sm:px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded">
              Timeline & Phases
            </span>
            <h3 className="text-3xl font-serif font-black text-[#0f2d59]">
              Milestones & Event Flow
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Follow key deadlines from online abstract submissions to the 36-hour offline grand finale.
            </p>
          </div>

          {/* DYNAMIC 3-STAGE EVENT FLOW */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3.5">
              {(content.eventFlow || []).map((stage, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-blue-900 transition">
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className="w-6 h-6 rounded-full bg-[#0f2d59] text-white flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </div>
                    <h4 className="font-bold text-[#0f2d59] text-sm">
                      {stage.stage ? `${stage.stage}: ` : ''}{stage.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 pl-8.5 leading-relaxed">{stage.desc}</p>
                </div>
              ))}
            </div>

            {/* Event Dates Schedule Table */}
            <div className="lg:col-span-7 w-full">
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-[#0f2d59] text-white px-5 py-3 text-xs font-bold uppercase tracking-wider flex justify-between">
                  <span>Event Milestone</span>
                  <span>Timeline</span>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  {content.datesSchedule.map((item, idx) => (
                    <div key={idx} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50 transition">
                      <div className="flex items-center gap-3">
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          item.status === 'Completed' ? 'bg-slate-400' :
                          item.status === 'Active' ? 'bg-emerald-600 animate-pulse' : 'bg-blue-600'
                        }`} />
                        <span className="font-semibold text-slate-800">{item.label}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-[#0f2d59] block">{item.date}</span>
                        <span className={`text-[10px] uppercase font-bold ${
                          item.status === 'Completed' ? 'text-slate-400' :
                          item.status === 'Active' ? 'text-emerald-700' : 'text-blue-600'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hour-by-Hour 36h Roadmap */}
          <div id="roadmap" className="space-y-6 pt-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded">
                Grand Finale Schedule
              </span>
              <h4 className="text-2xl font-serif font-black text-[#0f2d59]">
                Hour-by-Hour 36h Sprint Schedule
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {content.hackathonRoadmap.map((r, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-1 hover:border-blue-900 transition">
                  <span className="text-[11px] font-mono font-bold text-amber-700 block">{r.time}</span>
                  <h5 className="font-bold text-[#0f2d59] text-xs sm:text-sm">{r.title}</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 8. DYNAMIC PRIZES & INCUBATION REWARDS */}
      <section id="prizes" className="w-full py-16 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded">
              Rewards & Recognition
            </span>
            <h3 className="text-3xl font-serif font-black text-[#0f2d59]">
              Prizes, Trophies & Seed Support
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Recognizing high-impact engineering with cash awards and direct incubation mentorship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.prizes.map((pz, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 border flex flex-col justify-between shadow-sm transition ${
                  idx === 0
                    ? 'bg-blue-50/80 border-blue-400 shadow-md'
                    : 'bg-white border-slate-200 hover:border-blue-400'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0f2d59] text-amber-400 flex items-center justify-center mb-4 shadow">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase text-slate-500 block">{pz.rank}</span>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-[#0f2d59] my-2">{pz.amount}</div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">{pz.perk}</p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200 text-xs text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Institutional Citation</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 bg-blue-50/80 border border-blue-200 rounded-2xl text-center text-xs text-slate-700 leading-relaxed max-w-3xl mx-auto">
            All registered and evaluated participants will receive a verified <strong>Certificate of Participation</strong> endorsed by <strong>NIIS Institute of Business Administration</strong>, along with complimentary meals, hackathon kits, and Wi-Fi access during the 36-hour offline sprint.
          </div>

        </div>
      </section>

      {/* 9. DYNAMIC RULES, ETHICS & NOC GUIDELINES */}
      <section id="guidelines" className="w-full py-16 px-4 sm:px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded">
              Standard Protocols
            </span>
            <h3 className="text-3xl font-serif font-black text-[#0f2d59]">
              Hackathon Guidelines & Requirements
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Please review all institutional standards prior to team submission.
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <h4 className="font-bold text-[#0f2d59] text-sm flex items-center gap-2 mb-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-900" />
                {content.guidelines?.rule1Title || "1. Squad Eligibility & Composition"}
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                {(content.guidelines?.rule1Points || []).map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <h4 className="font-bold text-[#0f2d59] text-sm flex items-center gap-2 mb-1.5">
                <FileText className="w-4 h-4 text-blue-900" />
                {content.guidelines?.rule2Title || "2. Institutional Authorization (Bonafide NOC)"}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {content.guidelines?.rule2Desc}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <h4 className="font-bold text-[#0f2d59] text-sm flex items-center gap-2 mb-1.5">
                <Laptop className="w-4 h-4 text-blue-900" />
                {content.guidelines?.rule3Title || "3. Hardware, Repository & Code Ethics"}
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                {(content.guidelines?.rule3Points || []).map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Download Brochure Box */}
          <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <BookOpen className="w-8 h-8 text-[#0f2d59] flex-shrink-0 mx-auto sm:mx-0" />
              <div>
                <h5 className="font-bold text-[#0f2d59] text-sm">Download Official Event Rulebook & NOC Template</h5>
                <p className="text-xs text-slate-600">Full scoring rubrics, accommodation guidelines, and college authorization letter format (PDF)</p>
              </div>
            </div>

            <a
              href={content.rulebookUrl || "/brochure.pdf"}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0f2d59] hover:bg-blue-950 text-white font-bold px-5 py-2.5 rounded-lg text-xs flex items-center gap-2 flex-shrink-0 transition shadow"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download PDF</span>
            </a>
          </div>

        </div>
      </section>

      {/* 10. DYNAMIC ORGANIZING COMMITTEE & FACULTY CARDS */}
      <section id="committee" className="w-full py-16 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded">
              Leadership & Organizing Core
            </span>
            <h3 className="text-3xl font-serif font-black text-[#0f2d59]">
              Organizing Committee & Contacts
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Meet the faculty patrons, conveners, and student leadership behind NIIS Hackathon 2026.
            </p>
          </div>

          {/* Individual Committee Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(content.committeeMembers || []).map((member) => (
              <div 
                key={member.id} 
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-[#0f2d59] hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-20 h-20 rounded-2xl mx-auto mb-3 overflow-hidden bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-400">
                    {member.photo ? (
                      <img 
                        src={member.photo} 
                        alt={member.name} 
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "";
                        }}
                      />
                    ) : (
                      <Users className="w-8 h-8 text-[#0f2d59]/40" />
                    )}
                  </div>

                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                      {member.category || "Committee"}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm leading-tight pt-1">
                      {member.name}
                    </h4>
                    <p className="text-xs text-slate-500 leading-snug">
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                  {member.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#0f2d59] flex-shrink-0" />
                      <a href={`tel:${member.phone}`} className="hover:text-blue-900 font-medium">
                        {member.phone}
                      </a>
                    </div>
                  )}
                  {member.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#0f2d59] flex-shrink-0" />
                      <a href={`mailto:${member.email}`} className="hover:text-blue-900 font-medium truncate">
                        {member.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Campus Location Banner */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 text-slate-700">
              <MapPin className="w-5 h-5 text-[#0f2d59] flex-shrink-0" />
              <span><strong>Campus Venue:</strong> {content.venue}</span>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="bg-[#0f2d59] text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-950 transition inline-flex items-center gap-1.5 flex-shrink-0"
            >
              <span>View On Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>

      {/* 11. FAQS */}
      <section id="faqs" className="w-full py-16 px-4 sm:px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded">
              Got Questions?
            </span>
            <h3 className="text-3xl font-serif font-black text-[#0f2d59]">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Everything you need to know about the registration, offline stay, and team participation.
            </p>
          </div>

          <div className="space-y-3">
            {content.faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden transition">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#0f2d59] flex items-center justify-between hover:bg-slate-50 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeFaq === i ? 'rotate-180 text-blue-900' : 'text-slate-400'}`} />
                </button>
                {activeFaq === i && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="w-full bg-[#0a1c36] text-slate-400 text-xs py-12 px-4 sm:px-6 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-blue-900/60">
            
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-3">
                <NIISOfficialCrest className="w-11 h-11" />
                <div>
                  <span className="font-bold text-white text-sm sm:text-base block">{content.collegeName}</span>
                  <p className="text-[11px] text-slate-400">{content.affiliation} • {content.city}</p>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                Established in 2000, NIIS has championed quality technical, IT and management education across Odisha with 26 years of excellence in student mentorship.
              </p>
              <div className="pt-1">
                <NexusClubBadge />
              </div>
            </div>

            <div>
              <h6 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">Portal Navigation</h6>
              <ul className="space-y-2 text-[11px]">
                <li><a href="#about" className="hover:text-amber-300">About Hackathon</a></li>
                <li><a href="#leadership" className="hover:text-amber-300">Chairperson Desk</a></li>
                <li><a href="#tracks" className="hover:text-amber-300">Problem Statements</a></li>
                <li><a href="#schedule" className="hover:text-amber-300">Timeline & Stages</a></li>
                <li><a href="#committee" className="hover:text-amber-300">Committee & Contacts</a></li>
                <li><a href="#faqs" className="hover:text-amber-300">FAQs & Rules</a></li>
              </ul>
            </div>

            <div>
              <h6 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">Dynamic Maintenance</h6>
              <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                Master CMS controls: Edit any section text, prizes, guidelines, and committee leads live without touching code.
              </p>
              <button
                onClick={() => {
                  setPinError(false);
                  setAdminPinInput('');
                  setShowPinModal(true);
                }}
                className="bg-amber-400 hover:bg-amber-300 text-[#0f2d59] font-black px-4 py-2 rounded-lg text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition shadow cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Open Admin Panel</span>
              </button>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
            <span>© 2026 {content.collegeName}. All Rights Reserved.</span>
            <span className="text-slate-400">Organized by Nexus Tech-club • Approved by AICTE, Affiliated to BPUT</span>
          </div>
        </div>
      </footer>

      {/* 13. CONTINUOUS TICKER */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#071326]/95 backdrop-blur-md border-t border-blue-800/80 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] py-2 px-3 text-xs font-mono flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center gap-3 w-full">
          <div className="flex items-center gap-1.5 bg-[#0f2d59] border border-amber-400/50 text-white font-black px-2.5 py-1 rounded text-[10px] uppercase flex-shrink-0 tracking-wider shadow-sm z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
            <span className="text-amber-300">LATEST</span>
          </div>
          <div className="overflow-hidden whitespace-nowrap flex-1 w-full relative">
            <div className="animate-running-ticker inline-block text-slate-200 text-xs font-medium cursor-pointer">
              {content.announcements.map((a, idx) => (
                <span key={a.id || idx} className="mr-12 inline-flex items-center">
                  <span className="text-amber-400 font-bold mr-1.5">[{a.date}]</span>
                  <span className="text-white hover:text-cyan-300 transition-colors">{a.text}</span>
                  <span className="ml-12 text-slate-500">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 14. MODAL: FULL TRACK DETAILS */}
      {modalTrack && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 border border-slate-200 relative my-auto shadow-2xl text-xs sm:text-sm text-slate-800">
            <button
              onClick={() => setModalTrack(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 pr-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black text-[#0f2d59] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {modalTrack.id}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase">
                  {modalTrack.domain}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg pt-1">
                {modalTrack.title}
              </h3>
            </div>

            <div className="space-y-3 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-b border-slate-100 py-3">
              <div>
                <strong className="text-slate-800 block mb-1">Detailed Problem Description:</strong>
                <p>{modalTrack.fullDesc}</p>
              </div>

              <div>
                <strong className="text-slate-800 block mb-1">Target 36-Hour Deliverable:</strong>
                <p className="text-blue-900 font-medium">{modalTrack.deliverable}</p>
              </div>

              <div>
                <strong className="text-slate-800 block mb-0.5">Suggested Architecture / Stack:</strong>
                <span className="font-mono text-xs text-slate-700">{modalTrack.technologies}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => setModalTrack(null)}
                className="px-4 py-2 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              <a
                href={content.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-[#0f2d59] hover:bg-blue-950 text-white font-bold rounded-lg shadow"
              >
                Register Squad for Track
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 15. PASSWORD SECURITY GATE */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 border border-slate-200 relative shadow-2xl text-center">
            
            <button 
              onClick={() => setShowPinModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-[#0f2d59]">
              <ShieldAlert className="w-6 h-6 text-blue-900" />
            </div>

            <div>
              <h3 className="text-base font-bold text-[#0f2d59]">Restricted Access</h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter Convener / Chairperson Master Password to access portal controls.
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-3 pt-1">
              <div>
                <input
                  type="password"
                  placeholder="Enter Master Password"
                  value={adminPinInput}
                  onChange={(e) => {
                    setAdminPinInput(e.target.value);
                    if (pinError) setPinError(false);
                  }}
                  autoFocus
                  className={`w-full text-center tracking-widest font-mono text-sm px-3 py-2 border rounded-xl outline-none transition ${
                    pinError 
                      ? 'border-rose-500 bg-rose-50/50 focus:ring-1 focus:ring-rose-500' 
                      : 'border-slate-300 focus:border-blue-900 focus:ring-1 focus:ring-blue-900'
                  }`}
                />
                {pinError && (
                  <span className="text-[11px] font-bold text-rose-600 mt-1 block">
                    Incorrect Password. Access Denied.
                  </span>
                )}
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-bold text-[#0f2d59] bg-amber-400 hover:bg-amber-300 rounded-xl shadow transition cursor-pointer"
                >
                  Unlock Portal
                </button>
              </div>
            </form>

            <p className="text-[10px] text-slate-400 pt-2 border-t border-slate-100">
              Authorized NIIS Faculty & Organizing Committee Only
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          16. EXTENDED MASTER ADMIN CMS MODAL (ALL SECTIONS EDITABLE)
          ========================================================================= */}
      {showAdmin && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-5xl w-full p-5 sm:p-6 space-y-4 border border-slate-200 relative my-auto max-h-[94vh] flex flex-col shadow-2xl text-xs text-slate-800">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-bold text-[#0f2d59] text-base sm:text-lg flex items-center gap-2 font-serif">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  NIIS Hackathon Master Live CMS Portal
                </h3>
                <p className="text-[11px] text-slate-500">
                  Full control: Edit all sections, dates, event flow, prizes, guidelines, and committee leads live.
                </p>
              </div>
              <button 
                onClick={() => setShowAdmin(false)} 
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Navigation Jumpers */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-100 text-xs font-semibold">
              {[
                { id: 'general', label: '🔗 General & Dates' },
                { id: 'about', label: 'ℹ️ About Section' },
                { id: 'flow', label: '🔀 Event Flow (Phases)' },
                { id: 'tracks', label: `🎯 Tracks (${adminDraft.problemStatements.length})` },
                { id: 'prizes', label: '🏆 Prizes & Perks' },
                { id: 'guidelines', label: '📑 Guidelines & Brochure' },
                { id: 'committee', label: `👥 Committee & Contacts (${adminDraft.committeeMembers?.length || 0})` },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id)}
                  className={`px-3 py-2 rounded-lg whitespace-nowrap transition cursor-pointer ${
                    adminTab === tab.id
                      ? 'bg-[#0f2d59] text-amber-300 shadow-sm font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content Container */}
            <div className="overflow-y-auto py-2 space-y-4 flex-1 pr-1">
              
              {/* TAB 1: GENERAL LINKS & DATES */}
              {adminTab === 'general' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <h4 className="font-bold text-[#0f2d59] text-xs uppercase tracking-wider">Registration & Live Targets</h4>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Google Form Registration URL</label>
                      <input
                        type="url"
                        value={adminDraft.registrationUrl}
                        onChange={(e) => setAdminDraft({ ...adminDraft, registrationUrl: e.target.value })}
                        className="w-full border-2 border-blue-400 bg-white rounded-lg p-2 text-xs font-mono text-blue-950 font-bold"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Event Display Dates</label>
                        <input
                          type="text"
                          value={adminDraft.eventDates}
                          onChange={(e) => setAdminDraft({ ...adminDraft, eventDates: e.target.value })}
                          className="w-full border rounded p-2 bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Countdown ISO Target Date</label>
                        <input
                          type="text"
                          value={adminDraft.countdownTarget}
                          onChange={(e) => setAdminDraft({ ...adminDraft, countdownTarget: e.target.value })}
                          className="w-full border rounded p-2 bg-white text-xs font-mono"
                          placeholder="YYYY-MM-DDTHH:MM:SS"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <h4 className="font-bold text-[#0f2d59] text-xs uppercase tracking-wider">Venue & Taglines</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Tagline</label>
                        <input
                          type="text"
                          value={adminDraft.tagline}
                          onChange={(e) => setAdminDraft({ ...adminDraft, tagline: e.target.value })}
                          className="w-full border rounded p-2 bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Sub-tagline</label>
                        <input
                          type="text"
                          value={adminDraft.subTagline}
                          onChange={(e) => setAdminDraft({ ...adminDraft, subTagline: e.target.value })}
                          className="w-full border rounded p-2 bg-white text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Campus Venue Address</label>
                      <input
                        type="text"
                        value={adminDraft.venue}
                        onChange={(e) => setAdminDraft({ ...adminDraft, venue: e.target.value })}
                        className="w-full border rounded p-2 bg-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ABOUT SECTION (100% DYNAMIC) */}
              {adminTab === 'about' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <h4 className="font-bold text-[#0f2d59] text-xs uppercase tracking-wider">About Section Headlines & Content</h4>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Section Main Heading</label>
                      <input
                        type="text"
                        value={adminDraft.about?.heading || ""}
                        onChange={(e) => setAdminDraft({
                          ...adminDraft,
                          about: { ...adminDraft.about, heading: e.target.value }
                        })}
                        className="w-full border rounded p-2 bg-white text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Sub-heading</label>
                      <input
                        type="text"
                        value={adminDraft.about?.subHeading || ""}
                        onChange={(e) => setAdminDraft({
                          ...adminDraft,
                          about: { ...adminDraft.about, subHeading: e.target.value }
                        })}
                        className="w-full border rounded p-2 bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Paragraph 1 (Main Intro)</label>
                      <textarea
                        rows={3}
                        value={adminDraft.about?.para1 || ""}
                        onChange={(e) => setAdminDraft({
                          ...adminDraft,
                          about: { ...adminDraft.about, para1: e.target.value }
                        })}
                        className="w-full border rounded p-2 bg-white text-xs leading-relaxed"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Paragraph 2 (BPUT Model & Sprint)</label>
                      <textarea
                        rows={3}
                        value={adminDraft.about?.para2 || ""}
                        onChange={(e) => setAdminDraft({
                          ...adminDraft,
                          about: { ...adminDraft.about, para2: e.target.value }
                        })}
                        className="w-full border rounded p-2 bg-white text-xs leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* 3 Pillars Editor */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <h4 className="font-bold text-[#0f2d59] text-xs uppercase tracking-wider">3 Core Innovation Pillars</h4>
                    {(adminDraft.about?.pillars || []).map((pillar, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#0f2d59] text-xs">Pillar #{idx + 1} Title:</span>
                          <input
                            type="text"
                            value={pillar.title}
                            onChange={(e) => {
                              const updated = [...adminDraft.about.pillars];
                              updated[idx].title = e.target.value;
                              setAdminDraft({ ...adminDraft, about: { ...adminDraft.about, pillars: updated } });
                            }}
                            className="flex-1 border rounded p-1 text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-500 font-semibold mb-0.5">Description:</label>
                          <textarea
                            rows={2}
                            value={pillar.desc}
                            onChange={(e) => {
                              const updated = [...adminDraft.about.pillars];
                              updated[idx].desc = e.target.value;
                              setAdminDraft({ ...adminDraft, about: { ...adminDraft.about, pillars: updated } });
                            }}
                            className="w-full border rounded p-1.5 text-xs text-slate-700"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: EVENT FLOW (PHASES) */}
              {adminTab === 'flow' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-[#0f2d59] text-xs uppercase tracking-wider">
                        Dynamic Event Stages & Progression
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [
                            ...(adminDraft.eventFlow || []),
                            { stage: `Stage ${(adminDraft.eventFlow?.length || 0) + 1}`, title: "New Stage Title", desc: "Stage scope description..." }
                          ];
                          setAdminDraft({ ...adminDraft, eventFlow: updated });
                        }}
                        className="inline-flex items-center gap-1 bg-[#0f2d59] text-amber-300 px-3 py-1 rounded-lg text-xs font-bold"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Stage
                      </button>
                    </div>

                    {(adminDraft.eventFlow || []).map((stage, idx) => (
                      <div key={idx} className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={stage.stage}
                            onChange={(e) => {
                              const updated = [...adminDraft.eventFlow];
                              updated[idx].stage = e.target.value;
                              setAdminDraft({ ...adminDraft, eventFlow: updated });
                            }}
                            className="w-28 font-bold font-mono text-xs border rounded p-1"
                            placeholder="Stage 1"
                          />
                          <input
                            type="text"
                            value={stage.title}
                            onChange={(e) => {
                              const updated = [...adminDraft.eventFlow];
                              updated[idx].title = e.target.value;
                              setAdminDraft({ ...adminDraft, eventFlow: updated });
                            }}
                            className="flex-1 font-bold text-xs border rounded p-1 text-[#0f2d59]"
                            placeholder="Title..."
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = adminDraft.eventFlow.filter((_, i) => i !== idx);
                              setAdminDraft({ ...adminDraft, eventFlow: updated });
                            }}
                            className="text-rose-500 hover:text-rose-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={stage.desc}
                          onChange={(e) => {
                            const updated = [...adminDraft.eventFlow];
                            updated[idx].desc = e.target.value;
                            setAdminDraft({ ...adminDraft, eventFlow: updated });
                          }}
                          className="w-full border rounded p-1.5 text-xs text-slate-700"
                          placeholder="Stage description..."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: PROBLEM STATEMENTS */}
              {adminTab === 'tracks' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500">Edit or add problem statements for participants.</p>
                    <button
                      type="button"
                      onClick={() => {
                        const newTrack = {
                          id: `NIIS-PS0${adminDraft.problemStatements.length + 1}`,
                          domain: "AI & Next-Gen Tech",
                          title: "New Custom Problem Statement",
                          shortDesc: "Provide concise summary here...",
                          fullDesc: "Detailed scope and industrial requirements go here...",
                          difficulty: "Medium",
                          technologies: "Python, React, API",
                          deliverable: "Working functional prototype"
                        };
                        setAdminDraft({ ...adminDraft, problemStatements: [...adminDraft.problemStatements, newTrack] });
                      }}
                      className="inline-flex items-center gap-1.5 bg-[#0f2d59] hover:bg-blue-950 text-amber-300 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Problem Track
                    </button>
                  </div>

                  <div className="space-y-3">
                    {adminDraft.problemStatements.map((ps, idx) => (
                      <div key={ps.id || idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 relative group">
                        <div className="flex items-center justify-between border-b pb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold font-mono text-xs bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                              #{idx + 1}
                            </span>
                            <input
                              type="text"
                              value={ps.id}
                              onChange={(e) => {
                                const up = [...adminDraft.problemStatements];
                                up[idx].id = e.target.value;
                                setAdminDraft({ ...adminDraft, problemStatements: up });
                              }}
                              className="font-mono text-xs font-bold border rounded px-2 py-0.5 w-28 bg-white"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={ps.difficulty}
                              onChange={(e) => {
                                const up = [...adminDraft.problemStatements];
                                up[idx].difficulty = e.target.value;
                                setAdminDraft({ ...adminDraft, problemStatements: up });
                              }}
                              className="border rounded px-2 py-1 text-[11px] bg-white font-bold"
                            >
                              <option value="Open">Open</option>
                              <option value="Medium">Medium</option>
                              <option value="Hard">Hard</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => {
                                const up = adminDraft.problemStatements.filter((_, i) => i !== idx);
                                setAdminDraft({ ...adminDraft, problemStatements: up });
                              }}
                              className="text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50 transition cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Domain / Category</label>
                            <input
                              type="text"
                              value={ps.domain}
                              onChange={(e) => {
                                const up = [...adminDraft.problemStatements];
                                up[idx].domain = e.target.value;
                                setAdminDraft({ ...adminDraft, problemStatements: up });
                              }}
                              className="w-full border rounded p-1.5 bg-white text-xs font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Recommended Tech Stack</label>
                            <input
                              type="text"
                              value={ps.technologies}
                              onChange={(e) => {
                                const up = [...adminDraft.problemStatements];
                                up[idx].technologies = e.target.value;
                                setAdminDraft({ ...adminDraft, problemStatements: up });
                              }}
                              className="w-full border rounded p-1.5 bg-white text-xs font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Problem Statement Title</label>
                          <input
                            type="text"
                            value={ps.title}
                            onChange={(e) => {
                              const up = [...adminDraft.problemStatements];
                              up[idx].title = e.target.value;
                              setAdminDraft({ ...adminDraft, problemStatements: up });
                            }}
                            className="w-full border rounded p-1.5 bg-white text-xs font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Detailed Scope & Requirements</label>
                          <textarea
                            rows={3}
                            value={ps.fullDesc}
                            onChange={(e) => {
                              const up = [...adminDraft.problemStatements];
                              up[idx].fullDesc = e.target.value;
                              setAdminDraft({ ...adminDraft, problemStatements: up });
                            }}
                            className="w-full border rounded p-2 bg-white text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: PRIZES & PERKS (100% DYNAMIC) */}
              {adminTab === 'prizes' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-[#0f2d59] text-xs uppercase tracking-wider">
                        Prizes, Medals & Reward Perks
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [
                            ...adminDraft.prizes,
                            { rank: "Special Recognition", amount: "₹5,000", perk: "Trophy + Certificates + Goodies" }
                          ];
                          setAdminDraft({ ...adminDraft, prizes: updated });
                        }}
                        className="inline-flex items-center gap-1 bg-[#0f2d59] text-amber-300 px-3 py-1 rounded-lg text-xs font-bold cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Prize
                      </button>
                    </div>

                    {adminDraft.prizes.map((pz, idx) => (
                      <div key={idx} className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between gap-3">
                          <input
                            type="text"
                            value={pz.rank}
                            onChange={(e) => {
                              const up = [...adminDraft.prizes];
                              up[idx].rank = e.target.value;
                              setAdminDraft({ ...adminDraft, prizes: up });
                            }}
                            className="font-bold text-xs border rounded p-1.5 flex-1"
                            placeholder="Winner (1st Prize)"
                          />
                          <input
                            type="text"
                            value={pz.amount}
                            onChange={(e) => {
                              const up = [...adminDraft.prizes];
                              up[idx].amount = e.target.value;
                              setAdminDraft({ ...adminDraft, prizes: up });
                            }}
                            className="font-black font-mono text-sm border rounded p-1.5 w-32 text-[#0f2d59]"
                            placeholder="₹25,000"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const up = adminDraft.prizes.filter((_, i) => i !== idx);
                              setAdminDraft({ ...adminDraft, prizes: up });
                            }}
                            className="text-rose-500 hover:text-rose-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-500 font-semibold mb-0.5">Perks & Citations:</label>
                          <textarea
                            rows={2}
                            value={pz.perk}
                            onChange={(e) => {
                              const up = [...adminDraft.prizes];
                              up[idx].perk = e.target.value;
                              setAdminDraft({ ...adminDraft, prizes: up });
                            }}
                            className="w-full border rounded p-1.5 text-xs text-slate-700"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: GUIDELINES & BROCHURE (100% DYNAMIC) */}
              {adminTab === 'guidelines' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <h4 className="font-bold text-[#0f2d59] text-xs uppercase tracking-wider">
                      Rulebook & Brochure Download Link
                    </h4>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Official Brochure URL or Google Drive Link</label>
                      <input
                        type="text"
                        value={adminDraft.rulebookUrl || "/brochure.pdf"}
                        onChange={(e) => setAdminDraft({ ...adminDraft, rulebookUrl: e.target.value })}
                        className="w-full border rounded-lg p-2 bg-white text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                    <h4 className="font-bold text-[#0f2d59] text-xs uppercase tracking-wider">
                      Institutional Guidelines & Rules Text
                    </h4>
                    
                    {/* Rule 1 */}
                    <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                      <label className="block font-bold text-slate-800">Rule 1 Header</label>
                      <input
                        type="text"
                        value={adminDraft.guidelines?.rule1Title || ""}
                        onChange={(e) => setAdminDraft({
                          ...adminDraft,
                          guidelines: { ...adminDraft.guidelines, rule1Title: e.target.value }
                        })}
                        className="w-full border rounded p-1.5 text-xs font-bold"
                      />
                      <label className="block text-[11px] font-semibold text-slate-600">Points (One per line):</label>
                      <textarea
                        rows={3}
                        value={(adminDraft.guidelines?.rule1Points || []).join('\n')}
                        onChange={(e) => setAdminDraft({
                          ...adminDraft,
                          guidelines: { ...adminDraft.guidelines, rule1Points: e.target.value.split('\n') }
                        })}
                        className="w-full border rounded p-1.5 text-xs"
                      />
                    </div>

                    {/* Rule 2 */}
                    <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                      <label className="block font-bold text-slate-800">Rule 2 Header</label>
                      <input
                        type="text"
                        value={adminDraft.guidelines?.rule2Title || ""}
                        onChange={(e) => setAdminDraft({
                          ...adminDraft,
                          guidelines: { ...adminDraft.guidelines, rule2Title: e.target.value }
                        })}
                        className="w-full border rounded p-1.5 text-xs font-bold"
                      />
                      <label className="block text-[11px] font-semibold text-slate-600">Rule 2 Paragraph Description:</label>
                      <textarea
                        rows={3}
                        value={adminDraft.guidelines?.rule2Desc || ""}
                        onChange={(e) => setAdminDraft({
                          ...adminDraft,
                          guidelines: { ...adminDraft.guidelines, rule2Desc: e.target.value }
                        })}
                        className="w-full border rounded p-1.5 text-xs leading-relaxed"
                      />
                    </div>

                    {/* Rule 3 */}
                    <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                      <label className="block font-bold text-slate-800">Rule 3 Header</label>
                      <input
                        type="text"
                        value={adminDraft.guidelines?.rule3Title || ""}
                        onChange={(e) => setAdminDraft({
                          ...adminDraft,
                          guidelines: { ...adminDraft.guidelines, rule3Title: e.target.value }
                        })}
                        className="w-full border rounded p-1.5 text-xs font-bold"
                      />
                      <label className="block text-[11px] font-semibold text-slate-600">Points (One per line):</label>
                      <textarea
                        rows={3}
                        value={(adminDraft.guidelines?.rule3Points || []).join('\n')}
                        onChange={(e) => setAdminDraft({
                          ...adminDraft,
                          guidelines: { ...adminDraft.guidelines, rule3Points: e.target.value.split('\n') }
                        })}
                        className="w-full border rounded p-1.5 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: ORGANIZING COMMITTEE & CONTACTS (100% DYNAMIC) */}
              {adminTab === 'committee' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#0f2d59] text-xs uppercase tracking-wider">
                        Organizing Committee, Faculty & Student Leads
                      </h4>
                      <p className="text-[11px] text-slate-500">Each card appears on the live website with full contact details and photo.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newMember = {
                          id: `cm_${Date.now()}`,
                          name: "New Faculty / Coordinator",
                          role: "Designation / Dept",
                          category: "Organizing Team",
                          phone: "+91 90000 00000",
                          email: "contact@niisgroup.org",
                          photo: ""
                        };
                        setAdminDraft({
                          ...adminDraft,
                          committeeMembers: [...(adminDraft.committeeMembers || []), newMember]
                        });
                      }}
                      className="inline-flex items-center gap-1.5 bg-[#0f2d59] text-amber-300 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Member
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(adminDraft.committeeMembers || []).map((m, idx) => (
                      <div key={m.id || idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="font-bold text-xs text-[#0f2d59] bg-blue-100 px-2 py-0.5 rounded">
                            Member #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const up = adminDraft.committeeMembers.filter((_, i) => i !== idx);
                              setAdminDraft({ ...adminDraft, committeeMembers: up });
                            }}
                            className="text-rose-500 hover:text-rose-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Full Name</label>
                            <input
                              type="text"
                              value={m.name}
                              onChange={(e) => {
                                const up = [...adminDraft.committeeMembers];
                                up[idx].name = e.target.value;
                                setAdminDraft({ ...adminDraft, committeeMembers: up });
                              }}
                              className="w-full border rounded p-1.5 bg-white text-xs font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Role / Designation</label>
                            <input
                              type="text"
                              value={m.role}
                              onChange={(e) => {
                                const up = [...adminDraft.committeeMembers];
                                up[idx].role = e.target.value;
                                setAdminDraft({ ...adminDraft, committeeMembers: up });
                              }}
                              className="w-full border rounded p-1.5 bg-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Category Tag</label>
                            <input
                              type="text"
                              value={m.category}
                              onChange={(e) => {
                                const up = [...adminDraft.committeeMembers];
                                up[idx].category = e.target.value;
                                setAdminDraft({ ...adminDraft, committeeMembers: up });
                              }}
                              className="w-full border rounded p-1.5 bg-white text-xs font-semibold"
                              placeholder="e.g. Convener, Student Lead, Chief Patron"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Phone Number</label>
                            <input
                              type="text"
                              value={m.phone}
                              onChange={(e) => {
                                const up = [...adminDraft.committeeMembers];
                                up[idx].phone = e.target.value;
                                setAdminDraft({ ...adminDraft, committeeMembers: up });
                              }}
                              className="w-full border rounded p-1.5 bg-white text-xs font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Email Address</label>
                            <input
                              type="email"
                              value={m.email}
                              onChange={(e) => {
                                const up = [...adminDraft.committeeMembers];
                                up[idx].email = e.target.value;
                                setAdminDraft({ ...adminDraft, committeeMembers: up });
                              }}
                              className="w-full border rounded p-1.5 bg-white text-xs font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Photo URL / File Path</label>
                            <input
                              type="text"
                              value={m.photo || ""}
                              onChange={(e) => {
                                const up = [...adminDraft.committeeMembers];
                                up[idx].photo = e.target.value;
                                setAdminDraft({ ...adminDraft, committeeMembers: up });
                              }}
                              placeholder="e.g. /sir.png or Cloud image URL"
                              className="w-full border rounded p-1.5 bg-white text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Actions Bar with Loading Indicator */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleExportJSON}
                className="px-3.5 py-2 border border-blue-900 bg-blue-50 text-blue-900 rounded-lg font-semibold flex items-center gap-1.5 hover:bg-blue-100 transition text-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export config (JSON Backup)</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdmin(false)}
                  className="px-4 py-2 border rounded-lg font-semibold text-slate-600 hover:bg-slate-50 text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveAdmin}
                  disabled={isSaving}
                  className={`px-5 py-2 rounded-lg font-bold shadow-md text-xs transition flex items-center gap-2 cursor-pointer ${
                    isSaving 
                      ? 'bg-blue-900/60 text-amber-200 cursor-not-allowed' 
                      : 'bg-[#0f2d59] hover:bg-blue-950 text-amber-300'
                  }`}
                >
                  {isSaving ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-amber-300 border-t-transparent rounded-full animate-spin"></span>
                      <span>Saving to Cloud...</span>
                    </>
                  ) : (
                    <span>Save & Apply Changes Live</span>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}