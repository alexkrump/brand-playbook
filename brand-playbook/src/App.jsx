import { useState, useEffect, useCallback } from "react";

// ============================================================
// UNLOCK CODE CONFIGURATION
// ============================================================
// Set your unlock codes here. These are the codes buyers receive
// after purchasing on Lemon Squeezy / Gumroad.
//
// To change a code: update the string below and redeploy.
// Codes are case-insensitive when buyers enter them.
//
// NOTE: Client-side app — determined users could find these in
// source. For this price point, honor system + friction is fine.
// For bulletproof protection later, add a backend.
// ============================================================

const UNLOCK_CODES = {
  clarity:  "CLARITY-2025",
  identity: "IDENTITY-2025",
  engine:   "ENGINE-2025",
  bundle:   "FULLBRAND-2025",
};

// ============================================================
// PURCHASE LINKS — replace with your Lemon Squeezy URLs
// ============================================================

const PURCHASE_LINKS = {
  clarity:  "https://your-store.lemonsqueezy.com/buy/clarity",
  identity: "https://your-store.lemonsqueezy.com/buy/identity",
  engine:   "https://your-store.lemonsqueezy.com/buy/engine",
  bundle:   "https://your-store.lemonsqueezy.com/buy/bundle",
};

// ============================================================
// PRICING
// ============================================================

const PRICING = {
  clarity:  { price: 29, label: "Clarity Phase", desc: "Ch. 01–04 · Problem, customer, niche, strategy" },
  identity: { price: 39, label: "Identity Phase", desc: "Ch. 05–08 · Voice, visuals, name, web copy" },
  engine:   { price: 29, label: "Engine Phase", desc: "Ch. 09–10 · Monetization and launch" },
  bundle:   { price: 79, label: "Full Playbook", desc: "All 11 chapters · Save $18" },
};

const PHASE_UNLOCK_MAP = {
  Foundation: null,
  Clarity: "clarity",
  Identity: "identity",
  Engine: "engine",
};

// ============================================================
// CHAPTER DATA
// ============================================================

const chapters = [
  {
    number: "00", phase: "Foundation", title: "The Intake", subtitle: "What are we actually working with?",
    duration: "60 min", tagline: "Before you strategize, you need to audit. What exists, what doesn't, and what's broken.",
    description: "Every brand engagement starts with an honest assessment of where things stand. What assets exist? What decisions have been made? What's the founder's capacity, budget, and timeline?",
    exercises: [
      { id: "00-1", name: "The Brand Inventory Checklist", short: "Audit every touchpoint: domain, handles, logo, colors, copy, legal entity." },
      { id: "00-2", name: "The Honest Capacity Assessment", short: "Real numbers: hours/week, budget, skills, timeline." },
      { id: "00-3", name: "The Decision Audit", short: "Three columns: DECIDED, LEANING, OPEN for every brand decision." },
    ],
    keyDecisions: ["Hard launch deadline?", "Real budget?", "Which decisions locked vs. open?", "Weekly time commitment?"],
    tools: [
      { name: "Notion", url: "https://notion.so" },
      { name: "Google Sheets", url: "https://sheets.google.com" },
      { name: "Namecheap", url: "https://namecheap.com" },
      { name: "Namechk", url: "https://namechk.com" },
    ],
    deliverable: "Brand Intake Brief",
    accent: "#8B8B8B", pill: "#EEEEEC",
  },
  {
    number: "01", phase: "Clarity", title: "Discovery & Vision", subtitle: "Why does this exist?",
    duration: "90 min", tagline: "If you can't explain the problem you solve in one sentence, you don't have a brand yet.",
    description: "Forces concrete answers: What problem does this solve? Who has it badly enough to pay? Why are you the one to build it?",
    exercises: [
      { id: "01-1", name: "The Problem Statement Sprint", short: "10 min timer. '[Group] struggle with [problem] because [cause]. Solutions fail by [gap].' Write 5, pick 1." },
      { id: "01-2", name: "The Transformation Test", short: "BEFORE/AFTER grid with concrete, observable details — not feelings." },
      { id: "01-3", name: "The Operational Values Exercise", short: "'We WILL ___ even when costly, we NEVER ___ even when profitable.' 3 values." },
    ],
    keyDecisions: ["One-sentence problem statement?", "Measurable transformation?", "3 operational values?", "Mission statement (under 15 words)?"],
    tools: [
      { name: "Hemingway Editor", url: "https://hemingwayapp.com" },
      { name: "Miro", url: "https://miro.com" },
      { name: "Loom", url: "https://loom.com" },
    ],
    deliverable: "Vision & Foundation Document",
    accent: "#1A8A64", pill: "#D4F2E7",
  },
  {
    number: "02", phase: "Clarity", title: "Competitive Landscape & Niche", subtitle: "What exists and where's the gap?",
    duration: "2–3 hr", tagline: "You can't differentiate if you don't know what you're differentiating from.",
    description: "Research session. Look at every competitor, document what they do, how they position, what they charge, and what they're NOT doing.",
    exercises: [
      { id: "02-1", name: "The Competitor Database Build", short: "Spreadsheet: 8–12 competitors with name, audience, pricing, features, gaps, screenshots." },
      { id: "02-2", name: "The 2x2 Positioning Map", short: "Choose 2 axes, plot all competitors, find the open space." },
      { id: "02-3", name: "The Gap Analysis", short: "What do NONE of them do? What audiences do they ignore? What complaints repeat?" },
    ],
    keyDecisions: ["8–12 competitors identified?", "Positioning map axes?", "Where's the whitespace?", "One-sentence niche claim?", "Who are you NOT for?"],
    tools: [
      { name: "Google Sheets", url: "https://sheets.google.com" },
      { name: "App Store", url: "https://apps.apple.com" },
      { name: "Product Hunt", url: "https://producthunt.com" },
      { name: "SimilarWeb", url: "https://similarweb.com" },
      { name: "Miro / FigJam", url: "https://miro.com" },
      { name: "SparkToro", url: "https://sparktoro.com" },
    ],
    deliverable: "Competitive Landscape Report + Niche Definition",
    accent: "#3D50AB", pill: "#DDE2F6",
  },
  {
    number: "03", phase: "Clarity", title: "Customer Persona", subtitle: "Who is this person — specifically?",
    duration: "2 hr", tagline: "Demographics tell you who they are on paper. Psychographics tell you why they'll buy.",
    description: "Research-backed persona with real habits, frustrations, and language. Not guessing — actual research methods.",
    exercises: [
      { id: "03-1", name: "The Research Sprint (45 min)", short: "Reddit, App Store reviews, FB groups. Copy 20+ real quotes. Their words > your words." },
      { id: "03-2", name: "The Persona Build", short: "Name, age, life, fitness history, pain (their words), trigger moment, success metric, dealbreaker." },
      { id: "03-3", name: "The Day-in-the-Life Map", short: "2-hour blocks 6am–10pm: activity, device, energy level, product fit." },
    ],
    keyDecisions: ["Primary persona (one person)?", "Their exact words for their problem?", "Trigger moment?", "Week 1 dealbreaker?"],
    tools: [
      { name: "Reddit", url: "https://reddit.com" },
      { name: "AnswerThePublic", url: "https://answerthepublic.com" },
      { name: "Google Trends", url: "https://trends.google.com" },
      { name: "SparkToro", url: "https://sparktoro.com" },
    ],
    deliverable: "Primary Persona Document + Language Bank",
    accent: "#C25510", pill: "#FDE8D6",
  },
  {
    number: "04", phase: "Clarity", title: "Brand Positioning & Strategy", subtitle: "What is your actual claim?",
    duration: "90 min", tagline: "Positioning is the single most leveraged decision. Get this wrong and nothing else matters.",
    description: "Compresses chapters 1–3 into the strategic core: what makes you different, why it matters, how you communicate it.",
    exercises: [
      { id: "04-1", name: "The Differentiation Filter", short: "List all features. Cross off: competitors do it, customer doesn't care, can't sustain 2yr." },
      { id: "04-2", name: "The Positioning Statement", short: "'For [audience], [Brand] is the [category] that [benefit] by [how]. Unlike [competitor], we [difference].'" },
      { id: "04-3", name: "The Pitch Ladder", short: "15-second hook, 60-second elevator, 5-minute coffee. Each works independently." },
    ],
    keyDecisions: ["3 differentiation pillars?", "Positioning statement?", "Value proposition?", "15-second pitch?"],
    tools: [
      { name: "Notion", url: "https://notion.so" },
      { name: "Loom", url: "https://loom.com" },
    ],
    deliverable: "Brand Strategy One-Pager",
    accent: "#7B3FBE", pill: "#ECE3F7",
  },
  {
    number: "05", phase: "Identity", title: "Brand Personality & Voice", subtitle: "How does this brand talk?",
    duration: "90 min", tagline: "If you removed the logo, would anyone know it was you?",
    description: "Specific enough that two people write content and it sounds like the same person. No vague adjectives.",
    exercises: [
      { id: "05-1", name: "The Archetype Selection", short: "Pick 1 primary + 1 secondary from 12 archetypes. Find 2 brands that combine them." },
      { id: "05-2", name: "The Tone Scorecard", short: "4 spectrums, 1 number each: Formal↔Casual, Serious↔Playful, Reserved↔Expressive, Technical↔Simple." },
      { id: "05-3", name: "Voice in Action (8 Scenarios)", short: "App store, push notification, missed workout, IG caption, negative review, 404, email, press." },
    ],
    keyDecisions: ["Primary + secondary archetypes?", "4 tone scores?", "Vocabulary owned vs. avoided?", "Voice consistent across 8 scenarios?"],
    tools: [
      { name: "Archetype Guide", url: "https://iconicfox.com.au/brand-archetypes" },
      { name: "Hemingway Editor", url: "https://hemingwayapp.com" },
      { name: "Grammarly", url: "https://grammarly.com" },
    ],
    deliverable: "Brand Voice Guide",
    accent: "#C23B3B", pill: "#FDE8E8",
  },
  {
    number: "06", phase: "Identity", title: "Visual Identity System", subtitle: "What does this brand look like?",
    duration: "3–4 hr", tagline: "Every visual choice is a strategic decision that attracts or repels your audience.",
    description: "The most expanded chapter. Color, typography, photo vs. illustration, logo, imagery style, layout principles.",
    exercises: [
      { id: "06-1", name: "Mood Board Sprint (30 min)", short: "25–30 images fast. Edit to 10–12. The edit reveals the direction." },
      { id: "06-2", name: "Color Palette Framework", short: "5 colors: primary, secondary, accent, neutral light, neutral dark. Hex codes + rationale." },
      { id: "06-3", name: "Typography Framework", short: "Display + body font. Serif vs. sans-serif decision. Test with real brand name." },
      { id: "06-4", name: "Photography vs. Illustration", short: "Photo (authenticity) vs. illustration (differentiation) vs. hybrid. What do competitors use?" },
      { id: "06-5", name: "Logo Design Crash Course", short: "5 contexts it must work in. Wordmark vs. icon vs. combo. Write the 1-paragraph brief." },
      { id: "06-6", name: "Layout & Style Principles", short: "5 rules: density, shape language, imagery treatment, grid, signature element." },
    ],
    keyDecisions: ["5-color palette (hex)?", "2 fonts chosen?", "Photo/illustration/hybrid?", "Logo type?", "Layout density?", "Signature element?"],
    tools: [
      { name: "Coolors", url: "https://coolors.co" },
      { name: "Adobe Color", url: "https://color.adobe.com" },
      { name: "Contrast Checker", url: "https://webaim.org/resources/contrastchecker" },
      { name: "Google Fonts", url: "https://fonts.google.com" },
      { name: "Fontpair", url: "https://fontpair.co" },
      { name: "Typewolf", url: "https://typewolf.com" },
      { name: "Pinterest", url: "https://pinterest.com" },
      { name: "Dribbble", url: "https://dribbble.com" },
      { name: "Behance", url: "https://behance.net" },
      { name: "Canva", url: "https://canva.com" },
      { name: "Looka", url: "https://looka.com" },
      { name: "Figma", url: "https://figma.com" },
      { name: "Unsplash", url: "https://unsplash.com" },
      { name: "Undraw", url: "https://undraw.co" },
      { name: "Realtime Colors", url: "https://realtimecolors.com" },
    ],
    deliverable: "Visual Identity System Document",
    accent: "#3A6B2F", pill: "#E0ECDB",
  },
  {
    number: "07", phase: "Identity", title: "Naming & Messaging", subtitle: "What do you say and in what order?",
    duration: "2 hr", tagline: "Your name is the first copy anyone reads. Messaging hierarchy makes everything consistent.",
    description: "Evaluate the name, develop taglines, build the messaging house that governs all communications.",
    exercises: [
      { id: "07-1", name: "The Name Scorecard", short: "6 criteria × 1–5: memorable, pronounceable, distinctive, scalable, available, strategic. /30." },
      { id: "07-2", name: "The Tagline Workshop", short: "4 directions × 3 options: functional, emotional, aspirational, provocative. Test vs. persona." },
      { id: "07-3", name: "The Messaging House", short: "Roof: promise. 3 columns: pillars. Inside: proof points. Foundation: values." },
    ],
    keyDecisions: ["Name passes (18+/30)?", "Tagline chosen?", "Messaging house built?", "3-paragraph narrative?"],
    tools: [
      { name: "USPTO Search", url: "https://tess2.uspto.gov" },
      { name: "Namecheap", url: "https://namecheap.com" },
      { name: "Namechk", url: "https://namechk.com" },
      { name: "Namelix", url: "https://namelix.com" },
    ],
    deliverable: "Messaging Architecture Document",
    accent: "#A07D2F", pill: "#F2EADB",
  },
  {
    number: "08", phase: "Identity", title: "Web Presence & Digital Copy", subtitle: "What does the world see first?",
    duration: "3 hr+", tagline: "Your website has 5 seconds: What is this? Who is it for? Why should I care?",
    description: "Audit current site, rewrite copy, define page hierarchy, establish content channel strategy.",
    exercises: [
      { id: "08-1", name: "The 5-Second Test", short: "3 people, 5 seconds. Can they say what it is, who it's for, would they sign up?" },
      { id: "08-2", name: "Homepage Copy Formula", short: "[Outcome] for [person]. [How] without [thing they hate]. 3 versions." },
      { id: "08-3", name: "Full Website Page Map", short: "Each page: goal, message, CTA, proof elements." },
      { id: "08-4", name: "Content Channel Selection", short: "Rate channels 1–5 on 4 criteria. Pick 1 primary + 1 secondary." },
    ],
    keyDecisions: ["Site passes 5-second test?", "Hero headline?", "Page hierarchy?", "Primary content channel?"],
    tools: [
      { name: "Webflow", url: "https://webflow.com" },
      { name: "Framer", url: "https://framer.com" },
      { name: "Carrd", url: "https://carrd.co" },
      { name: "Later", url: "https://later.com" },
      { name: "Figma", url: "https://figma.com" },
      { name: "Hotjar", url: "https://hotjar.com" },
      { name: "Awwwards", url: "https://awwwards.com" },
      { name: "Lapa Ninja", url: "https://lapa.ninja" },
    ],
    deliverable: "Website Copy Document + Content Channel Plan",
    accent: "#8E44AD", pill: "#EBDDF3",
  },
  {
    number: "09", phase: "Engine", title: "Monetization Model", subtitle: "How does this make money?",
    duration: "2 hr", tagline: "Revenue isn't a feature. It's a strategy that has to be designed.",
    description: "Evaluate every viable model, stress-test against positioning and customer, produce recommended model with pricing.",
    exercises: [
      { id: "09-1", name: "The Revenue Model Matrix", short: "Subscription, freemium, one-time, marketplace, B2B, affiliate. Rate fit 1–5 each." },
      { id: "09-2", name: "Willingness to Pay Interview", short: "Van Westendorp: too cheap, bargain, expensive, too expensive. Find the sweet spot." },
      { id: "09-3", name: "The LTV/CAC Sketch", short: "Monthly rev × avg months = LTV. Estimate CAC. Need LTV > 3x CAC." },
    ],
    keyDecisions: ["Primary revenue model?", "Pricing tiers?", "What value unlocks payment?", "Unit economics work?"],
    tools: [
      { name: "Stripe", url: "https://stripe.com" },
      { name: "RevenueCat", url: "https://revenuecat.com" },
      { name: "ProfitWell", url: "https://profitwell.com" },
      { name: "Google Sheets", url: "https://sheets.google.com" },
    ],
    deliverable: "Monetization Strategy Document",
    accent: "#1A4FA8", pill: "#DAE5F8",
  },
  {
    number: "10", phase: "Engine", title: "Launch Strategy & Growth", subtitle: "Zero to known",
    duration: "2 hr", tagline: "A great launch doesn't happen. It's engineered.",
    description: "30 days before, day-of, 90 days after. Pre-launch audience, launch narrative, measurement framework.",
    exercises: [
      { id: "10-1", name: "The MVP Scope Exercise", short: "Must Have / Should Have / Could Have. Launch only Must Haves." },
      { id: "10-2", name: "Pre-Launch Audience Machine", short: "5 paths to 500 people: waitlist, founding members, beta, communities, partnerships." },
      { id: "10-3", name: "90-Day KPI Dashboard", short: "North star metric + 3–5 supporting: awareness, engagement, revenue." },
    ],
    keyDecisions: ["MVP features?", "500-person plan?", "North star metric?", "Hard launch date?"],
    tools: [
      { name: "Notion", url: "https://notion.so" },
      { name: "ConvertKit", url: "https://convertkit.com" },
      { name: "Product Hunt", url: "https://producthunt.com" },
      { name: "Google Analytics", url: "https://analytics.google.com" },
      { name: "Mixpanel", url: "https://mixpanel.com" },
    ],
    deliverable: "90-Day Launch Plan + KPI Dashboard",
    accent: "#1A7A45", pill: "#D6F2E3",
  },
];

const phaseConfig = {
  Foundation: { color: "#8B8B8B" },
  Clarity: { color: "#1A8A64" },
  Identity: { color: "#7B3FBE" },
  Engine: { color: "#1A4FA8" },
};

const STORAGE_KEY = "brand-playbook-state";

function LockIcon({ size = 14, color = "#AAA" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="3" y="7" width="10" height="7" rx="1.5" stroke={color} strokeWidth="1.5" />
      <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function BrandPlaybook() {
  const [state, setState] = useState({ checked: {}, links: {}, myLinks: {}, unlocked: {} });
  const [active, setActive] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [linkInput, setLinkInput] = useState("");
  const [addingMyLink, setAddingMyLink] = useState(null);
  const [myLinkLabel, setMyLinkLabel] = useState("");
  const [myLinkUrl, setMyLinkUrl] = useState("");
  const [codeModal, setCodeModal] = useState(null);
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState({ checked: {}, links: {}, myLinks: {}, unlocked: {}, ...parsed });
      }
    } catch (e) {}
    setLoaded(true);
  }, []);

  const save = useCallback((newState) => {
    setState(newState);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newState)); } catch (e) {}
  }, []);

  const isPhaseUnlocked = (phase) => {
    if (phase === "Foundation") return true;
    const key = PHASE_UNLOCK_MAP[phase];
    if (!key) return true;
    return state.unlocked[key] === true || state.unlocked["bundle"] === true;
  };

  const tryUnlock = () => {
    const input = codeInput.trim().toUpperCase();
    if (!input) { setCodeError("Please enter a code."); return; }
    let matched = null;
    for (const [key, code] of Object.entries(UNLOCK_CODES)) {
      if (input === code.toUpperCase()) { matched = key; break; }
    }
    if (matched) {
      const next = { ...state, unlocked: { ...state.unlocked, [matched]: true } };
      save(next);
      setCodeModal(null);
      setCodeInput("");
      setCodeError("");
    } else {
      setCodeError("Invalid code. Please check and try again.");
    }
  };

  const toggleCheck = (id) => {
    const next = { ...state, checked: { ...state.checked, [id]: !state.checked[id] } };
    save(next);
  };

  const saveLink = (toolKey) => {
    const next = { ...state, links: { ...state.links } };
    if (!linkInput.trim()) delete next.links[toolKey];
    else next.links[toolKey] = linkInput.trim();
    save(next);
    setEditingLink(null);
    setLinkInput("");
  };

  const addMyLink = (chNum) => {
    if (!myLinkLabel.trim()) return;
    const existing = state.myLinks[chNum] || [];
    const entry = { id: Date.now().toString(), label: myLinkLabel.trim(), url: myLinkUrl.trim() || "" };
    const next = { ...state, myLinks: { ...state.myLinks, [chNum]: [...existing, entry] } };
    save(next);
    setAddingMyLink(null);
    setMyLinkLabel("");
    setMyLinkUrl("");
  };

  const removeMyLink = (chNum, entryId) => {
    const existing = (state.myLinks[chNum] || []).filter(e => e.id !== entryId);
    const next = { ...state, myLinks: { ...state.myLinks, [chNum]: existing } };
    save(next);
  };

  const getChapterProgress = (ch) => {
    const done = ch.exercises.filter(e => state.checked[e.id]).length;
    return { done, total: ch.exercises.length };
  };

  const getTotalProgress = () => {
    const allIds = chapters.flatMap(ch => ch.exercises.map(e => e.id));
    return { done: allIds.filter(id => state.checked[id]).length, total: allIds.length };
  };

  if (!loaded) return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui", color: "#AAA" }}>
      Loading your playbook...
    </div>
  );

  const total = getTotalProgress();
  const pct = total.total > 0 ? Math.round((total.done / total.total) * 100) : 0;
  const allUnlocked = isPhaseUnlocked("Clarity") && isPhaseUnlocked("Identity") && isPhaseUnlocked("Engine");

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", color: "#1a1a2e" }}>

      {/* CODE UNLOCK MODAL */}
      {codeModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
          backdropFilter: "blur(4px)",
        }} onClick={() => { setCodeModal(null); setCodeInput(""); setCodeError(""); }}>
          <div style={{
            background: "#fff", borderRadius: 20, padding: "36px 32px", maxWidth: 420, width: "100%",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: `${phaseConfig[codeModal]?.color || "#1A8A64"}12`,
              display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
            }}>
              <LockIcon size={22} color={phaseConfig[codeModal]?.color || "#1A8A64"} />
            </div>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
              Unlock {codeModal}
            </h3>
            <p style={{ fontSize: 14, color: "#6B6B7B", marginBottom: 24, lineHeight: 1.6 }}>
              Enter the unlock code you received after purchase.
            </p>
            <input
              value={codeInput}
              onChange={e => { setCodeInput(e.target.value); setCodeError(""); }}
              onKeyDown={e => { if (e.key === "Enter") tryUnlock(); }}
              placeholder="Enter your unlock code..."
              autoFocus
              style={{
                width: "100%", padding: "12px 16px", fontSize: 15, border: codeError ? "2px solid #E55" : "2px solid #E8E6E1",
                borderRadius: 12, outline: "none", fontFamily: "inherit", background: "#FAFAF8",
                boxSizing: "border-box",
              }}
            />
            {codeError && <div style={{ fontSize: 13, color: "#E55", marginTop: 8, fontWeight: 500 }}>{codeError}</div>}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={tryUnlock} style={{
                flex: 1, padding: "12px 20px", fontSize: 14, fontWeight: 600,
                background: phaseConfig[codeModal]?.color || "#1A8A64", color: "#fff",
                border: "none", borderRadius: 12, cursor: "pointer",
              }}>Unlock</button>
              <button onClick={() => { setCodeModal(null); setCodeInput(""); setCodeError(""); }} style={{
                padding: "12px 20px", fontSize: 14, background: "#F3F3F1", color: "#6B6B7B",
                border: "none", borderRadius: 12, cursor: "pointer",
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div style={{ padding: "48px 40px 36px", background: "#fff", borderBottom: "1px solid #E8E6E1" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ display: "inline-block", padding: "5px 12px", background: "#F0F0EE", borderRadius: 100, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#6B6B7B", marginBottom: 16 }}>
                Marketing for Good
              </div>
              <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 8px", letterSpacing: "-0.03em" }}>
                Brand Build{" "}
                <span style={{ background: "linear-gradient(135deg, #1A8A64, #3D50AB, #7B3FBE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Playbook</span>
              </h1>
              <p style={{ fontSize: 14, color: "#8B8B9B", margin: 0, maxWidth: 400 }}>
                11 chapters. Track your progress, link your resources, build the brand.
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ position: "relative", width: 68, height: 68 }}>
                <svg width="68" height="68" viewBox="0 0 68 68">
                  <circle cx="34" cy="34" r="28" fill="none" stroke="#ECEAE5" strokeWidth="5" />
                  <circle cx="34" cy="34" r="28" fill="none" stroke={pct === 100 ? "#1A8A64" : "#3D50AB"} strokeWidth="5"
                    strokeDasharray={`${pct * 1.759} 175.9`} strokeLinecap="round" transform="rotate(-90 34 34)"
                    style={{ transition: "stroke-dasharray 0.4s ease" }} />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 17, fontWeight: 700 }}>{pct}%</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{total.done}/{total.total}</div>
                <div style={{ fontSize: 12, color: "#AAAABC" }}>exercises</div>
              </div>
            </div>
          </div>

          {/* Phase bars */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 24 }}>
            {[
              { phase: "Foundation", chs: ["00"] },
              { phase: "Clarity", chs: ["01","02","03","04"] },
              { phase: "Identity", chs: ["05","06","07","08"] },
              { phase: "Engine", chs: ["09","10"] },
            ].map(p => {
              const pIds = chapters.filter(c => p.chs.includes(c.number)).flatMap(c => c.exercises.map(e => e.id));
              const pDone = pIds.filter(id => state.checked[id]).length;
              const pPct = pIds.length > 0 ? Math.round((pDone / pIds.length) * 100) : 0;
              const unlocked = isPhaseUnlocked(p.phase);
              return (
                <div key={p.phase} style={{ padding: "10px 12px", background: "#FAFAF8", borderRadius: 10, border: "1px solid #ECEAE5" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: phaseConfig[p.phase].color, display: "flex", alignItems: "center", gap: 5 }}>
                      {!unlocked && <LockIcon size={11} color={phaseConfig[p.phase].color} />}
                      {p.phase}
                    </span>
                    <span style={{ fontSize: 11, color: "#AAAABC" }}>{unlocked ? `${pPct}%` : "Locked"}</span>
                  </div>
                  <div style={{ height: 4, background: "#ECEAE5", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", background: unlocked ? phaseConfig[p.phase].color : "#D0D0D8", borderRadius: 2, width: unlocked ? `${pPct}%` : "0%", transition: "width 0.4s" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* PRICING BANNER */}
      {!allUnlocked && (
        <div style={{ padding: "28px 40px 0", maxWidth: 860, margin: "0 auto" }}>
          <div style={{
            background: "linear-gradient(135deg, #F8F8F6 0%, #F0F0EE 100%)",
            borderRadius: 16, padding: "24px 28px", border: "1px solid #E8E6E1",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
              <div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
                  Unlock the full playbook
                </div>
                <div style={{ fontSize: 13, color: "#6B6B7B" }}>
                  Foundation is free. Purchase phases individually or save with the bundle.
                </div>
              </div>
              <a href={PURCHASE_LINKS.bundle} target="_blank" rel="noopener noreferrer" style={{
                padding: "10px 24px", fontSize: 14, fontWeight: 600, display: "inline-block",
                background: "linear-gradient(135deg, #1A8A64, #3D50AB)", color: "#fff",
                borderRadius: 10, textDecoration: "none", whiteSpace: "nowrap",
              }}>
                Get Full Bundle — ${PRICING.bundle.price}
              </a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {["clarity", "identity", "engine"].map(key => {
                const p = PRICING[key];
                const phaseName = key.charAt(0).toUpperCase() + key.slice(1);
                const unlocked = isPhaseUnlocked(phaseName);
                return (
                  <div key={key} style={{
                    padding: "14px 16px", background: "#fff", borderRadius: 12,
                    border: unlocked ? `1px solid ${phaseConfig[phaseName].color}30` : "1px solid #E8E6E1",
                    opacity: unlocked ? 0.6 : 1,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{p.label}</span>
                      {unlocked ? (
                        <span style={{ fontSize: 11, fontWeight: 600, color: "#1A8A64", background: "#EDFAF5", padding: "2px 8px", borderRadius: 6 }}>Unlocked</span>
                      ) : (
                        <span style={{ fontSize: 15, fontWeight: 700 }}>${p.price}</span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: "#8B8B9B", marginBottom: unlocked ? 0 : 12 }}>{p.desc}</div>
                    {!unlocked && (
                      <div style={{ display: "flex", gap: 8 }}>
                        <a href={PURCHASE_LINKS[key]} target="_blank" rel="noopener noreferrer" style={{
                          flex: 1, padding: "8px 0", fontSize: 12, fontWeight: 600, textAlign: "center",
                          background: phaseConfig[phaseName].color, color: "#fff", borderRadius: 8, textDecoration: "none",
                        }}>Purchase</a>
                        <button onClick={() => { setCodeModal(phaseName); setCodeInput(""); setCodeError(""); }}
                          style={{
                            padding: "8px 12px", fontSize: 12, fontWeight: 500,
                            background: "#F3F3F1", color: "#6B6B7B", border: "none", borderRadius: 8, cursor: "pointer",
                          }}>Have a code?</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* CHAPTERS */}
      <div style={{ padding: "28px 40px 64px", maxWidth: 860, margin: "0 auto" }}>
        {chapters.map((ch) => {
          const isOpen = active === ch.number;
          const prog = getChapterProgress(ch);
          const isDone = prog.done === prog.total;
          const unlocked = isPhaseUnlocked(ch.phase);

          return (
            <div key={ch.number} style={{
              marginBottom: 6, borderRadius: 14, overflow: "hidden",
              border: isOpen && unlocked ? `1.5px solid ${ch.accent}40` : `1px solid #ECEAE5`,
              background: "#fff", boxShadow: isOpen && unlocked ? `0 4px 20px ${ch.accent}08` : "none",
              transition: "all 0.15s", opacity: unlocked ? 1 : 0.85,
            }}>
              <div onClick={() => unlocked ? setActive(isOpen ? null : ch.number) : setCodeModal(ch.phase)}
                style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  background: !unlocked ? "#E8E6E1" : isDone ? ch.accent : isOpen ? ch.accent : ch.pill,
                  color: !unlocked ? "#AAAABC" : (isDone || isOpen ? "#fff" : ch.accent),
                  fontSize: 13, fontWeight: 700, fontFamily: "'Sora', sans-serif", transition: "all 0.2s",
                }}>
                  {!unlocked ? <LockIcon size={14} color="#AAAABC" /> :
                    isDone ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg> : ch.number}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: !unlocked ? "#AAAABC" : isDone ? ch.accent : "#1a1a2e" }}>{ch.title}</span>
                    <span style={{ fontSize: 12, color: "#BBBBCC", fontStyle: "italic" }}>{ch.subtitle}</span>
                  </div>
                  {unlocked ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 5 }}>
                      <div style={{ flex: 1, maxWidth: 110, height: 3, background: "#ECEAE5", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: "100%", background: ch.accent, borderRadius: 2, width: `${(prog.done / prog.total) * 100}%`, transition: "width 0.3s" }} />
                      </div>
                      <span style={{ fontSize: 11, color: "#AAAABC", fontWeight: 500 }}>{prog.done}/{prog.total}</span>
                    </div>
                  ) : (
                    <div style={{ fontSize: 11, color: "#BBBBCC", marginTop: 5, display: "flex", alignItems: "center", gap: 4 }}>
                      <LockIcon size={10} color="#CCC" /> Unlock {ch.phase} to access
                    </div>
                  )}
                </div>
                <span style={{
                  padding: "3px 10px", borderRadius: 8, fontSize: 10, fontWeight: 600,
                  background: isOpen && unlocked ? `${ch.accent}12` : "#F3F3F1", color: isOpen && unlocked ? ch.accent : "#AAAABC",
                  letterSpacing: "0.04em", textTransform: "uppercase",
                }}>{ch.duration}</span>
                {unlocked ? (
                  <span style={{ fontSize: 12, color: "#CCC", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
                ) : (
                  <LockIcon size={14} color="#D0D0D8" />
                )}
              </div>

              {isOpen && unlocked && (
                <div style={{ padding: "0 18px 22px", borderTop: `1px solid ${ch.accent}12` }}>
                  <div style={{ paddingLeft: 48, marginTop: 16 }}>
                    <p style={{ fontSize: 14, fontStyle: "italic", color: ch.accent, marginBottom: 10, fontWeight: 500, lineHeight: 1.5 }}>"{ch.tagline}"</p>
                    <p style={{ fontSize: 13, color: "#6B6B7B", lineHeight: 1.7, marginBottom: 22, maxWidth: 580 }}>{ch.description}</p>

                    <div style={{ marginBottom: 22 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: ch.accent, marginBottom: 12 }}>Exercises</div>
                      {ch.exercises.map((ex) => {
                        const done = state.checked[ex.id];
                        return (
                          <div key={ex.id} style={{
                            display: "flex", gap: 12, padding: "12px 14px", marginBottom: 5,
                            background: done ? `${ch.accent}06` : "#FAFAF8", borderRadius: 10,
                            borderLeft: `3px solid ${done ? ch.accent : ch.accent + "25"}`,
                          }}>
                            <button onClick={(e) => { e.stopPropagation(); toggleCheck(ex.id); }} style={{
                              width: 22, height: 22, borderRadius: 7, flexShrink: 0, marginTop: 1,
                              border: done ? `2px solid ${ch.accent}` : "2px solid #D0D0D8",
                              background: done ? ch.accent : "#fff", cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                              {done && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.5L5 9L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                            </button>
                            <div style={{ flex: 1 }}>
                              <div style={{
                                fontSize: 13, fontWeight: 600, color: done ? ch.accent : "#1a1a2e",
                                textDecoration: done ? "line-through" : "none", opacity: done ? 0.65 : 1, marginBottom: 3,
                              }}>{ex.name}</div>
                              <div style={{ fontSize: 12, color: "#8B8B9B", lineHeight: 1.55 }}>{ex.short}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div style={{ background: "#F7F7F5", borderRadius: 10, padding: "14px 16px", marginBottom: 22, border: `1px solid ${ch.accent}10` }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: ch.accent, marginBottom: 10 }}>Key Decisions</div>
                      {ch.keyDecisions.map((d, i) => (
                        <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                          <div style={{ width: 5, height: 5, borderRadius: 3, background: ch.accent, opacity: 0.4, flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: "#3a3a4e" }}>{d}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginBottom: 22 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: ch.accent, marginBottom: 12 }}>Tools & Resources</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                        {ch.tools.map((tool, i) => {
                          const tk = `${ch.number}-t-${i}`;
                          const saved = state.links[tk];
                          const editing = editingLink === tk;
                          return (
                            <div key={i} style={{
                              padding: "10px 12px", background: "#FAFAF8", borderRadius: 10,
                              border: saved ? `1px solid ${ch.accent}25` : "1px solid #ECEAE5",
                            }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <a href={tool.url} target="_blank" rel="noopener noreferrer"
                                  style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e", textDecoration: "none" }}>
                                  {tool.name} <span style={{ fontSize: 10, opacity: 0.35 }}>↗</span>
                                </a>
                                {!editing && (
                                  <button onClick={(e) => { e.stopPropagation(); setEditingLink(tk); setLinkInput(saved || ""); }}
                                    style={{ fontSize: 10, fontWeight: 600, color: saved ? ch.accent : "#AAA", background: saved ? `${ch.accent}10` : "#F0F0EE", border: "none", borderRadius: 6, padding: "2px 7px", cursor: "pointer" }}>
                                    {saved ? "linked ✓" : "+ link"}
                                  </button>
                                )}
                              </div>
                              {editing && (
                                <div style={{ display: "flex", gap: 5, marginTop: 8 }} onClick={e => e.stopPropagation()}>
                                  <input value={linkInput} onChange={e => setLinkInput(e.target.value)} placeholder="Your resource URL..." autoFocus
                                    onKeyDown={e => { if (e.key === "Enter") saveLink(tk); if (e.key === "Escape") { setEditingLink(null); setLinkInput(""); } }}
                                    style={{ flex: 1, padding: "5px 9px", fontSize: 12, border: `1px solid ${ch.accent}40`, borderRadius: 7, outline: "none", fontFamily: "inherit", background: "#fff" }} />
                                  <button onClick={() => saveLink(tk)} style={{ padding: "5px 10px", fontSize: 11, fontWeight: 600, background: ch.accent, color: "#fff", border: "none", borderRadius: 7, cursor: "pointer" }}>Save</button>
                                  <button onClick={() => { setEditingLink(null); setLinkInput(""); }} style={{ padding: "5px 8px", fontSize: 11, background: "#F0F0EE", color: "#6B6B7B", border: "none", borderRadius: 7, cursor: "pointer" }}>✕</button>
                                </div>
                              )}
                              {!editing && saved && (
                                <a href={saved.startsWith("http") ? saved : `https://${saved}`} target="_blank" rel="noopener noreferrer"
                                  style={{ fontSize: 11, color: ch.accent, textDecoration: "none", display: "block", marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{saved}</a>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* MY FILES & LINKS */}
                    <div style={{ marginBottom: 22 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: ch.accent }}>My Files & Links</div>
                        {addingMyLink !== ch.number && (
                          <button onClick={(e) => { e.stopPropagation(); setAddingMyLink(ch.number); setMyLinkLabel(""); setMyLinkUrl(""); }}
                            style={{ fontSize: 11, fontWeight: 600, color: ch.accent, background: `${ch.accent}10`, border: `1px dashed ${ch.accent}40`, borderRadius: 8, padding: "5px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                            <span style={{ fontSize: 14, lineHeight: 1 }}>+</span> Add link or file
                          </button>
                        )}
                      </div>
                      {addingMyLink === ch.number && (
                        <div style={{ padding: "14px 16px", background: "#FAFAF8", borderRadius: 12, border: `1px dashed ${ch.accent}40`, marginBottom: 10 }} onClick={e => e.stopPropagation()}>
                          <input value={myLinkLabel} onChange={e => setMyLinkLabel(e.target.value)} placeholder="Label (e.g. 'Session 1 Notes')" autoFocus
                            onKeyDown={e => { if (e.key === "Enter" && myLinkLabel.trim()) addMyLink(ch.number); if (e.key === "Escape") { setAddingMyLink(null); setMyLinkLabel(""); setMyLinkUrl(""); } }}
                            style={{ width: "100%", padding: "8px 10px", fontSize: 13, border: "1px solid #E0E0DE", borderRadius: 8, outline: "none", fontFamily: "inherit", background: "#fff", marginBottom: 8, boxSizing: "border-box" }} />
                          <input value={myLinkUrl} onChange={e => setMyLinkUrl(e.target.value)} placeholder="URL (optional)"
                            onKeyDown={e => { if (e.key === "Enter" && myLinkLabel.trim()) addMyLink(ch.number); if (e.key === "Escape") { setAddingMyLink(null); setMyLinkLabel(""); setMyLinkUrl(""); } }}
                            style={{ width: "100%", padding: "8px 10px", fontSize: 13, border: "1px solid #E0E0DE", borderRadius: 8, outline: "none", fontFamily: "inherit", background: "#fff", marginBottom: 10, boxSizing: "border-box" }} />
                          <div style={{ display: "flex", gap: 6 }}>
                            <button onClick={() => addMyLink(ch.number)} disabled={!myLinkLabel.trim()}
                              style={{ padding: "7px 16px", fontSize: 12, fontWeight: 600, background: myLinkLabel.trim() ? ch.accent : "#D0D0D8", color: "#fff", border: "none", borderRadius: 8, cursor: myLinkLabel.trim() ? "pointer" : "default" }}>Add</button>
                            <button onClick={() => { setAddingMyLink(null); setMyLinkLabel(""); setMyLinkUrl(""); }}
                              style={{ padding: "7px 14px", fontSize: 12, background: "#F0F0EE", color: "#6B6B7B", border: "none", borderRadius: 8, cursor: "pointer" }}>Cancel</button>
                          </div>
                        </div>
                      )}
                      {(state.myLinks[ch.number] || []).length > 0 ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                          {(state.myLinks[ch.number] || []).map((entry) => (
                            <div key={entry.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "#FAFAF8", borderRadius: 10, border: "1px solid #ECEAE5" }}>
                              <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: entry.url ? `${ch.accent}12` : "#F0F0EE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>
                                {entry.url ? "🔗" : "📄"}
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                {entry.url ? (
                                  <a href={entry.url.startsWith("http") ? entry.url : `https://${entry.url}`} target="_blank" rel="noopener noreferrer"
                                    style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e", textDecoration: "none" }}>{entry.label} <span style={{ fontSize: 10, opacity: 0.35 }}>↗</span></a>
                                ) : (
                                  <span style={{ fontSize: 13, fontWeight: 600 }}>{entry.label}</span>
                                )}
                                {entry.url && <div style={{ fontSize: 11, color: "#AAAABC", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 2 }}>{entry.url}</div>}
                              </div>
                              <button onClick={(e) => { e.stopPropagation(); removeMyLink(ch.number, entry.id); }}
                                style={{ width: 24, height: 24, borderRadius: 6, border: "none", background: "transparent", color: "#CCC", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                                onMouseEnter={e => e.currentTarget.style.color = "#E55"} onMouseLeave={e => e.currentTarget.style.color = "#CCC"}>×</button>
                            </div>
                          ))}
                        </div>
                      ) : addingMyLink !== ch.number && (
                        <div style={{ padding: "20px 16px", background: "#FAFAF8", borderRadius: 12, border: "1px dashed #DDDDD8", textAlign: "center" }}>
                          <div style={{ fontSize: 20, marginBottom: 6, opacity: 0.4 }}>📎</div>
                          <div style={{ fontSize: 12, color: "#AAAABC" }}>Drop your notes, docs, files, and links here</div>
                        </div>
                      )}
                    </div>

                    <div style={{ padding: "14px 16px", background: `${ch.accent}08`, borderRadius: 10, border: `1px solid ${ch.accent}12` }}>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: ch.accent, marginBottom: 4 }}>Deliverable</div>
                      <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600 }}>{ch.deliverable}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ borderTop: "1px solid #E8E6E1", padding: "20px 40px", display: "flex", justifyContent: "space-between", maxWidth: 860, margin: "0 auto" }}>
        <span style={{ fontSize: 12, color: "#AAAABC" }}>Marketing for Good — v2.0</span>
        <span style={{ fontSize: 12, color: "#AAAABC" }}>{total.done}/{total.total} complete</span>
      </div>
    </div>
  );
}
