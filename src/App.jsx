import React, { useState, useEffect, useMemo, useRef } from 'react';
import { db } from './firebase';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  onSnapshot
} from 'firebase/firestore';
import {
  Calendar, Clock, MapPin, Users, FileText, CheckCircle2,
  ChevronRight, ChevronLeft, Sparkles, Download, ExternalLink,
  Edit3, Plus, Trash2, X, Menu,
  Phone, Mail, Trophy, BookOpen, ShieldCheck,
  ArrowRight, Laptop, Search,
  ChevronDown, Terminal, Globe, ShieldAlert,
  Play, Pause, Volume2, VolumeX,
  FileSpreadsheet, UserPlus, RefreshCw, CheckCircle, UserCheck, Video, Lock,
  BarChart3, Sliders, Save, ArrowUp, ArrowDown, Eye, FileUp, AlertCircle
} from 'lucide-react';

/* =========================================================================
   1. BRANDING & BADGE ASSETS
   ========================================================================= */

/**
 * Official College Crest
 */
function NIISOfficialCrest({ className = "w-16 h-16" }) {
  return (
    <div className={`relative flex items-center justify-center ${className} flex-shrink-0`}>
      <img
        src="/WhatsApp Image 2026-09-20 at 18.31.48.jpeg"
        alt="NIIS College Crest"
        className="w-full h-full object-contain"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/hackathon-logo.png";
        }}
      />
    </div>
  );
}

/**
 * Kaushal Technical Club Branding Badge
 * Clean, minimal, self-contained emblem without bulky wrappers
 */
function KaushalClubBadge({ className = "" }) {
  const defaultBg = className.includes('bg-') ? '' : 'bg-slate-900 text-white';
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium shadow-sm transition ${defaultBg} ${className}`}
    >
      <span className="relative flex h-2 w-2 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
      </span>
      <span className="font-mono font-black tracking-wider text-amber-300">KAUSHAL</span>
      <span className="text-slate-300 text-[11px] font-sans font-medium hidden sm:inline">
        Technical Club • NIIS
      </span>
    </div>
  );
}

/* =========================================================================
   2. INTERACTIVE CANVAS PARTICLES FOR HERO
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

    const particleCount = Math.min(Math.floor(width / 22), 55);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      r: Math.random() * 1.6 + 1
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
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.18 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const mDist = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
          if (mDist < 140) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(245, 158, 11, ${0.28 * (1 - mDist / 140)})`;
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
   3. PERMANENT 3 LEADERS OF NIIS (INVIOLABLE - NEVER OVERWRITTEN BY FIRESTORE)
   ========================================================================= */
const PERMANENT_LEADERS = [
  {
    id: "leader-1",
    name: "Dr. Subhash Chandra Nayak",
    role: "Chairperson, NIIS Group of Institutions",
    badge: "Hon'ble Chairperson",
    photo: "/chairman.15c124f6375fe3d6762b.png",
    quote: "Celebrating 26 Years of Academic Excellence, we welcome aspiring student innovators from across NIIS departments to 24 hours of rigorous hands-on building. We assure state-of-the-art infrastructure, mentorship from seasoned industry architects, and incubation support for top working prototypes."
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
   4. HACKATHON ARCHIVES / GALLERY DATA
   ========================================================================= */
const INITIAL_GALLERY = [
  {
    id: 1,
    title: "Grand Inaugural Ceremony 2025",
    category: "Inaugural & Sprints",
    src: "/gallery/1.jpg",
    caption: "Hon'ble Chairperson Dr. Subhash Chandra Nayak, academic dignitaries, and tech mentors inaugurating the previous hackathon edition.",
    tag: "Day 1 Kickoff",
    date: "Hackathon 2025"
  },
  {
    id: 2,
    title: "Midnight Coding Sprint (02:00 AM)",
    category: "Inaugural & Sprints",
    src: "/gallery/2.jpg",
    caption: "Teams actively developing full-stack architectures, training ML pipelines, and debugging endpoints under non-stop sprint pressure.",
    tag: "24h Sprint",
    date: "Hackathon 2025"
  },
  {
    id: 3,
    title: "Industry Mentorship Checkpoint",
    category: "Mentorship",
    src: "/gallery/3.jpg",
    caption: "Senior cloud architects and faculty experts reviewing team database schemas, API integrations, and system reliability.",
    tag: "Mentorship",
    date: "Hackathon 2025"
  },
  {
    id: 4,
    title: "Hardware & IoT Telemetry Labs",
    category: "Mentorship",
    src: "/gallery/4.jpg",
    caption: "Participants configuring ESP32 microcontrollers, telemetry sensors, and edge gateways in the NIIS Advanced Embedded Labs.",
    tag: "IoT & Hardware",
    date: "Hackathon 2025"
  },
  {
    id: 5,
    title: "Top 10 Finalist Live Jury Pitches",
    category: "Jury Demos",
    src: "/gallery/5.jpg",
    caption: "Shortlisted squads demonstrating live working prototypes, analytics dashboards, and commercialization plans before the jury.",
    tag: "Grand Evaluation",
    date: "Hackathon 2025"
  },
  {
    id: 6,
    title: "Valedictory & ₹35K Bounty Awards",
    category: "Valedictory",
    src: "/gallery/6.jpg",
    caption: "Grand felicitation recognizing champion squads with cash prizes, trophies, medals, and incubation grants at the NIIS Auditorium.",
    tag: "Awards & Bounty",
    date: "Hackathon 2025"
  }
];

/* =========================================================================
   5. OFFICIAL COMMITTEE DIRECTORY (14 FACULTY IN-CHARGE + 1 STUDENT LEAD)
   ========================================================================= */
const OFFICIAL_COMMITTEE_MEMBERS = [
  {
    id: "cm-1",
    name: "Dr. Sradhanjali Nayak",
    role: "Head, Kaushal Tech Club",
    category: "Tech Club Head",
    phone: "+91 94370 11001",
    email: "sradhanjali.nayak@niis.edu.in",
    photo: ""
  },
  {
    id: "cm-2",
    name: "Dr. Debashree Manshi Mishra",
    role: "In-Charge Member, Tech Club",
    category: "Faculty Core",
    phone: "+91 94370 11002",
    email: "debashree.mishra@niis.edu.in",
    photo: ""
  },
  {
    id: "cm-3",
    name: "Dr. Prachipurvi Tripathy",
    role: "In-Charge Member, Tech Club",
    category: "Faculty Core",
    phone: "+91 94370 11003",
    email: "prachipurvi.t@niis.edu.in",
    photo: ""
  },
  {
    id: "cm-4",
    name: "Dr. Minati Das",
    role: "In-Charge Member, Tech Club",
    category: "Faculty Core",
    phone: "+91 94370 11004",
    email: "minati.das@niis.edu.in",
    photo: ""
  },
  {
    id: "cm-5",
    name: "Dr. S. D. Samal",
    role: "In-Charge Member, Tech Club",
    category: "Faculty Core",
    phone: "+91 94370 11005",
    email: "sd.samal@niis.edu.in",
    photo: ""
  },
  {
    id: "cm-6",
    name: "Dr. Pravakar Mishra",
    role: "In-Charge Member, Tech Club",
    category: "Faculty Core",
    phone: "+91 94370 11006",
    email: "pravakar.mishra@niis.edu.in",
    photo: ""
  },
  {
    id: "cm-7",
    name: "Dr. Chittaranjan Satpathy",
    role: "In-Charge Member, Tech Club",
    category: "Faculty Core",
    phone: "+91 94370 11007",
    email: "chittaranjan.s@niis.edu.in",
    photo: ""
  },
  {
    id: "cm-8",
    name: "Dr. Suryakant Mohapatra",
    role: "In-Charge Member, Tech Club",
    category: "Faculty Core",
    phone: "+91 94370 11008",
    email: "suryakant.m@niis.edu.in",
    photo: ""
  },
  {
    id: "cm-9",
    name: "Dr. Sibabrata Sahoo",
    role: "In-Charge Member, Tech Club",
    category: "Faculty Core",
    phone: "+91 94370 11009",
    email: "sibabrata.sahoo@niis.edu.in",
    photo: ""
  },
  {
    id: "cm-10",
    name: "Prof. Chinmay Ku. Rout",
    role: "In-Charge Member, Tech Club",
    category: "Faculty Core",
    phone: "+91 94370 11010",
    email: "chinmay.rout@niis.edu.in",
    photo: ""
  },
  {
    id: "cm-11",
    name: "Prof. Sumita Dhar",
    role: "In-Charge Member, Tech Club",
    category: "Faculty Core",
    phone: "+91 94370 11011",
    email: "sumita.dhar@niis.edu.in",
    photo: ""
  },
  {
    id: "cm-12",
    name: "Prof. Vinita Debyani Mishra",
    role: "In-Charge Member, Tech Club",
    category: "Faculty Core",
    phone: "+91 94370 11012",
    email: "vinita.mishra@niis.edu.in",
    photo: ""
  },
  {
    id: "cm-13",
    name: "Ms. Rutuparna Nayak",
    role: "In-Charge Member, Tech Club",
    category: "Faculty Core",
    phone: "+91 94370 11013",
    email: "rutuparna.nayak@niis.edu.in",
    photo: ""
  },
  {
    id: "cm-14",
    name: "Ms. Suchismita",
    role: "In-Charge Member, Tech Club",
    category: "Faculty Core",
    phone: "+91 94370 11014",
    email: "suchismita@niis.edu.in",
    photo: ""
  },
  {
    id: "cm-15",
    name: "Satya Ranjan Rana",
    role: "President, Kaushal Technical Club / Student Lead",
    category: "Student Lead",
    phone: "+91 7530914313",
    email: "kaushal.tech@niis.edu.in",
    photo: ""
  }
];

/* =========================================================================
   6. OFFICIAL STANDARDIZED PROBLEM STATEMENTS (4 CATEGORIES, 12 TOTAL PS)
   Schema: { id, title, category, difficulty, shortDesc, fullBrief, tags, pdfUrl }
   ========================================================================= */
const OFFICIAL_PROBLEM_STATEMENTS = [
  // Category 1: CAMPUS NEXUS (Smart Campus, Student Services & Institutional Intelligence)
  {
    id: "PS-01",
    title: "AI-Powered Campus Life Management Platform",
    category: "CAMPUS NEXUS",
    difficulty: "Medium",
    shortDesc: "Develop a unified digital platform for attendance, timetables, leave/gate-pass requests, certificates, hostel and mess services, complaints, notices and fee-related queries, with real-time administrative visibility.",
    fullBrief: "Develop a unified digital platform for attendance, timetables, leave/gate-pass requests, certificates, hostel and mess services, complaints, notices and fee-related queries, with real-time administrative visibility. The platform must centralize fragmented departmental tracking, streamline multi-tiered student approvals with QR-verified digital gate-passes, provide intelligent complaint escalation, and equip institutional leadership with live administrative analytics.",
    tags: ["Smart Campus", "Full-Stack", "Institutional Intelligence", "Workflow Automation"],
    pdfUrl: ""
  },
  {
    id: "PS-02",
    title: "CAMPUSLINK - AI-Powered Campus-to-Corporate Placement Management",
    category: "CAMPUS NEXUS",
    difficulty: "Hard",
    shortDesc: "Develop an AI-powered placement platform that maintains student profiles, identifies skill gaps, analyses recruiter requirements, matches candidates with opportunities, manages schedules and provides placement analytics.",
    fullBrief: "Develop an AI-powered placement platform that maintains student profiles, identifies skill gaps, analyses recruiter requirements, matches candidates with opportunities, manages schedules and provides placement analytics. Squads are challenged to automate resume parsing, compare candidate proficiencies against dynamic corporate job descriptions, generate personalized remediation learning pathways, and deliver Training & Placement Cell dashboards with institutional hiring trends.",
    tags: ["AI/ML", "HR Tech", "Skill Gap Analysis", "Analytics"],
    pdfUrl: ""
  },
  {
    id: "PS-03",
    title: "Sustainable Campus & Facility Intelligence Dashboard",
    category: "CAMPUS NEXUS",
    difficulty: "Medium",
    shortDesc: "Develop an AI-enabled dashboard for monitoring energy, water, waste, air quality and asset utilization to support data-driven and sustainable campus management.",
    fullBrief: "Develop an AI-enabled dashboard for monitoring energy, water, waste, air quality and asset utilization to support data-driven and sustainable campus management. The platform must aggregate environmental and utility telemetry, identify consumption anomalies, predict equipment maintenance needs, and generate actionable carbon-reduction recommendations to uphold green institutional standards.",
    tags: ["Data Analytics", "Sustainability", "Asset Utilization", "Dashboard"],
    pdfUrl: ""
  },

  // Category 2: MEDITACH AI (Intelligent Healthcare & Well-being Solutions)
  {
    id: "PS-04",
    title: "Multimodal Healthcare Triage Assistant",
    category: "MEDITACH AI",
    difficulty: "Hard",
    shortDesc: "Develop a human-in-the-loop AI assistant that processes patient symptoms, medical reports and basic visual information to generate a structured preliminary triage note for qualified healthcare review.",
    fullBrief: "Develop a human-in-the-loop AI assistant that processes patient symptoms, medical reports and basic visual information to generate a structured preliminary triage note for qualified healthcare review. The solution must support clinical prioritization in high-volume healthcare settings by synthesizing multi-format patient inputs into an emergency urgency score and an executive triage summary without replacing licensed medical practitioners.",
    tags: ["Healthcare AI", "Multimodal", "Triage", "Decision Support"],
    pdfUrl: ""
  },
  {
    id: "PS-05",
    title: "AI-Based Heatwave Health Risk & Local Alert System",
    category: "MEDITACH AI",
    difficulty: "Medium",
    shortDesc: "Develop a software-based system that combines publicly available temperature, humidity, heat-index and location data to identify localized heat risks and provide preventive alerts for vulnerable groups.",
    fullBrief: "Develop a software-based system that combines publicly available temperature, humidity, heat-index and location data to identify localized heat risks and provide preventive alerts for vulnerable groups. The application must analyze meteorological streams to forecast dangerous micro-climate heat spikes, establish risk thresholds, and deliver automated preventive hydration advisories to outdoor workers, elders, and campus students.",
    tags: ["Climate Tech", "Risk Modeling", "Geo Alerts", "Public Health"],
    pdfUrl: ""
  },
  {
    id: "PS-06",
    title: "Data-Driven Air-Pollution Analysis & Health Advisory System",
    category: "MEDITACH AI",
    difficulty: "Medium",
    shortDesc: "Develop a software-only data analytics platform that uses publicly available air-quality and environmental datasets to analyse pollution trends, identify high-pollution periods, visualize pollution levels and provide location-based health advisories (No external hardware/sensors required).",
    fullBrief: "Develop a software-only data analytics platform that uses publicly available air-quality and environmental datasets to analyse pollution trends, identify high-pollution periods, visualize pollution levels and provide location-based health advisories without external hardware or physical sensors. The system should process open CPCB/SPCB environmental records, plot temporal pollutant concentrations (PM2.5, PM10, AQI), and provide targeted precautionary guidance for sensitive demographics.",
    tags: ["Data Science", "Environmental Analytics", "Software-Only", "Health Advisory"],
    pdfUrl: ""
  },

  // Category 3: AI & MACHINE LEARNING (Intelligent, Secure & Automated Solutions)
  {
    id: "PS-07",
    title: "CYBERGUARD - AI-Powered Cyber Threat & Phishing Detection",
    category: "AI & MACHINE LEARNING",
    difficulty: "Hard",
    shortDesc: "Analyse emails, URLs, messages, authentication logs and network activity to detect phishing, impersonation and suspicious behaviour, with explainable risk scores and response recommendations.",
    fullBrief: "Analyse emails, URLs, messages, authentication logs and network activity to detect phishing, impersonation and suspicious behaviour, with explainable risk scores and response recommendations. Squads must build CYBERGUARD as an automated defensive pipeline that decodes spoofed headers, inspects phishing payloads, correlates anomalous login behavior, and generates transparent explainability reports detailing why a communication was flagged.",
    tags: ["Cybersecurity", "Phishing Detection", "Explainable AI", "Threat Analysis"],
    pdfUrl: ""
  },
  {
    id: "PS-08",
    title: "AI-Powered Workplace Safety Gear Detection",
    category: "AI & MACHINE LEARNING",
    difficulty: "Medium",
    shortDesc: "Use computer vision on CCTV or recorded video to detect helmets, high-visibility vests, safety footwear, gloves and other required protective equipment and generate safety alerts.",
    fullBrief: "Use computer vision on CCTV or recorded video to detect helmets, high-visibility vests, safety footwear, gloves and other required protective equipment and generate safety alerts. The pipeline must operate on standard video feeds, execute lightweight real-time object classification and bounding-box tracking for Personal Protective Equipment (PPE), and log safety compliance incidents with instant supervisor notifications.",
    tags: ["Computer Vision", "Workplace Safety", "Object Detection", "Video Analytics"],
    pdfUrl: ""
  },
  {
    id: "PS-09",
    title: "Explainable AI-Based Prediction & Decision Support System",
    category: "AI & MACHINE LEARNING",
    difficulty: "Hard",
    shortDesc: "Develop an AI/ML solution for a practical prediction problem such as student performance, equipment failure, demand forecasting, fraud detection or resource utilization, with understandable explanations.",
    fullBrief: "Develop an AI/ML solution for a practical prediction problem such as student performance, equipment failure, demand forecasting, fraud detection or resource utilization, with understandable explanations. The model must eliminate black-box opacity by integrating explainable attribution mechanisms (such as SHAP values, feature importance weights, or decision trees) to empower stakeholders with transparent reasoning behind every analytical prediction.",
    tags: ["Explainable AI (XAI)", "Predictive Modeling", "Decision Support"],
    pdfUrl: ""
  },

  // Category 4: NEUROCORE / GEONAVX (GPS, Navigation & Location Intelligence)
  {
    id: "PS-10",
    title: "3D Autonomous Path Planning in GPS-Denied Environments",
    category: "NEUROCORE / GEONAVX",
    difficulty: "Hard",
    shortDesc: "Develop a lightweight intelligent algorithm for autonomous navigation in GPS-denied environments by combining positional information with camera or sensor-based environmental information.",
    fullBrief: "Develop a lightweight intelligent algorithm for autonomous navigation in GPS-denied environments by combining positional information with camera or sensor-based environmental information. The algorithm must calculate optimal collision-free 3D waypoints for autonomous vehicles or drones operating in subterranean tunnels, indoor warehouse facilities, or obstructed terrains where satellite signals are unavailable.",
    tags: ["Path Planning", "Autonomous Navigation", "Algorithm Design", "Spatial AI"],
    pdfUrl: ""
  },
  {
    id: "PS-11",
    title: "AI-Powered Smart Campus Navigation",
    category: "NEUROCORE / GEONAVX",
    difficulty: "Medium",
    shortDesc: "Develop an intelligent map-based navigation system for students and visitors that provides shortest, accessible and context-aware routes across campus.",
    fullBrief: "Develop an intelligent map-based navigation system for students and visitors that provides shortest, accessible and context-aware routes across campus. The system must feature interactive spatial mapping across academic blocks, departments, laboratories, and amenities, incorporating barrier-free wheelchair accessible path calculations and live context-aware destination search.",
    tags: ["Campus Navigation", "Indoor Mapping", "Shortest Path", "Accessibility"],
    pdfUrl: ""
  },
  {
    id: "PS-12",
    title: "Emergency Route & Location Intelligence System",
    category: "NEUROCORE / GEONAVX",
    difficulty: "Hard",
    shortDesc: "Develop a location-aware emergency response system with user location, safe-route identification, nearby emergency facilities, geo-fencing, alerts and dynamic route recommendations.",
    fullBrief: "Develop a location-aware emergency response system with user location, safe-route identification, nearby emergency facilities, geo-fencing, alerts and dynamic route recommendations. The platform must dynamically route users away from detected hazard zones, display real-time safety perimeters, pinpoint nearest medical/fire facilities, and dispatch coordinated emergency incident broadcasts.",
    tags: ["Emergency Response", "Geo-Fencing", "Location Intelligence", "Routing"],
    pdfUrl: ""
  }
];

/**
 * Generates and downloads a clean, structured institutional PDF problem brief for students without third-party dependencies.
 * Follows strict PDF 1.4 specification with dual Helvetica / Helvetica-Bold typography.
 */
function handleDownloadProblemBrief(ps, collegeName = "NIIS INSTITUTE OF BUSINESS ADMINISTRATION") {
  if (ps.pdfUrl && ps.pdfUrl.trim()) {
    const a = document.createElement('a');
    a.href = ps.pdfUrl;
    const cleanId = (ps.id || '').replace(/^NIIS-/i, '').replace(/[^a-zA-Z0-9]/g, '_');
    a.download = cleanId.startsWith('PS') ? `NIIS_Hackathon_2026_${cleanId}.pdf` : `NIIS_Hackathon_2026_PS_${cleanId}.pdf`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    a.remove();
    return;
  }

  const cleanText = (str) => (str || '')
    .replace(/₹/g, 'Rs. ')
    .replace(/•/g, '*')
    .replace(/[–—]/g, '-')
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    .replace(/[^\x20-\x7E]/g, ' ')
    .trim();

  const sanitizeForPdf = (str) => cleanText(str).replace(/[\\()]/g, '\\$&');

  const wrapText = (text, maxChars = 80) => {
    const words = cleanText(text).split(' ');
    const lines = [];
    let cur = '';
    for (const w of words) {
      if (!w) continue;
      if ((cur ? cur + ' ' + w : w).length > maxChars) {
        if (cur) lines.push(cur);
        cur = w;
      } else {
        cur = cur ? cur + ' ' + w : w;
      }
    }
    if (cur) lines.push(cur);
    return lines;
  };

  const idCode = ps.id || 'PS-01';
  const cleanId = idCode.replace(/^NIIS-/i, '').replace(/[^a-zA-Z0-9]/g, '_');
  const filename = cleanId.startsWith('PS') ? `NIIS_Hackathon_2026_${cleanId}.pdf` : `NIIS_Hackathon_2026_PS_${cleanId}.pdf`;

  const docLines = [
    { text: `${collegeName} | KAUSHAL TECH CLUB`, font: 12, bold: true, spaceAfter: 4 },
    { text: `NIIS HACKATHON 2026 (30 Sep - 01 Oct 2026) • 24-HOUR SPRINT`, font: 9, bold: false, spaceAfter: 4 },
    { text: `Approved by AICTE | Affiliated to BPUT, Odisha | Accredited by NAAC`, font: 8, bold: false, spaceAfter: 8 },
    { text: `-------------------------------------------------------------------------------------------------`, font: 8, bold: false, spaceAfter: 8 },
    { text: `OFFICIAL PROBLEM STATEMENT BRIEF: ${idCode}`, font: 12, bold: true, spaceAfter: 4 },
    { text: `Title: ${ps.title}`, font: 11, bold: true, spaceAfter: 4 },
    { text: `Category: ${ps.category}    |    Difficulty: ${ps.difficulty || 'Open'}`, font: 9, bold: false, spaceAfter: 4 },
    ...(ps.tags && ps.tags.length > 0 ? [{ text: `Domain Tags: ${ps.tags.join(', ')}`, font: 8.5, bold: false, spaceAfter: 6 }] : []),
    { text: `-------------------------------------------------------------------------------------------------`, font: 8, bold: false, spaceAfter: 8 },
    
    { text: `EXECUTIVE SUMMARY & OBJECTIVE:`, font: 10, bold: true, spaceAfter: 4 },
    ...wrapText(ps.shortDesc || '', 82).map(l => ({ text: l, font: 8.5, bold: false, spaceAfter: 2 })),
    { text: ``, font: 8, bold: false, spaceAfter: 4 },

    { text: `DETAILED TECHNICAL SCOPE & REQUIREMENTS:`, font: 10, bold: true, spaceAfter: 4 },
    ...wrapText(ps.fullBrief || ps.shortDesc || '', 82).map(l => ({ text: l, font: 8.5, bold: false, spaceAfter: 2 })),
    { text: ``, font: 8, bold: false, spaceAfter: 4 },

    { text: `EXPECTED PROJECT DELIVERABLES:`, font: 10, bold: true, spaceAfter: 4 },
    { text: `1. System Architecture Diagram, Database Schemas & API Documentation`, font: 8.5, bold: false, spaceAfter: 2 },
    { text: `2. Working Software Codebase Prototype (Web Platform / Mobile / AI Engine)`, font: 8.5, bold: false, spaceAfter: 2 },
    { text: `3. Live Demonstration Video or Interactive Sprint Presentation`, font: 8.5, bold: false, spaceAfter: 2 },
    { text: `4. 5-Minute Technical Pitch Deck covering Innovation, Usability & Feasibility`, font: 8.5, bold: false, spaceAfter: 6 },

    { text: `EVALUATION CRITERIA & SCORING RUBRIC:`, font: 10, bold: true, spaceAfter: 4 },
    { text: `* Innovation, Problem Fit & Originality: 25%`, font: 8.5, bold: false, spaceAfter: 2 },
    { text: `* Technical Feasibility, Architecture & Security: 25%`, font: 8.5, bold: false, spaceAfter: 2 },
    { text: `* Completeness of Working Prototype: 25%`, font: 8.5, bold: false, spaceAfter: 2 },
    { text: `* Social / Institutional Impact & Presentation Pitch: 25%`, font: 8.5, bold: false, spaceAfter: 8 },

    { text: `PRIZE BOUNTY & RECOGNITION:`, font: 10, bold: true, spaceAfter: 4 },
    { text: `Total Cash Prize Pool: Rs. 35,000 (1st: Rs. 20,000 | 2nd: Rs. 10,000 | 3rd: Rs. 5,000) + Trophies + Certificates`, font: 8.5, bold: false, spaceAfter: 8 },

    { text: `-------------------------------------------------------------------------------------------------`, font: 8, bold: false, spaceAfter: 6 },
    { text: `Official Event Rulebook & Guidelines: https://niis-hackathon-2026.web.app | Kaushal Technical Club`, font: 8, bold: false, spaceAfter: 2 },
    { text: `Approved by AICTE | Affiliated to BPUT, Odisha | Accredited by NAAC`, font: 8, bold: false, spaceAfter: 0 }
  ];

  let streamContent = `BT\n`;
  streamContent += `50 750 Td\n`;

  for (let i = 0; i < docLines.length; i++) {
    const item = docLines[i];
    const fontSize = item.font || 9;
    const fontName = item.bold ? '/F2' : '/F1';
    const textStr = sanitizeForPdf(item.text);
    
    if (i === 0) {
      streamContent += `${fontName} ${fontSize} Tf\n`;
      streamContent += `(${textStr}) Tj\n`;
    } else {
      const step = -(fontSize + (item.spaceAfter || 2));
      streamContent += `0 ${step} Td\n`;
      streamContent += `${fontName} ${fontSize} Tf\n`;
      streamContent += `(${textStr}) Tj\n`;
    }
  }
  streamContent += `ET\n`;

  const streamLength = new TextEncoder().encode(streamContent).length;

  const header = `%PDF-1.4\n`;
  const obj1 = `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`;
  const obj2 = `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`;
  const obj3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n`;
  const obj4 = `4 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}endstream\nendobj\n`;
  const obj5 = `5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`;
  const obj6 = `6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n`;

  const body = header + obj1 + obj2 + obj3 + obj4 + obj5 + obj6;
  const offset1 = header.length;
  const offset2 = offset1 + obj1.length;
  const offset3 = offset2 + obj2.length;
  const offset4 = offset3 + obj3.length;
  const offset5 = offset4 + obj4.length;
  const offset6 = offset5 + obj5.length;
  const offset7 = offset6 + obj6.length;
  const xrefOffset = offset7;

  const pad = (n) => String(n).padStart(10, '0');
  const xref = `xref\n0 7\n0000000000 65535 f \n${pad(offset1)} 00000 n \n${pad(offset2)} 00000 n \n${pad(offset3)} 00000 n \n${pad(offset4)} 00000 n \n${pad(offset5)} 00000 n \n${pad(offset6)} 00000 n \n`;
  const trailer = `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  const pdfString = body + xref + trailer;
  const blob = new Blob([pdfString], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* =========================================================================
   7. MASTER EXTENSIBLE CONTENT STATE & GOOGLE FORMS INTEGRATION
   ========================================================================= */
export const DEFAULT_GOOGLE_FORM_REGISTRATION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSftmKv2zVpnw55JYoJ8s22_xpCDs1MVmmQWicr3bgCOw11big/viewform?usp=header";
export const DEFAULT_GOOGLE_FORM_PS_SELECTION_URL = "https://forms.gle/iZh5Sks9p1EkhHNH7";

/**
 * Standard Telemetry Baseline Schema for 12 Problem Statements
 * Keys provided in both "ps-1"..."ps-12" (strict user schema) and "PS-01"..."PS-12" (direct card ID)
 * Sum: 28 Verified Teams | 112 Total Participants
 */
const DEFAULT_PS_TELEMETRY = {
  "ps-1": { teams: 3, participants: 12 },
  "ps-2": { teams: 3, participants: 12 },
  "ps-3": { teams: 3, participants: 12 },
  "ps-4": { teams: 2, participants: 8 },
  "ps-5": { teams: 3, participants: 12 },
  "ps-6": { teams: 2, participants: 8 },
  "ps-7": { teams: 2, participants: 8 },
  "ps-8": { teams: 2, participants: 8 },
  "ps-9": { teams: 2, participants: 8 },
  "ps-10": { teams: 2, participants: 8 },
  "ps-11": { teams: 2, participants: 8 },
  "ps-12": { teams: 2, participants: 8 },
  "PS-01": { teams: 3, participants: 12 },
  "PS-02": { teams: 3, participants: 12 },
  "PS-03": { teams: 3, participants: 12 },
  "PS-04": { teams: 2, participants: 8 },
  "PS-05": { teams: 3, participants: 12 },
  "PS-06": { teams: 2, participants: 8 },
  "PS-07": { teams: 2, participants: 8 },
  "PS-08": { teams: 2, participants: 8 },
  "PS-09": { teams: 2, participants: 8 },
  "PS-10": { teams: 2, participants: 8 },
  "PS-11": { teams: 2, participants: 8 },
  "PS-12": { teams: 2, participants: 8 }
};

/**
 * Robust helper to resolve telemetry counts across multiple key formats
 */
function getPsMetrics(telemetryMap, psId) {
  if (!telemetryMap || typeof telemetryMap !== 'object') {
    return { teams: 0, participants: 0 };
  }
  if (telemetryMap[psId] && typeof telemetryMap[psId] === 'object') {
    return {
      teams: Math.max(0, parseInt(telemetryMap[psId].teams) || 0),
      participants: Math.max(0, parseInt(telemetryMap[psId].participants) || 0)
    };
  }
  const num = parseInt(String(psId).replace(/\D/g, ''), 10);
  if (!isNaN(num)) {
    const keys = [
      `ps-${num}`,
      `PS-${num < 10 ? '0' + num : num}`,
      `ps-${num < 10 ? '0' + num : num}`,
      `NIIS-PS${num < 10 ? '0' + num : num}`,
      String(psId).toLowerCase()
    ];
    for (const k of keys) {
      if (telemetryMap[k] && typeof telemetryMap[k] === 'object') {
        return {
          teams: Math.max(0, parseInt(telemetryMap[k].teams) || 0),
          participants: Math.max(0, parseInt(telemetryMap[k].participants) || 0)
        };
      }
    }
  }
  return { teams: 0, participants: 0 };
}

const INITIAL_CONTENT = {
  collegeName: "NIIS INSTITUTE OF BUSINESS ADMINISTRATION",
  affiliation: "(A Unit of NIIS Group of Institutions)",
  city: "Bhubaneswar, Odisha",
  eventName: "NIIS HACKATHON 2026",
  tagline: "Innovate | Build | Transform",
  subTagline: "Small ideas can create a big impact",
  organizer: "Kaushal Technical Club, NIIS",
  eventDates: "30th September - 01st October 2026",
  countdownTarget: "2026-09-30T09:00:00",
  venue: "C-Block Auditorium & Innovation Labs, Bhubaneswar",
  registrationDeadline: "25th September 2026",
  rulebookUrl: "/brochure.pdf",
  showBrochureButton: true,
  promoVideoUrl: "/promo-video.mp4",
  googleFormRegistrationUrl: DEFAULT_GOOGLE_FORM_REGISTRATION_URL,
  googleFormPsSelectionUrl: DEFAULT_GOOGLE_FORM_PS_SELECTION_URL,
  verifiedTeamsCount: 28,
  verifiedParticipantsCount: 112,
  useManualGlobalOverride: false,
  gallery: INITIAL_GALLERY,

  announcements: [
    { id: 1, date: "15 Sep 2026", text: "Registrations for NIIS Hackathon 2026 are officially open! Early entries close 25th Sep." },
    { id: 2, date: "10 Sep 2026", text: "Official 12 Problem Statements released across 4 Categories by Kaushal Tech Club." },
    { id: 3, date: "05 Sep 2026", text: "Download official Event Rulebook & guidelines for NIIS Hackathon 2026." },
    { id: 4, date: "25 Aug 2026", text: "Orientation Workshop & Problem Briefing Session declared for participants." }
  ],

  about: {
    heading: "Empowering Campus Innovators to Solve Real-World Challenges",
    subHeading: "An intensive 24-hour intra-college sprint connecting emerging student developers with faculty mentors and industrial problem statements.",
    para1: "NIIS Hackathon 2026 is the flagship annual intra-college technical championship hosted by Kaushal Tech Club at NIIS Institute of Business Administration, Bhubaneswar. Designed exclusively for our campus students across MCA, BCA, and Management disciplines, this 24-hour sprint challenges emerging developers, designers, and problem solvers to turn ideas into viable working prototypes.",
    para2: "Grounded in academic excellence affiliated to BPUT, Odisha and accredited by NAAC, the event bridges classroom theory with direct industry problem-solving. Participants collaborate in squads of 3–4 members, tackle 12 curated problem statements, and compete under the mentorship of faculty guides and industry evaluators for a ₹35,000 cash prize pool along with prestigious institutional recognition.",
    pillars: [
      { num: "01", title: "24-Hour Sprint", desc: "Intensive non-stop prototyping and team collaboration." },
      { num: "02", title: "Industry Mentorship", desc: "Continuous guidance from senior faculty and tech leads." },
      { num: "03", title: "Real-World Impact", desc: "Solving practical challenges aligned with institutional standards." }
    ]
  },

  eventFlow: [
    { stage: "Stage 1", title: "Online Squad Registration", desc: "Submit squad registration via the in-app portal and select your target problem challenge." },
    { stage: "Stage 2", title: "Technical Screening & Finalist Pass", desc: "Jury panel evaluates architecture viability. Shortlisted finalist squads receive campus entry passes." },
    { stage: "Stage 3", title: "24h Grand Finale at NIIS", desc: "24 hours continuous offline sprint, mentor checkpoints, live jury demos, and grand valedictory." }
  ],

  committeeMembers: OFFICIAL_COMMITTEE_MEMBERS,
  problemStatements: OFFICIAL_PROBLEM_STATEMENTS,

  datesSchedule: [
    { id: "m-1", label: "Registration Opens", date: "01 September 2026", status: "Completed", desc: "Online registrations opened for all eligible student squads across colleges." },
    { id: "m-2", label: "Problem Statements Live", date: "10 September 2026", status: "Completed", desc: "12 curated real-world institutional and industry problem statements announced." },
    { id: "m-3", label: "Registration Closes", date: "25 September 2026", status: "Active", desc: "Final deadline for squad registration and problem statement submission." },
    { id: "m-4", label: "Round 1 Screening & Shortlist", date: "26 - 28 September 2026", status: "Upcoming", desc: "Expert technical committee evaluates architectural blueprints and shortlists top squads." },
    { id: "m-5", label: "Grand Finale (24h Non-stop)", date: "30 Sep - 01 Oct 2026", status: "Upcoming", desc: "24-hour on-campus development sprint, live jury evaluations, and mentor checkpoints." },
    { id: "m-6", label: "Valedictory & Prize Distribution", date: "01 October 2026, 05:00 PM", status: "Upcoming", desc: "Announcement of winners, distribution of ₹35,000 cash prizes, and closing ceremonies." }
  ],

  hackathonRoadmap: [
    { id: "s-1", time: "Day 1 - 08:30 AM", title: "Reporting & Verification", venue: "NIIS Innovation Labs", actionItem: "Kit & ID Check", desc: "Team check-in, physical ID verification, kit distribution and Wi-Fi onboarding at NIIS Innovation Labs." },
    { id: "s-2", time: "Day 1 - 10:00 AM", title: "Inaugural Ceremony & Hack Begins", venue: "Main Auditorium", actionItem: "Timer Starts", desc: "Welcome address by Hon'ble Chairperson, release of secret API keys, and timer commencement for 24 hours." },
    { id: "s-3", time: "Day 1 - 03:00 PM", title: "Mentorship Checkpoint 1", venue: "Sprint Hall A & B", actionItem: "Architecture Review", desc: "Domain experts and faculty evaluators review team architecture diagrams and database schemas." },
    { id: "s-4", time: "Day 1 - 09:00 PM", title: "Midway Progress Scrutiny", venue: "Sprint Hall A & B", actionItem: "Mid-Sprint Demo", desc: "First elimination check; teams must show working local servers and initial endpoint integrations." },
    { id: "s-5", time: "Day 1 - 11:30 PM", title: "Midnight Coding Sprints & Snacks", venue: "Cafeteria & Labs", actionItem: "Refreshment Break", desc: "Late-night refreshments, energizer mini-games, and non-stop dev sprints with mentor support." },
    { id: "s-6", time: "Day 2 - 08:00 AM", title: "Breakfast & Code Freeze Countdown", venue: "Dining Hall", actionItem: "UI Polish", desc: "Morning breakfast provided; teams enter final UI polish, containerization, and repository cleanup." },
    { id: "s-7", time: "Day 2 - 01:00 PM", title: "Final GitHub Commits & Code Freeze", venue: "Online Git Portal", actionItem: "Code Freeze", desc: "Public repository locks. Presentation decks uploaded to jury evaluation portal." },
    { id: "s-8", time: "Day 2 - 02:30 PM", title: "Live Grand Jury Presentations", venue: "Conference Hall", actionItem: "8-Min Pitch Demo", desc: "Top finalist squads pitch 8-minute live demonstrations before the esteemed jury panel." },
    { id: "s-9", time: "Day 2 - 05:30 PM", title: "Valedictory & Cash Prize Distribution", venue: "Main Auditorium", actionItem: "Awards & Cash Prize", desc: "Announcement of Winners, medal and trophy handover, and closing felicitations." }
  ],

  /* Accurate Prize Structure: Total ₹35,000 Cash Pool */
  prizes: [
    {
      rank: "Winner (1st Prize)",
      amount: "₹20,000",
      perk: "Official Champion Trophy + Gold Medals + Certificate of Excellence + Incubation Seat at NIIS E-Cell"
    },
    {
      rank: "1st Runner Up (2nd Prize)",
      amount: "₹10,000",
      perk: "Runner-Up Trophy + Silver Medals + Certificate of Excellence + Technical Goodies"
    },
    {
      rank: "2nd Runner Up (3rd Prize)",
      amount: "₹5,000",
      perk: "2nd Runner-Up Trophy + Bronze Medals + Certificate of Excellence + Cloud Developer Credits"
    }
  ],

  rulesList: [
    {
      id: "r-1",
      category: "Team Rules",
      title: "Squad Eligibility & Composition",
      points: [
        "Each team must consist of 3 to 5 student members currently enrolled in any recognized College, Institute, or University.",
        "Interdisciplinary teams (e.g. BCA + BBA + B.Tech + MCA) are strongly encouraged.",
        "One member must be designated as the Team Leader for all official communication."
      ]
    },
    {
      id: "r-2",
      category: "Submission Deliverables",
      title: "Institutional Identity & Bona Fide Verification",
      points: [
        "Shortlisted finalist squads attending the 24-hour on-campus grand finale must carry valid institutional student ID cards confirming their bona fide enrollment.",
        "All squads must submit pitch decks and architecture blueprints before the specified deadline."
      ]
    },
    {
      id: "r-3",
      category: "Hardware/Software Rules",
      title: "Hardware, Repository & Code Ethics",
      points: [
        "Participants must bring their own development laptops, extension cords, and hardware sensor kits.",
        "All code must be committed to a fresh public GitHub repository initiated at the Day 1 opening ceremony.",
        "Pre-existing proprietary products will result in immediate disqualification; standard open-source libraries and APIs are fully permissible."
      ]
    },
    {
      id: "r-4",
      category: "Code of Conduct",
      title: "Fair Play & Professionalism",
      points: [
        "All participants must uphold academic honesty, collaboration, and respectful behavior across the 24-hour sprint.",
        "Plagiarism, offensive conduct, or intellectual property violation will result in immediate squad disqualification.",
        "Campus rules and lab security protocols must be strictly adhered to at all times."
      ]
    }
  ],

  guidelines: {
    rule1Title: "1. Squad Eligibility & Composition",
    rule1Points: [
      "Each team must consist of 3 to 5 student members currently enrolled in any recognized College, Institute, or University.",
      "Interdisciplinary teams (e.g. BCA + BBA + B.Tech + MCA) are strongly encouraged.",
      "One member must be designated as the Team Leader for all official communication."
    ],
    rule2Title: "2. Institutional Identity & Bona Fide Verification",
    rule2Desc: "Shortlisted finalist squads attending the 24-hour on-campus grand finale must carry valid institutional student ID cards confirming their bona fide enrollment in an accredited college or university.",
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
      a: "Teams must consist of 3 to 5 student members (1 Team Leader + 2 to 4 Squad Members). Interdisciplinary squads are strongly encouraged."
    },
    {
      q: "Is there any registration fee to participate?",
      a: "No. Participation in NIIS Hackathon 2026 is completely free of charge. Shortlisted finalists are also provided complimentary campus accommodation, meals, and high-speed Wi-Fi."
    },
    {
      q: "What is the official Cash Bounty pool?",
      a: "The total verified cash bounty pool is ₹35,000 (₹20,000 for Winners, ₹10,000 for 1st Runners-Up, ₹5,000 for 2nd Runners-Up) along with trophies, medals, merit citations, and incubation support."
    },
    {
      q: "Can teams submit pre-built software developed earlier?",
      a: "Strictly no. All functional code must be authored inside a fresh public GitHub repository initialized during the Day 1 kick-off. Use of standard open-source libraries and APIs is permitted."
    },
    {
      q: "What documents must finalists present at the venue?",
      a: "Each shortlisted finalist must carry a valid institutional student identity card confirming their bona fide enrollment in their college or university."
    },
    {
      q: "Will all participants receive official certificates?",
      a: "Yes. Every candidate whose team successfully undergoes the 24-hour offline evaluation will receive a verified Certificate of Participation + Event Swag Kit endorsed by NIIS Institute of Business Administration."
    }
  ]
};

/**
 * YouTube Embed URL Parser & Validator
 * Supports standard watch URLs, short youtu.be links, YouTube Shorts, and embed URLs
 */
function getYouTubeEmbedUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const str = url.trim();
  if (!str) return null;
  if (str.includes('youtube.com/embed/') || str.includes('youtube-nocookie.com/embed/')) {
    return str;
  }
  const regExp = /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = str.match(regExp);
  if (match && match[1]) {
    return `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0`;
  }
  return null;
}

// Minimalist Directory Links
const NAV_ITEMS = [
  { id: 'tracks', label: 'Problem Statements' },
  { id: 'schedule', label: 'Event Flow' },
  { id: 'prizes', label: 'Prizes' },
  { id: 'guidelines', label: 'Guidelines' },
  { id: 'committee', label: 'Committee' },
  { id: 'gallery', label: 'Gallery' },
];

/* =========================================================================
   6. PRIMARY APPLICATION COMPONENT
   ========================================================================= */
export default function App() {
  const [content, setContent] = useState(INITIAL_CONTENT);
  const [isSaving, setIsSaving] = useState(false);

  // UI Control States
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminTab, setAdminTab] = useState('flow'); 
  const [adminDraft, setAdminDraft] = useState(INITIAL_CONTENT);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [activeFaq, setActiveFaq] = useState(null);
  const [modalTrack, setModalTrack] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTrack, setSearchTrack] = useState("");
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  // Active navigation scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      const sections = ['home', 'about', 'leadership', 'tracks', 'schedule', 'prizes', 'guidelines', 'gallery', 'committee'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveNav(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler with floating transparent navbar offset
  const scrollToSection = (id) => {
    setActiveNav(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setMobileMenuOpen(false);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 70;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  // Teaser Video States & Dynamic Configuration
  const [teaserConfig, setTeaserConfig] = useState(() => {
    try {
      const cached = localStorage.getItem('niis_teaser_config');
      if (cached) return JSON.parse(cached);
    } catch {
      // fallback
    }
    return {
      videoUrl: '/promo-video.mp4',
      posterUrl: '/campus-bg.jpg'
    };
  });
  const [teaserDraft, setTeaserDraft] = useState({
    videoUrl: '/promo-video.mp4',
    posterUrl: '/campus-bg.jpg'
  });
  const [isSavingTeaser, setIsSavingTeaser] = useState(false);
  const [teaserSaveSuccess, setTeaserSaveSuccess] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [showInteractiveTeaser, setShowInteractiveTeaser] = useState(false);
  const videoRef = useRef(null);

  // Gallery States
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoTitle, setNewPhotoTitle] = useState('');

  // Unified Autoplaying Carousel States: Leadership Desk
  const [leaderIndex, setLeaderIndex] = useState(0);
  const [isLeaderHovered, setIsLeaderHovered] = useState(false);

  // Unified Autoplaying Carousel States: Committee Slider (2 cards at a time on desktop)
  const [commSliderIndex, setCommSliderIndex] = useState(0);
  const [isCommHovered, setIsCommHovered] = useState(false);

  // Native Registration Modal States
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerStep, setRegisterStep] = useState(1);
  const [isSubmittingReg, setIsSubmittingReg] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(null);
  const [regForm, setRegForm] = useState({
    teamName: '',
    trackId: 'NIIS-PS01',
    leaderName: '',
    leaderCollege: '',
    leaderBranch: '',
    leaderPhone: '',
    leaderEmail: '',
    members: [
      { name: '', email: '' },
      { name: '', email: '' }
    ],
    abstract: '',
    declaration: false
  });

  // Real-time Registration Telemetry States
  const [registrationsList, setRegistrationsList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('niis_local_regs') || '[]');
    } catch {
      return [];
    }
  });
  const [_isTelemetryLoaded, setIsTelemetryLoaded] = useState(false);
  const [isLoadingRegs, setIsLoadingRegs] = useState(false);
  const [adminRegSearch, setAdminRegSearch] = useState('');
  const [selectedRegAbstract, setSelectedRegAbstract] = useState(null);

  // Global Real-time Firestore onSnapshot Listener for Live Telemetry
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      const q = collection(db, "registrations");
      unsubscribe = onSnapshot(
        q,
        (snap) => {
          const list = [];
          snap.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...docSnap.data() });
          });
          list.sort((a, b) => new Date(b.registeredAt || 0) - new Date(a.registeredAt || 0));

          // Merge local cache if any pending submissions
          const local = JSON.parse(localStorage.getItem('niis_local_regs') || '[]');
          const combined = [...list];
          local.forEach((loc) => {
            if (!combined.some((c) => (c.submissionId && c.submissionId === loc.submissionId) || c.id === loc.id)) {
              combined.push(loc);
            }
          });
          setRegistrationsList(combined);
          setIsTelemetryLoaded(true);
        },
        (err) => {
          console.warn("Firestore real-time listener error (using local cache fallback):", err);
          const local = JSON.parse(localStorage.getItem('niis_local_regs') || '[]');
          setRegistrationsList(local);
          setIsTelemetryLoaded(true);
        }
      );
    } catch (err) {
      console.warn("Could not attach real-time onSnapshot listener:", err);
      setTimeout(() => setIsTelemetryLoaded(true), 0);
    }

    return () => unsubscribe();
  }, []);

  // Global Real-time Firestore onSnapshot Listener for Teaser Video Configuration
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      const teaserDocRef = doc(db, "site_config", "teaser");
      unsubscribe = onSnapshot(
        teaserDocRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            const cfg = {
              videoUrl: data.videoUrl || '/promo-video.mp4',
              posterUrl: data.posterUrl || '/campus-bg.jpg'
            };
            setTeaserConfig(cfg);
            setTeaserDraft(cfg);
            try {
              localStorage.setItem('niis_teaser_config', JSON.stringify(cfg));
            } catch {
              // ignore
            }
          }
        },
        (err) => {
          console.warn("Could not attach real-time onSnapshot listener for teaser config:", err);
        }
      );
    } catch (err) {
      console.warn("Error subscribing to teaser config doc:", err);
    }

    return () => unsubscribe();
  }, []);

  // Dedicated Per-Problem Statement Telemetry State (Firestore telemetry/problem_statements + localStorage fallback)
  const [psTelemetry, setPsTelemetry] = useState(() => {
    try {
      const cached = localStorage.getItem('niis_ps_telemetry');
      if (cached) return JSON.parse(cached);
    } catch (e) {
      console.warn("Failed to load ps telemetry from localStorage cache", e);
    }
    return DEFAULT_PS_TELEMETRY;
  });
  const [psTelemetryDraft, setPsTelemetryDraft] = useState(() => {
    try {
      const cached = localStorage.getItem('niis_ps_telemetry');
      if (cached) return JSON.parse(cached);
    } catch {
      // fallback
    }
    return DEFAULT_PS_TELEMETRY;
  });
  const [isSavingPsTelemetry, setIsSavingPsTelemetry] = useState(false);
  const [psTelemetrySaveSuccess, setPsTelemetrySaveSuccess] = useState(false);

  // Global Real-time Firestore onSnapshot Listener for Problem Statement Telemetry Override
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      const telemetryDocRef = doc(db, "telemetry", "problem_statements");
      unsubscribe = onSnapshot(
        telemetryDocRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            const merged = { ...DEFAULT_PS_TELEMETRY, ...data };
            setPsTelemetry(merged);
            setPsTelemetryDraft(merged);
            try {
              localStorage.setItem('niis_ps_telemetry', JSON.stringify(merged));
            } catch {
              // ignore
            }
          }
        },
        (err) => {
          console.warn("Could not attach real-time onSnapshot listener for PS telemetry (using local cache):", err);
        }
      );
    } catch (err) {
      console.warn("Error subscribing to PS telemetry doc:", err);
    }

    return () => unsubscribe();
  }, []);

  // Dynamic Google Forms URLs
  const googleFormRegUrl = content.googleFormRegistrationUrl || DEFAULT_GOOGLE_FORM_REGISTRATION_URL;
  const googleFormPsUrl = content.googleFormPsSelectionUrl || DEFAULT_GOOGLE_FORM_PS_SELECTION_URL;

  // Compute Live Telemetry Totals (Automatic Recalculation from PS sums with manual global override option)
  const { totalTeamsCount, totalStudentsCount, psMetrics } = useMemo(() => {
    const pStatements = content.problemStatements || OFFICIAL_PROBLEM_STATEMENTS;
    const mapping = {};
    let sumTeams = 0;
    let sumParticipants = 0;

    pStatements.forEach((ps, idx) => {
      const num = idx + 1;
      const m = getPsMetrics(psTelemetry, ps.id);
      const teams = Number(m.teams) || 0;
      const participants = Number(m.participants) || 0;

      mapping[ps.id] = { teams, participants };
      mapping[`ps-${num}`] = { teams, participants };
      mapping[`PS-${num < 10 ? '0' + num : num}`] = { teams, participants };

      sumTeams += teams;
      sumParticipants += participants;
    });

    // Check if manual override from Admin exists for the global banner
    const isManual = !!content.useManualGlobalOverride;
    const finalTeams = (isManual && content.verifiedTeamsCount !== undefined && content.verifiedTeamsCount !== null && content.verifiedTeamsCount !== '')
      ? Number(content.verifiedTeamsCount)
      : sumTeams;

    const finalStudents = (isManual && content.verifiedParticipantsCount !== undefined && content.verifiedParticipantsCount !== null && content.verifiedParticipantsCount !== '')
      ? Number(content.verifiedParticipantsCount)
      : sumParticipants;

    return {
      totalTeamsCount: finalTeams,
      totalStudentsCount: finalStudents,
      psMetrics: mapping
    };
  }, [content.problemStatements, psTelemetry, content.verifiedTeamsCount, content.verifiedParticipantsCount, content.useManualGlobalOverride]);

  // Admin PIN Protection States
  const [showPinModal, setShowPinModal] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Master Secret Password
  const ADMIN_SECRET_PIN = "NexusAdminAccess2026#NIIS"; 

  // Real-time Cloud Fetch from Firebase Firestore for Portal CMS Content (unified cms_config + localStorage fallback)
  useEffect(() => {
    const fetchPortalContent = async () => {
      // 1. Check localStorage cache first
      let cachedCms = null;
      try {
        const raw = localStorage.getItem('niis_cms_config');
        if (raw) cachedCms = JSON.parse(raw);
      } catch (cacheReadErr) {
        console.warn("Could not read niis_cms_config from localStorage:", cacheReadErr);
      }

      // 2. Fetch from cloud Firestore
      let cloudData = null;
      try {
        const docRef = doc(db, "portal", "hackathon2026");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          cloudData = docSnap.data();
        } else {
          const cmsDocRef = doc(db, "cms_config", "main");
          const cmsSnap = await getDoc(cmsDocRef);
          if (cmsSnap.exists()) {
            cloudData = cmsSnap.data();
          }
        }
      } catch (err) {
        console.warn("Cloud database initial fetch error:", err);
      }

      const sourceData = cloudData || cachedCms;
      if (sourceData) {
        const merged = {
          ...INITIAL_CONTENT,
          ...sourceData,
          showBrochureButton: sourceData.showBrochureButton !== undefined ? sourceData.showBrochureButton : true,
          datesSchedule: (sourceData.datesSchedule && sourceData.datesSchedule.length > 0)
            ? sourceData.datesSchedule.map((d, i) => ({
                id: d.id || `m-${i + 1}`,
                label: d.label || "",
                date: d.date || "",
                status: d.status || "Upcoming",
                desc: d.desc || INITIAL_CONTENT.datesSchedule[i]?.desc || ""
              }))
            : INITIAL_CONTENT.datesSchedule,
          hackathonRoadmap: (sourceData.hackathonRoadmap && sourceData.hackathonRoadmap.length > 0)
            ? sourceData.hackathonRoadmap.map((r, i) => ({
                id: r.id || `s-${i + 1}`,
                time: r.time || "",
                title: r.title || "",
                desc: r.desc || "",
                venue: r.venue || INITIAL_CONTENT.hackathonRoadmap[i]?.venue || "NIIS Innovation Labs",
                actionItem: r.actionItem || INITIAL_CONTENT.hackathonRoadmap[i]?.actionItem || "Checkpoint"
              }))
            : INITIAL_CONTENT.hackathonRoadmap,
          rulesList: (sourceData.rulesList && sourceData.rulesList.length > 0)
            ? sourceData.rulesList
            : INITIAL_CONTENT.rulesList,
          eventFlow: (sourceData.eventFlow && sourceData.eventFlow.length > 0)
            ? sourceData.eventFlow
            : INITIAL_CONTENT.eventFlow,
          committeeMembers: (sourceData.committeeMembers && sourceData.committeeMembers.length >= 15)
            ? sourceData.committeeMembers
            : OFFICIAL_COMMITTEE_MEMBERS,
          problemStatements: (sourceData.problemStatements && sourceData.problemStatements.length >= 12 && sourceData.problemStatements[0]?.title?.includes("Campus Life"))
            ? sourceData.problemStatements
            : OFFICIAL_PROBLEM_STATEMENTS
        };
        setContent(merged);
        setAdminDraft(merged);
      }
    };
    fetchPortalContent();
  }, []);

  // Manual refresh helper for Admin Registrations Desk
  const fetchRegistrations = async () => {
    setIsLoadingRegs(true);
    try {
      const q = collection(db, "registrations");
      const snap = await getDocs(q);
      const list = [];
      snap.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      list.sort((a, b) => new Date(b.registeredAt || 0) - new Date(a.registeredAt || 0));
      
      const local = JSON.parse(localStorage.getItem('niis_local_regs') || '[]');
      const combined = [...list];
      local.forEach(loc => {
        if (!combined.some(c => (c.submissionId && c.submissionId === loc.submissionId) || c.id === loc.id)) {
          combined.push(loc);
        }
      });
      setRegistrationsList(combined);
      setIsTelemetryLoaded(true);
    } catch (err) {
      console.warn("Could not query registrations collection, loading local cache:", err);
      const local = JSON.parse(localStorage.getItem('niis_local_regs') || '[]');
      setRegistrationsList(local);
    } finally {
      setIsLoadingRegs(false);
    }
  };

  const handleVerifyPin = (e) => {
    e.preventDefault();
    if (adminPinInput === ADMIN_SECRET_PIN) {
      setPinError(false);
      setAdminPinInput('');
      setShowPinModal(false);
      setAdminDraft(content);
      setTeaserDraft(teaserConfig);
      setPsTelemetryDraft(psTelemetry);
      setShowAdmin(true); 
    } else {
      setPinError(true);
    }
  };

  // Teaser Video Settings Save Handler (writes to site_config/teaser document in Firestore)
  const handleSaveTeaserSettings = async (e) => {
    if (e) e.preventDefault();
    setIsSavingTeaser(true);
    const updated = {
      videoUrl: (teaserDraft.videoUrl || '').trim() || '/promo-video.mp4',
      posterUrl: (teaserDraft.posterUrl || '').trim() || '/campus-bg.jpg',
      updatedAt: new Date().toISOString()
    };

    try {
      const teaserDocRef = doc(db, "site_config", "teaser");
      await setDoc(teaserDocRef, updated, { merge: true });
      setTeaserConfig(updated);
      try {
        localStorage.setItem('niis_teaser_config', JSON.stringify(updated));
      } catch {
        // ignore
      }
      setTeaserSaveSuccess(true);
      setTimeout(() => setTeaserSaveSuccess(false), 3500);
      alert("✅ Teaser video settings saved to Cloud Database (site_config/teaser) and updated live on the landing page!");
    } catch (err) {
      console.error("Error saving teaser settings to Firestore:", err);
      // Local session cache fallback
      setTeaserConfig(updated);
      try {
        localStorage.setItem('niis_teaser_config', JSON.stringify(updated));
      } catch {
        // ignore
      }
      setTeaserSaveSuccess(true);
      setTimeout(() => setTeaserSaveSuccess(false), 3500);
      alert("⚠️ Saved to local session cache! (Cloud notice: " + (err.message || 'offline') + ")");
    } finally {
      setIsSavingTeaser(false);
    }
  };

  // Live computed draft totals for the Admin PS Telemetry subpanel
  const psDraftTotals = useMemo(() => {
    let teams = 0;
    let participants = 0;
    (content.problemStatements || OFFICIAL_PROBLEM_STATEMENTS).forEach((ps) => {
      const m = getPsMetrics(psTelemetryDraft, ps.id);
      teams += (Number(m.teams) || 0);
      participants += (Number(m.participants) || 0);
    });
    return { teams, participants };
  }, [psTelemetryDraft, content.problemStatements]);

  // Update a single field in the PS telemetry draft
  const handleUpdatePsDraft = (psId, field, value) => {
    const numVal = Math.max(0, parseInt(value) || 0);
    setPsTelemetryDraft((prev) => {
      const current = getPsMetrics(prev, psId);
      const updated = {
        ...current,
        [field]: numVal
      };
      const num = parseInt(String(psId).replace(/\D/g, ''), 10);
      const next = { ...prev };
      next[psId] = updated;
      if (!isNaN(num)) {
        next[`ps-${num}`] = updated;
        next[`PS-${num < 10 ? '0' + num : num}`] = updated;
      }
      return next;
    });
  };

  // Quick Multiply for a single PS row (e.g. teams * 4)
  const handleMultiplyRow = (psId, multiplier = 4) => {
    setPsTelemetryDraft((prev) => {
      const current = getPsMetrics(prev, psId);
      const teams = current.teams || 0;
      const updated = {
        teams,
        participants: teams * multiplier
      };
      const num = parseInt(String(psId).replace(/\D/g, ''), 10);
      const next = { ...prev };
      next[psId] = updated;
      if (!isNaN(num)) {
        next[`ps-${num}`] = updated;
        next[`PS-${num < 10 ? '0' + num : num}`] = updated;
      }
      return next;
    });
  };

  // Quick Multiply for all 12 Problem Statements
  const handleQuickMultiplyAll = (multiplier = 4) => {
    setPsTelemetryDraft((prev) => {
      const next = { ...prev };
      (content.problemStatements || OFFICIAL_PROBLEM_STATEMENTS).forEach((ps, idx) => {
        const current = getPsMetrics(prev, ps.id);
        const teams = current.teams || 0;
        const updated = {
          teams,
          participants: teams * multiplier
        };
        const num = idx + 1;
        next[ps.id] = updated;
        next[`ps-${num}`] = updated;
        next[`PS-${num < 10 ? '0' + num : num}`] = updated;
      });
      return next;
    });
  };

  // Reset to Default Baseline (28 squads, 112 participants)
  const handleResetToBaseline = () => {
    if (window.confirm("Reset all 12 Problem Statement counts back to the default baseline (28 Teams / 112 Participants)?")) {
      setPsTelemetryDraft(DEFAULT_PS_TELEMETRY);
    }
  };

  // Prominent Save Button Handler: Commits to Firestore doc (telemetry/problem_statements) + localStorage + UI state
  const handleSavePsMetrics = async () => {
    setIsSavingPsTelemetry(true);
    try {
      const payload = {};
      let sumTeams = 0;
      let sumParticipants = 0;

      (content.problemStatements || OFFICIAL_PROBLEM_STATEMENTS).forEach((ps, idx) => {
        const num = idx + 1;
        const current = getPsMetrics(psTelemetryDraft, ps.id);
        const teams = Math.max(0, parseInt(current.teams) || 0);
        const participants = Math.max(0, parseInt(current.participants) || 0);

        const entry = { teams, participants };
        // Strict user schema: "ps-1", "ps-2", ... "ps-12"
        payload[`ps-${num}`] = entry;
        // Direct ID lookup: "PS-01", "PS-02", ... "PS-12"
        payload[ps.id] = entry;

        sumTeams += teams;
        sumParticipants += participants;
      });

      payload.updatedAt = new Date().toISOString();

      // Write to Firestore doc: telemetry/problem_statements
      const telemetryDocRef = doc(db, "telemetry", "problem_statements");
      await setDoc(telemetryDocRef, payload, { merge: true });

      // Update state and localStorage
      setPsTelemetry(payload);
      try {
        localStorage.setItem('niis_ps_telemetry', JSON.stringify(payload));
      } catch (e) {
        console.warn("Could not save to localStorage:", e);
      }

      // Also keep adminDraft & content verified counts synchronized
      setContent((prev) => ({
        ...prev,
        verifiedTeamsCount: sumTeams,
        verifiedParticipantsCount: sumParticipants
      }));
      setAdminDraft((prev) => ({
        ...prev,
        verifiedTeamsCount: sumTeams,
        verifiedParticipantsCount: sumParticipants
      }));

      setPsTelemetrySaveSuccess(true);
      setTimeout(() => setPsTelemetrySaveSuccess(false), 3500);
      alert(`✅ PS Telemetry saved to Firestore (telemetry/problem_statements) & Local Cache!\n\n• Live Sum: ${sumTeams} Teams Registered\n• Live Sum: ${sumParticipants} Total Participants\n• All 12 problem statement cards updated immediately.`);
    } catch (err) {
      console.error("Error saving PS telemetry to Firestore:", err);
      // Offline fallback: persist to localStorage & local state
      const fallbackPayload = { ...psTelemetryDraft, updatedAt: new Date().toISOString() };
      setPsTelemetry(fallbackPayload);
      try {
        localStorage.setItem('niis_ps_telemetry', JSON.stringify(fallbackPayload));
      } catch {
        // ignore
      }
      setPsTelemetrySaveSuccess(true);
      setTimeout(() => setPsTelemetrySaveSuccess(false), 3500);
      alert("⚠️ Saved to local storage cache! (Firestore sync notice: " + (err.message || 'offline') + ")");
    } finally {
      setIsSavingPsTelemetry(false);
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

  // UNIFIED AUTOPLAYING CAROUSEL 1: Leadership Desk (Rotates every 6s)
  useEffect(() => {
    if (isLeaderHovered) return;
    const timer = setInterval(() => {
      setLeaderIndex((prev) => (prev + 1) % PERMANENT_LEADERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isLeaderHovered]);

  // UNIFIED AUTOPLAYING CAROUSEL 2: Committee Members (Rotates 2 cards every 4.5s)
  useEffect(() => {
    if (isCommHovered) return;
    const membersLen = (content.committeeMembers || OFFICIAL_COMMITTEE_MEMBERS).length;
    if (membersLen <= 2) return;
    const timer = setInterval(() => {
      setCommSliderIndex((prev) => (prev + 2 >= membersLen ? 0 : prev + 2));
    }, 4500);
    return () => clearInterval(timer);
  }, [isCommHovered, content.committeeMembers]);

  // Problem Statement Category Filter Logic (4 Categories)
  const domainList = useMemo(() => {
    const set = new Set((content.problemStatements || []).map(p => p.category || p.domain));
    return ['All', ...Array.from(set)];
  }, [content.problemStatements]);

  const filteredTracks = useMemo(() => {
    return (content.problemStatements || []).filter(p => {
      const cat = p.category || p.domain || '';
      const matchesDomain = selectedDomain === 'All' || cat === selectedDomain;
      const matchesSearch = (p.title || '').toLowerCase().includes(searchTrack.toLowerCase()) ||
                            cat.toLowerCase().includes(searchTrack.toLowerCase()) ||
                            (p.shortDesc || '').toLowerCase().includes(searchTrack.toLowerCase()) ||
                            (p.id || '').toLowerCase().includes(searchTrack.toLowerCase());
      return matchesDomain && matchesSearch;
    });
  }, [content.problemStatements, selectedDomain, searchTrack]);

  // Dynamic gallery items (backed by Firestore content state)
  const currentGallery = useMemo(() => {
    return content.gallery && content.gallery.length > 0 ? content.gallery : INITIAL_GALLERY;
  }, [content.gallery]);

  // Live Firebase Save (Sync across all devices instantly with dual collections & localStorage fallback)
  const handleSaveAdmin = async () => {
    setIsSaving(true);
    try {
      // 1. Save to portal/hackathon2026
      const docRef = doc(db, "portal", "hackathon2026");
      await setDoc(docRef, adminDraft);

      // 2. Also persist to cms_config/main collection for unified CMS config
      try {
        const cmsDocRef = doc(db, "cms_config", "main");
        await setDoc(cmsDocRef, adminDraft);
      } catch (cmsErr) {
        console.warn("Could not save to cms_config/main:", cmsErr);
      }

      // 3. Cache to localStorage for offline resiliency
      try {
        localStorage.setItem('niis_cms_config', JSON.stringify(adminDraft));
      } catch (cacheErr) {
        console.warn("Could not cache cms_config to localStorage:", cacheErr);
      }

      // 4. Also persist PS telemetry
      try {
        const telemetryDocRef = doc(db, "telemetry", "problem_statements");
        await setDoc(telemetryDocRef, psTelemetryDraft, { merge: true });
        setPsTelemetry(psTelemetryDraft);
        localStorage.setItem('niis_ps_telemetry', JSON.stringify(psTelemetryDraft));
      } catch (telErr) {
        console.warn("Could not sync telemetry during full save:", telErr);
      }

      setContent(adminDraft);
      setShowAdmin(false);
      alert("✅ All changes saved permanently to Cloud Database! Live for everyone instantly.");
    } catch (err) {
      console.error("Cloud Database Save Error:", err);
      // Offline fallback: save to localStorage & local state
      try {
        localStorage.setItem('niis_cms_config', JSON.stringify(adminDraft));
      } catch (localErr) {
        console.warn("Could not write local cache:", localErr);
      }
      setContent(adminDraft);
      setShowAdmin(false);
      alert("⚠️ Saved to local storage cache! (Cloud notice: " + (err.message || 'offline') + ")");
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to Institutional Defaults Handler
  const handleResetToDefaults = () => {
    if (window.confirm("Are you sure you want to reset all CMS configuration back to institutional defaults? Any unsaved edits will be discarded.")) {
      setAdminDraft(INITIAL_CONTENT);
      alert("Reset all sections in the draft to institutional defaults. Click 'Save Changes to Portal' below to publish live.");
    }
  };

  // Reordering helpers for dynamic CMS arrays
  const moveMilestone = (idx, dir) => {
    const list = [...(adminDraft.datesSchedule || [])];
    const target = idx + dir;
    if (target < 0 || target >= list.length) return;
    const temp = list[idx];
    list[idx] = list[target];
    list[target] = temp;
    setAdminDraft({ ...adminDraft, datesSchedule: list });
  };

  const moveRoadmapItem = (idx, dir) => {
    const list = [...(adminDraft.hackathonRoadmap || [])];
    const target = idx + dir;
    if (target < 0 || target >= list.length) return;
    const temp = list[idx];
    list[idx] = list[target];
    list[target] = temp;
    setAdminDraft({ ...adminDraft, hackathonRoadmap: list });
  };

  const moveRuleItem = (idx, dir) => {
    const list = [...(adminDraft.rulesList || [])];
    const target = idx + dir;
    if (target < 0 || target >= list.length) return;
    const temp = list[idx];
    list[idx] = list[target];
    list[target] = temp;
    setAdminDraft({ ...adminDraft, rulesList: list });
  };

  const moveEventFlowItem = (idx, dir) => {
    const list = [...(adminDraft.eventFlow || [])];
    const target = idx + dir;
    if (target < 0 || target >= list.length) return;
    const temp = list[idx];
    list[idx] = list[target];
    list[target] = temp;
    setAdminDraft({ ...adminDraft, eventFlow: list });
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

  // Video control helpers
  const handleToggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsVideoPlaying(true)).catch(() => {
        setShowInteractiveTeaser(true);
      });
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const handleToggleVideoMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsVideoMuted(videoRef.current.muted);
  };

  // Official Registration Workflow Helper
  const _handleOpenRegistration = (_preselectedTrackId = null) => {
    window.open(googleFormRegUrl, '_blank', 'noopener,noreferrer');
  };

  const handleAddMember = () => {
    if (regForm.members.length >= 4) {
      alert("Maximum squad size is 5 (1 Leader + 4 Members).");
      return;
    }
    setRegForm(prev => ({
      ...prev,
      members: [...prev.members, { name: '', email: '' }]
    }));
  };

  const handleRemoveMember = (idx) => {
    if (regForm.members.length <= 2) {
      alert("Minimum squad size is 3 (1 Leader + 2 Members).");
      return;
    }
    setRegForm(prev => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== idx)
    }));
  };

  const handleMemberChange = (idx, field, value) => {
    const updated = [...regForm.members];
    updated[idx][field] = value;
    setRegForm(prev => ({ ...prev, members: updated }));
  };

  const handleRegistrationSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!regForm.teamName.trim()) {
      alert("Please provide a Team / Squad Name.");
      return;
    }
    if (!regForm.leaderName.trim() || !regForm.leaderPhone.trim() || !regForm.leaderEmail.trim()) {
      alert("Please provide all required Leader contact details.");
      return;
    }
    const validMembers = regForm.members.filter(m => m.name.trim() !== "");
    if (validMembers.length < 2) {
      alert("Please provide at least 2 squad members (minimum 3 members total including Leader).");
      return;
    }

    setIsSubmittingReg(true);
    const submissionId = `NIIS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const selectedTrackObj = content.problemStatements.find(p => p.id === regForm.trackId);

    const submissionPayload = {
      submissionId,
      teamName: regForm.teamName.trim(),
      trackId: regForm.trackId,
      trackTitle: selectedTrackObj?.title || regForm.trackId,
      trackDomain: selectedTrackObj?.category || selectedTrackObj?.domain || "General Track",
      leaderName: regForm.leaderName.trim(),
      leaderCollege: regForm.leaderCollege.trim(),
      leaderBranch: regForm.leaderBranch.trim(),
      leaderPhone: regForm.leaderPhone.trim(),
      leaderEmail: regForm.leaderEmail.trim(),
      members: validMembers,
      registeredAt: new Date().toISOString(),
      status: "Submitted & Confirmed"
    };

    try {
      await addDoc(collection(db, "registrations"), submissionPayload);
    } catch (err) {
      console.warn("Firestore collection write note (local backup preserved):", err);
    }

    try {
      const local = JSON.parse(localStorage.getItem('niis_local_regs') || '[]');
      local.unshift(submissionPayload);
      localStorage.setItem('niis_local_regs', JSON.stringify(local));
      setRegistrationsList((prev) => {
        if (prev.some((c) => c.submissionId === submissionPayload.submissionId)) return prev;
        return [submissionPayload, ...prev];
      });
    } catch (e) {
      console.warn("Local storage write error:", e);
    }

    setIsSubmittingReg(false);
    setShowRegisterModal(false);
    setRegistrationSuccess(submissionPayload);

    // Reset form
    setRegForm({
      teamName: '',
      trackId: 'NIIS-PS01',
      leaderName: '',
      leaderCollege: '',
      leaderBranch: '',
      leaderPhone: '',
      leaderEmail: '',
      members: [
        { name: '', email: '' },
        { name: '', email: '' }
      ]
    });
  };

  const handleDownloadReceipt = () => {
    if (!registrationSuccess) return;
    const r = registrationSuccess;
    const receiptText = `======================================================================
               NIIS HACKATHON 2026 - OFFICIAL SQUAD REGISTRATION
======================================================================
INSTITUTION:  NIIS Institute of Business Administration
ORGANIZER:    Kaushal Technical Club
CAMPUS:       Sarada Vihar, Bhubaneswar, Odisha
DATES:        30th September - 01st October 2026 (24-Hour Non-stop)
----------------------------------------------------------------------
SUBMISSION ID: ${r.submissionId}
STATUS:        ${r.status}
TIMESTAMP:     ${new Date(r.registeredAt).toLocaleString()}
----------------------------------------------------------------------
SQUAD DETAILS:
Team Name:     ${r.teamName}
Track ID:      ${r.trackId}
Track Title:   ${r.trackTitle}
Track Domain:  ${r.trackDomain}

TEAM LEADER:
Full Name:     ${r.leaderName}
Institution:   ${r.leaderCollege}
Degree/Branch: ${r.leaderBranch}
WhatsApp No:   ${r.leaderPhone}
Email Address: ${r.leaderEmail}

SQUAD MEMBERS (${r.members?.length || 0}):
${(r.members || []).map((m, i) => `  ${i + 1}. ${m.name} [${m.email || 'No email'}]`).join('\n')}

PROBLEM ABSTRACT & METHODOLOGY:
${r.abstract || 'N/A'}
----------------------------------------------------------------------
PRIZE BOUNTY & REWARDS:
1st Prize: ₹20,000 Cash + Champion Trophy + Gold Medals + Incubation
2nd Prize: ₹10,000 Cash + Runner-Up Trophy + Silver Medals
3rd Prize: ₹5,000 Cash + 2nd Runner-Up Trophy + Bronze Medals
All Participants: Official Certificate of Participation + Swag Kit

VENUE & REPORTING:
Dates: 30th September - 01st October 2026 (24 Hours Offline)
Venue: Auditorium & Innovation Labs, NIIS Campus, Bhubaneswar
======================================================================
`;
    const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${r.submissionId}_NIIS_Hackathon_Receipt.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleExportRegistrationsCSV = () => {
    if (!registrationsList || registrationsList.length === 0) {
      alert("No registrations available to export yet.");
      return;
    }

    const headers = [
      "Submission ID",
      "Team Name",
      "Track ID",
      "Track Title",
      "Track Domain",
      "Team Leader",
      "College / Institution",
      "Branch / Degree",
      "WhatsApp Phone",
      "Leader Email",
      "Squad Members",
      "Total Members",
      "Abstract",
      "Registered At",
      "Status"
    ];

    const rows = registrationsList.map(item => [
      `"${item.submissionId || ''}"`,
      `"${(item.teamName || '').replace(/"/g, '""')}"`,
      `"${item.trackId || ''}"`,
      `"${(item.trackTitle || '').replace(/"/g, '""')}"`,
      `"${(item.trackDomain || '').replace(/"/g, '""')}"`,
      `"${(item.leaderName || '').replace(/"/g, '""')}"`,
      `"${(item.leaderCollege || '').replace(/"/g, '""')}"`,
      `"${(item.leaderBranch || '').replace(/"/g, '""')}"`,
      `"${item.leaderPhone || ''}"`,
      `"${item.leaderEmail || ''}"`,
      `"${(item.members || []).map(m => `${m.name} (${m.email || 'N/A'})`).join('; ').replace(/"/g, '""')}"`,
      (item.members?.length || 0) + 1,
      `"${(item.abstract || '').replace(/"/g, '""').replace(/\r?\n|\r/g, ' ')}"`,
      `"${item.registeredAt || ''}"`,
      `"${item.status || 'Active'}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NIIS_Hackathon_2026_Registrations_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredAdminRegs = useMemo(() => {
    return registrationsList.filter(r => {
      const q = adminRegSearch.toLowerCase();
      return (
        (r.submissionId && r.submissionId.toLowerCase().includes(q)) ||
        (r.teamName && r.teamName.toLowerCase().includes(q)) ||
        (r.leaderName && r.leaderName.toLowerCase().includes(q)) ||
        (r.leaderCollege && r.leaderCollege.toLowerCase().includes(q)) ||
        (r.trackId && r.trackId.toLowerCase().includes(q)) ||
        (r.leaderPhone && r.leaderPhone.toLowerCase().includes(q))
      );
    });
  }, [registrationsList, adminRegSearch]);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-800 font-sans flex flex-col selection:bg-blue-900 selection:text-white pb-14 relative">
      
      {/* Running Marquee & Ken-Burns Animations */}
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

        @keyframes kenBurnsZoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        .animate-ken-burns {
          animation: kenBurnsZoom 26s ease-in-out infinite;
        }
      `}</style>

      {/* Copied URL Toast */}
      {copiedNotification && (
        <div className="fixed bottom-16 right-6 z-50 bg-[#0f2d59] text-white px-5 py-3 rounded-xl shadow-2xl border border-amber-400 flex items-center gap-3 text-xs animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Portal link copied to clipboard!</span>
        </div>
      )}

      {/* =========================================================================
          ULTRA-PREMIUM PRECISION FLOATING NAVBAR (SINGLE CONTAINER)
          ========================================================================= */}
      <header className="sticky top-0 z-50 w-full h-16 bg-slate-950/80 backdrop-blur-xl border-b border-white/[0.08] px-4 md:px-8 flex items-center justify-between shadow-2xl transition-all duration-300">
        
        {/* Left: Prestige Dual-Branding */}
        <div 
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
        >
          <NIISOfficialCrest className="h-9 md:h-10 w-auto object-contain flex-shrink-0 transition-transform group-hover:scale-105" />
          <div className="flex flex-col justify-center">
            <div className="text-xs md:text-sm font-bold tracking-wider text-white uppercase leading-tight font-sans">
              NIIS INSTITUTE OF BUSINESS ADMINISTRATION
            </div>
            <div className="flex items-center gap-2 mt-0.5 leading-tight font-sans">
              <span className="text-xs font-semibold text-blue-300">NIIS HACKATHON 2026</span>
              <span className="text-slate-500 text-[10px] hidden sm:inline">•</span>
              <span className="text-[10px] md:text-[11px] font-medium text-slate-400 hidden sm:inline">
                NAAC Accredited • BPUT Affiliated
              </span>
            </div>
          </div>
        </div>

        {/* Center: Minimalist Directory Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-4 xl:space-x-6">
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-xs font-medium tracking-wide transition-colors duration-150 py-1.5 px-2 rounded-md cursor-pointer ${
                  isActive
                    ? 'text-white font-semibold bg-white/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Action CTA & Admin Access */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          {/* Admin Lock / Key Icon */}
          <button
            onClick={() => {
              setPinError(false);
              setAdminPinInput('');
              setShowPinModal(true);
            }}
            className="p-2 text-slate-400 hover:text-amber-400 hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10 transition cursor-pointer"
            title="Admin Access"
            aria-label="Admin Access"
          >
            <Lock className="w-4 h-4" />
          </button>

          {/* Register Squad CTA Button */}
          <a
            href={googleFormRegUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-md hover:shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Register Squad</span>
            <span className="sm:hidden">Register</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white border border-white/10 hover:border-white/20 bg-white/5 rounded-lg cursor-pointer transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </header>

      {/* Mobile Slide-Over Drawer with Clean Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity flex justify-end">
          <div className="w-full max-w-xs bg-slate-950/95 backdrop-blur-2xl text-white h-full shadow-2xl flex flex-col justify-between border-l border-white/[0.08] animate-in slide-in-from-right duration-200 overflow-y-auto">
            
            <div>
              {/* Drawer Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
                <div className="flex items-center gap-2.5">
                  <NIISOfficialCrest className="h-9 w-auto object-contain" />
                  <div>
                    <span className="text-xs font-bold tracking-wider text-white uppercase block leading-tight">
                      NIIS INSTITUTE
                    </span>
                    <span className="text-[11px] font-semibold tracking-wide text-blue-300/90 block leading-tight mt-0.5">
                      NIIS HACKATHON 2026
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Accreditation Badge */}
              <div className="bg-blue-500/10 border-b border-blue-500/20 px-4 py-2 text-[10px] text-blue-300 font-medium">
                NAAC Accredited • BPUT Affiliated
              </div>

              {/* Navigation Links */}
              <div className="p-4 space-y-1 text-sm font-medium text-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 py-1 block">
                  Directory
                </span>
                {NAV_ITEMS.map((item) => {
                  const isActive = activeNav === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl transition flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-blue-600/20 text-blue-400 font-semibold border-l-4 border-blue-500'
                          : 'hover:bg-white/5 hover:text-white text-slate-300'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-white/10 bg-slate-900/60 space-y-3">
              <a
                href={googleFormRegUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-2.5 rounded-xl text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register Squad Online</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleShareLink();
                  }}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span>Share Portal</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setPinError(false);
                    setAdminPinInput('');
                    setShowPinModal(true);
                  }}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          HERO SECTION (HIGH-OCTANE DEVELOPER ARCHITECTURE WITH EXECUTIVE FINISH)
          ========================================================================= */}
      <section
        id="home"
        className="w-full relative min-h-[600px] text-white -mt-16 pt-24 pb-16 sm:pb-24 px-4 overflow-hidden border-b border-white/[0.08] flex items-center justify-center bg-slate-950"
      >
        {/* Cinematic Live Campus Backdrop with subtle ambient Ken-Burns zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/campus-bg.jpg"
            alt="NIIS Campus"
            style={{ objectPosition: 'center 40%' }}
            className="w-full h-full object-cover animate-ken-burns scale-105 filter brightness-90 contrast-105"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/campus-bg.jpeg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950/90 backdrop-blur-[1px]" />
        </div>

        {/* Sleek ambient radial glow behind crisp typography */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[400px] sm:h-[500px] bg-gradient-to-r from-blue-600/25 via-indigo-600/20 to-blue-400/15 rounded-full blur-[130px] pointer-events-none" />

        {/* Interactive Particle Network */}
        <HeroInteractiveNetwork />

        {/* Foreground Content */}
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10 w-full">
          
          {/* Centered Generous Hackathon Event Logo */}
          <div className="flex flex-col items-center justify-center mb-2">
            <img
              src="/hackathon-logo.png"
              alt="NIIS HACKATHON 2026 Official Emblem"
              className="h-24 sm:h-28 md:h-36 w-auto object-contain filter drop-shadow-[0_0_30px_rgba(59,130,246,0.35)] transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                if (e.currentTarget.src.endsWith('.png')) {
                  e.currentTarget.src = "/hackathon-logo.jpeg";
                }
              }}
            />
          </div>

          <div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase font-heading drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {content.eventName}
            </h2>
            <p className="mt-2 text-lg sm:text-2xl font-bold uppercase tracking-widest text-blue-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] font-heading">
              {content.tagline}
            </p>
            <p className="italic text-slate-300 font-sans text-sm sm:text-base mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              “{content.subTagline}”
            </p>
          </div>

          {/* Hero Meta Information Pills (Unified Single-Row Side-by-Side Alignment) */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-6xl mx-auto my-5 px-2">
            {/* Pill 1: Dates */}
            <span className="bg-white/[0.05] border border-white/10 text-slate-200 backdrop-blur-md text-xs py-1.5 px-3.5 rounded-full inline-flex items-center gap-2 font-medium whitespace-nowrap flex-shrink-0">
              <Calendar className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
              <span>{content.eventDates || "30th September - 01st October 2026"}</span>
            </span>

            {/* Pill 2: Venue */}
            <span className="bg-white/[0.05] border border-white/10 text-slate-200 backdrop-blur-md text-xs py-1.5 px-3.5 rounded-full inline-flex items-center gap-2 font-medium whitespace-nowrap flex-shrink-0">
              <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
              <span>{content.venue ? content.venue.replace('Sarada Vihar, ', '') : "C-Block Auditorium & Innovation Labs, Bhubaneswar"}</span>
            </span>

            {/* Pill 3: Prize Pool (Locked Side-by-Side in Matching Clean Frosted Style) */}
            <span className="bg-white/[0.05] border border-white/10 text-slate-200 backdrop-blur-md text-xs py-1.5 px-3.5 rounded-full inline-flex items-center gap-2 font-medium whitespace-nowrap flex-shrink-0">
              <Trophy className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
              <span>₹35,000 Cash Prize Pool</span>
            </span>
          </div>

          {/* Clean 4-Column Countdown Timer */}
          <div className="pt-1">
            <span className="text-[11px] font-mono tracking-widest text-slate-300 uppercase block mb-2 font-semibold">
              HACKATHON COMMENCES IN
            </span>
            <div className="inline-grid grid-cols-4 gap-2.5 bg-slate-900/85 border border-white/[0.08] p-3 rounded-2xl font-mono shadow-2xl backdrop-blur-md">
              {[
                { label: 'DAYS', val: timeLeft.days },
                { label: 'HOURS', val: timeLeft.hours },
                { label: 'MINUTES', val: timeLeft.minutes },
                { label: 'SECONDS', val: timeLeft.seconds },
              ].map((t, i) => (
                <div key={i} className="px-3.5 sm:px-5 py-2.5 bg-slate-950/90 border border-white/[0.05] rounded-xl text-center min-w-[70px] sm:min-w-[95px]">
                  <span className="text-2xl sm:text-4xl font-black text-white block leading-tight">
                    {String(t.val).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] text-blue-300 uppercase font-bold tracking-wider">{t.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs: Prominent Dual/Triple CTA */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5 flex-wrap">
            <a
              href={googleFormRegUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 cursor-pointer border border-blue-400/30 ring-2 ring-blue-500/20"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register Squad Online</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#tracks"
              className="w-full sm:w-auto bg-slate-900/80 hover:bg-slate-800/90 border border-white/[0.12] text-white px-8 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer shadow-lg transform hover:-translate-y-0.5 hover:border-white/25"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>Explore Problem Statements</span>
            </a>

            {content.showBrochureButton !== false && (
              <a
                href={content.rulebookUrl || "/brochure.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/15 border border-white/20 text-white px-6 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer shadow-md transform hover:-translate-y-0.5"
              >
                <BookOpen className="w-4 h-4 text-blue-300" />
                <span>Download Brochure</span>
              </a>
            )}
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. INTERACTIVE TEASER / SHOWCASE VIDEO SECTION
          ========================================================================= */}
      {/* =========================================================================
          2. OFFICIAL EVENT TEASER & PROMO SECTION (LIGHT-THEMED INSTITUTIONAL UI)
          ========================================================================= */}
      <section id="teaser" className="w-full bg-slate-50/70 border-y border-slate-200 py-16 px-4 md:px-8 relative overflow-hidden">
        
        <div className="max-w-5xl mx-auto space-y-8 relative z-10 text-center">
          
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 inline-block">
              EVENT PREVIEW
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mt-3 mb-2 font-['Outfit']">
              Official Event Teaser & Promo
            </h2>
            <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto">
              Experience the energy, campus innovation, and 24-hour sprint environment organized by Kaushal Tech Club.
            </p>
          </div>

          {/* Premium Mockup Video Frame */}
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-white p-2">
            
            {/* Inner Video Player */}
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 relative flex items-center justify-center group">
              {!showInteractiveTeaser ? (
                getYouTubeEmbedUrl(teaserConfig.videoUrl || content.promoVideoUrl) ? (
                  <div className="relative w-full h-full">
                    <iframe
                      src={getYouTubeEmbedUrl(teaserConfig.videoUrl || content.promoVideoUrl)}
                      title="NIIS Hackathon Official Teaser"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                    <div className="absolute top-3 right-3 z-10">
                      <button
                        onClick={() => setShowInteractiveTeaser(true)}
                        className="text-[11px] text-amber-300 hover:text-white bg-slate-900/80 border border-slate-700 px-3 py-1.5 rounded-lg shadow backdrop-blur-sm cursor-pointer transition font-medium"
                      >
                        Interactive Overview →
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      key={teaserConfig.videoUrl || content.promoVideoUrl || "/promo-video.mp4"}
                      src={teaserConfig.videoUrl || content.promoVideoUrl || "/promo-video.mp4"}
                      poster={teaserConfig.posterUrl || "/campus-bg.jpg"}
                      playsInline
                      loop
                      muted={isVideoMuted}
                      className="w-full h-full object-cover"
                      onError={() => {
                        setShowInteractiveTeaser(true);
                      }}
                      onEnded={() => setIsVideoPlaying(false)}
                    />

                    {/* Play Overlay Button */}
                    <div
                      onClick={handleToggleVideoPlay}
                      className={`absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-opacity ${
                        isVideoPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                      }`}
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white flex items-center justify-center shadow-2xl transform hover:scale-110 transition border-4 border-white/40">
                        {isVideoPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                      </div>
                    </div>

                    {/* Bottom Video Controls HUD */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4 flex items-center justify-between text-xs text-white">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleToggleVideoPlay}
                          className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
                          title={isVideoPlaying ? "Pause" : "Play"}
                        >
                          {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={handleToggleVideoMute}
                          className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
                          title={isVideoMuted ? "Unmute" : "Mute"}
                        >
                          {isVideoMuted ? <VolumeX className="w-4 h-4 text-amber-300" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                        </button>
                        <span className="font-mono text-slate-200 text-[11px] hidden sm:inline">
                          24-Hour Sprint • Sarada Vihar Campus, Bhubaneswar
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowInteractiveTeaser(true)}
                          className="text-[11px] text-amber-300 hover:text-white hover:underline cursor-pointer bg-black/40 px-2.5 py-1 rounded border border-white/10"
                        >
                          Interactive Overview
                        </button>
                      </div>
                    </div>
                  </>
                )
              ) : (
                /* Fallback Rich Interactive Showcase */
                <div className="w-full h-full relative bg-gradient-to-br from-[#07172f] via-[#091e3e] to-[#040d1c] p-6 sm:p-10 flex flex-col justify-between text-left">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 bg-blue-900/60 border border-blue-400/30 px-3 py-1 rounded-full text-xs text-amber-300 font-mono">
                      <Terminal className="w-3.5 h-3.5" /> Interactive Hackathon Engine Active
                    </div>
                    <h4 className="text-xl sm:text-3xl font-black text-white font-sans">
                      Transforming Theoretical Code into Deployed Prototypes
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                      24 hours non-stop sprint with high-speed campus Wi-Fi, 3-tier jury evaluation, dedicated mentor checkpoints, and state-of-the-art incubation backing by NIIS E-Cell.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-blue-900/50">
                    <div className="bg-[#051124]/80 p-3 rounded-xl border border-blue-800/40">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Sprint Format</span>
                      <span className="font-bold text-white text-xs sm:text-sm">24h Intra-College</span>
                    </div>
                    <div className="bg-[#051124]/80 p-3 rounded-xl border border-blue-800/40">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Prize Bounty</span>
                      <span className="font-bold text-amber-300 text-xs sm:text-sm">₹35,000 Pool</span>
                    </div>
                    <div className="bg-[#051124]/80 p-3 rounded-xl border border-blue-800/40">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Accommodation</span>
                      <span className="font-bold text-emerald-400 text-xs sm:text-sm">Campus Labs</span>
                    </div>
                    <div className="bg-[#051124]/80 p-3 rounded-xl border border-blue-800/40">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Eligibility</span>
                      <span className="font-bold text-blue-300 text-xs sm:text-sm">NIIS Students Only</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <button
                      onClick={() => setShowInteractiveTeaser(false)}
                      className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      ← Back to Video Player
                    </button>
                    <a
                      href={googleFormRegUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-wider transition shadow cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Register Now</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Supporting Feature Stats: Clean Light Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {[
              { label: "24-Hour Non-Stop Hackathon", icon: Clock },
              { label: "12 Curated Problem Statements", icon: FileText },
              { label: "₹35,000 Prize Pool", icon: Trophy },
              { label: "Exclusive for NIIS Students", icon: Users },
            ].map((chip, idx) => {
              const IconComp = chip.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 text-slate-700 shadow-sm text-xs font-medium px-4 py-2 rounded-full inline-flex items-center gap-2 hover:border-blue-400 hover:text-blue-900 transition"
                >
                  <IconComp className="w-3.5 h-3.5 text-blue-700 flex-shrink-0" />
                  <span>{chip.label}</span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. ABOUT SECTION (REFINED INSTITUTIONAL 2-COLUMN LAYOUT)
          ========================================================================= */}
      <section id="about" className="w-full py-16 px-4 md:px-8 bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column (Hackathon Logo) - lg:col-span-4 flex justify-center items-center */}
          <div className="lg:col-span-4 flex justify-center items-center">
            <img
              src="/hackathon-logo.png"
              alt="NIIS Hackathon 2026"
              className="w-56 h-56 md:w-64 md:h-64 object-contain mx-auto"
              onError={(e) => {
                if (e.currentTarget.src.endsWith('.png')) {
                  e.currentTarget.src = "/hackathon-logo.jpeg";
                }
              }}
            />
          </div>

          {/* Right Column (Rich Detailed Copy) - lg:col-span-8 flex flex-col items-start text-left */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200">
              ABOUT THE EVENT
            </span>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e3a8a] tracking-tight mt-3 mb-2 font-['Outfit']">
              Fostering Technology & Innovation at NIIS
            </h2>

            <p className="text-sm md:text-base text-slate-500 font-medium mb-4">
              An intensive 24-hour campus sprint connecting young technocrats with faculty mentors and real-world challenges.
            </p>

            <div className="space-y-4 text-sm md:text-base text-slate-600 leading-relaxed font-normal">
              <p>
                <strong className="font-semibold text-slate-900">NIIS HACKATHON 2026</strong> is the flagship intra-college technical championship organized by <strong className="font-semibold text-slate-900">Kaushal Tech Club</strong> at <strong className="font-semibold text-slate-900">NIIS INSTITUTE OF BUSINESS ADMINISTRATION, Bhubaneswar</strong>. Designed to provide a competitive platform for students across <strong className="font-semibold text-slate-900">MCA, BCA, and Management streams</strong>, it challenges participants to transform ideas into viable, functional prototypes within 24 hours.
              </p>
              <p>
                Grounded in academic standards affiliated to <strong className="font-semibold text-slate-900">BPUT, Odisha</strong> and accredited by <strong className="font-semibold text-slate-900">NAAC</strong>, the event features <strong className="font-semibold text-slate-900">12 curated problem statements</strong> focusing on real campus and industry use cases. Top-performing squads compete for a <strong className="font-semibold text-slate-900">₹35,000 cash prize pool</strong>, trophies, and institutional certificates of excellence.
              </p>
            </div>

            {/* Bottom Feature Pills */}
            <div className="flex flex-wrap gap-2.5 mt-6">
              <span className="bg-amber-50/80 text-amber-800 border border-amber-200/80 text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 font-medium">
                <span>☕</span>
                <span>24h Free Meals & Refreshments</span>
              </span>
              <span className="bg-blue-50/80 text-blue-800 border border-blue-200/80 text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 font-medium">
                <span>📶</span>
                <span>High-Speed Lab Connectivity</span>
              </span>
              <span className="bg-rose-50/80 text-rose-800 border border-rose-200/80 text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 font-medium">
                <span>🔥</span>
                <span>Zero Registration Fee</span>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. UNIFIED AUTOPLAYING SLIDER: LEADERSHIP DESK (PROMINENT EXECUTIVE HIERARCHY)
          ========================================================================= */}
      <section id="leadership" className="w-full py-16 px-4 sm:px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded">
              Leadership Desk
            </span>
            <h3 className="text-2xl sm:text-3xl font-sans font-black text-[#0f2d59]">
              Messages from Institutional Leadership
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Inspirational vision and guidance from the honorable leadership of NIIS Group of Institutions.
            </p>
          </div>

          {/* Unified Autoplaying Leadership Carousel Slider */}
          <div
            onMouseEnter={() => setIsLeaderHovered(true)}
            onMouseLeave={() => setIsLeaderHovered(false)}
            className="relative"
          >
            {/* Active Leader Executive Card */}
            {(() => {
              const currentLeader = PERMANENT_LEADERS[leaderIndex];
              return (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left transition-all duration-500">
                  
                  {/* Dignitary Photo Box */}
                  <div className="w-56 sm:w-64 h-72 sm:h-80 rounded-2xl overflow-hidden border-4 border-slate-100 shadow-md flex-shrink-0 bg-slate-100 flex items-center justify-center relative">
                    <img
                      src={currentLeader.photo}
                      alt={currentLeader.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/chairman.15c124f6375fe3d6762b.png";
                      }}
                    />
                    <div className="absolute top-2 left-2 bg-[#0f2d59]/90 text-amber-300 font-mono text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                      Executive Dignitary {leaderIndex + 1}/3
                    </div>
                  </div>

                  {/* Content & Quote */}
                  <div className="space-y-4 flex-1">
                    <div>
                      <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded border border-amber-200 inline-block mb-1.5">
                        {currentLeader.badge}
                      </span>
                      <h4 className="font-bold text-slate-900 text-xl sm:text-2xl leading-snug">
                        {currentLeader.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium">
                        {currentLeader.role}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 italic font-sans leading-relaxed pt-1">
                      “{currentLeader.quote}”
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
              );
            })()}

            {/* Slider Navigation Chevrons */}
            <button
              onClick={() => setLeaderIndex((prev) => (prev > 0 ? prev - 1 : PERMANENT_LEADERS.length - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-slate-200 shadow-md text-[#0f2d59] flex items-center justify-center hover:bg-[#0f2d59] hover:text-white transition cursor-pointer z-10"
              title="Previous Leader"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => setLeaderIndex((prev) => (prev + 1) % PERMANENT_LEADERS.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-slate-200 shadow-md text-[#0f2d59] flex items-center justify-center hover:bg-[#0f2d59] hover:text-white transition cursor-pointer z-10"
              title="Next Leader"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Dignitary Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PERMANENT_LEADERS.map((leader, idx) => (
              <button
                key={leader.id}
                onClick={() => setLeaderIndex(idx)}
                className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
                  leaderIndex === idx
                    ? 'bg-white border-blue-900 shadow-md ring-1 ring-blue-900'
                    : 'bg-white/60 border-slate-200 hover:bg-white'
                }`}
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border">
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/chairman.15c124f6375fe3d6762b.png";
                    }}
                  />
                </div>
                <div className="truncate">
                  <span className="font-bold text-xs text-[#0f2d59] block truncate">{leader.name}</span>
                  <span className="text-[10px] text-slate-500 block truncate">{leader.badge}</span>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. PROBLEM STATEMENTS / TRACKS
          ========================================================================= */}
      <section id="tracks" className="w-full py-16 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded">
              4 Flagship Categories • 12 Innovation Challenges
            </span>
            <h3 className="text-3xl font-sans font-black text-[#0f2d59]">
              Explore 12 Official Problem Statements
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Curated across 4 pivotal domains with 3 dedicated challenges each. Download the official problem brief (PDF) or apply directly.
            </p>

            {/* BPUT Minimalist Real-Time Stats Row */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80 font-medium">
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>Total {content.problemStatements?.length || 12} Problem Statements</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/25 font-semibold">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>{totalTeamsCount} Teams Registered</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-700 border border-cyan-500/25 font-semibold">
                <UserCheck className="w-3.5 h-3.5 text-cyan-600" />
                <span>{totalStudentsCount} Participants</span>
              </span>
            </div>
          </div>

          {/* Search & Category Filters */}
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
                placeholder="Search 12 problem statements..."
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
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                    <div className="flex items-center gap-1.5">
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

                    <div className="flex items-center gap-1.5 text-[11px] font-medium">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 border border-emerald-500/30">
                        {psMetrics[ps.id]?.teams || 0} Teams
                      </span>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-700 border border-cyan-500/30">
                        {psMetrics[ps.id]?.participants || 0} Participants
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    {ps.category || ps.domain}
                  </span>

                  <h4 
                    onClick={() => setModalTrack(ps)}
                    className="font-bold text-slate-900 text-sm leading-snug mb-2 group-hover:text-blue-900 transition cursor-pointer"
                  >
                    {ps.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {ps.shortDesc}
                  </p>

                  {ps.tags && ps.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {ps.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => setModalTrack(ps)}
                    className="text-[11px] font-semibold text-blue-900 hover:underline pt-2 inline-block cursor-pointer"
                  >
                    View Scope Details →
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownloadProblemBrief(ps, content.collegeName)}
                      className="flex-1 text-center bg-blue-50 hover:bg-blue-100 text-[#0f2d59] font-bold py-1.5 px-3 rounded-lg text-xs transition cursor-pointer flex items-center justify-center gap-1.5 border border-blue-200 shadow-xs"
                      title="Download Detailed PDF Problem Brief"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-900" />
                      <span>Download Brief</span>
                    </button>
                    
                    <a
                      href={googleFormPsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
                      title="Choose this Problem Statement"
                    >
                      <span>Choose PS</span>
                      <ExternalLink className="w-3 h-3 text-blue-100" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. DYNAMIC EVENT FLOW & 24H TIMELINE
          ========================================================================= */}
      <section id="schedule" className="w-full py-16 px-4 sm:px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded">
              Timeline & Phases
            </span>
            <h3 className="text-3xl font-sans font-black text-[#0f2d59]">
              Milestones & Event Flow
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Follow key deadlines from online abstract submissions to the 24-hour offline grand finale.
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
                    <div key={item.id || idx} className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 transition">
                      <div className="flex items-start gap-3">
                        <span className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${
                          item.status === 'Completed' ? 'bg-slate-400' :
                          (item.status === 'Active' || item.status === 'In Progress') ? 'bg-emerald-600 animate-pulse' : 'bg-blue-600'
                        }`} />
                        <div>
                          <span className="font-semibold text-slate-800 block text-xs sm:text-sm">{item.label}</span>
                          {item.desc && (
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                          )}
                        </div>
                      </div>
                      <div className="sm:text-right flex-shrink-0 pl-5.5 sm:pl-0">
                        <span className="font-bold text-[#0f2d59] block">{item.date}</span>
                        <span className={`text-[10px] uppercase font-bold inline-block px-2 py-0.5 rounded ${
                          item.status === 'Completed' ? 'bg-slate-100 text-slate-500' :
                          (item.status === 'Active' || item.status === 'In Progress') ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-700'
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

          {/* Hour-by-Hour 24h Roadmap */}
          <div id="roadmap" className="space-y-6 pt-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded">
                Grand Finale Schedule
              </span>
              <h4 className="text-2xl font-sans font-black text-[#0f2d59]">
                Hour-by-Hour 24h Sprint Schedule
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {content.hackathonRoadmap.map((r, i) => (
                <div key={r.id || i} className="relative group">
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-2 hover:border-blue-900 transition flex flex-col justify-between h-full">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <span className="text-[11px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded">
                          {r.time}
                        </span>
                        {r.venue && (
                          <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-blue-700" />
                            <span>{r.venue}</span>
                          </span>
                        )}
                      </div>
                      <h5 className="font-bold text-[#0f2d59] text-xs sm:text-sm">{r.title}</h5>
                      {r.actionItem && (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                          ⚡ {r.actionItem}
                        </span>
                      )}
                      <p className="text-xs text-slate-600 leading-relaxed">{r.desc}</p>
                    </div>
                  </div>

                  {/* Minimal subtle inline arrow between horizontally adjacent cards in row */}
                  {i < content.hackathonRoadmap.length - 1 && (i + 1) % 3 !== 0 && (
                    <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-blue-200 shadow-sm items-center justify-center pointer-events-none text-blue-500">
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          8. ACCURATE PRIZES & REWARDS (TOTAL ₹35,000 CASH POOL)
          ========================================================================= */}
      <section id="prizes" className="w-full py-16 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded">
              Verified Rewards & Bounty Structure
            </span>
            <h3 className="text-3xl font-sans font-black text-[#0f2d59]">
              Prizes, Trophies & Seed Support
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Total Cash Prize Pool: <strong className="text-blue-900">₹35,000</strong>. Recognizing high-impact engineering with verified institutional citations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.prizes.map((pz, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 border flex flex-col justify-between shadow-sm transition ${
                  idx === 0
                    ? 'bg-blue-50/80 border-blue-400 shadow-md ring-1 ring-blue-300'
                    : 'bg-white border-slate-200 hover:border-blue-400'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0f2d59] text-amber-400 flex items-center justify-center mb-4 shadow">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {pz.place}
                  </span>
                  <div className="text-3xl sm:text-4xl font-sans font-black text-[#0f2d59] mb-3">
                    {pz.amount}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pz.perk}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Institutional Citation Included</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center text-xs text-slate-600 max-w-2xl mx-auto">
            All registered participants receive a verified <strong>Certificate of Participation</strong> endorsed by <strong>NIIS Institute of Business Administration</strong>, along with hackathon kits, meals, and 24h campus sprint access.
          </div>

        </div>
      </section>

      {/* =========================================================================
          9. DYNAMIC RULES, ETHICS & NOC GUIDELINES
          ========================================================================= */}
      <section id="guidelines" className="w-full py-16 px-4 sm:px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded">
              Standard Protocols
            </span>
            <h3 className="text-3xl font-sans font-black text-[#0f2d59]">
              Hackathon Guidelines & Requirements
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Please review all institutional standards prior to team submission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            {(content.rulesList && content.rulesList.length > 0 ? content.rulesList : [
              {
                id: "r-1",
                category: "Team Rules",
                title: content.guidelines?.rule1Title || "1. Squad Eligibility & Composition",
                points: content.guidelines?.rule1Points || []
              },
              {
                id: "r-2",
                category: "Submission Deliverables",
                title: content.guidelines?.rule2Title || "2. Institutional Identity & Bona Fide Verification",
                points: content.guidelines?.rule2Desc ? [content.guidelines.rule2Desc] : []
              },
              {
                id: "r-3",
                category: "Hardware/Software Rules",
                title: content.guidelines?.rule3Title || "3. Hardware, Repository & Code Ethics",
                points: content.guidelines?.rule3Points || []
              }
            ]).map((rule, idx) => {
              const categoryIcons = {
                "Team Rules": Users,
                "Hardware/Software Rules": Laptop,
                "Submission Deliverables": FileText,
                "Code of Conduct": ShieldCheck
              };
              const IconComp = categoryIcons[rule.category] || ShieldCheck;
              const pointsArr = Array.isArray(rule.points)
                ? rule.points
                : (typeof rule.points === 'string' ? rule.points.split('\n').filter(Boolean) : []);

              return (
                <div key={rule.id || idx} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-blue-900 transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-900 px-2 py-0.5 rounded border border-blue-200">
                        {rule.category || "General Rule"}
                      </span>
                      <IconComp className="w-4 h-4 text-blue-900" />
                    </div>
                    <h4 className="font-bold text-[#0f2d59] text-sm mb-2">
                      {rule.title}
                    </h4>
                    {pointsArr.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-xs">
                        {pointsArr.map((pt, i) => (
                          <li key={i} className="leading-relaxed">{pt}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-600 leading-relaxed">{rule.desc || ""}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Download Rulebook Box (respects showBrochureButton toggle) */}
          {content.showBrochureButton !== false && (
            <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <BookOpen className="w-8 h-8 text-[#0f2d59] flex-shrink-0 mx-auto sm:mx-0" />
                <div>
                  <h5 className="font-bold text-[#0f2d59] text-sm">Download Official Event Rulebook</h5>
                  <p className="text-xs text-slate-600">Full scoring rubrics, schedule breakdown, and campus conduct guidelines (PDF)</p>
                </div>
              </div>

              <a
                href={content.rulebookUrl || "/brochure.pdf"}
                download="NIIS_Hackathon_2026_Rulebook.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0f2d59] hover:bg-blue-950 text-white font-bold px-5 py-2.5 rounded-lg text-xs flex items-center gap-2 flex-shrink-0 transition shadow"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download Official Event Rulebook</span>
              </a>
            </div>
          )}

        </div>
      </section>

      {/* =========================================================================
          4. NASA-STYLE PHOTO ARCHIVES GRID (NO CATEGORIES)
          Streamlined right above the Committee & Feedback sections
          ========================================================================= */}
      <section id="gallery" className="w-full py-16 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              Visual Archives
            </span>
            <h3 className="text-3xl font-sans font-black text-[#0f2d59]">
              Campus Moments & Hackathon Chronicles
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Relive the collaborative intensity, mentorship sessions, and grand valedictory awards from our previous hackathon edition.
            </p>
          </div>

          {/* NASA-Style Compact Uniform Image Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {currentGallery.map((item, idx) => {
              const photoSrc = item.url || item.src;
              const photoTitle = item.title || item.caption || `Hackathon Moment #${idx + 1}`;
              return (
                <div
                  key={item.id || idx}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-900 border border-slate-800/80 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={photoSrc}
                    alt={photoTitle}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/campus-bg.jpg";
                    }}
                  />
                  {/* Subtle bottom caption overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2.5 sm:p-3 transition-opacity duration-200 flex flex-col justify-end">
                    <p className="text-white text-xs sm:text-sm font-semibold truncate group-hover:text-amber-300 transition-colors">
                      {photoTitle}
                    </p>
                    {item.caption && item.caption !== photoTitle && (
                      <p className="text-slate-300 text-[10px] sm:text-[11px] line-clamp-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Gallery Full-screen Lightbox Modal */}
      {lightboxIndex !== null && currentGallery[lightboxIndex] && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(null);
            }}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer z-50 transition"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {currentGallery.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev > 0 ? prev - 1 : currentGallery.length - 1));
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer z-50 transition"
                title="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev < currentGallery.length - 1 ? prev + 1 : 0));
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer z-50 transition"
                title="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div 
            className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[72vh] rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-black">
              <img
                src={currentGallery[lightboxIndex].url || currentGallery[lightboxIndex].src}
                alt={currentGallery[lightboxIndex].title || "Hackathon Moment"}
                className="max-h-[72vh] w-auto object-contain mx-auto"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/campus-bg.jpg";
                }}
              />
            </div>
            <div className="mt-4 text-center text-white space-y-1 max-w-xl">
              <span className="text-xs text-amber-400 font-mono">
                Photo {lightboxIndex + 1} of {currentGallery.length}
              </span>
              <h3 className="text-lg font-bold">
                {currentGallery[lightboxIndex].title || currentGallery[lightboxIndex].caption || "Hackathon Moment"}
              </h3>
              {currentGallery[lightboxIndex].caption && currentGallery[lightboxIndex].caption !== currentGallery[lightboxIndex].title && (
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentGallery[lightboxIndex].caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          5. UNIFIED AUTOPLAYING SLIDER: COMMITTEE MEMBERS (EXACT SAME MOTION, 2 CARDS AT A TIME)
          ========================================================================= */}
      <section id="committee" className="w-full py-16 px-4 sm:px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded">
              Organizing Core
            </span>
            <h3 className="text-3xl font-sans font-black text-[#0f2d59]">
              Tech Club Faculty & Organizing Committee
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Meet our accredited faculty in-charge members, patrons, and student coordinators driving NIIS Hackathon 2026.
            </p>
          </div>

          {/* Unified Committee Auto-playing Slider: Exactly 2 cards at a time on desktop */}
          <div
            onMouseEnter={() => setIsCommHovered(true)}
            onMouseLeave={() => setIsCommHovered(false)}
            className="relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(() => {
                const commList = (content.committeeMembers && content.committeeMembers.length > 0)
                  ? content.committeeMembers
                  : OFFICIAL_COMMITTEE_MEMBERS;
                const pair = commList.length <= 2
                  ? commList
                  : [
                      commList[commSliderIndex % commList.length],
                      commList[(commSliderIndex + 1) % commList.length]
                    ];
                return pair.map((member, pairIdx) => (
                  <div 
                    key={`${member.id || pairIdx}-${pairIdx}`} 
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-[#0f2d59] hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-4">
                      {/* Photo / Avatar */}
                      <div className="w-18 h-18 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200 flex-shrink-0 flex items-center justify-center text-slate-400">
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

                      {/* Member Info */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                          {member.category || "Faculty Core"}
                        </span>
                        <h4 className="font-bold text-slate-900 text-base leading-snug">
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
                          <a href={`tel:${member.phone}`} className="hover:text-blue-900 font-medium truncate">
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
                ));
              })()}
            </div>

            {/* Slider Navigation Chevrons */}
            <button
              onClick={() => {
                const len = (content.committeeMembers || OFFICIAL_COMMITTEE_MEMBERS).length;
                setCommSliderIndex((prev) => (prev >= 2 ? prev - 2 : Math.max(0, Math.floor((len - 1) / 2) * 2)));
              }}
              className="absolute -left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-md text-[#0f2d59] flex items-center justify-center hover:bg-[#0f2d59] hover:text-white transition cursor-pointer z-10"
              title="Previous Members"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                const len = (content.committeeMembers || OFFICIAL_COMMITTEE_MEMBERS).length;
                setCommSliderIndex((prev) => (prev + 2 >= len ? 0 : prev + 2));
              }}
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-md text-[#0f2d59] flex items-center justify-center hover:bg-[#0f2d59] hover:text-white transition cursor-pointer z-10"
              title="Next Members"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {Array.from({ length: Math.ceil(((content.committeeMembers || OFFICIAL_COMMITTEE_MEMBERS).length) / 2) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCommSliderIndex(i * 2)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  Math.floor(commSliderIndex / 2) === i ? 'w-6 bg-[#0f2d59]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                title={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Complete Directory Grid for 14 Members + Student Leads */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <h5 className="font-bold text-[#0f2d59] text-xs uppercase tracking-wider mb-3">
              Official Institutional In-Charge Directory (14 Faculty In-Charge + Student Leadership)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-slate-700">
              {((content.committeeMembers && content.committeeMembers.length > 0) ? content.committeeMembers : OFFICIAL_COMMITTEE_MEMBERS).map((m, i) => (
                <div key={m.id || i} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                  <span className="w-5 h-5 rounded-full bg-[#0f2d59] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="truncate">
                    <span className="font-bold block truncate">{m.name}</span>
                    <span className="text-[10px] text-slate-500 block truncate">{m.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campus Location Banner */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-xs">
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

      {/* =========================================================================
          11. FAQS & CLARIFICATIONS
          ========================================================================= */}
      <section id="faqs" className="w-full py-16 px-4 sm:px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded">
              Got Questions?
            </span>
            <h3 className="text-3xl font-sans font-black text-[#0f2d59]">
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

      {/* =========================================================================
          12. FOOTER
          ========================================================================= */}
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
                Established in 2000, NIIS has championed quality technical, IT, and management education across Odisha with 26 years of excellence in student mentorship.
              </p>
              <div className="pt-1 flex items-center gap-3">
                <KaushalClubBadge />
              </div>
            </div>

            <div>
              <h6 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">Portal Navigation</h6>
              <ul className="space-y-2 text-[11px]">
                <li><a href="#about" className="hover:text-amber-300">About Hackathon</a></li>
                <li><a href="#leadership" className="hover:text-amber-300">Chairperson Desk</a></li>
                <li><a href="#tracks" className="hover:text-amber-300">Problem Statements</a></li>
                <li><a href="#schedule" className="hover:text-amber-300">Timeline & Stages</a></li>
                <li><a href="#prizes" className="hover:text-amber-300">Prizes (₹35K Pool)</a></li>
                <li><a href="#guidelines" className="hover:text-amber-300">Guidelines & Rulebook</a></li>
                <li><a href="#gallery" className="hover:text-amber-300">Hackathon Moments</a></li>
                <li><a href="#committee" className="hover:text-amber-300">Committee & Contacts</a></li>
                <li><a href="#faqs" className="hover:text-amber-300">FAQs & Rules</a></li>
              </ul>
            </div>

            <div>
              <h6 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">Dynamic Maintenance</h6>
              <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                Master CMS controls: Edit any section text, prizes, guidelines, gallery photos, and committee leads live.
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
            <span className="text-slate-400">Organized by Kaushal Technical Club • Approved by AICTE, Affiliated to BPUT | Accredited by NAAC</span>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          13. CONTINUOUS TICKER
          ========================================================================= */}
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

      {/* =========================================================================
          14. MODAL: FULL TRACK DETAILS
          ========================================================================= */}
      {modalTrack && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 border border-slate-200 relative my-auto shadow-2xl text-xs sm:text-sm text-slate-800">
            <button
              onClick={() => setModalTrack(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5 pr-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-[#0f2d59] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    {modalTrack.id}
                  </span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {modalTrack.category || modalTrack.domain}
                  </span>
                  {modalTrack.difficulty && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      modalTrack.difficulty === 'Hard' ? 'bg-red-50 text-red-700 border border-red-200' :
                      modalTrack.difficulty === 'Medium' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {modalTrack.difficulty}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-medium">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 font-semibold">
                    {psMetrics[modalTrack.id]?.teams || 0} Teams
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-700 border border-cyan-500/30 font-semibold">
                    {psMetrics[modalTrack.id]?.participants || 0} Participants
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg pt-1">
                {modalTrack.title}
              </h3>
              {modalTrack.tags && modalTrack.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {modalTrack.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-0.5 rounded-full font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-b border-slate-100 py-3">
              {modalTrack.shortDesc && (
                <div>
                  <strong className="text-slate-800 block mb-1">Executive Summary:</strong>
                  <p className="text-slate-600">{modalTrack.shortDesc}</p>
                </div>
              )}

              <div>
                <strong className="text-slate-800 block mb-1">Detailed Technical Scope & Deliverables:</strong>
                <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                  {modalTrack.fullBrief || modalTrack.fullDesc || modalTrack.shortDesc}
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 text-xs">
                <strong className="text-[#0f2d59] block">Evaluation Scoring Highlights:</strong>
                <p className="text-slate-600">
                  • 25% Innovation & Problem Fit &bull; 30% Architecture & Security &bull; 30% Working Prototype &bull; 15% Pitch & Presentation
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1">
              <button
                onClick={() => handleDownloadProblemBrief(modalTrack, content.collegeName)}
                className="w-full sm:w-auto px-4 py-2 bg-blue-50 hover:bg-blue-100 text-[#0f2d59] border border-blue-200 rounded-lg font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                title="Download PDF Problem Brief"
              >
                <Download className="w-4 h-4 text-blue-900" />
                <span>Download Problem Brief (PDF)</span>
              </button>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setModalTrack(null)}
                    className="px-4 py-2 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 cursor-pointer text-xs"
                  >
                    Close
                  </button>
                  <a
                    href={googleFormPsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Choose PS</span>
                    <ExternalLink className="w-3.5 h-3.5 text-blue-100" />
                  </a>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          15. NATIVE IN-APP REGISTRATION MODAL / STEP-BY-STEP SQUAD BUILDER
          ========================================================================= */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 space-y-5 border border-slate-200 relative my-auto shadow-2xl max-h-[92vh] flex flex-col text-xs sm:text-sm">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0f2d59] text-amber-400 flex items-center justify-center font-bold">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0f2d59] font-sans leading-tight">
                    Squad Registration Desk • NIIS Hackathon 2026
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Step {registerStep} of 3: Direct Cloud Firestore Sync
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Progress Indicator */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold uppercase tracking-wider">
              {[
                { step: 1, label: "Squad & Track" },
                { step: 2, label: "Team Leader" },
                { step: 3, label: "Squad Members & Submit" },
              ].map((s) => (
                <div
                  key={s.step}
                  className={`py-1.5 rounded-lg border transition ${
                    registerStep === s.step
                      ? 'bg-[#0f2d59] text-amber-300 border-[#0f2d59]'
                      : registerStep > s.step
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-slate-50 text-slate-400 border-slate-200'
                  }`}
                >
                  <span>{s.step}. {s.label}</span>
                </div>
              ))}
            </div>

            {/* Step Form Body */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-4 py-1">
              
              {/* STEP 1: SQUAD NAME & TRACK SELECTION */}
              {registerStep === 1 && (
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 leading-relaxed">
                    💡 Teams must consist of <strong>3 to 5 student members</strong> (1 Team Leader + 2 to 4 Squad Members). Cross-disciplinary branches (BCA, MCA, B.Tech, BBA, B.Sc) are eligible.
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Team / Squad Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ByteCrafters NIIS, Turing Squad, KaushalDevs"
                      value={regForm.teamName}
                      onChange={(e) => setRegForm({ ...regForm, teamName: e.target.value })}
                      required
                      className="w-full border rounded-xl p-2.5 bg-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Select Problem Statement / Track <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={regForm.trackId}
                      onChange={(e) => setRegForm({ ...regForm, trackId: e.target.value })}
                      className="w-full border rounded-xl p-2.5 bg-white text-xs sm:text-sm font-bold text-[#0f2d59] focus:outline-none focus:ring-2 focus:ring-blue-900"
                    >
                      {content.problemStatements.map((track) => (
                        <option key={track.id} value={track.id}>
                          [{track.id}] {track.category || track.domain} — {track.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 2: TEAM LEADER DETAILS */}
              {registerStep === 2 && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Leader Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Krushna Chandra Sahoo"
                        value={regForm.leaderName}
                        onChange={(e) => setRegForm({ ...regForm, leaderName: e.target.value })}
                        required
                        className="w-full border rounded-xl p-2 bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        College / University Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. NIIS Institute of Business Administration"
                        value={regForm.leaderCollege}
                        onChange={(e) => setRegForm({ ...regForm, leaderCollege: e.target.value })}
                        required
                        className="w-full border rounded-xl p-2 bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Branch / Degree <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="BCA / MCA / B.Tech / BBA"
                        value={regForm.leaderBranch}
                        onChange={(e) => setRegForm({ ...regForm, leaderBranch: e.target.value })}
                        required
                        className="w-full border rounded-xl p-2 bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        WhatsApp Contact <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={regForm.leaderPhone}
                        onChange={(e) => setRegForm({ ...regForm, leaderPhone: e.target.value })}
                        required
                        className="w-full border rounded-xl p-2 bg-white text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Official Email ID <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="leader@college.edu.in"
                        value={regForm.leaderEmail}
                        onChange={(e) => setRegForm({ ...regForm, leaderEmail: e.target.value })}
                        required
                        className="w-full border rounded-xl p-2 bg-white text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: SQUAD MEMBERS (2 TO 4 MEMBERS) */}
              {registerStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#0f2d59] text-xs uppercase tracking-wider">
                        Squad Members (Minimum 2, Maximum 4 Additional)
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Total Squad Size: {regForm.members.length + 1} technocrats (including Team Leader)
                      </p>
                    </div>
                    {regForm.members.length < 4 && (
                      <button
                        type="button"
                        onClick={handleAddMember}
                        className="inline-flex items-center gap-1.5 bg-[#0f2d59] hover:bg-blue-950 text-amber-300 font-bold px-3 py-1.5 rounded-lg text-xs transition cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Member
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    {regForm.members.map((member, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#0f2d59] font-mono">
                            Squad Member #{idx + 1}
                          </span>
                          {regForm.members.length > 2 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveMember(idx)}
                              className="text-rose-500 hover:text-rose-700 text-xs font-semibold cursor-pointer"
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <input
                              type="text"
                              placeholder={`Member ${idx + 1} Full Name *`}
                              value={member.name}
                              onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                              required
                              className="w-full border rounded-lg p-2 bg-white text-xs font-semibold"
                            />
                          </div>
                          <div>
                            <input
                              type="email"
                              placeholder={`Member ${idx + 1} Email ID`}
                              value={member.email}
                              onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                              className="w-full border rounded-lg p-2 bg-white text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex items-start gap-2 text-xs text-blue-900 leading-relaxed">
                    <span>🛡️</span>
                    <span><strong>Bona Fide Confirmation:</strong> By confirming registration, you certify that all squad members are enrolled students and will present valid institutional student ID cards during venue reporting.</span>
                  </div>
                </div>
              )}

            </div>

            {/* Stepper Navigation Buttons */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
              {registerStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setRegisterStep(prev => prev - 1)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer text-xs"
                >
                  ← Previous
                </button>
              ) : (
                <div />
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-4 py-2 border rounded-xl font-semibold text-slate-500 hover:bg-slate-50 transition cursor-pointer text-xs"
                >
                  Cancel
                </button>

                {registerStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (registerStep === 1 && !regForm.teamName.trim()) {
                        alert("Please provide a Team / Squad Name.");
                        return;
                      }
                      if (registerStep === 2 && (!regForm.leaderName.trim() || !regForm.leaderPhone.trim() || !regForm.leaderEmail.trim())) {
                        alert("Please fill in all required Leader contact fields.");
                        return;
                      }
                      setRegisterStep(prev => prev + 1);
                    }}
                    className="px-5 py-2 bg-[#0f2d59] hover:bg-blue-950 text-amber-300 font-bold rounded-xl shadow transition cursor-pointer text-xs"
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleRegistrationSubmit}
                    disabled={isSubmittingReg}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs transition shadow-lg flex items-center gap-2 cursor-pointer ${
                      isSubmittingReg
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        : 'bg-amber-400 hover:bg-amber-300 text-[#0f2d59]'
                    }`}
                  >
                    {isSubmittingReg ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-[#0f2d59] border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting to Cloud...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Confirm Squad Registration</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          REGISTRATION CONFIRMATION MODAL & RECEIPT DOWNLOAD
          ========================================================================= */}
      {registrationSuccess && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 border border-slate-200 shadow-2xl relative">
            
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Registration Confirmed
              </span>
              <h3 className="text-xl font-bold text-[#0f2d59] font-sans mt-2">
                Welcome to NIIS Hackathon 2026!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your squad details have been registered into the Firestore Cloud Database.
              </p>
            </div>

            {/* Unique Team ID Display Card */}
            <div className="bg-slate-50 border-2 border-dashed border-blue-900/30 p-3.5 rounded-2xl space-y-1">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">
                Official Squad Passcode / ID
              </span>
              <span className="font-mono text-xl sm:text-2xl font-black text-[#0f2d59] tracking-wider block">
                {registrationSuccess.submissionId}
              </span>
              <span className="text-[11px] font-semibold text-slate-600 block">
                Team: {registrationSuccess.teamName} ({registrationSuccess.trackId})
              </span>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={handleDownloadReceipt}
                className="w-full bg-[#0f2d59] hover:bg-blue-950 text-amber-300 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Registration Receipt (.txt)</span>
              </button>

              <button
                onClick={() => setRegistrationSuccess(null)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-xl text-xs transition cursor-pointer"
              >
                Back to Portal
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          PASSWORD SECURITY GATE MODAL
          ========================================================================= */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 border border-slate-200 relative shadow-2xl text-center">
            
            <button 
              onClick={() => setShowPinModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
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
          16. EXTENDED MASTER ADMIN CMS MODAL (ALL SECTIONS + REGISTRATIONS + GALLERY)
          ========================================================================= */}
      {showAdmin && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-5xl w-full p-5 sm:p-6 space-y-4 border border-slate-200 relative my-auto max-h-[94vh] flex flex-col shadow-2xl text-xs text-slate-800">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-bold text-[#0f2d59] text-base sm:text-lg flex items-center gap-2 font-sans">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  NIIS Hackathon Master Live CMS Portal
                </h3>
                <p className="text-[11px] text-slate-500">
                  Full control: Edit all sections, dates, event flow, prizes, guidelines, gallery, and export live registrations.
                </p>
              </div>
              <button 
                onClick={() => setShowAdmin(false)} 
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Navigation Jumpers */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-100 text-xs font-semibold">
              {[
                { id: 'flow', label: '🔀 1. Event Flow & Milestones' },
                { id: 'schedule', label: '⏱️ 2. 24h Sprint Schedule' },
                { id: 'guidelines', label: '📑 3. Guidelines & Rules' },
                { id: 'brochure', label: '📘 4. Brochure & Assets' },
                { id: 'telemetry', label: '📊 5. PS Telemetry & Counts' },
                { id: 'registrations', label: `📋 Registrations (${totalTeamsCount})` },
                { id: 'general', label: '🔗 General & Dates' },
                { id: 'about', label: 'ℹ️ About Section' },
                { id: 'tracks', label: `🎯 Tracks (${adminDraft.problemStatements?.length || 0})` },
                { id: 'prizes', label: '🏆 Prizes (₹35K)' },
                { id: 'teaser', label: '🎬 Teaser Video' },
                { id: 'gallery', label: `🖼️ Gallery Moments (${(adminDraft.gallery || currentGallery).length})` },
                { id: 'committee', label: `👥 Committee (${adminDraft.committeeMembers?.length || 0})` },
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
              
              {/* TAB: LIVE REGISTRATIONS VIEWER & CSV EXPORT */}
              {adminTab === 'registrations' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <h4 className="font-bold text-[#0f2d59] text-sm">
                          Live Registrations Database (Firestore Real-time Telemetry)
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 flex flex-wrap items-center gap-2">
                        <span className="bg-blue-100 text-blue-900 px-2 py-0.5 rounded font-bold font-mono">
                          {totalTeamsCount} Verified Squads
                        </span>
                        <span>•</span>
                        <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold font-mono">
                          {totalStudentsCount} Total Technocrats / Students
                        </span>
                        <span className="text-slate-400 hidden sm:inline">•</span>
                        <span className="text-slate-500 text-[10px]">Real-time cloud listener active</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={fetchRegistrations}
                        className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
                        title="Reload Registrations"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoadingRegs ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                      </button>

                      <button
                        onClick={handleExportRegistrationsCSV}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow transition cursor-pointer"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>Export to Excel / CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Google Forms / Sheets Telemetry Sync Controller */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h5 className="font-bold text-[#0f2d59] text-xs flex items-center gap-1.5">
                          <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                          Google Forms & Sheets Telemetry Sync Controller
                        </h5>
                        <p className="text-[11px] text-slate-600">
                          External Google Form responses are synced here. Update verified counts from your Google Sheet to reflect instantly across all visitor portals.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={adminDraft.googleFormRegistrationUrl || DEFAULT_GOOGLE_FORM_REGISTRATION_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 text-[11px] bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 rounded-lg font-semibold flex items-center gap-1"
                        >
                          View Reg Form <ExternalLink className="w-3 h-3" />
                        </a>
                        <a
                          href={adminDraft.googleFormPsSelectionUrl || DEFAULT_GOOGLE_FORM_PS_SELECTION_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 text-[11px] bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 rounded-lg font-semibold flex items-center gap-1"
                        >
                          View PS Form <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Verified Squads (Google Sheets)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={adminDraft.verifiedTeamsCount !== undefined ? adminDraft.verifiedTeamsCount : 28}
                          onChange={(e) => setAdminDraft({
                            ...adminDraft,
                            verifiedTeamsCount: Math.max(0, parseInt(e.target.value) || 0)
                          })}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-mono font-bold text-[#0f2d59]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Verified Participants
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={adminDraft.verifiedParticipantsCount !== undefined ? adminDraft.verifiedParticipantsCount : 112}
                          onChange={(e) => setAdminDraft({
                            ...adminDraft,
                            verifiedParticipantsCount: Math.max(0, parseInt(e.target.value) || 0)
                          })}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-mono font-bold text-[#0f2d59]"
                        />
                      </div>

                      <div className="sm:col-span-2 flex items-center gap-2 pt-4 flex-wrap">
                        <button
                          type="button"
                          onClick={() => setAdminTab('telemetry')}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm transition"
                        >
                          <BarChart3 className="w-3.5 h-3.5 text-amber-300" />
                          <span>Per-PS Telemetry Manager</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setRegisterStep(1);
                            setShowRegisterModal(true);
                          }}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                          title="Open internal Firestore registration modal for manual squad entry"
                        >
                          <UserPlus className="w-3.5 h-3.5 text-amber-400" />
                          <span>Internal Firestore Modal (Admin)</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search registrations by Team ID, Leader, College, Track, Phone..."
                      value={adminRegSearch}
                      onChange={(e) => setAdminRegSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border rounded-xl bg-white text-xs"
                    />
                  </div>

                  {/* Registrations Table */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white">
                    <div className="overflow-x-auto max-h-[50vh]">
                      <table className="w-full text-left border-collapse text-[11px]">
                        <thead>
                          <tr className="bg-[#0f2d59] text-white uppercase text-[10px] font-bold">
                            <th className="p-2.5">ID</th>
                            <th className="p-2.5">Team Name</th>
                            <th className="p-2.5">Track</th>
                            <th className="p-2.5">Leader Details</th>
                            <th className="p-2.5">College</th>
                            <th className="p-2.5">Members</th>
                            <th className="p-2.5">Registered</th>
                            <th className="p-2.5 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredAdminRegs.length > 0 ? (
                            filteredAdminRegs.map((reg, idx) => (
                              <tr key={reg.id || idx} className="hover:bg-slate-50 transition">
                                <td className="p-2.5 font-mono font-bold text-blue-900 whitespace-nowrap">
                                  {reg.submissionId}
                                </td>
                                <td className="p-2.5 font-bold text-slate-800">
                                  {reg.teamName}
                                </td>
                                <td className="p-2.5">
                                  <span className="font-mono bg-blue-50 text-blue-900 px-1.5 py-0.5 rounded font-bold">
                                    {reg.trackId}
                                  </span>
                                </td>
                                <td className="p-2.5">
                                  <span className="font-bold block">{reg.leaderName}</span>
                                  <span className="text-slate-500 font-mono block">{reg.leaderPhone}</span>
                                </td>
                                <td className="p-2.5 max-w-[150px] truncate" title={reg.leaderCollege}>
                                  {reg.leaderCollege}
                                </td>
                                <td className="p-2.5 text-center font-bold">
                                  {(reg.members?.length || 0) + 1}
                                </td>
                                <td className="p-2.5 text-slate-500 whitespace-nowrap">
                                  {reg.registeredAt ? new Date(reg.registeredAt).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="p-2.5 text-center">
                                  <button
                                    onClick={() => setSelectedRegAbstract(reg)}
                                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-semibold text-[10px] cursor-pointer"
                                  >
                                    Abstract
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={8} className="p-6 text-center text-slate-400">
                                No squad registrations found matching your query.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Abstract Modal inside Admin */}
                  {selectedRegAbstract && (
                    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                      <div className="bg-white rounded-2xl max-w-lg w-full p-5 space-y-3 border border-slate-200 shadow-2xl">
                        <div className="flex justify-between items-center border-b pb-2">
                          <h4 className="font-bold text-sm text-[#0f2d59]">
                            {selectedRegAbstract.teamName} ({selectedRegAbstract.submissionId})
                          </h4>
                          <button
                            onClick={() => setSelectedRegAbstract(null)}
                            className="text-slate-400 hover:text-slate-700 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="font-bold text-slate-700 block">Leader:</span>
                            <p>{selectedRegAbstract.leaderName} • {selectedRegAbstract.leaderCollege} • {selectedRegAbstract.leaderPhone}</p>
                          </div>
                          <div>
                            <span className="font-bold text-slate-700 block">Members:</span>
                            <ul className="list-disc pl-4 text-slate-600">
                              {(selectedRegAbstract.members || []).map((m, i) => (
                                <li key={i}>{m.name} ({m.email || 'N/A'})</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="font-bold text-slate-700 block">Abstract:</span>
                            <p className="bg-slate-50 p-2.5 rounded-lg border text-slate-700 leading-relaxed max-h-40 overflow-y-auto">
                              {selectedRegAbstract.abstract || "No abstract provided."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: PS TELEMETRY & REGISTRATIONS COUNT */}
              {adminTab === 'telemetry' && (
                <div className="space-y-4">
                  {/* Header / Intro Card */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
                        </span>
                        <h4 className="font-bold text-[#0f2d59] text-sm">
                          PS Telemetry & Registrations Count (12 Challenges)
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Manually update squad registrations & participant headcounts per Problem Statement. Synced live to Firestore (<code className="bg-slate-200 px-1 py-0.5 rounded text-blue-900 font-mono">telemetry/problem_statements</code>) with local storage cache fallback.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={handleSavePsMetrics}
                        disabled={isSavingPsTelemetry}
                        className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer disabled:opacity-50"
                      >
                        {isSavingPsTelemetry ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : psTelemetrySaveSuccess ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Save className="w-3.5 h-3.5" />
                        )}
                        <span>{isSavingPsTelemetry ? 'Saving to Cloud...' : psTelemetrySaveSuccess ? 'Saved to Cloud!' : 'Save PS Metrics'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Live KPI Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-blue-50/70 border border-blue-200/80 p-3 rounded-xl text-center">
                      <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">
                        Total Teams Sum
                      </span>
                      <div className="text-xl font-black font-mono text-[#0f2d59] mt-0.5">
                        {psDraftTotals.teams}
                      </div>
                      <span className="text-[10px] text-slate-500">Across 12 Challenges</span>
                    </div>

                    <div className="bg-cyan-50/70 border border-cyan-200/80 p-3 rounded-xl text-center">
                      <span className="text-[10px] font-bold text-cyan-800 uppercase tracking-wider block">
                        Total Participants Sum
                      </span>
                      <div className="text-xl font-black font-mono text-[#0f2d59] mt-0.5">
                        {psDraftTotals.participants}
                      </div>
                      <span className="text-[10px] text-slate-500">Technocrats / Students</span>
                    </div>

                    <div className="bg-emerald-50/70 border border-emerald-200/80 p-3 rounded-xl text-center">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                        Average Squad Size
                      </span>
                      <div className="text-xl font-black font-mono text-[#0f2d59] mt-0.5">
                        {psDraftTotals.teams > 0 ? (psDraftTotals.participants / psDraftTotals.teams).toFixed(1) : '0.0'}
                      </div>
                      <span className="text-[10px] text-slate-500">Students / Squad</span>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                        Global Recalculation
                      </span>
                      <span className="text-xs font-semibold text-emerald-700 mt-1 flex items-center justify-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        {adminDraft.useManualGlobalOverride ? 'Manual Banner Override' : 'Auto-Recalculate (Active)'}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {adminDraft.useManualGlobalOverride ? 'Using custom inputs' : 'Total = Sum of 12 PS'}
                      </span>
                    </div>
                  </div>

                  {/* Quick Action Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-3 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                        <Sliders className="w-3.5 h-3.5 text-blue-600" />
                        <span>Quick Actions:</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuickMultiplyAll(4)}
                        className="px-2.5 py-1 text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 transition cursor-pointer flex items-center gap-1"
                        title="Auto-fill all participants as teams × 4"
                      >
                        <Sparkles className="w-3 h-3 text-blue-600" />
                        <span>Quick Multiply (Teams × 4)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickMultiplyAll(3)}
                        className="px-2.5 py-1 text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 transition cursor-pointer"
                        title="Auto-fill all participants as teams × 3"
                      >
                        <span>Quick Multiply (Teams × 3)</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleResetToBaseline}
                        className="px-2.5 py-1 text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 transition cursor-pointer flex items-center gap-1"
                        title="Reset all 12 PS to baseline (28 teams, 112 participants)"
                      >
                        <RefreshCw className="w-3 h-3 text-slate-500" />
                        <span>Reset Baseline (28/112)</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={!!adminDraft.useManualGlobalOverride}
                          onChange={(e) => setAdminDraft({ ...adminDraft, useManualGlobalOverride: e.target.checked })}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-[11px] font-medium">Manual Global Banner Override</span>
                      </label>
                    </div>
                  </div>

                  {/* Compact Table of 12 Problem Statements */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                            <th className="py-2.5 px-3 w-16 text-center">PS Code</th>
                            <th className="py-2.5 px-3">Problem Statement & Domain</th>
                            <th className="py-2.5 px-3 text-center w-28">Teams Registered</th>
                            <th className="py-2.5 px-3 text-center w-32">Total Participants</th>
                            <th className="py-2.5 px-3 text-center w-36">Quick Multiply & Ratio</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {(content.problemStatements || OFFICIAL_PROBLEM_STATEMENTS).map((ps) => {
                            const current = getPsMetrics(psTelemetryDraft, ps.id);
                            const teamsVal = current.teams !== undefined ? current.teams : 0;
                            const participantsVal = current.participants !== undefined ? current.participants : 0;
                            const ratio = teamsVal > 0 ? (participantsVal / teamsVal).toFixed(1) : '0';

                            return (
                              <tr key={ps.id} className="hover:bg-blue-50/30 transition">
                                <td className="py-2.5 px-3 text-center font-mono">
                                  <span className="font-bold text-[#0f2d59] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-[11px]">
                                    {ps.id}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                                    {ps.category || ps.domain}
                                  </span>
                                  <span className="font-semibold text-slate-900 text-xs block leading-snug">
                                    {ps.title}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 text-center">
                                  <input
                                    type="number"
                                    min="0"
                                    value={teamsVal}
                                    onChange={(e) => handleUpdatePsDraft(ps.id, 'teams', e.target.value)}
                                    className="w-20 px-2 py-1 text-xs font-mono font-bold text-center border border-slate-300 rounded-lg bg-white text-[#0f2d59] focus:outline-none focus:ring-1 focus:ring-blue-900"
                                  />
                                </td>
                                <td className="py-2.5 px-3 text-center">
                                  <input
                                    type="number"
                                    min="0"
                                    value={participantsVal}
                                    onChange={(e) => handleUpdatePsDraft(ps.id, 'participants', e.target.value)}
                                    className="w-24 px-2 py-1 text-xs font-mono font-bold text-center border border-slate-300 rounded-lg bg-white text-[#0f2d59] focus:outline-none focus:ring-1 focus:ring-blue-900"
                                  />
                                </td>
                                <td className="py-2.5 px-3 text-center">
                                  <div className="flex items-center justify-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => handleMultiplyRow(ps.id, 4)}
                                      className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded cursor-pointer transition"
                                      title="Auto-fill participants as teams × 4"
                                    >
                                      ×4
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleMultiplyRow(ps.id, 3)}
                                      className="px-2 py-0.5 text-[10px] font-bold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded cursor-pointer transition"
                                      title="Auto-fill participants as teams × 3"
                                    >
                                      ×3
                                    </button>
                                    <span className="text-[10px] font-mono text-slate-400 min-w-[36px] text-right">
                                      {ratio}/sq
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot>
                          <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 text-slate-800">
                            <td colSpan={2} className="py-3 px-4 text-right uppercase tracking-wider text-[11px] text-slate-600">
                              Sum Totals (All 12 PS):
                            </td>
                            <td className="py-3 px-3 text-center font-mono text-sm text-blue-900 font-black">
                              {psDraftTotals.teams} Teams
                            </td>
                            <td className="py-3 px-3 text-center font-mono text-sm text-cyan-900 font-black">
                              {psDraftTotals.participants} Part.
                            </td>
                            <td className="py-3 px-3 text-center">
                              <button
                                type="button"
                                onClick={handleSavePsMetrics}
                                disabled={isSavingPsTelemetry}
                                className="px-3 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded font-bold text-xs shadow-sm transition cursor-pointer disabled:opacity-50"
                              >
                                Save Metrics
                              </button>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>

                  {/* Bottom Prominent Save Banner */}
                  <div className="bg-slate-900 text-white p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
                    <div>
                      <h5 className="font-bold text-sm text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Commit PS Telemetry to Cloud Database</span>
                      </h5>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Immediately publishes these numbers to Firestore (<code className="text-amber-300 font-mono">telemetry/problem_statements</code>) and refreshes cards & stats strips in real-time.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleSavePsMetrics}
                        disabled={isSavingPsTelemetry}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs flex items-center gap-2 shadow-lg transition cursor-pointer disabled:opacity-50"
                      >
                        {isSavingPsTelemetry ? (
                          <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        ) : psTelemetrySaveSuccess ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-amber-300" />
                        )}
                        <span>{isSavingPsTelemetry ? 'Saving to Database...' : psTelemetrySaveSuccess ? 'Saved to Cloud!' : 'Save PS Metrics'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: TEASER VIDEO SETTINGS */}
              {adminTab === 'teaser' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-900 text-amber-300 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Video className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0f2d59] text-sm">
                          Teaser Video Settings & Playback Controller
                        </h4>
                        <p className="text-[11px] text-slate-600">
                          Directly manage the promo video source and thumbnail poster for the landing page teaser section.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSaveTeaserSettings}
                        disabled={isSavingTeaser}
                        className="px-4 py-2 bg-[#0f2d59] hover:bg-blue-950 text-amber-300 font-bold rounded-xl text-xs shadow transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                      >
                        {isSavingTeaser ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-amber-300 border-t-transparent rounded-full animate-spin" />
                            <span>Saving Video Settings...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Save Video Settings</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {teaserSaveSuccess && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Settings saved to Cloud Database (<code>site_config/teaser</code>) and synced to the landing page in real time!</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Left Column: Form Inputs */}
                    <div className="space-y-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Teaser Video URL
                        </label>
                        <input
                          type="text"
                          value={teaserDraft.videoUrl}
                          onChange={(e) => setTeaserDraft(prev => ({ ...prev, videoUrl: e.target.value }))}
                          placeholder="/promo-video.mp4 or https://www.youtube.com/watch?v=..."
                          className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 bg-slate-50/50"
                        />
                        <p className="text-[10px] text-slate-500 mt-1">
                          Accepts hosted <code>.mp4</code>/<code>.webm</code> URL, relative path (e.g. <code>/promo-video.mp4</code>), or YouTube watch/embed link.
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          <span className="text-[10px] text-slate-400 font-medium">Quick Presets:</span>
                          <button
                            type="button"
                            onClick={() => setTeaserDraft(prev => ({ ...prev, videoUrl: '/promo-video.mp4' }))}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition cursor-pointer"
                          >
                            Default /promo-video.mp4
                          </button>
                          <button
                            type="button"
                            onClick={() => setTeaserDraft(prev => ({ ...prev, videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }))}
                            className="text-[10px] px-2 py-0.5 rounded bg-red-50 hover:bg-red-100 text-red-700 font-medium transition cursor-pointer"
                          >
                            Sample YouTube Video
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Video Thumbnail / Poster URL
                        </label>
                        <input
                          type="text"
                          value={teaserDraft.posterUrl}
                          onChange={(e) => setTeaserDraft(prev => ({ ...prev, posterUrl: e.target.value }))}
                          placeholder="/campus-bg.jpg or https://..."
                          className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 bg-slate-50/50"
                        />
                        <p className="text-[10px] text-slate-500 mt-1">
                          Optional image displayed as the poster before video playback begins.
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          <span className="text-[10px] text-slate-400 font-medium">Quick Presets:</span>
                          <button
                            type="button"
                            onClick={() => setTeaserDraft(prev => ({ ...prev, posterUrl: '/campus-bg.jpg' }))}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition cursor-pointer"
                          >
                            Campus Background (/campus-bg.jpg)
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setTeaserDraft({ videoUrl: '/promo-video.mp4', posterUrl: '/campus-bg.jpg' })}
                          className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                        >
                          Reset to Defaults
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveTeaserSettings}
                          disabled={isSavingTeaser}
                          className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-[#0f2d59] font-bold rounded-xl text-xs shadow transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                        >
                          {isSavingTeaser ? "Saving..." : "Save Video Settings"}
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Live Video & Thumbnail Preview */}
                    <div className="space-y-3 bg-slate-900 text-white p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-xs text-amber-300 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" /> Live Preview
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/60 border border-blue-400/30 text-blue-200">
                            {getYouTubeEmbedUrl(teaserDraft.videoUrl) ? 'YouTube Embed' : 'Direct Video Stream'}
                          </span>
                        </div>

                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-800 flex items-center justify-center">
                          {getYouTubeEmbedUrl(teaserDraft.videoUrl) ? (
                            <iframe
                              src={getYouTubeEmbedUrl(teaserDraft.videoUrl)}
                              title="Teaser Admin Preview"
                              className="w-full h-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <video
                              key={teaserDraft.videoUrl}
                              src={teaserDraft.videoUrl || '/promo-video.mp4'}
                              poster={teaserDraft.posterUrl || '/campus-bg.jpg'}
                              controls
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </div>

                      <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800/80 space-y-1">
                        <p><strong className="text-slate-300">Active URL:</strong> <span className="font-mono text-amber-200 truncate inline-block max-w-[240px] align-bottom">{teaserDraft.videoUrl || '(none)'}</span></p>
                        <p><strong className="text-slate-300">Poster:</strong> <span className="font-mono text-slate-400 truncate inline-block max-w-[240px] align-bottom">{teaserDraft.posterUrl || '(none)'}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 1: GENERAL LINKS & DATES */}
              {adminTab === 'general' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <h4 className="font-bold text-[#0f2d59] text-xs uppercase tracking-wider">Event Details & Dates</h4>
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

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <h4 className="font-bold text-[#0f2d59] text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                      Google Forms Workflows Configuration
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Main Squad Registration Google Form URL
                        </label>
                        <input
                          type="text"
                          value={adminDraft.googleFormRegistrationUrl || DEFAULT_GOOGLE_FORM_REGISTRATION_URL}
                          onChange={(e) => setAdminDraft({ ...adminDraft, googleFormRegistrationUrl: e.target.value })}
                          className="w-full border rounded p-2 bg-white text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Problem Statement Selection / Submission Google Form URL
                        </label>
                        <input
                          type="text"
                          value={adminDraft.googleFormPsSelectionUrl || DEFAULT_GOOGLE_FORM_PS_SELECTION_URL}
                          onChange={(e) => setAdminDraft({ ...adminDraft, googleFormPsSelectionUrl: e.target.value })}
                          className="w-full border rounded p-2 bg-white text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: NASA-STYLE IMAGE GALLERY MANAGER */}
              {adminTab === 'gallery' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-[#0f2d59] text-xs uppercase tracking-wider">
                      Image Gallery Manager (NASA-Style Grid)
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Add new photos and manage existing images displayed in the clean NASA photo grid.
                    </p>
                  </div>

                  {/* Add New Photo Form */}
                  <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200/80 space-y-3">
                    <h5 className="font-bold text-xs text-[#0f2d59] flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-blue-700" />
                      Add Photo to Gallery
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Image URL / Path <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. /gallery/1.jpg or https://images.unsplash.com/..."
                          value={newPhotoUrl}
                          onChange={(e) => setNewPhotoUrl(e.target.value)}
                          className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs font-mono focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Caption / Title
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Grand Valedictory Felicitation"
                          value={newPhotoTitle}
                          onChange={(e) => setNewPhotoTitle(e.target.value)}
                          className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (!newPhotoUrl.trim()) {
                            alert("Please enter an Image URL or path (e.g. /gallery/1.jpg).");
                            return;
                          }
                          const current = adminDraft.gallery || currentGallery;
                          const newEntry = {
                            id: Date.now(),
                            src: newPhotoUrl.trim(),
                            url: newPhotoUrl.trim(),
                            title: newPhotoTitle.trim() || "Hackathon Moment",
                            caption: newPhotoTitle.trim() || "Campus Hackathon Moment"
                          };
                          setAdminDraft({ ...adminDraft, gallery: [...current, newEntry] });
                          setNewPhotoUrl('');
                          setNewPhotoTitle('');
                        }}
                        className="inline-flex items-center gap-1.5 bg-[#0f2d59] hover:bg-blue-900 text-amber-300 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Photo
                      </button>
                    </div>
                  </div>

                  {/* Existing Photos List & Management */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-xs text-slate-700">
                        Current Gallery Photos ({(adminDraft.gallery || currentGallery).length})
                      </h5>
                      <span className="text-[11px] text-slate-500">
                        Click "Save & Apply Changes Live" below to persist changes to Cloud Firestore
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                      {(adminDraft.gallery || currentGallery).map((pic, idx) => (
                        <div
                          key={pic.id || idx}
                          className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3 hover:border-slate-300 transition"
                        >
                          <img
                            src={pic.url || pic.src}
                            alt={pic.title || "Photo"}
                            className="w-16 h-12 rounded-lg object-cover bg-slate-900 border border-slate-200 flex-shrink-0"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "/campus-bg.jpg";
                            }}
                          />
                          <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <input
                                type="text"
                                value={pic.title || pic.caption || ''}
                                placeholder="Caption / Title"
                                onChange={(e) => {
                                  const list = [...(adminDraft.gallery || currentGallery)];
                                  list[idx] = { ...list[idx], title: e.target.value, caption: e.target.value };
                                  setAdminDraft({ ...adminDraft, gallery: list });
                                }}
                                className="w-full border border-slate-200 rounded p-1.5 bg-slate-50 text-xs font-semibold text-slate-800"
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                value={pic.url || pic.src || ''}
                                placeholder="Image URL / Path"
                                onChange={(e) => {
                                  const list = [...(adminDraft.gallery || currentGallery)];
                                  list[idx] = { ...list[idx], url: e.target.value, src: e.target.value };
                                  setAdminDraft({ ...adminDraft, gallery: list });
                                }}
                                className="w-full border border-slate-200 rounded p-1.5 bg-slate-50 text-xs font-mono text-slate-600"
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (adminDraft.gallery || currentGallery).filter((_, i) => i !== idx);
                              setAdminDraft({ ...adminDraft, gallery: updated });
                            }}
                            className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer transition flex-shrink-0"
                            title="Delete Photo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ABOUT SECTION */}
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
                </div>
              )}

              {/* TAB 1: EVENT FLOW & KEY MILESTONES */}
              {adminTab === 'flow' && (
                <div className="space-y-6">
                  {/* Sub-section 1: Milestones & Key Deadlines */}
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                      <div>
                        <h4 className="font-bold text-[#0f2d59] text-sm flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-700" />
                          <span>Event Milestones & Key Deadlines ({adminDraft.datesSchedule?.length || 0})</span>
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Configure deadlines, active phases, and descriptions shown in the public Event Milestones table.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [
                            ...(adminDraft.datesSchedule || []),
                            {
                              id: `m-${Date.now()}`,
                              label: "New Milestone",
                              date: "28 September 2026",
                              status: "Upcoming",
                              desc: "Milestone description and candidate instructions..."
                            }
                          ];
                          setAdminDraft({ ...adminDraft, datesSchedule: updated });
                        }}
                        className="inline-flex items-center gap-1.5 bg-[#0f2d59] hover:bg-blue-950 text-amber-300 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow cursor-pointer self-start sm:self-auto"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Milestone</span>
                      </button>
                    </div>

                    <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                      {(adminDraft.datesSchedule || []).map((item, idx) => (
                        <div key={item.id || idx} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2.5 hover:border-slate-300 transition">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-xs bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                                #{idx + 1}
                              </span>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={() => moveMilestone(idx, -1)}
                                  className="p-1 rounded hover:bg-slate-100 text-slate-500 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                                  title="Move Up"
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === (adminDraft.datesSchedule || []).length - 1}
                                  onClick={() => moveMilestone(idx, 1)}
                                  className="p-1 rounded hover:bg-slate-100 text-slate-500 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                                  title="Move Down"
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <select
                                value={item.status || "Upcoming"}
                                onChange={(e) => {
                                  const up = [...adminDraft.datesSchedule];
                                  up[idx].status = e.target.value;
                                  setAdminDraft({ ...adminDraft, datesSchedule: up });
                                }}
                                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                                  item.status === 'Completed' ? 'bg-slate-100 text-slate-600 border-slate-200' :
                                  (item.status === 'Active' || item.status === 'In Progress') ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                                  'bg-blue-50 text-blue-800 border-blue-200'
                                }`}
                              >
                                <option value="Completed">Completed</option>
                                <option value="Active">Active / In Progress</option>
                                <option value="Upcoming">Upcoming</option>
                              </select>

                              <button
                                type="button"
                                onClick={() => {
                                  const up = adminDraft.datesSchedule.filter((_, i) => i !== idx);
                                  setAdminDraft({ ...adminDraft, datesSchedule: up });
                                }}
                                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer transition"
                                title="Delete Milestone"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Milestone Label / Title</label>
                              <input
                                type="text"
                                value={item.label}
                                onChange={(e) => {
                                  const up = [...adminDraft.datesSchedule];
                                  up[idx].label = e.target.value;
                                  setAdminDraft({ ...adminDraft, datesSchedule: up });
                                }}
                                placeholder="e.g. Registration Closes"
                                className="w-full border rounded-lg p-2 bg-slate-50 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Date & Time Tag</label>
                              <input
                                type="text"
                                value={item.date}
                                onChange={(e) => {
                                  const up = [...adminDraft.datesSchedule];
                                  up[idx].date = e.target.value;
                                  setAdminDraft({ ...adminDraft, datesSchedule: up });
                                }}
                                placeholder="e.g. 25 September 2026, 11:59 PM"
                                className="w-full border rounded-lg p-2 bg-slate-50 text-xs font-semibold text-[#0f2d59] focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Brief Description / Instructions</label>
                            <input
                              type="text"
                              value={item.desc || ""}
                              onChange={(e) => {
                                const up = [...adminDraft.datesSchedule];
                                up[idx].desc = e.target.value;
                                setAdminDraft({ ...adminDraft, datesSchedule: up });
                              }}
                              placeholder="e.g. Online portal locks for squad submissions."
                              className="w-full border rounded-lg p-2 bg-slate-50 text-xs text-slate-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sub-section 2: High-Level Event Stages & Progression */}
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                      <div>
                        <h4 className="font-bold text-[#0f2d59] text-sm flex items-center gap-2">
                          <Sliders className="w-4 h-4 text-blue-700" />
                          <span>High-Level Event Stages ({adminDraft.eventFlow?.length || 0})</span>
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Configure the multi-stage progression shown on the left of the Timeline section.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [
                            ...(adminDraft.eventFlow || []),
                            { stage: `Stage ${(adminDraft.eventFlow?.length || 0) + 1}`, title: "New Stage Title", desc: "Stage scope description..." }
                          ];
                          setAdminDraft({ ...adminDraft, eventFlow: updated });
                        }}
                        className="inline-flex items-center gap-1.5 bg-[#0f2d59] hover:bg-blue-950 text-amber-300 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow cursor-pointer self-start sm:self-auto"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Stage</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(adminDraft.eventFlow || []).map((stage, idx) => (
                        <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2 hover:border-slate-300 transition">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => moveEventFlowItem(idx, -1)}
                                className="p-1 rounded hover:bg-slate-100 text-slate-500 disabled:opacity-30 cursor-pointer"
                                title="Move Up"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                disabled={idx === (adminDraft.eventFlow || []).length - 1}
                                onClick={() => moveEventFlowItem(idx, 1)}
                                className="p-1 rounded hover:bg-slate-100 text-slate-500 disabled:opacity-30 cursor-pointer"
                                title="Move Down"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={stage.stage}
                              onChange={(e) => {
                                const updated = [...adminDraft.eventFlow];
                                updated[idx].stage = e.target.value;
                                setAdminDraft({ ...adminDraft, eventFlow: updated });
                              }}
                              className="w-28 font-bold font-mono text-xs border rounded-lg p-1.5 bg-slate-50"
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
                              className="flex-1 font-bold text-xs border rounded-lg p-1.5 text-[#0f2d59] bg-slate-50"
                              placeholder="Title..."
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = adminDraft.eventFlow.filter((_, i) => i !== idx);
                                setAdminDraft({ ...adminDraft, eventFlow: updated });
                              }}
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer transition"
                              title="Delete Stage"
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
                            className="w-full border rounded-lg p-2 text-xs text-slate-700 bg-slate-50"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: 24H SPRINT SCHEDULE (HOUR-BY-HOUR) */}
              {adminTab === 'schedule' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                      <div>
                        <h4 className="font-bold text-[#0f2d59] text-sm flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-700" />
                          <span>24h Sprint Schedule: Hour-by-Hour Timeline ({adminDraft.hackathonRoadmap?.length || 0} Slots)</span>
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Manage the on-ground minute-by-minute itinerary, venues, checkpoints, and deliverables across Day 1 & Day 2.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [
                            ...(adminDraft.hackathonRoadmap || []),
                            {
                              id: `s-${Date.now()}`,
                              time: "Day 1 - 01:00 PM",
                              title: "Lunch & Networking Break",
                              venue: "Dining Hall",
                              actionItem: "Refreshment",
                              desc: "Lunch served to all participants; informal discussions with tech mentors."
                            }
                          ];
                          setAdminDraft({ ...adminDraft, hackathonRoadmap: updated });
                        }}
                        className="inline-flex items-center gap-1.5 bg-[#0f2d59] hover:bg-blue-950 text-amber-300 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow cursor-pointer self-start sm:self-auto"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Schedule Slot</span>
                      </button>
                    </div>

                    <div className="space-y-3.5 max-h-[520px] overflow-y-auto pr-1">
                      {(adminDraft.hackathonRoadmap || []).map((slot, idx) => (
                        <div key={slot.id || idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3 hover:border-slate-300 transition">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-xs bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-lg border border-amber-200">
                                Slot #{idx + 1}
                              </span>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={() => moveRoadmapItem(idx, -1)}
                                  className="p-1 rounded hover:bg-slate-100 text-slate-500 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                                  title="Move Up"
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === (adminDraft.hackathonRoadmap || []).length - 1}
                                  onClick={() => moveRoadmapItem(idx, 1)}
                                  className="p-1 rounded hover:bg-slate-100 text-slate-500 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                                  title="Move Down"
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                const up = adminDraft.hackathonRoadmap.filter((_, i) => i !== idx);
                                setAdminDraft({ ...adminDraft, hackathonRoadmap: up });
                              }}
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer transition"
                              title="Delete Schedule Slot"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Time Slot</label>
                              <input
                                type="text"
                                value={slot.time}
                                onChange={(e) => {
                                  const up = [...adminDraft.hackathonRoadmap];
                                  up[idx].time = e.target.value;
                                  setAdminDraft({ ...adminDraft, hackathonRoadmap: up });
                                }}
                                placeholder="Day 1 - 08:30 AM"
                                className="w-full border rounded-lg p-2 bg-slate-50 text-xs font-mono font-bold text-amber-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Activity Name</label>
                              <input
                                type="text"
                                value={slot.title}
                                onChange={(e) => {
                                  const up = [...adminDraft.hackathonRoadmap];
                                  up[idx].title = e.target.value;
                                  setAdminDraft({ ...adminDraft, hackathonRoadmap: up });
                                }}
                                placeholder="Reporting & Verification"
                                className="w-full border rounded-lg p-2 bg-slate-50 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Venue / Lab</label>
                              <input
                                type="text"
                                value={slot.venue || ""}
                                onChange={(e) => {
                                  const up = [...adminDraft.hackathonRoadmap];
                                  up[idx].venue = e.target.value;
                                  setAdminDraft({ ...adminDraft, hackathonRoadmap: up });
                                }}
                                placeholder="NIIS Innovation Labs"
                                className="w-full border rounded-lg p-2 bg-slate-50 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Action Item / Badge</label>
                              <input
                                type="text"
                                value={slot.actionItem || ""}
                                onChange={(e) => {
                                  const up = [...adminDraft.hackathonRoadmap];
                                  up[idx].actionItem = e.target.value;
                                  setAdminDraft({ ...adminDraft, hackathonRoadmap: up });
                                }}
                                placeholder="Kit & ID Check"
                                className="w-full border rounded-lg p-2 bg-slate-50 text-xs font-semibold text-blue-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Description & Deliverables</label>
                            <textarea
                              rows={2}
                              value={slot.desc}
                              onChange={(e) => {
                                const up = [...adminDraft.hackathonRoadmap];
                                up[idx].desc = e.target.value;
                                setAdminDraft({ ...adminDraft, hackathonRoadmap: up });
                              }}
                              placeholder="Detailed notes on what squads and mentors should do during this interval..."
                              className="w-full border rounded-lg p-2 text-xs text-slate-700 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900 leading-relaxed"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: PROBLEM STATEMENTS (4 CATEGORIES, 12 PS) */}
              {adminTab === 'tracks' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#0f2d59] text-xs uppercase tracking-wider">
                        Problem Statements CMS ({adminDraft.problemStatements?.length || 0} Total Challenges)
                      </h4>
                      <p className="text-[11px] text-slate-500">Edit titles, 4 flagship categories, technical scope, and optional custom PDF briefs.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newTrack = {
                          id: `NIIS-PS${String((adminDraft.problemStatements?.length || 0) + 1).padStart(2, '0')}`,
                          category: "AI & Intelligent Systems",
                          difficulty: "Medium",
                          title: "New Custom Problem Statement",
                          shortDesc: "Concise summary of the challenge...",
                          fullBrief: "Detailed technical scope, architecture guidelines, and deliverable...",
                          pdfUrl: ""
                        };
                        setAdminDraft({ ...adminDraft, problemStatements: [...(adminDraft.problemStatements || []), newTrack] });
                      }}
                      className="inline-flex items-center gap-1.5 bg-[#0f2d59] hover:bg-blue-950 text-amber-300 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Challenge
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(adminDraft.problemStatements || []).map((ps, idx) => (
                      <div key={ps.id || idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
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
                              placeholder="NIIS-PS01"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={ps.difficulty || "Medium"}
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
                              title="Delete Problem Statement"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Category Domain</label>
                            <select
                              value={ps.category || ps.domain || "AI & Intelligent Systems"}
                              onChange={(e) => {
                                const up = [...adminDraft.problemStatements];
                                up[idx].category = e.target.value;
                                up[idx].domain = e.target.value;
                                setAdminDraft({ ...adminDraft, problemStatements: up });
                              }}
                              className="w-full border rounded p-1.5 bg-white text-xs font-semibold"
                            >
                              <option value="AI & Intelligent Systems">AI & Intelligent Systems</option>
                              <option value="Web3, FinTech & Enterprise Solutions">Web3, FinTech & Enterprise Solutions</option>
                              <option value="HealthTech, Smart IoT & Sustainability">HealthTech, Smart IoT & Sustainability</option>
                              <option value="Cybersecurity & Open Societal Innovation">Cybersecurity & Open Societal Innovation</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Custom Brief PDF URL (Optional)</label>
                            <input
                              type="text"
                              placeholder="Leave blank for auto-generated PDF brief"
                              value={ps.pdfUrl || ""}
                              onChange={(e) => {
                                const up = [...adminDraft.problemStatements];
                                up[idx].pdfUrl = e.target.value;
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
                          <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Executive Summary (Short)</label>
                          <input
                            type="text"
                            value={ps.shortDesc || ""}
                            onChange={(e) => {
                              const up = [...adminDraft.problemStatements];
                              up[idx].shortDesc = e.target.value;
                              setAdminDraft({ ...adminDraft, problemStatements: up });
                            }}
                            className="w-full border rounded p-1.5 bg-white text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Full Technical Scope & Deliverables</label>
                          <textarea
                            rows={3}
                            value={ps.fullBrief || ps.fullDesc || ""}
                            onChange={(e) => {
                              const up = [...adminDraft.problemStatements];
                              up[idx].fullBrief = e.target.value;
                              up[idx].fullDesc = e.target.value;
                              setAdminDraft({ ...adminDraft, problemStatements: up });
                            }}
                            className="w-full border rounded p-2 bg-white text-xs leading-relaxed"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: PRIZES & PERKS (ACCURATE ₹35,000 STRUCTURE) */}
              {adminTab === 'prizes' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-[#0f2d59] text-xs uppercase tracking-wider">
                          Prizes, Medals & Reward Perks (Verified Pool)
                        </h4>
                        <p className="text-[11px] text-slate-500">Total Bounty: ₹35,000 Cash Pool</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [
                            ...adminDraft.prizes,
                            { rank: "Special Recognition", amount: "₹3,000", perk: "Trophy + Certificates + Goodies" }
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
                            placeholder="₹20,000"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const up = adminDraft.prizes.filter((_, i) => i !== idx);
                              setAdminDraft({ ...adminDraft, prizes: up });
                            }}
                            className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div>
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

              {/* TAB 3: GUIDELINES & ELIGIBILITY RULES */}
              {adminTab === 'guidelines' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                      <div>
                        <h4 className="font-bold text-[#0f2d59] text-sm flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-blue-700" />
                          <span>Hackathon Guidelines & Rules ({adminDraft.rulesList?.length || 0} Categories)</span>
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Create, categorize, edit, and reorder institutional eligibility, code ethics, and conduct rules.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [
                            ...(adminDraft.rulesList || []),
                            {
                              id: `r-${Date.now()}`,
                              category: "Team Rules",
                              title: "New Rule Category",
                              points: [
                                "First guideline or requirement point for participants.",
                                "Second rule or compliance requirement."
                              ]
                            }
                          ];
                          setAdminDraft({ ...adminDraft, rulesList: updated });
                        }}
                        className="inline-flex items-center gap-1.5 bg-[#0f2d59] hover:bg-blue-950 text-amber-300 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow cursor-pointer self-start sm:self-auto"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Rule Card</span>
                      </button>
                    </div>

                    <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
                      {(adminDraft.rulesList || []).map((rule, idx) => {
                        const pointsString = Array.isArray(rule.points)
                          ? rule.points.join('\n')
                          : (rule.points || '');

                        return (
                          <div key={rule.id || idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3 hover:border-slate-300 transition">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-xs bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-lg border border-blue-200">
                                  Rule #{idx + 1}
                                </span>
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    disabled={idx === 0}
                                    onClick={() => moveRuleItem(idx, -1)}
                                    className="p-1 rounded hover:bg-slate-100 text-slate-500 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                                    title="Move Up"
                                  >
                                    <ArrowUp className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={idx === (adminDraft.rulesList || []).length - 1}
                                    onClick={() => moveRuleItem(idx, 1)}
                                    className="p-1 rounded hover:bg-slate-100 text-slate-500 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                                    title="Move Down"
                                  >
                                    <ArrowDown className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  const up = adminDraft.rulesList.filter((_, i) => i !== idx);
                                  setAdminDraft({ ...adminDraft, rulesList: up });
                                }}
                                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer transition"
                                title="Delete Rule Card"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Rule Category</label>
                                <select
                                  value={rule.category || "Team Rules"}
                                  onChange={(e) => {
                                    const up = [...adminDraft.rulesList];
                                    up[idx].category = e.target.value;
                                    setAdminDraft({ ...adminDraft, rulesList: up });
                                  }}
                                  className="w-full border rounded-lg p-2 bg-slate-50 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                                >
                                  <option value="Team Rules">Team Rules</option>
                                  <option value="Hardware/Software Rules">Hardware/Software Rules</option>
                                  <option value="Submission Deliverables">Submission Deliverables</option>
                                  <option value="Code of Conduct">Code of Conduct</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Rule Heading / Title</label>
                                <input
                                  type="text"
                                  value={rule.title}
                                  onChange={(e) => {
                                    const up = [...adminDraft.rulesList];
                                    up[idx].title = e.target.value;
                                    setAdminDraft({ ...adminDraft, rulesList: up });
                                  }}
                                  placeholder="e.g. Squad Eligibility & Composition"
                                  className="w-full border rounded-lg p-2 bg-slate-50 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                                />
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center justify-between mb-0.5">
                                <label className="block text-[11px] font-bold text-slate-700">Bullet Points / Requirements</label>
                                <span className="text-[10px] text-slate-400">One bullet point per line</span>
                              </div>
                              <textarea
                                rows={3}
                                value={pointsString}
                                onChange={(e) => {
                                  const up = [...adminDraft.rulesList];
                                  up[idx].points = e.target.value.split('\n');
                                  setAdminDraft({ ...adminDraft, rulesList: up });
                                }}
                                placeholder="Enter point 1&#10;Enter point 2&#10;Enter point 3"
                                className="w-full border rounded-lg p-2 text-xs text-slate-700 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900 leading-relaxed font-sans"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: BROCHURE & ASSET MANAGER */}
              {adminTab === 'brochure' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div className="border-b border-slate-200 pb-3">
                      <h4 className="font-bold text-[#0f2d59] text-sm flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-blue-700" />
                        <span>Official Event Brochure & Asset Controller</span>
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Manage the official event brochure PDF link, toggle public download buttons in the Hero & Guidelines sections, and test live downloads.
                      </p>
                    </div>

                    {/* Toggle: Enable / Disable Brochure Button */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
                      <div>
                        <h5 className="font-bold text-xs text-slate-900">
                          Display "Download Official Brochure" Button on Portal
                        </h5>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          When checked, the brochure download button appears prominently in the Hero CTA group and inside the Guidelines section.
                        </p>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={adminDraft.showBrochureButton !== false}
                          onChange={(e) => setAdminDraft({ ...adminDraft, showBrochureButton: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    {/* Brochure URL & File Uploader */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Brochure PDF Download URL / Relative File Path
                        </label>
                        <input
                          type="text"
                          value={adminDraft.rulebookUrl || "/brochure.pdf"}
                          onChange={(e) => setAdminDraft({ ...adminDraft, rulebookUrl: e.target.value })}
                          placeholder="/brochure.pdf or https://drive.google.com/..."
                          className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                        />
                        <p className="text-[10px] text-slate-500 mt-1">
                          You can link to an in-app file (e.g. <code>/brochure.pdf</code>) or any external hosted document (Google Drive, Cloud Storage, etc.).
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2 flex-wrap">
                          <input
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            id="brochure-pdf-upload"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const newPath = `/${file.name}`;
                                setAdminDraft({ ...adminDraft, rulebookUrl: newPath });
                                alert(`Selected PDF: "${file.name}". Brochure URL set to "${newPath}". Click "Save Changes to Portal" to publish live.`);
                              }
                            }}
                          />
                          <label
                            htmlFor="brochure-pdf-upload"
                            className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-[#0f2d59] border border-blue-200 rounded-lg text-xs font-bold cursor-pointer transition flex items-center gap-1.5"
                          >
                            <FileUp className="w-3.5 h-3.5 text-blue-700" />
                            <span>Select Local PDF File</span>
                          </label>

                          <button
                            type="button"
                            onClick={() => setAdminDraft({ ...adminDraft, rulebookUrl: "/brochure.pdf" })}
                            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition cursor-pointer"
                          >
                            Default (/brochure.pdf)
                          </button>
                        </div>

                        <a
                          href={adminDraft.rulebookUrl || "/brochure.pdf"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#0f2d59] hover:bg-blue-950 text-amber-300 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview Brochure in New Tab</span>
                          <ExternalLink className="w-3 h-3 text-amber-400" />
                        </a>
                      </div>
                    </div>

                    {/* Information preview banner */}
                    <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-3.5 text-xs text-slate-700 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-bold text-[#0f2d59]">Public Display Verification:</p>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          • Hero Section: Button labeled <strong>"Download Brochure"</strong> will be {adminDraft.showBrochureButton !== false ? <span className="text-emerald-700 font-bold">visible</span> : <span className="text-rose-600 font-bold">hidden</span>}.<br />
                          • Guidelines Section: Dedicated download card for <strong>"Download Official Event Rulebook"</strong> will be {adminDraft.showBrochureButton !== false ? <span className="text-emerald-700 font-bold">visible</span> : <span className="text-rose-600 font-bold">hidden</span>}.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: ORGANIZING COMMITTEE */}
              {adminTab === 'committee' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#0f2d59] text-xs uppercase tracking-wider">
                        Tech Club Faculty & Organizing Committee Leads
                      </h4>
                      <p className="text-[11px] text-slate-500">Each member appears in the unified committee carousel slider.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newMember = {
                          id: `cm_${Date.now()}`,
                          name: "New Faculty In-Charge",
                          role: "In-Charge Member, Tech Club",
                          category: "Faculty Core",
                          phone: "+91 94370 00000",
                          email: "contact@niis.edu.in",
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
                            className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
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
                              placeholder="/DSC00445.JPG.jpeg or image path"
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
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="px-3.5 py-2 border border-blue-900 bg-blue-50 text-blue-900 rounded-lg font-semibold flex items-center gap-1.5 hover:bg-blue-100 transition text-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON Backup</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetToDefaults}
                  className="px-3.5 py-2 border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg font-semibold flex items-center gap-1.5 transition text-xs cursor-pointer"
                  title="Reset all drafts to default institutional settings"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-rose-600" />
                  <span>Reset to Institutional Defaults</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
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
                    <>
                      <Save className="w-4 h-4 text-amber-300" />
                      <span>Save Changes to Portal</span>
                    </>
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