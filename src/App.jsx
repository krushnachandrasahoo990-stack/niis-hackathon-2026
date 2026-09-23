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
  ArrowRight, Laptop, Zap, Search,
  ChevronDown, Terminal, Globe, ShieldAlert,
  Flame, Coffee, Wifi,
  Play, Pause, Volume2, VolumeX, Image as ImageIcon,
  FileSpreadsheet, UserPlus, RefreshCw, CheckCircle, UserCheck, Video
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
          e.currentTarget.src = "/niis-logo.png";
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
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-medium shadow-sm transition hover:bg-slate-800 ${className}`}
    >
      <span className="relative flex h-2 w-2 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
      </span>
      <span className="font-mono font-black tracking-wider text-amber-300">KAUSHAL</span>
      <span className="text-slate-400 text-[11px] font-sans font-medium hidden sm:inline">
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
    tag: "36h Sprint",
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
   Schema: { id, title, category, difficulty, shortDesc, fullBrief, pdfUrl }
   ========================================================================= */
const OFFICIAL_PROBLEM_STATEMENTS = [
  // Category 1: AI & Intelligent Systems
  {
    id: "NIIS-PS01",
    title: "Automated Academic Performance & Placement Readiness Predictor",
    category: "AI & Intelligent Systems",
    difficulty: "Medium",
    shortDesc: "Predictive ML engine analyzing student course progression, assignment logs, and attendance to generate personalized skill roadmaps.",
    fullBrief: "Educational institutions struggle with early identification of students falling behind in technical proficiencies before campus placement season. Squads must build an ML pipeline that digests semester marks, attendance, and assignment metrics to calculate a live Placement Readiness Index with actionable roadmap recommendations.",
    pdfUrl: ""
  },
  {
    id: "NIIS-PS02",
    title: "Multilingual Conversational AI for Citizen Grievance Redressal",
    category: "AI & Intelligent Systems",
    difficulty: "Hard",
    shortDesc: "Voice-first conversational assistant supporting regional Indian dialects (Odia, Hindi, Bengali) for municipal citizen services.",
    fullBrief: "Citizen engagement portals in tier-2/tier-3 regions suffer from linguistic barriers, preventing non-English speakers from filing complaints. Squads must build a speech-to-text pipeline with regional dialect phonetic parsing, extract query intent, and route grievances automatically into categorized municipal tickets with live status updates.",
    pdfUrl: ""
  },
  {
    id: "NIIS-PS03",
    title: "Autonomous Vision-Based Campus Security & Traffic Monitoring",
    category: "AI & Intelligent Systems",
    difficulty: "Medium",
    shortDesc: "Edge computer-vision pipeline detecting unauthorized perimeter crossings, parking bottlenecks, and emergency vehicle lane clearance.",
    fullBrief: "Institutional campuses experience severe congestion during peak morning hours and lack automated alerts for restricted security zones. Teams must deploy lightweight object detection on camera streams, automate vehicle license-plate recognition (ANPR), and trigger instant push notifications for perimeter breaches.",
    pdfUrl: ""
  },

  // Category 2: Web3, FinTech & Enterprise Solutions
  {
    id: "NIIS-PS04",
    title: "Decentralized Micro-Invoicing & Cryptographic Audit Trail for MSMEs",
    category: "Web3, FinTech & Enterprise Solutions",
    difficulty: "Hard",
    shortDesc: "Multi-tenant ledger system validating GST invoices with cryptographic hashing to prevent duplicate factoring fraud.",
    fullBrief: "Micro, Small & Medium Enterprises (MSMEs) face severe working-capital bottlenecks due to delayed invoice settlement and invoice duplication scams. Develop a multi-tenant accounting platform providing tamper-proof cryptographic audit receipts, automated GST validation via mock APIs, and predictive cash-flow forecasting.",
    pdfUrl: ""
  },
  {
    id: "NIIS-PS05",
    title: "Zero-Knowledge Credit Scoring Engine for Unbanked Nano-Entrepreneurs",
    category: "Web3, FinTech & Enterprise Solutions",
    difficulty: "Hard",
    shortDesc: "Privacy-preserving credit evaluation model utilizing alternate digital footprints (UPI volumes, utility bills) without revealing raw finances.",
    fullBrief: "Informal street vendors and rural micro-entrepreneurs lack CIBIL history, excluding them from formal micro-credit lines. Build an alternative creditworthiness scoring model using transactional frequency and utility payments, backed by Zero-Knowledge Proof (ZKP) principles so applicants prove solvency without exposing private bank balances.",
    pdfUrl: ""
  },
  {
    id: "NIIS-PS06",
    title: "Autonomous Multi-Vendor Procurement & Supply Chain ERP",
    category: "Web3, FinTech & Enterprise Solutions",
    difficulty: "Medium",
    shortDesc: "Next-gen ERP automating purchase requisitions, comparative quotation ranking, and algorithmic inventory replenishment.",
    fullBrief: "Institutional procurement teams endure protracted manual workflows comparing vendor quotes, verifying delivery milestones, and managing inventory waste. Teams must construct an automated ERP system that ranks supplier bids on price, delivery latency, and compliance rating with automated purchase order generation.",
    pdfUrl: ""
  },

  // Category 3: HealthTech, Smart IoT & Sustainability
  {
    id: "NIIS-PS07",
    title: "Offline-First Tele-Triage & Emergency Bed Availability Mesh",
    category: "HealthTech, Smart IoT & Sustainability",
    difficulty: "Hard",
    shortDesc: "Resilient emergency healthcare network synchronizing hospital ICU bed occupancy and vital telemetry during network blackouts.",
    fullBrief: "During coastal cyclones and natural disasters in Odisha, telecom infrastructure collapse leaves rural health centers unable to route patients. Build an offline-first PWA storing clinical records in IndexedDB with peer-to-peer sync, providing rule-based emergency triage scoring and a dynamic hospital resource registry.",
    pdfUrl: ""
  },
  {
    id: "NIIS-PS08",
    title: "Smart Campus IoT Energy Footprint & Smart Grid Optimizer",
    category: "HealthTech, Smart IoT & Sustainability",
    difficulty: "Medium",
    shortDesc: "MQTT-based IoT network aggregating classroom electrical consumption with scheduled automated relay load-shedding.",
    fullBrief: "Educational institutions waste upwards of 25% electrical energy in unoccupied classrooms, laboratories, and server rooms. Ingest telemetry from simulated ESP32/NodeMCU sensor nodes via MQTT, correlate live classroom timetable schedules with occupancy sensors, and execute automated relay cutoffs.",
    pdfUrl: ""
  },
  {
    id: "NIIS-PS09",
    title: "Precision AgriTech: Crop Disease Diagnosis & Soil Moisture Telemetry",
    category: "HealthTech, Smart IoT & Sustainability",
    difficulty: "Medium",
    shortDesc: "On-device leaf disease detection model paired with IoT soil sensor telemetry for automated drip irrigation advisories.",
    fullBrief: "Smallholder farmers suffer catastrophic crop losses due to delayed diagnosis of leaf blight and inefficient groundwater consumption. Train a lightweight vision model detecting common crop diseases from camera photos, correlate with NPK and soil moisture telemetry, and calculate localized irrigation advisories.",
    pdfUrl: ""
  },

  // Category 4: Cybersecurity & Open Societal Innovation
  {
    id: "NIIS-PS10",
    title: "Cryptographic Circular Notary & Anti-Phishing Extension",
    category: "Cybersecurity & Open Societal Innovation",
    difficulty: "Medium",
    shortDesc: "Browser extension and document verification portal authenticating official university circulars via SHA-256 digital signatures.",
    fullBrief: "Doctored exam cancellation notices and fake fee concession circulars propagate rapidly on messaging platforms. Establish a cryptographic registrar hashing authorized circular PDFs at source and build a browser extension or upload tool that inspects documents for byte-level tampering.",
    pdfUrl: ""
  },
  {
    id: "NIIS-PS11",
    title: "Decentralized Disaster Evacuation & Relief Resource Tracker",
    category: "Cybersecurity & Open Societal Innovation",
    difficulty: "Hard",
    shortDesc: "Geo-spatial disaster management coordination system matching rescue shelters, food supply caches, and volunteer squads.",
    fullBrief: "During rapid flood inundations or extreme weather events, relief supplies get duplicated in easily accessible zones while marooned pockets starve. Squads must build a geo-spatial command portal pairing verified NGO supply shipments with shelter deficits, featuring offline SOS intake.",
    pdfUrl: ""
  },
  {
    id: "NIIS-PS12",
    title: "Open Innovation: Moonshot Prototype for Societal Impact",
    category: "Cybersecurity & Open Societal Innovation",
    difficulty: "Open",
    shortDesc: "Open-ended track for breakthrough MVP software or embedded hardware addressing critical regional, industrial, or educational bottlenecks.",
    fullBrief: "Have a unique, validated problem statement addressing an urgent societal, accessibility, environmental, or technological challenge? Teams are free to submit original MVP prototypes evaluated on innovation, technical depth, and scalability with a 5-minute technical pitch deck.",
    pdfUrl: ""
  }
];

/**
 * Generates and downloads a clean, formatted PDF problem brief for students without third-party dependencies.
 */
function handleDownloadProblemBrief(ps, collegeName = "NIIS INSTITUTE OF BUSINESS ADMINISTRATION") {
  if (ps.pdfUrl && ps.pdfUrl.trim()) {
    const a = document.createElement('a');
    a.href = ps.pdfUrl;
    a.download = `${ps.id}_Problem_Brief.pdf`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    a.remove();
    return;
  }

  const sanitize = (str) => (str || '').replace(/[\\()]/g, '\\$&').replace(/\r?\n/g, ' ');

  const rawLines = [
    `NIIS HACKATHON 2026 - OFFICIAL PROBLEM STATEMENT BRIEF`,
    `Institution: ${collegeName}, Bhubaneswar`,
    `Organized by: Kaushal Technical Club, NIIS`,
    `------------------------------------------------------------------------`,
    `Problem ID: ${ps.id}  |  Category: ${ps.category}  |  Difficulty: ${ps.difficulty}`,
    `Title: ${ps.title}`,
    `------------------------------------------------------------------------`,
    ``,
    `EXECUTIVE SUMMARY:`,
    ps.shortDesc || '',
    ``,
    `DETAILED TECHNICAL SCOPE & REQUIREMENTS:`,
    ps.fullBrief || ps.shortDesc || '',
    ``,
    `------------------------------------------------------------------------`,
    `EVALUATION CRITERIA & SCORING RUBRIC:`,
    `1. Innovation, Originality & Problem Fit (25%)`,
    `2. Technical Architecture, Security & Code Quality (30%)`,
    `3. 36-Hour Offline Working Prototype Readiness (30%)`,
    `4. User Experience & Presentation Pitch (15%)`,
    ``,
    `Total Cash Prize Pool: Rs. 35,000 + Trophies + NIIS E-Cell Incubation`,
    `Registration Deadline: 25th September 2026 | Grand Finale: 30 Sep - 01 Oct 2026`,
    `------------------------------------------------------------------------`
  ];

  const wrappedLines = [];
  for (const line of rawLines) {
    if (line.length <= 80) {
      wrappedLines.push(line);
    } else {
      const words = line.split(' ');
      let cur = '';
      for (const w of words) {
        if ((cur + ' ' + w).trim().length > 80) {
          wrappedLines.push(cur.trim());
          cur = w;
        } else {
          cur = (cur + ' ' + w).trim();
        }
      }
      if (cur) wrappedLines.push(cur.trim());
    }
  }

  let streamContent = `BT\n/F1 14 Tf\n50 750 Td\n(${sanitize(wrappedLines[0])}) Tj\n`;
  streamContent += `/F1 9 Tf\n0 -16 Td\n(${sanitize(wrappedLines[1])}) Tj\n`;
  streamContent += `0 -12 Td\n(${sanitize(wrappedLines[2])}) Tj\n`;
  streamContent += `0 -12 Td\n(${sanitize(wrappedLines[3])}) Tj\n`;
  streamContent += `/F1 11 Tf\n0 -16 Td\n(${sanitize(wrappedLines[4])}) Tj\n`;
  streamContent += `/F1 12 Tf\n0 -16 Td\n(${sanitize(wrappedLines[5])}) Tj\n`;
  streamContent += `/F1 9 Tf\n0 -12 Td\n(${sanitize(wrappedLines[6])}) Tj\n`;

  const yOffset = -14;
  for (let i = 7; i < wrappedLines.length; i++) {
    const l = wrappedLines[i];
    const isHeader = l.endsWith(':') && l.toUpperCase() === l;
    if (isHeader) {
      streamContent += `/F1 10 Tf\n0 ${yOffset - 4} Td\n(${sanitize(l)}) Tj\n/F1 9 Tf\n`;
    } else {
      streamContent += `0 ${yOffset} Td\n(${sanitize(l)}) Tj\n`;
    }
  }
  streamContent += `ET\n`;

  const streamLength = new TextEncoder().encode(streamContent).length;

  const header = `%PDF-1.4\n`;
  const obj1 = `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`;
  const obj2 = `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`;
  const obj3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n`;
  const obj4 = `4 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}endstream\nendobj\n`;
  const obj5 = `5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`;

  const body = header + obj1 + obj2 + obj3 + obj4 + obj5;
  const offset1 = header.length;
  const offset2 = offset1 + obj1.length;
  const offset3 = offset2 + obj2.length;
  const offset4 = offset3 + obj3.length;
  const offset5 = offset4 + obj4.length;
  const xrefOffset = offset5 + obj5.length;

  const pad = (n) => String(n).padStart(10, '0');
  const xref = `xref\n0 6\n0000000000 65535 f \n${pad(offset1)} 00000 n \n${pad(offset2)} 00000 n \n${pad(offset3)} 00000 n \n${pad(offset4)} 00000 n \n${pad(offset5)} 00000 n \n`;
  const trailer = `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  const pdfString = body + xref + trailer;
  const blob = new Blob([pdfString], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${ps.id}_Problem_Brief.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* =========================================================================
   7. MASTER EXTENSIBLE CONTENT STATE
   ========================================================================= */
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
  venue: "Auditorium & Innovation Labs, NIIS Campus, Sarada Vihar, Bhubaneswar",
  registrationDeadline: "25th September 2026",
  rulebookUrl: "/brochure.pdf",
  promoVideoUrl: "/promo-video.mp4",
  gallery: INITIAL_GALLERY,

  announcements: [
    { id: 1, date: "15 Sep 2026", text: "Registrations for NIIS Hackathon 2026 are officially open! Early entries close 25th Sep." },
    { id: 2, date: "10 Sep 2026", text: "Official 12 Problem Statements released across 4 Categories by Kaushal Tech Club." },
    { id: 3, date: "05 Sep 2026", text: "Download official Event Rulebook & guidelines for NIIS Hackathon 2026." },
    { id: 4, date: "25 Aug 2026", text: "Orientation Workshop & Problem Briefing Session declared for participants." }
  ],

  about: {
    heading: "Fostering Technology & Innovation at NIIS",
    subHeading: "A 36-hour sprint connecting young technocrats with mentors, incubation resources, and industrial challenges.",
    para1: "NIIS HACKATHON 2026 is an initiative by Kaushal Technical Club at NIIS Institute of Business Administration. Designed to provide a premier competitive launchpad for undergraduate and postgraduate students from diverse streams including Computer Science, Information Technology, MCA, MBA, and Applied Sciences.",
    para2: "Modelled closely in spirit with state-level university frameworks like the BPUT Hackathon, our event challenges youth to transform theoretical blueprints into deployable, functional prototypes within 36 hours. Interdisciplinary teamwork, industry-standard mentoring, and real-world applicability are at the core of this challenge.",
    pillars: [
      { num: "01", title: "Ideate & Register", desc: "Select your preferred problem statement across our 4 flagship categories and register your squad." },
      { num: "02", title: "Build & Deploy (36h)", desc: "Develop working code, APIs, predictive ML models, or functional IoT circuitries during the sprint." },
      { num: "03", title: "Transform & Incubate", desc: "Pitch before expert panels with commercialization mentorship and seed grants at NIIS E-Cell." }
    ]
  },

  eventFlow: [
    { stage: "Stage 1", title: "Online Squad Registration", desc: "Submit squad registration via the in-app portal and select your target problem challenge." },
    { stage: "Stage 2", title: "Technical Screening & Finalist Pass", desc: "Jury panel evaluates architecture viability. Shortlisted finalist squads receive campus entry passes." },
    { stage: "Stage 3", title: "36h Grand Finale at NIIS", desc: "36 hours continuous offline sprint, mentor checkpoints, live jury demos, and grand valedictory." }
  ],

  committeeMembers: OFFICIAL_COMMITTEE_MEMBERS,
  problemStatements: OFFICIAL_PROBLEM_STATEMENTS,

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

  guidelines: {
    rule1Title: "1. Squad Eligibility & Composition",
    rule1Points: [
      "Each team must consist of 3 to 5 student members currently enrolled in any recognized College, Institute, or University.",
      "Interdisciplinary teams (e.g. BCA + BBA + B.Tech + MCA) are strongly encouraged.",
      "One member must be designated as the Team Leader for all official communication."
    ],
    rule2Title: "2. Institutional Identity & Bona Fide Verification",
    rule2Desc: "Shortlisted finalist squads attending the 36-hour on-campus grand finale must carry valid institutional student ID cards confirming their bona fide enrollment in an accredited college or university.",
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
      a: "Yes. Every candidate whose team successfully undergoes the 36-hour offline evaluation will receive a verified Certificate of Participation + Event Swag Kit endorsed by NIIS Institute of Business Administration."
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

/* =========================================================================
   6. PRIMARY APPLICATION COMPONENT
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

  // Compute Live Telemetry Totals (Leader + Squad Members) & Per-Problem Statement Live Breakdown
  const { totalTeamsCount, totalStudentsCount, psMetrics } = useMemo(() => {
    const list = registrationsList || [];
    const teams = list.length;
    let students = 0;
    const mapping = {};

    // Initialize all problem statements to guarantee 0 teams & 0 participants baseline
    (content.problemStatements || []).forEach((ps) => {
      mapping[ps.id] = { teams: 0, participants: 0 };
    });

    list.forEach((reg) => {
      // 1 Leader + valid squad members
      const membersLen = Array.isArray(reg.members)
        ? reg.members.filter((m) => m && (typeof m === 'string' ? m.trim() : (m.name && m.name.trim()))).length
        : 0;
      const count = 1 + membersLen;
      students += count;

      const pId = reg.trackId || reg.problemStatementId || reg.psId;
      if (pId) {
        if (!mapping[pId]) {
          mapping[pId] = { teams: 0, participants: 0 };
        }
        mapping[pId].teams += 1;
        mapping[pId].participants += count;
      }
    });

    return {
      totalTeamsCount: teams,
      totalStudentsCount: students,
      psMetrics: mapping
    };
  }, [registrationsList, content.problemStatements]);

  // Admin PIN Protection States
  const [showPinModal, setShowPinModal] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Master Secret Password
  const ADMIN_SECRET_PIN = "NexusAdminAccess2026#NIIS"; 

  // Real-time Cloud Fetch from Firebase Firestore for Portal CMS Content
  useEffect(() => {
    const fetchPortalContent = async () => {
      try {
        const docRef = doc(db, "portal", "hackathon2026");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const cloudData = docSnap.data();
          const merged = {
            ...INITIAL_CONTENT,
            ...cloudData,
            committeeMembers: (cloudData.committeeMembers && cloudData.committeeMembers.length >= 15)
              ? cloudData.committeeMembers
              : OFFICIAL_COMMITTEE_MEMBERS,
            problemStatements: (cloudData.problemStatements && cloudData.problemStatements.length >= 12)
              ? cloudData.problemStatements
              : OFFICIAL_PROBLEM_STATEMENTS
          };
          setContent(merged);
          setAdminDraft(merged);
        }
      } catch (err) {
        console.warn("Cloud database initial fetch error:", err);
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

  // Native Registration Form Handlers
  const handleOpenRegistration = (preselectedTrackId = null) => {
    if (preselectedTrackId) {
      setRegForm(prev => ({ ...prev, trackId: preselectedTrackId }));
    }
    setRegisterStep(1);
    setShowRegisterModal(true);
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
DATES:        30th September - 01st October 2026 (36h Non-stop)
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
Dates: 30th September - 01st October 2026 (36 Hours Offline)
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
    <div className="min-h-screen w-full bg-white text-slate-800 font-sans flex flex-col selection:bg-blue-900 selection:text-white pb-14 relative">
      
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

      {/* 1. TOP METADATA BAR */}
      <div className="w-full bg-[#091830] text-slate-300 text-xs border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3 text-[11px]">
            <span className="font-semibold text-amber-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {content.affiliation}
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-300 hidden md:inline">Approved by AICTE | Affiliated to BPUT, Odisha | Accredited by NAAC</span>
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

      {/* 2. INSTITUTIONAL HEADER & NATURAL BRAND EMBLEM */}
      <header className="w-full bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* College Crest & Title */}
          <div className="flex items-center gap-3.5">
            <NIISOfficialCrest className="w-12 h-12 sm:w-14 sm:h-14" />
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

          {/* Clean Kaushal Club Badge without bulky wrappers */}
          <div className="flex items-center gap-3">
            <KaushalClubBadge />
            <div className="hidden lg:flex items-center gap-2.5 border-l-2 border-slate-200 pl-4">
              <div className="text-right">
                <span className="text-3xl font-black text-[#0f2d59] font-serif leading-none block">26</span>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-tight block">Years of Excellence</span>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-blue-900 border border-slate-200 rounded-lg cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Navy Blue Nav */}
        <div className="w-full bg-[#0f2d59] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
            <nav className="hidden md:flex items-center space-x-5 py-3">
              <button
                onClick={() => {
                  const el = document.getElementById('home');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition text-slate-200 cursor-pointer"
              >
                Home
              </button>

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
                  const el = document.getElementById('gallery');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition text-amber-300 font-bold cursor-pointer flex items-center gap-1"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Moments</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('committee');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition text-slate-200 cursor-pointer"
              >
                Committee
              </button>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => handleOpenRegistration()}
                className="bg-amber-400 hover:bg-amber-300 text-[#0f2d59] font-black px-4 py-1.5 rounded-lg text-xs uppercase tracking-wider transition shadow cursor-pointer flex items-center gap-1.5 transform hover:scale-105"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register Squad</span>
              </button>
            </div>
          </div>

          {/* Mobile Drawer Menu */}
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
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenRegistration();
                }}
                className="block w-full text-left text-amber-300 font-bold hover:underline"
              >
                ✨ Register Squad Online
              </button>
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
                Event Flow & Milestones
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('prizes');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-slate-200 font-medium hover:text-amber-300"
              >
                Prizes (₹35K Pool)
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
                  const el = document.getElementById('gallery');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-amber-300 font-bold"
              >
                Hackathon Moments
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

      {/* =========================================================================
          3. HERO SECTION (BPUT HACKATHON STYLE CENTRAL CREST, NO ARTIFICIAL BOXES)
          ========================================================================= */}
      <section
        id="home"
        className="w-full relative min-h-[660px] text-white py-16 sm:py-24 px-4 overflow-hidden border-b-4 border-amber-400 flex items-center justify-center"
      >
        {/* Cinematic Live Campus Backdrop with subtle ambient Ken-Burns zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/campus-bg.jpg"
            alt="NIIS Campus"
            style={{ objectPosition: 'center 40%' }}
            className="w-full h-full object-cover animate-ken-burns scale-105 filter brightness-95 contrast-105"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/campus-bg.jpeg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030914]/65 via-[#07172f]/50 to-[#030914]/85 backdrop-blur-[0.5px]" />
        </div>

        {/* Interactive Particle Network */}
        <HeroInteractiveNetwork />

        {/* Foreground Content */}
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10 w-full">
          
          {/* Centered Generous Hackathon Event Logo (BPUT Hackathon Flagship Style) */}
          <div className="flex flex-col items-center justify-center mb-2">
            <img
              src="/hackathon-logo.png"
              alt="NIIS HACKATHON 2026 Official Emblem"
              className="h-24 sm:h-28 md:h-36 w-auto object-contain filter drop-shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                if (e.currentTarget.src.endsWith('.png')) {
                  e.currentTarget.src = "/hackathon-logo.jpeg";
                }
              }}
            />
          </div>

          <div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase font-sans drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {content.eventName}
            </h2>
            <p className="mt-2 text-lg sm:text-2xl font-bold uppercase tracking-widest text-blue-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              {content.tagline}
            </p>
            <p className="italic text-slate-200 font-serif text-sm sm:text-base mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              “{content.subTagline}”
            </p>
          </div>

          {/* Accurate Quick Stats */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-200">
            <span className="bg-[#05142b]/80 border border-blue-500/40 px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg backdrop-blur-md">
              <Calendar className="w-4 h-4 text-amber-400" /> {content.eventDates}
            </span>
            <span className="bg-[#05142b]/80 border border-blue-500/40 px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg backdrop-blur-md">
              <MapPin className="w-4 h-4 text-amber-400" /> {content.venue}
            </span>
            <span className="bg-[#05142b]/80 border border-blue-500/40 px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg backdrop-blur-md">
              <Trophy className="w-4 h-4 text-amber-400" /> ₹35,000 Cash Prize Pool
            </span>
          </div>

          {/* Clean 4-Column Countdown Timer */}
          <div className="pt-1">
            <span className="text-[11px] font-mono tracking-widest text-slate-300 uppercase block mb-2 font-semibold">
              HACKATHON COMMENCES IN
            </span>
            <div className="inline-grid grid-cols-4 gap-2.5 bg-[#05142b]/85 border border-blue-500/30 p-3 rounded-2xl font-mono shadow-2xl backdrop-blur-md">
              {[
                { label: 'DAYS', val: timeLeft.days },
                { label: 'HOURS', val: timeLeft.hours },
                { label: 'MINUTES', val: timeLeft.minutes },
                { label: 'SECONDS', val: timeLeft.seconds },
              ].map((t, i) => (
                <div key={i} className="px-3.5 sm:px-5 py-2.5 bg-[#040e1d]/90 border border-blue-900/60 rounded-xl text-center min-w-[70px] sm:min-w-[95px]">
                  <span className="text-2xl sm:text-4xl font-black text-white block leading-tight">
                    {String(t.val).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] text-blue-300 uppercase font-bold tracking-wider">{t.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => handleOpenRegistration()}
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-[#0f2d59] font-black px-8 py-3.5 rounded-xl text-sm uppercase tracking-wider transition shadow-xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5 cursor-pointer ring-2 ring-amber-400/50"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register Squad Online</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#tracks"
              className="w-full sm:w-auto bg-blue-950/70 hover:bg-blue-900 border border-blue-400/40 text-white px-8 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 backdrop-blur-sm cursor-pointer shadow-lg transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>Explore Problem Statements</span>
            </a>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. INTERACTIVE TEASER / SHOWCASE VIDEO SECTION
          ========================================================================= */}
      <section id="teaser" className="w-full py-16 px-4 sm:px-6 bg-gradient-to-b from-[#0a1c36] via-[#081528] to-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-8 relative z-10 text-center">
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Official Event Teaser & Promo
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight">
              36 Hours of Code, Resilience & Innovation
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Get an exclusive preview of the infrastructure, high-stakes mentorship checkpoints, and grand stage at NIIS Campus.
            </p>
          </div>

          {/* High-End Mockup Video Frame */}
          <div className="relative mx-auto rounded-3xl overflow-hidden border border-blue-500/30 bg-[#040e1d]/90 shadow-[0_0_50px_rgba(59,130,246,0.18)] max-w-4xl group">
            
            {/* Top Mockup Window Header Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#091830] border-b border-slate-800 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="font-mono text-slate-300 ml-2 hidden sm:inline truncate max-w-xs">
                  {getYouTubeEmbedUrl(teaserConfig.videoUrl || content.promoVideoUrl)
                    ? "YouTube Teaser Stream"
                    : ((teaserConfig.videoUrl || content.promoVideoUrl || "/promo-video.mp4").split('/').pop() || "NIIS_Hackathon_Teaser_4K.mp4")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-mono">
                  {getYouTubeEmbedUrl(teaserConfig.videoUrl || content.promoVideoUrl) ? "YOUTUBE STREAM" : "LIVE 1080p"}
                </span>
                <span className="text-slate-400 text-[10px] hidden sm:inline">Kaushal Tech Club Production</span>
              </div>
            </div>

            {/* Video Player or Fallback Interactive Showcase */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
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
                        className="text-[11px] text-amber-300 hover:text-white bg-[#091830]/90 border border-blue-500/40 px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-sm cursor-pointer transition font-medium"
                      >
                        Interactive Showcase Mode →
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
                      className={`absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-opacity ${
                        isVideoPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                      }`}
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-400/90 text-[#0f2d59] flex items-center justify-center shadow-2xl transform hover:scale-110 transition border-4 border-white/20">
                        {isVideoPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                      </div>
                    </div>

                    {/* Bottom Video Controls HUD */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 sm:p-4 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleToggleVideoPlay}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                          title={isVideoPlaying ? "Pause" : "Play"}
                        >
                          {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={handleToggleVideoMute}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                          title={isVideoMuted ? "Unmute" : "Mute"}
                        >
                          {isVideoMuted ? <VolumeX className="w-4 h-4 text-amber-300" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                        </button>
                        <span className="font-mono text-slate-300 text-[11px] hidden sm:inline">
                          36-Hour Offline Experience • Sarada Vihar, Bhubaneswar
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowInteractiveTeaser(true)}
                          className="text-[11px] text-amber-300 hover:underline cursor-pointer bg-white/10 px-2.5 py-1 rounded"
                        >
                          Switch to Interactive Mode
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
                    <h4 className="text-xl sm:text-3xl font-black text-white font-serif">
                      Transforming Theoretical Code into Deployed Prototypes
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                      36 hours non-stop sprint with high-speed campus Wi-Fi, 3-tier jury evaluation, dedicated mentor checkpoints, and state-of-the-art incubation backing by NIIS E-Cell.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-blue-900/50">
                    <div className="bg-[#051124]/80 p-3 rounded-xl border border-blue-800/40">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Sprint Format</span>
                      <span className="font-bold text-white text-xs sm:text-sm">36h Offline</span>
                    </div>
                    <div className="bg-[#051124]/80 p-3 rounded-xl border border-blue-800/40">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Prize Bounty</span>
                      <span className="font-bold text-amber-300 text-xs sm:text-sm">₹35,000 Pool</span>
                    </div>
                    <div className="bg-[#051124]/80 p-3 rounded-xl border border-blue-800/40">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Accommodation</span>
                      <span className="font-bold text-emerald-400 text-xs sm:text-sm">100% Free</span>
                    </div>
                    <div className="bg-[#051124]/80 p-3 rounded-xl border border-blue-800/40">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Eligibility</span>
                      <span className="font-bold text-blue-300 text-xs sm:text-sm">UG & PG Students</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <button
                      onClick={() => setShowInteractiveTeaser(false)}
                      className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      ← Back to Video Player
                    </button>
                    <button
                      onClick={() => handleOpenRegistration()}
                      className="bg-amber-400 hover:bg-amber-300 text-[#0f2d59] font-black px-4 py-2 rounded-lg text-xs uppercase tracking-wider transition shadow cursor-pointer"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Quick Stat Pills Container with Accurate ₹35,000 Pool */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {[
              { title: "36 Hours Non-Stop", desc: "Day-Night Intensive Sprint", icon: Clock },
              { title: "500+ Technocrats", desc: "Statewide Collegians", icon: Users },
              { title: "₹35,000 Bounty", desc: "Cash Awards & Medals", icon: Trophy },
              { title: "Incubation Track", desc: "NIIS E-Cell Seed Grants", icon: Zap },
            ].map((stat, i) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={i}
                  className="bg-[#07172f]/80 border border-blue-500/25 rounded-2xl p-4 text-center backdrop-blur-md hover:border-amber-400/50 transition-all shadow-md group"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-950 text-amber-400 flex items-center justify-center mx-auto mb-2 border border-blue-800/60 group-hover:scale-110 transition">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-sm sm:text-base leading-tight">
                    {stat.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {stat.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. ABOUT SECTION
          ========================================================================= */}
      <section id="about" className="w-full py-20 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto space-y-10 text-center">
          
          <div className="space-y-3">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              About The Event
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif font-black text-[#0f2d59] tracking-tight">
              {content.about?.heading || "Fostering Technology & Innovation at NIIS"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
              {content.about?.subHeading || "A 36-hour sprint connecting young technocrats with mentors, incubation resources, and industrial challenges."}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed text-center">
            <p>
              {content.about?.para1}
            </p>
            <p>
              {content.about?.para2}
            </p>
          </div>

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

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 text-left">
            {(content.about?.pillars || []).map((pillar, i) => (
              <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-blue-300 hover:shadow-xs transition space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#0f2d59] text-amber-300 font-bold font-mono text-xs flex items-center justify-center">
                  {pillar.num || `0${i+1}`}
                </div>
                <h4 className="text-sm font-bold text-[#0f2d59]">{pillar.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
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
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#0f2d59]">
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

                    <p className="text-xs sm:text-sm text-slate-700 italic font-serif leading-relaxed pt-1">
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
            <h3 className="text-3xl font-serif font-black text-[#0f2d59]">
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

                  <button
                    onClick={() => setModalTrack(ps)}
                    className="text-[11px] font-semibold text-blue-900 hover:underline pt-2 inline-block cursor-pointer"
                  >
                    View Scope Details →
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownloadProblemBrief(ps, content.collegeName)}
                      className="flex-1 text-center bg-blue-50 hover:bg-blue-100 text-[#0f2d59] font-bold py-2 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5 border border-blue-200 shadow-xs"
                      title="Download Detailed PDF Problem Brief"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-900" />
                      <span>Download Brief (PDF)</span>
                    </button>
                    
                    <button
                      onClick={() => handleOpenRegistration(ps.id)}
                      className="flex-1 text-center bg-[#0f2d59] hover:bg-blue-950 text-white font-bold py-2 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span>Apply Track</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. DYNAMIC EVENT FLOW & 36H TIMELINE
          ========================================================================= */}
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

      {/* =========================================================================
          8. ACCURATE PRIZES & REWARDS (TOTAL ₹35,000 CASH POOL)
          ========================================================================= */}
      <section id="prizes" className="w-full py-16 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded">
              Verified Rewards & Bounty Structure
            </span>
            <h3 className="text-3xl font-serif font-black text-[#0f2d59]">
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
                  <div className="text-3xl sm:text-4xl font-serif font-black text-[#0f2d59] mb-3">
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
            All registered participants receive a verified <strong>Certificate of Participation</strong> endorsed by <strong>NIIS Institute of Business Administration</strong>, along with hackathon kits, meals, and 36h stay on campus.
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

          {/* Download Rulebook Box */}
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
            <h3 className="text-3xl font-serif font-black text-[#0f2d59]">
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
            <h3 className="text-3xl font-serif font-black text-[#0f2d59]">
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
                  className="px-4 py-2 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const tId = modalTrack.id;
                    setModalTrack(null);
                    handleOpenRegistration(tId);
                  }}
                  className="px-4 py-2 bg-[#0f2d59] hover:bg-blue-950 text-white font-bold rounded-lg shadow cursor-pointer flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register Squad</span>
                </button>
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
                  <h3 className="text-base sm:text-lg font-bold text-[#0f2d59] font-serif leading-tight">
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
              <h3 className="text-xl font-bold text-[#0f2d59] font-serif mt-2">
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
                <h3 className="font-bold text-[#0f2d59] text-base sm:text-lg flex items-center gap-2 font-serif">
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
                { id: 'general', label: '🔗 General & Dates' },
                { id: 'registrations', label: `📋 Registrations (${totalTeamsCount})` },
                { id: 'teaser', label: '🎬 Teaser Video' },
                { id: 'about', label: 'ℹ️ About Section' },
                { id: 'flow', label: '🔀 Event Flow (Phases)' },
                { id: 'tracks', label: `🎯 Tracks (${adminDraft.problemStatements.length})` },
                { id: 'prizes', label: '🏆 Prizes (₹35K)' },
                { id: 'guidelines', label: '📑 Guidelines & Brochure' },
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

              {/* TAB 3: EVENT FLOW */}
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
                        className="inline-flex items-center gap-1 bg-[#0f2d59] text-amber-300 px-3 py-1 rounded-lg text-xs font-bold cursor-pointer"
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
                            className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
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
                        />
                      </div>
                    ))}
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

              {/* TAB 6: GUIDELINES & RULEBOOK */}
              {adminTab === 'guidelines' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <h4 className="font-bold text-[#0f2d59] text-xs uppercase tracking-wider">
                      Event Rulebook Download Link
                    </h4>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Official Event Rulebook (PDF) URL</label>
                      <input
                        type="text"
                        value={adminDraft.rulebookUrl || "/brochure.pdf"}
                        onChange={(e) => setAdminDraft({ ...adminDraft, rulebookUrl: e.target.value })}
                        className="w-full border rounded-lg p-2 bg-white text-xs font-mono"
                      />
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