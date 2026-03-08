import { useState, useEffect, useCallback } from "react";

// ─── PHASE COLOR SYSTEM ───────────────────────────────────────────────────────
const PC = {
  1: { accent:"#1B5E8A", light:"#D8EAF5", name:"Brand Build" },
  2: { accent:"#7B3FA0", light:"#EEE0F7", name:"Digital Presence" },
  3: { accent:"#1A4FA8", light:"#D6E4F8", name:"Monetization" },
  4: { accent:"#1A7A3F", light:"#D3EEE0", name:"Launch Strategy" },
  5: { accent:"#B54018", light:"#FAE3D9", name:"Growth & Retention" },
  6: { accent:"#1E7A68", light:"#CDEAE4", name:"Partnerships" },
  7: { accent:"#6B3AB5", light:"#E9DEFC", name:"Fundraising" },
};

// ─── LEMON SQUEEZY LINKS (replace with real product URLs) ─────────────────────
const LS = {
  p1a:    "https://alexkrump.lemonsqueezy.com/checkout/buy/1cdb8d8f-4826-4fec-a982-9a3fff79ca86",
  p1b:    "https://alexkrump.lemonsqueezy.com/checkout/buy/4efee914-1184-47ac-b5c6-f99607cff881",
  p1full: "https://alexkrump.lemonsqueezy.com/checkout/buy/89d72247-d1fa-417c-bd8d-0d01f68d17cb",
  bundle: "https://marketingforgood.lemonsqueezy.com/checkout/buy/full-bundle",
};

// ─── PRICING TABLE ─────────────────────────────────────────────────────────────
const PRICING = [
  { phase:1, sectionA:"$39", sectionB:"$49", full:"$79",  savings:"save $9",  labelA:"Foundation & Clarity", labelB:"Identity & Sign-Off",           chapA:"Ch. 00–04", chapB:"Ch. 05–08" },
  { phase:2, sectionA:"$35", sectionB:"$45", full:"$59",  savings:"save $21", labelA:"Platform & Website",    labelB:"Content, Email & SEO",           chapA:"Ch. 01–02", chapB:"Ch. 03–05" },
  { phase:3, sectionA:"$29", sectionB:"$39", full:"$49",  savings:"save $19", labelA:"Model & Pricing",       labelB:"Economics & Value Ladder",       chapA:"Ch. 01–02", chapB:"Ch. 03–04" },
  { phase:4, sectionA:"$35", sectionB:"$45", full:"$59",  savings:"save $21", labelA:"Scope & Pre-Launch",    labelB:"Launch Day & Post-Launch",       chapA:"Ch. 01–02", chapB:"Ch. 03–04" },
  { phase:5, sectionA:"$39", sectionB:"$49", full:"$69",  savings:"save $19", labelA:"Retention & Referral",  labelB:"Paid Acquisition & Community",   chapA:"Ch. 01–02", chapB:"Ch. 03–04" },
  { phase:6, sectionA:"$35", sectionB:"$45", full:"$59",  savings:"save $21", labelA:"Strategy & Platforms",  labelB:"Affiliate, Ambassador & B2B",    chapA:"Ch. 01–02", chapB:"Ch. 03–04" },
  { phase:7, sectionA:"$45", sectionB:"$59", full:"$89",  savings:"save $15", labelA:"Decision & Narrative",  labelB:"Pitch Deck & Process",           chapA:"Ch. 01–02", chapB:"Ch. 03–04" },
];

// ─── CHAPTERS ──────────────────────────────────────────────────────────────────
const CHAPTERS = [
  {
    number:"00", section:"A", phase:"Foundation", title:"The Intake", subtitle:"What are we actually working with?",
    duration:"60 min", tagline:"Before you strategize, you need to audit. What exists, what doesn't, and what's broken.",
    description:"Every brand engagement starts with an honest assessment of where things stand right now. This isn't about vision yet — it's about inventory. What assets exist? What decisions have already been made (consciously or not)? What's the founder's actual capacity, budget, and timeline? Most frameworks skip this step and jump into vision work. That's a mistake — you can't build a plan without knowing the starting conditions.",
    exercises:[
      { id:"00-1", name:"The Brand Inventory Checklist", short:"A complete audit of every brand asset and touchpoint that currently exists — or doesn't.", detail:`The goal is to create a single document showing exactly what you're working with. Mark each item: EXISTS (usable), NEEDS WORK, or DOESN'T EXIST.

DIGITAL PRESENCE:
• Domain name — Purchased? Right name?
• Website — What platform? Live or draft?
• Social handles — Instagram, TikTok, Twitter/X, LinkedIn, YouTube. Use Namechk.com to check all at once.
• Email — Branded (hello@brand.com) or personal Gmail?

VISUAL ASSETS:
• Logo — Have one? What formats (.svg, .png, .ico)?
• Color palette — Defined hex codes or guessing?
• Fonts — Specific fonts chosen?
• Photography — Brand photos or stock?

CONTENT & COPY:
• Tagline or slogan
• Brand description (1 paragraph)
• Any marketing copy — landing page, social bios, pitch deck

LEGAL:
• Legal entity (LLC, Corp, etc.)
• Trademark search done?
• Payment processing set up?

Create a spreadsheet: Asset | Status | Notes. This becomes your master to-do list.` },
      { id:"00-2", name:"The Honest Capacity Assessment", short:"Realistic evaluation of time, budget, skills, and constraints — no aspirational answers.", detail:`This prevents the most common brand-building failure: overcommitting. Answer with REAL numbers.

TIME:
• Hours per week you can REALISTICALLY dedicate? (Not 'I'll make time.')
• Co-founder or team contributing hours?

BUDGET:
• Total budget for entire brand development?
• Can you hire a freelance designer? (Logo + brand kit: $500–$3,000 typical)
• Paid tools or strictly free tiers?

SKILLS (rate each 1–10):
• Copywriting • Visual design (Canva/Figma) • Web building
• Social content • Video/photo • Analytics

CONSTRAINTS:
• Hard deadline? (Event, investor meeting, beta launch)
• Non-negotiables?
• Topics or approaches off the table?

This becomes the scope agreement — what's realistic given actual resources.` },
      { id:"00-3", name:"The Decision Audit", short:"Map every brand decision into DECIDED / LEANING / OPEN — so you know what still needs figuring out.", detail:`Create a three-column table. For each decision, place it in one column:

DECIDED (locked, not revisiting)
LEANING (preference but open to change)
OPEN (no idea yet)

DECISIONS TO CATEGORIZE:
• Brand name • Target audience • Price point • Platform
• Monetization model • Visual style • Tone of voice • Launch timeline
• Primary content channel • Partnership approach • Investor path

WHY: DECIDED items get documented and never re-discussed. LEANING items get a quick review in the relevant chapter. OPEN items are what this playbook resolves.` },
    ],
    keyDecisions:["Hard launch deadline?","Real budget?","Which decisions are locked vs. open?","Weekly time commitment?","Which skills to outsource?"],
    tools:[
      { name:"Notion", url:"https://notion.so", use:"Project hub — free brand strategy templates" },
      { name:"Google Sheets", url:"https://sheets.google.com", use:"Brand inventory checklist and decision audit table" },
      { name:"Namecheap", url:"https://namecheap.com", use:"Domain availability and pricing" },
      { name:"Namechk", url:"https://namechk.com", use:"Check social handle availability across 30+ platforms at once" },
    ],
    deliverable:"Brand Intake Brief",
    deliverableDetail:"2–3 page doc: inventory checklist, capacity assessment, decision audit, timeline, and scope agreement.",
    note:"This session feels unglamorous. That's the point. Founders who skip intake and jump to colors are the ones who rebrand 6 months later.",
  },
  {
    number:"01", section:"A", phase:"Clarity", title:"Discovery & Vision", subtitle:"Why does this exist?",
    duration:"90 min", tagline:"If you can't explain the problem you solve in one sentence, you don't have a brand yet.",
    description:"This chapter strips away inspirational fluff and forces concrete answers: What specific problem does this solve? Who has it badly enough to pay? Why are you the one to build it? Defining your brand purpose — the reason your company exists beyond making money — is the single most important step.",
    exercises:[
      { id:"01-1", name:"The Problem Statement Sprint", short:"Write the exact problem your product solves in one sentence using a format that forces precision.", detail:`This is the most important sentence in the entire process. Every headline, ad, pitch, and feature decision traces back here.

SET A 10-MINUTE TIMER.

FORMAT:
"[Specific group of people] struggle with [specific problem] because [root cause]. Current solutions fail them by [specific gap]."

RULES:
• No abstractions. 'Busy professionals' = too vague. 'Women 30–45 returning to fitness after pregnancy' = real.
• No jargon. Grandmother test every word.
• No features. This is about the PROBLEM.
• The 'because' identifies root cause, not symptom.
• The 'fail them by' creates your competitive opening.

WRITE 5 VERSIONS. Read each aloud. Which one makes you say 'yes, THAT's it'?

❌ 'People need a better fitness app.'
✅ 'Women over 30 rebuilding fitness habits after major life changes struggle to stick with any program because every app assumes 60 minutes, gym access, and existing knowledge. Current solutions fail by offering one-size-fits-all plans that don't adapt to chaotic schedules.'

TEST: Read to someone unfamiliar. If they say 'I know someone like that' — nailed it.` },
      { id:"01-2", name:"The Transformation Test", short:"Map exactly what changes in your customer's life — with concrete, observable details.", detail:`Your product isn't the hero — your customer is. Your product enables their transformation.

CREATE A TWO-COLUMN TABLE: BEFORE (without product) | AFTER (with product)

Fill each row with SPECIFIC, OBSERVABLE details:

DAILY ROUTINE:
• Before: 'Opens 3 apps. Spends 20 min figuring out what to do. Gets overwhelmed. Doesn't work out.'
• After: 'Opens one app. Sees a 25-min workout adjusted for energy level. Done by 7:15am.'

WEEKLY OUTCOME:
• Before: 'Starts strong Monday, quits by Thursday. Averages 1 workout/week.'
• After: 'Completes 4 of 5 planned workouts.'

EMOTIONAL STATE:
• Before: 'Feels like fitness is for other people.'
• After: 'Fitness is a normal part of her week.'

WHAT THEY TELL FRIENDS:
• Before: 'I keep trying but can't stick with anything.'
• After: 'I've actually worked out 4 times a week for a month.'

THE GAP = YOUR VALUE PROPOSITION. Bigger and more specific = more compelling marketing.` },
      { id:"01-3", name:"The Operational Values Exercise", short:"Define 3 values that actually mean something by forcing them to pass a cost test.", detail:`Most brand values are wallpaper. 'Innovation.' 'Quality.' A real value survives a cost test.

STEP 1: BRAINSTORM
List 10 words: accessibility, simplicity, honesty, empowerment, inclusivity, fun, science-backed, accountability, community, personalization.

STEP 2: THE COST TEST
For each, complete:
'We WILL _____ even when costly.'
'We NEVER _____ even when profitable.'

EXAMPLE:
• Accessibility: 'We WILL always have a meaningful free tier. We NEVER gate basic tracking behind a paywall.'

STEP 3: CUT
Can't finish both sentences? Cross it out. End with exactly 3.

STEP 4: Write 2–3 sentences of definition for each — not a tagline, an operating principle anyone could apply to a real decision.` },
      { id:"01-4", name:"The Mission Statement", short:"Write your mission in under 15 words — and test it against three criteria.", detail:`A mission answers: 'What do we do, for whom, why does it matter?' Under 15 words.

STEP 1: WRITE 5 VERSIONS
Formats:
• 'We [verb] [audience] to [outcome].'
• 'Making [outcome] possible for [audience].'
• '[Outcome] for [audience] who [constraint].'

STEP 2: THREE TESTS
1. CLARITY — Show to 3 people with zero context. Do they understand what you do?
2. SPECIFICITY — Could a competitor use the same statement? If yes, too generic.
3. MOTIVATION — Does reading it energize you?

STEP 3: PICK ONE. This is your internal north star — not a tagline.` },
    ],
    keyDecisions:["One-sentence problem statement finalized?","Measurable before/after transformation?","3 operational values with cost-test definitions?","Mission statement under 15 words?"],
    tools:[
      { name:"Hemingway Editor", url:"https://hemingwayapp.com", use:"Paste your problem statement — flags complexity. Aim for Grade 6." },
      { name:"Miro", url:"https://miro.com", use:"Free collaborative whiteboard for the transformation grid" },
      { name:"Loom", url:"https://loom.com", use:"Record yourself answering verbally — more honest than writing" },
    ],
    deliverable:"Vision & Foundation Document",
    deliverableDetail:"Problem statement (1 sentence), transformation grid (before/after × 4 dimensions), 3 values with cost-test definitions, mission statement (under 15 words).",
    note:"If the founder can't write the problem statement in 10 minutes, the problem isn't clear yet. Don't move forward until this is tight.",
  },
  {
    number:"02", section:"A", phase:"Clarity", title:"Competitive Landscape & Niche", subtitle:"What exists and where's the gap?",
    duration:"2–3 hr", tagline:"You can't differentiate if you don't know what you're differentiating from.",
    description:"A research session. You'll look at every relevant competitor, document positioning, pricing, and gaps. The only path to survival in a crowded space is finding a specific gap and owning it.",
    exercises:[
      { id:"02-1", name:"The Competitor Database Build", short:"Structured spreadsheet of 8–12 competitors with consistent criteria for real comparison.", detail:`CREATE A SPREADSHEET WITH THESE COLUMNS:
1. Competitor Name & URL
2. One-Line Description
3. Primary Audience (specific)
4. Pricing (exact tiers)
5. Key Features (top 5)
6. What They Do Well (2–3)
7. What They Do Poorly or Skip (2–3)
8. Visual Style (screenshot homepage)
9. Tone of Voice (copy their main headline)
10. App Store Rating + Top Complaint (from 1–3 star reviews)

WHO TO INCLUDE:
• Direct: Apps doing roughly what yours does
• Indirect: What people use INSTEAD (trainer, YouTube, spreadsheet, nothing)
• Adjacent: Products that might expand into your space

WHERE TO FIND COMPETITORS:
• App Store — search category keywords
• Product Hunt — search your category
• Google — '[category] alternatives'
• Reddit — 'best [category] app'
• G2 / Capterra — app reviews` },
      { id:"02-2", name:"The 2×2 Positioning Map", short:"Visualize where competitors sit and find the open space where you can win.", detail:`STEP 1: CHOOSE TWO AXES
Pick the two dimensions that matter most to your customer:

Horizontal: Human-led ↔ AI-driven | Generalist ↔ Specialist | Content-heavy ↔ Tool-focused
Vertical: Affordable ↔ Premium | Accountability ↔ Self-directed | Beginner ↔ Advanced

STEP 2: PLACE COMPETITORS — plot each as a dot on Miro, FigJam, or paper.

STEP 3: FIND WHITESPACE. But whitespace alone isn't enough:
• Is there DEMAND here?
• Can you CREDIBLY fill it?
• Is it BIG ENOUGH?

STEP 4: MARK YOUR SPOT. Put a star where your brand will live. Screenshot — reference it throughout.` },
      { id:"02-3", name:"The Gap Analysis & Niche Definition", short:"Turn whitespace into a clear niche claim and define who you're NOT for.", detail:`STEP 1: LIST THE GAPS
• 3 things NONE of your competitors do?
• Audience segments they ALL ignore?
• Missing pricing tier?
• Most common 1–3 star review complaint?

STEP 2: SCORE EACH GAP (1–5)
• PAIN: How badly felt?
• FIT: Can you credibly fill it?
• MARKET: Big enough?

STEP 3: NICHE STATEMENT
'For [audience], [Brand] is the [category] that [differentiator], unlike [competitor] which [what they do instead].'

STEP 4: ANTI-POSITIONING
'We are NOT for [group] who want [thing].'
Example: 'We are NOT for hardcore athletes wanting max-performance programs. We are for people who've fallen out of the fitness habit.'` },
    ],
    keyDecisions:["8–12 competitors identified?","Positioning map drawn?","Whitespace identified?","Niche statement written?","Anti-positioning defined?"],
    tools:[
      { name:"Google Sheets", url:"https://sheets.google.com", use:"Competitor database — structured, sortable, shareable" },
      { name:"App Store", url:"https://apps.apple.com", use:"1–3 star reviews of competitors = best source of unmet needs" },
      { name:"Product Hunt", url:"https://producthunt.com", use:"Discover competitors and read early user reactions" },
      { name:"SimilarWeb", url:"https://similarweb.com", use:"Free traffic estimates and audience overlap data" },
      { name:"Miro", url:"https://miro.com", use:"Build the 2×2 positioning map visually" },
    ],
    deliverable:"Competitive Landscape Report + Niche Definition",
    deliverableDetail:"Competitor database (8–12 entries), positioning map with your spot marked, gap analysis (scored), niche statement, anti-positioning statement.",
    note:"Most common failure: 'but we're for everyone.' Occupying the center means competing with everyone. Edges are where defensible brands live.",
  },
  {
    number:"03", section:"A", phase:"Clarity", title:"Customer Persona", subtitle:"Who is this person — specifically?",
    duration:"2 hr", tagline:"Demographics tell you who they are on paper. Psychographics tell you why they'll buy.",
    description:"A persona built on real research, not guesses. Uses Jobs to Be Done theory: people don't buy products — they hire them to do a job. Understanding that 'job' is the key to everything.",
    exercises:[
      { id:"03-1", name:"The Research Sprint (45 min)", short:"45 minutes of structured research collecting real quotes from real people — not optional.", detail:`SET A 45-MINUTE TIMER. Open a doc titled 'Language Bank.' You need minimum 20 quotes.

SOURCE 1 — REDDIT (15 min)
Subreddits relevant to your niche. Search: 'frustrated,' 'gave up,' 'wish there was,' 'finally found,' 'I keep trying.'
Copy-paste EXACT quotes with context.

SOURCE 2 — APP STORE REVIEWS (15 min)
Top 3 competitors → filter to 2–3 stars. Copy quotes about:
• What they hoped for • What disappointed them • What made them delete it

SOURCE 3 — FB GROUPS / QUORA (15 min)
Copy quotes about struggles, what they've tried, what success looks like.

ORGANIZE BY THEME:
• Frustration quotes • Desire quotes • Trigger quotes • Success quotes

WHY: When you use your customer's exact words, your marketing feels like mind-reading.` },
      { id:"03-2", name:"The Persona Build", short:"Create one specific person using your research — a full human, not a demographic profile.", detail:`Using your Language Bank, fill out:

NAME: First name only. ('Would Sarah click this?' > 'Would our target audience click this?')
AGE & LIFE STAGE: Specific. '34, married, one toddler, back at work 6 months' — not '25–40, professional'
DAILY LIFE: Typical weekday in detail.
HISTORY: What they've tried, what worked temporarily, what failed, why they stopped.
CURRENT PAIN — IN THEIR WORDS: Pull directly from Language Bank. Exact quotes.
TRIGGER MOMENT: What makes them search TODAY? 'Saw photo at family event.' 'Doctor mentioned blood pressure.'
SUCCESS METRIC — THEIR DEFINITION: Not yours. 'Worked out 3x this week without dreading it.'
DEALBREAKER: What makes them delete week 1? 'Workouts too long.' 'Too much data entry.'
WHAT THEY'D TELL A FRIEND: This = your referral language.

PRINT AND PIN IT. Every decision filters through: 'Would [Name] care about this?'` },
      { id:"03-3", name:"The Day-in-the-Life Map", short:"Map a typical weekday in 2-hour blocks to find where your product naturally fits.", detail:`Create a timeline, 6am–11pm, in 2-hour blocks.

FOR EACH BLOCK:
[Time] — [Activity] — [Device] — [Energy 1–5] — [Mood] — [Product opportunity?]

EXAMPLE:
6–8am: Gets toddler ready — Phone (passive) — Energy 3 — Stressed — OPPORTUNITY: Quick 10-min workout?
8–10am: Commute + work — Energy 4 — Focused — LOW OPPORTUNITY
12–2pm: Lunch break — Phone — Energy 3 — Needs break — OPPORTUNITY: 20-min session
4–6pm: Pickup, dinner, chaos — Energy 1 — Depleted — NO
8–10pm: Finally alone — Phone/tablet — Energy 2 — Decompressing — OPPORTUNITY: 20-min workout?

KEY INSIGHTS:
• When are 1–2 realistic engagement windows?
• Ideal notification timing?
• What format fits — quick video? Audio? Text?` },
    ],
    keyDecisions:["Primary persona created?","Exact words for the problem collected?","Trigger moment identified?","Week-1 dealbreaker known?","Best 1–2 engagement windows?"],
    tools:[
      { name:"Reddit", url:"https://reddit.com", use:"Primary research — search niche subreddits with emotional keywords" },
      { name:"AnswerThePublic", url:"https://answerthepublic.com", use:"Every question people ask about your topic, visualized" },
      { name:"SparkToro", url:"https://sparktoro.com", use:"Where your audience hangs out online" },
    ],
    deliverable:"Primary Persona Document + Language Bank",
    deliverableDetail:"Persona card (name, context, pain in their words, trigger, success metric, dealbreaker, referral language), day-in-the-life timeline, language bank (20+ quotes by theme).",
    note:"If the founder says 'I know my customer,' ask for 3 real people who fit. Can't name them? Persona is a guess. Research sprint is non-negotiable.",
  },
  {
    number:"04", section:"A", phase:"Clarity", title:"Brand Positioning & Strategy", subtitle:"What is your actual claim?",
    duration:"90 min", tagline:"Positioning is the single most leveraged decision. Get this wrong and nothing else matters.",
    description:"Compresses chapters 01–03 into the strategic core. Understand what customers value, identify where competitors fall short, claim that territory. The output of this session governs every marketing decision from here forward.",
    exercises:[
      { id:"04-1", name:"The Differentiation Filter", short:"List every feature, then systematically eliminate everything that isn't a true differentiator.", detail:`STEP 1: LIST EVERYTHING — every feature, approach, philosophy. Be exhaustive.

STEP 2: THREE FILTERS

FILTER 1 — UNIQUENESS: Does any competitor do this?
If yes → cross off. 'Personalized plans' isn't a differentiator if 8 competitors offer it.

FILTER 2 — RELEVANCE: Does your persona care?
Unique but irrelevant? Not a differentiator.

FILTER 3 — SUSTAINABILITY: Can you maintain for 2+ years?
Could a competitor copy in 3 months? → temporary, not a pillar.

STEP 3: You need exactly 3 pillars. If nothing survives all filters, that's a product problem, not a marketing one.

STEP 4: NAME THEM
• 'Chaos-proof scheduling' — adapts to your actual day
• 'No gym required' — bodyweight or minimal equipment
• 'Built for restarters' — designed for rebuilding, not maintaining` },
      { id:"04-2", name:"The Positioning Statement", short:"Fill in a precise template — your internal strategic document governing all marketing.", detail:`NOT a tagline. NOT marketing copy. Internal strategic tool.

TEMPLATE:
'For [specific audience],
[Brand] is the [category]
that delivers [primary benefit]
by [how, differently].
Unlike [primary competitor],
we [key difference].'

EXAMPLE:
'For women over 30 rebuilding fitness habits after major life changes, [Brand] is the AI-powered fitness app that delivers workouts that fit chaotic schedules by adapting every session to available time, energy, and equipment. Unlike Peloton, which requires significant time and equipment, we meet you where you are with workouts starting at 10 minutes.'

TEST: Ask someone unfamiliar: 'What does this company do? Who is it for? How is it different?' If they answer all three — positioning is clear.` },
      { id:"04-3", name:"The Pitch Ladder", short:"15-second, 60-second, and 5-minute pitches — each must work independently.", detail:`15-SECOND (The Hook):
Lead with PROBLEM. 'Most fitness apps assume you have an hour, a gym, and motivation. We built one for people who have none of those — and it works anyway.'

60-SECOND (The Elevator):
1. Problem (10s) 2. Gap — why solutions fail (10s) 3. What you do differently (15s) 4. How it works (15s) 5. One evidence point (10s)

5-MINUTE (The Coffee):
1. Market problem (30s) 2. Why solutions fail + examples (45s) 3. Your approach (60s) 4. Your customer — vivid and real (30s) 5. Product walkthrough (60s) 6. Business model (30s) 7. Traction (30s) 8. The ask (15s)

PRACTICE: Record all three on Loom. The 15-second should roll off your tongue. The 60 should feel conversational. The 5-minute should feel like a story.` },
    ],
    keyDecisions:["3 differentiation pillars named and tested?","Internal positioning statement written?","Customer-facing value proposition?","15-second pitch without notes?"],
    tools:[
      { name:"Notion", url:"https://notion.so", use:"Write and iterate — needs version history" },
      { name:"Loom", url:"https://loom.com", use:"Record pitches, watch back, refine" },
    ],
    deliverable:"Brand Strategy One-Pager",
    deliverableDetail:"3 named differentiation pillars, internal positioning statement, value proposition, 15/60/300-second pitches, 'We are NOT' statement.",
    note:"This often reveals product gaps. If the differentiation filter kills everything, the honest next step is 'build something more specific' — not 'find better marketing language.'",
  },
  {
    number:"05", section:"B", phase:"Identity", title:"Brand Personality & Voice", subtitle:"How does this brand talk?",
    duration:"90 min", tagline:"If you removed the logo, would anyone know it was you?",
    description:"Defines brand personality with precision. Based on the 12 brand archetypes framework. The goal: two different people can write content and it sounds like the same person.",
    exercises:[
      { id:"05-1", name:"The Archetype Selection", short:"Review 12 archetypes, select primary + secondary, study brands with your combination.", detail:`THE 12 ARCHETYPES:
• The Innocent — Optimism, simplicity, honesty. (Dove, Coca-Cola)
• The Sage — Knowledge, wisdom, expertise. (Google, TED, Harvard)
• The Explorer — Freedom, adventure, discovery. (Patagonia, Jeep, REI)
• The Outlaw — Disruption, rebellion, change. (Harley-Davidson, Virgin)
• The Magician — Transformation, vision, possibility. (Apple, Disney)
• The Hero — Courage, mastery, achievement. (Nike, Under Armour)
• The Lover — Intimacy, passion, connection. (Chanel)
• The Jester — Fun, humor, lightness. (Old Spice, Mailchimp, Wendy's)
• The Everyman — Belonging, reliability, groundedness. (IKEA, Target)
• The Caregiver — Nurturing, support, service. (Johnson & Johnson, TOMS)
• The Ruler — Order, control, leadership. (Mercedes, American Express)
• The Creator — Innovation, imagination, originality. (Lego, Adobe)

STEP 1: Read all 12. Mark any that feel like your brand.
STEP 2: Narrow to 2. Primary drives voice and tone. Secondary adds nuance.
STEP 3: Find 3 brands with your combination. Study their copy.
STEP 4: Write one paragraph explaining why your primary fits. If you can't — you picked wrong.` },
      { id:"05-2", name:"The Tone Scorecard", short:"Rate 4 spectrums with single numbers and written justifications.", detail:`Score each 1–10, then write 1–2 sentences explaining why.

1. FORMAL (1) ↔ CASUAL (10)
2. SERIOUS (1) ↔ PLAYFUL (10)
3. RESERVED (1) ↔ EXPRESSIVE (10)
4. TECHNICAL (1) ↔ SIMPLE (10)

EXAMPLE:
Tone 7/10 casual: 'We speak like a knowledgeable friend, not a health professional. Complete sentences, real words, no jargon.'
Serious 4/10: 'We're warm and occasionally witty but fitness outcomes matter — we don't joke about progress.'

These four numbers become the calibration tool for every piece of content.` },
      { id:"05-3", name:"The Vocabulary Guide", short:"20 'we say / we never say' pairs defining your language.", detail:`Create a table: WE SAY | WE NEVER SAY

TONE WORDS (5 pairs):
• We say: 'real' / We never say: 'authentic' (overused)
• We say: 'fits your life' / We never say: 'optimized for your lifestyle'

MOTIVATION LANGUAGE (5 pairs):
• We say: 'you've got this' / We never say: 'crush it'
• We say: 'at your pace' / We never say: 'no excuses'

PRODUCT TERMS (5 pairs):
• We say: 'your plan' / We never say: 'the algorithm'
• We say: 'workouts' / We never say: 'training sessions'

COMPETITOR COMPARISONS (5 pairs):
• We say: 'built for real life' / We never say: 'unlike Peloton'
• We say: 'no gym needed' / We never say: 'better than a personal trainer'

Share this with every person who writes for the brand.` },
      { id:"05-4", name:"Voice in Action (8 Scenarios)", short:"Write actual copy for 8 real scenarios to test consistency.", detail:`Write actual words — not descriptions. Real copy that would appear in the product or marketing.

1. App store description (first 3 lines before 'more')
2. Welcome notification (first message after signup)
3. Missed workout message (user hasn't opened app in 5 days)
4. Instagram caption (for an achievement post)
5. Negative review response (someone left 2 stars)
6. 404 page (they hit a broken link)
7. Re-engagement email (subject line + first paragraph)
8. Press description (one paragraph for a journalist)

TEST: Read all 8 aloud. Does it sound like the same person wrote them? If not, tone scores need more specificity.` },
    ],
    keyDecisions:["Primary + secondary archetypes with rationale?","4 tone scores with written justifications?","20 vocabulary pairs complete?","Voice consistent across all 8 scenarios?"],
    tools:[
      { name:"Iconic Fox Archetypes", url:"https://iconicfox.com.au/brand-archetypes", use:"Most comprehensive free archetype guide with examples" },
      { name:"Hemingway Editor", url:"https://hemingwayapp.com", use:"Match copy to your 'Simple' score" },
    ],
    deliverable:"Brand Voice Guide",
    deliverableDetail:"Archetypes with rationale, tone scorecard (4 scores + justifications), vocabulary guide (20 pairs), 8 voice-in-action scenarios as ready-to-use copy.",
    note:"The 8-scenario test is the real test. If voice is inconsistent, personality needs more work. Share the vocabulary guide with every person who writes for the brand.",
  },
  {
    number:"06", section:"B", phase:"Identity", title:"Visual Identity System", subtitle:"What does this brand look like?",
    duration:"3–4 hr", tagline:"Every visual choice is strategic — it attracts or repels your audience.",
    description:"Covers mood, color, typography, logo, and layout. Includes the Brand Vibe Selector — an 'if this then that' framework connecting strategic decisions to concrete visual choices. Visual identity is downstream of strategy. If you're going back and forth, positioning isn't settled yet.",
    exercises:[
      { id:"06-1", name:"Brand Vibe Selector", short:"Rate 5 dimensions to create a vibe profile that maps directly to design decisions.", detail:`Score each 1–10:
1. BOLD (1) ↔ SOFT (10)
2. DARK (1) ↔ LIGHT (10)
3. PLAYFUL (1) ↔ SERIOUS (10)
4. MINIMAL (1) ↔ RICH (10)
5. WARM (1) ↔ COOL (10)

HOW SCORES MAP TO DESIGN:
~2s (Bold+Dark+Serious) = dark backgrounds, heavy sans-serif, photography-forward, high contrast. Think: Nike, Squarespace, Apple.
~8s (Soft+Light+Playful) = pastel palette, rounded fonts, illustration, white space. Think: Headspace, Mailchimp.
~8s Serious+Minimal = clean whites, serif typography, editorial. Think: Glossier.

Your scores create a brief for a designer — or a decision filter for DIY.` },
      { id:"06-2", name:"Mood Board Sprint (30 min)", short:"Collect 25–30 images fast, then edit to 10–12. The edit reveals the direction.", detail:`SET A 30-MINUTE TIMER.

Open Pinterest or Figma. Collect 25–30 images without overthinking:
• Brands you admire (not in your category)
• Color palettes that feel right
• Typography that stops you
• Photography styles you respond to
• App interfaces (use Mobbin.com)

DON'T EDIT WHILE COLLECTING. Speed matters — your gut is more honest than your brain at speed.

THEN EDIT TO 10–12. Remove anything that doesn't feel essential.

Look at what survives. Write 5 adjectives. These become your visual brief. If there's no common thread, you collected aspirationally rather than strategically — run it again with your vibe scores in front of you.` },
      { id:"06-3", name:"Color Palette Framework", short:"Choose 5 colors using psychology, competitor analysis, and accessibility.", detail:`YOUR 5 COLORS:
1. Primary — Buttons, headlines, key UI elements
2. Secondary — Backgrounds, secondary UI
3. Accent — CTAs, the color that pops
4. Neutral Light — Off-white, warm cream
5. Neutral Dark — Near-black, deep navy

FOR EACH: hex code, emotion it conveys, whether any competitor uses it, WCAG AA contrast check.

COLOR PSYCHOLOGY:
• Blue: Trust, calm, tech • Green: Growth, health
• Orange: Energy, warmth, action • Purple: Creativity, premium
• Red: Urgency, passion • Yellow: Optimism, attention

THE STRONGEST MOVE: What color dominates across all competitors? Go a different direction.

ACCESSIBILITY: Every text/background combo must pass WCAG AA (4.5:1 ratio). Use webaim.org/resources/contrastchecker before finalizing.` },
      { id:"06-4", name:"Typography Framework", short:"Display + body fonts. Serif vs. sans-serif decision tree.", detail:`You need two fonts: one for headlines, one for body text.

SERIF = authority, editorial, heritage, premium. Best for: wellness brands wanting credibility.
SANS-SERIF = modern, clean, tech, accessible. Best for: apps, tech products.

YOUR PAIRING FORMULA:
• Contrast is the goal. Serif headline + sans-serif body works almost universally.
• Two sans-serifs work if there's clear weight/size contrast.

STEP 1: Go to Google Fonts. Filter by your vibe profile.
STEP 2: Find 3 display candidates. Test each with your actual brand name in large type.
STEP 3: Find a body pairing at Fontpair.co.
STEP 4: Show top 3 pairings to 3 people: 'What kind of company does this look like?'` },
      { id:"06-5", name:"Logo Design Brief", short:"Logo types, the 5-context test, and how to brief a designer.", detail:`LOGO TYPES:
• Wordmark — Brand name in custom typeface. (Google, FedEx) Best for early-stage.
• Lettermark — Initials only. (IBM, HBO) Best for long names.
• Icon + Wordmark — Symbol alongside name. (Apple)
• Abstract mark — Non-literal symbol. (Spotify, Airbnb) Not recommended early stage.
• Mascot — Character-based. (Mailchimp) For community-forward brands.

For most early-stage brands: Start with a strong wordmark. Clarity beats cleverness.

THE 5-CONTEXT TEST — must work at:
1. 32×32px app icon
2. Website header
3. Social avatar (circle crop)
4. Black and white
5. Large format (tote bag, banner)

DESIGNER BRIEF includes: vibe scores, mood board, color palette, font direction, 3 words you WANT it to communicate, 3 words you DO NOT want, examples with reasons.
Budget: $300–$800 Fiverr, $800–$3,000 freelancer, $3,000+ studio.` },
    ],
    keyDecisions:["Vibe profile (5 scores)?","5-color palette with hex codes?","2 fonts with pairing rationale?","Photo or illustration decided?","Logo type determined?"],
    tools:[
      { name:"Coolors", url:"https://coolors.co", use:"Generate palettes — spacebar to randomize, click to lock" },
      { name:"Contrast Checker", url:"https://webaim.org/resources/contrastchecker", use:"WCAG accessibility verification — check every text/background combo" },
      { name:"Google Fonts", url:"https://fonts.google.com", use:"Browse, pair, preview with your brand name" },
      { name:"Fontpair", url:"https://fontpair.co", use:"Pre-curated font pairings" },
      { name:"Mobbin", url:"https://mobbin.com", use:"Real app UI screenshots organized by category" },
      { name:"Canva", url:"https://canva.com", use:"DIY logo and brand kit builder" },
    ],
    deliverable:"Visual Identity System Document",
    deliverableDetail:"Vibe profile, mood board (10–12 images + 5 adjectives), 5-color palette (hex + rationale + accessibility), font pairing, logo brief or final logo.",
    note:"If the founder keeps changing visual direction, positioning isn't settled. Go back to Ch.04 before spending more time here.",
  },
  {
    number:"07", section:"B", phase:"Identity", title:"Brand Naming & Messaging", subtitle:"What's the name, and what does it stand for?",
    duration:"2 hr", tagline:"Brand names account for up to a third of brand value. This deserves real rigor.",
    description:"Covers the 6 types of names, a 12-criteria evaluation scorecard, tagline development, and the full messaging architecture that ties everything in Phase 1 together.",
    exercises:[
      { id:"07-1", name:"Brand Name Types", short:"Understand 6 types with pros/cons — then identify which type fits your strategy.", detail:`THE 6 TYPES:

1. DESCRIPTIVE — Says literally what you do. (PayPal, Salesforce)
Pros: Immediate clarity, SEO friendly. Cons: Hard to trademark, limits expansion.

2. INVENTED — Completely made up. (Xerox, Kodak)
Pros: Highly trademarkable, ownable. Cons: Requires more marketing to build meaning.

3. FOUNDER — Named after the person(s). (Ben & Jerry's, Ford, Dyson)
Pros: Personal, story-rich. Cons: Can limit scalability.

4. METAPHOR — Evokes a quality, not the literal product. (Amazon, Apple, Patagonia)
Pros: Flexible, memorable. Cons: Requires brand building to make the connection.

5. ACRONYM — Initials of something longer. (IBM, BMW, IKEA)
Pros: Works when original name is complex. Cons: Meaningless without context.

6. MASHUP — Combines two words. (Instagram = instant + telegram)
Pros: Distinctive, memorable, often domain-available. Cons: Can feel forced.

WHICH TYPE FITS YOUR STRATEGY? Clarity = descriptive. Differentiation = invented/metaphor.` },
      { id:"07-2", name:"12-Criteria Name Scorecard", short:"Score your name against research-backed criteria with a pass/fail threshold.", detail:`Score each criterion 1–5:

1. MEMORABLE — Sticks after hearing once?
2. PRONOUNCEABLE — Say to 5 people — same pronunciation?
3. SPELLABLE — Can type correctly after hearing?
4. DISTINCTIVE — Stands out in a competitor list?
5. SCALABLE — Still works if product expands in 5 years?
6. AVAILABLE — Domain (.com), USPTO trademark, all social handles?
7. STRATEGIC — Reflects your positioning?
8. MEANINGFUL — Evokes right associations?
9. TELEPHONE TEST — Clear over phone first time?
10. URL TEST — Easy to type? No hyphens or numbers?
11. CULTURAL SENSITIVITY — Any negative meanings in major markets?
12. VERSATILITY — Works as noun, verb, adjective?

Total /60:
• Below 36: Seriously consider renaming
• 36–48: Workable with documented caveats
• 48+: Strong name — proceed

IMPORTANT: Run the USPTO trademark search before investing further.` },
      { id:"07-3", name:"Tagline Workshop", short:"Generate taglines in 4 directions: functional, emotional, aspirational, provocative.", detail:`Generate 3 options in each direction. Quantity before quality.

FUNCTIONAL (what it does):
'Workouts that adapt to your schedule.'
'Fitness that fits in 10 minutes.'

EMOTIONAL (how it feels):
'Finally, a fitness app that gets you.'
'For the life you actually have.'

ASPIRATIONAL (who you become):
'The version of you that works out.'
'Built for the comeback.'

PROVOCATIVE (a challenge):
'The last fitness app you'll download.'
'Stop starting over.'

TEST YOUR TOP 5:
1. Would your persona say this to a friend?
2. Could a competitor use the same line? (If yes, too generic.)
3. Does it fit in a social media bio?
4. Does it still feel true in 3 years?` },
      { id:"07-4", name:"The Messaging House", short:"Build the complete hierarchy from tagline to proof points.", detail:`The messaging house is the architecture behind every piece of marketing you'll ever create.

STRUCTURE:
ROOF: Brand promise / tagline
THREE PILLARS: Your 3 differentiation pillars from Ch.04
INSIDE EACH PILLAR: Feature that delivers it + Benefit to customer + 2–3 proof points (specific, verifiable)
FOUNDATION: Your 3 brand values from Ch.01

EXAMPLE:
Roof: 'Fitness for real life'

Pillar 1 — Chaos-proof scheduling
Feature: AI reschedules based on your calendar
Benefit: Never fall off the wagon because life happened
Proof: Users complete 4x more workouts in month 2 vs. month 1

Pillar 2 — No gym required
Feature: Bodyweight and minimal equipment options
Proof: 80% of workouts require zero equipment

Pillar 3 — Built for restarters
Feature: Onboarding designed for people who've quit before
Proof: 72% of users call this 'the first one that stuck'

Foundation: Accessibility · Honesty · Real Results

USE: Every email, ad, and website section maps to one pillar.` },
    ],
    keyDecisions:["Name scores 36+/60?","Tagline chosen?","Messaging house complete with proof points?","Domain and trademark confirmed available?"],
    tools:[
      { name:"USPTO Search", url:"https://tess2.uspto.gov", use:"Trademark availability — run this before anything else" },
      { name:"Namecheap", url:"https://namecheap.com", use:"Domain availability and pricing" },
      { name:"Namechk", url:"https://namechk.com", use:"Social handle availability across 30+ platforms" },
      { name:"Namelix", url:"https://namelix.com", use:"AI-powered name generator" },
    ],
    deliverable:"Naming & Messaging Document",
    deliverableDetail:"Name scorecard (12 criteria), recommendation (keep/modify/rename), tagline (winner + 2 alternates), messaging house (complete with proof points).",
    note:"Founders are emotionally attached to names. Run the scorecard anyway. An informed decision with full information is always better than a sentimental one.",
  },
  {
    number:"08", section:"B", phase:"Foundation", title:"Brand Build Sign-Off", subtitle:"Does it all hold together?",
    duration:"60 min", tagline:"A brand isn't a collection of deliverables. It's a system. This is where you confirm it works as one.",
    description:"This isn't a new exercise — it's a structured review. You've built eight documents across seven chapters. This session asks one question: do they cohere? Most brand projects fail not because individual pieces are wrong, but because nobody checked whether they worked together. This is that check — and the gate before Phase 2.",
    exercises:[
      { id:"08-1", name:"The Coherence Audit", short:"Cross-reference every deliverable against every other. Conflicts surface here — before they cost money.", detail:`Work through each connection pair: YES / NO / NEEDS WORK

STRATEGY ↔ VOICE:
• Does the tone scorecard match the positioning? (A 'premium' position with a 9/10 casual score is a conflict.)
• Do the vocabulary pairs support the differentiation pillars?
• Could the pitch ladder be delivered in the brand voice?

VOICE ↔ VISUAL:
• Does the archetype match the vibe profile? (A Jester archetype with dark/serious visuals is a conflict.)
• Do typography choices match the tone?
• Does the mood board look like what the vocabulary sounds like?

VISUAL ↔ NAMING:
• Does the logo type work with the name length?
• Does the tagline fit visually in the logo lockup?

POSITIONING ↔ PERSONA:
• Is the persona clearly reflected in the problem statement?
• Would the persona recognize themselves in the messaging house?

VALUES ↔ EVERYTHING:
• Does any current decision violate one of the 3 operational values?

For every NO or NEEDS WORK: flag it, decide — fix now or carry the risk forward.` },
      { id:"08-2", name:"The Founder Presentation", short:"Present the brand out loud as if to an investor who knows nothing. Record it.", detail:`A verbal walkthrough — not a slide deck. Speaking it out loud surfaces things that look fine on paper but don't hold up when said.

STRUCTURE (20 minutes):
1. The problem (2 min) — Use the exact problem statement from Ch.01.
2. The customer (3 min) — Describe the persona by name, paint the day-in-the-life.
3. The landscape (2 min) — Name the category, key competitors, and where the gap is.
4. Our position (3 min) — State the positioning statement. Name the 3 pillars.
5. The brand (5 min) — Describe voice, visual identity, name and tagline. Explain each decision.
6. The messaging (2 min) — State the messaging house. Which pillar matters most right now?
7. What's next (3 min) — Phase 2 priorities.

RECORD IT. Watch back. Listen for hesitation, inconsistency, anything you couldn't remember without notes. Those are the gaps.` },
      { id:"08-3", name:"Phase 2 Readiness Checklist", short:"12 yes/no questions. 10/12 required to move forward. A hard gate, not a suggestion.", detail:`Answer each YES or NO — no partial credit:

1. Can you state the problem statement from memory in one sentence?
2. Does your persona document contain at least 10 real quotes from real research?
3. Have you identified at least 8 direct and indirect competitors?
4. Is your positioning map drawn and your spot marked?
5. Can you deliver the 15-second pitch without notes?
6. Do your 3 differentiation pillars pass all three filters (unique, relevant, sustainable)?
7. Are your 3 operational values paired with cost-test definitions?
8. Does your brand name score 36+ on the 12-criteria scorecard?
9. Is your tagline chosen and tested against your persona?
10. Does your color palette pass WCAG AA accessibility on all text combinations?
11. Is the coherence audit complete with all conflicts resolved or flagged?
12. Are all seven chapter deliverables in a single accessible folder?

SCORING:
• 12/12 — Ship it. Move to Phase 2.
• 10–11/12 — Document the gaps, proceed with awareness.
• 8–9/12 — Pause. Two or more foundational items are incomplete.
• Below 8/12 — Go back. Phase 2 built on this foundation will require a rebuild.` },
    ],
    keyDecisions:["Coherence audit complete with all conflicts resolved or flagged?","Founder presentation recorded and reviewed?","Phase 2 readiness score of 10/12 or above?"],
    tools:[
      { name:"Notion", url:"https://notion.so", use:"Consolidate all 7 deliverables in one place before this session" },
      { name:"Loom", url:"https://loom.com", use:"Record the founder presentation — watch back critically" },
      { name:"Google Drive", url:"https://drive.google.com", use:"Single folder with all deliverables linked and organized" },
    ],
    deliverable:"Brand Build Sign-Off Document",
    deliverableDetail:"Coherence audit (annotated), founder presentation recording link, Phase 2 readiness score (X/12) with notes on any gaps to address before proceeding.",
    note:"This session often surfaces one thing that needs revisiting — that's normal. A small fix here prevents a big rebuild in Phase 2.",
  },
];

// ─── UPCOMING PHASES ───────────────────────────────────────────────────────────
const UPCOMING = [
  { number:2, title:"Digital Presence & Web Strategy", tagline:"Your website has 5 seconds. What is this? Who is it for? Why should I care?", description:"Brand strategy means nothing without a place to live. This phase covers platform decisions, website architecture, content channels, email infrastructure, and SEO foundation.", chapters:[{num:"01",title:"Product & Platform Strategy",exs:["Platform Decision Framework","MVP Rollout Map","Tech Stack Audit"],del:"Platform Strategy & Phased Rollout Plan"},{num:"02",title:"Website Architecture & Copy",exs:["Page Map & Job Definitions","Homepage Copy Formula","Objection FAQ"],del:"Website Page Map + Homepage Copy"},{num:"03",title:"Content Strategy & Social",exs:["Channel Scoring Matrix","Content Pillar Definition","30-Day Calendar"],del:"Content Strategy + 30-Day Calendar"},{num:"04",title:"Email & Newsletter System",exs:["Lead Magnet Selection","Welcome Sequence (5 emails)","Cadence Planning"],del:"Email Strategy + Welcome Sequence Copy"},{num:"05",title:"SEO Foundation",exs:["Keyword Research Sprint","On-Page SEO Checklist","Content SEO Calendar"],del:"SEO Foundation + Priority Keyword List"}] },
  { number:3, title:"Monetization Model", tagline:"Revenue isn't a feature. It's a strategy that has to be designed.", description:"Evaluates every viable model against your specific product, customer, and competitive position. Covers pricing psychology, tier design, and unit economics.", chapters:[{num:"01",title:"Revenue Model Selection",exs:["Revenue Model Matrix","Model Stress-Test","Competitor Monetization Audit"],del:"Revenue Model Recommendation"},{num:"02",title:"Pricing Architecture",exs:["Van Westendorp Survey","Tier Design Workshop","Free vs. Paid Decision"],del:"Pricing Architecture + Tier Definitions"},{num:"03",title:"Unit Economics & Viability",exs:["LTV/CAC Model Build","AI Cost-Per-User Calculator","Break-Even Analysis"],del:"Unit Economics Snapshot"},{num:"04",title:"Value Ladder Design",exs:["Value Ladder Mapping","Upgrade Trigger Identification","Expansion Revenue"],del:"Value Ladder + 90-Day Monetization Roadmap"}] },
  { number:4, title:"Launch Strategy", tagline:"A great launch doesn't happen. It's engineered.", description:"30 days before, day-of, 90 days after. Pre-launch audience building, narrative strategy, MVP scoping, and the metrics framework that tells you whether it's working.", chapters:[{num:"01",title:"MVP Scope & Ship Criteria",exs:["Feature Prioritization Matrix","Launch Scope Definition","Ship Criteria Checklist"],del:"MVP Scope Document"},{num:"02",title:"Pre-Launch Audience Machine",exs:["Waitlist Funnel Build","Founding Member Offer","30-Day Growth Plan"],del:"Pre-Launch Playbook"},{num:"03",title:"Launch Day Playbook",exs:["Launch Day Timeline","Channel Execution Checklist","Contingency Decision Tree"],del:"Launch Day Playbook"},{num:"04",title:"90-Day KPI Dashboard",exs:["North Star Metric Selection","KPI Dashboard Build","Weekly Review Template"],del:"90-Day KPI Dashboard"}] },
  { number:5, title:"Growth & Retention", tagline:"Acquisition is expensive. Retention is a moat.", description:"Retention loops that turn new users into advocates, referral mechanics that make growth compound, paid acquisition foundation, and community strategy.", chapters:[{num:"01",title:"Retention Loop Design",exs:["Retention Loop Mapping","Onboarding Flow Audit","Re-Engagement Sequence"],del:"Retention Strategy + Onboarding Checklist"},{num:"02",title:"Referral & Word-of-Mouth Engine",exs:["Share Moment Identification","Referral Program Design","WOM Trigger Audit"],del:"Referral & WOM Strategy Document"},{num:"03",title:"Paid Acquisition Foundation",exs:["Paid Readiness Audit","Channel Selection Framework","Creative Testing Playbook"],del:"Paid Acquisition Foundation Plan"},{num:"04",title:"Community Strategy",exs:["Community Fit Assessment","Platform Selection","First 100 Members Plan"],del:"Community Strategy + Launch Plan"}] },
  { number:6, title:"Partnerships & Distribution", tagline:"The fastest path to scale is borrowing someone else's trust.", description:"Strategic partnerships, platform integrations, affiliate and ambassador programs, and B2B channels. Includes how to find, pitch, and structure deals that create mutual value.", chapters:[{num:"01",title:"Partnership Strategy",exs:["Partner Landscape Map","Mutual Value Framework","Partnership Pitch Template"],del:"Partnership Strategy + Outreach Templates"},{num:"02",title:"Platform & Integration Plays",exs:["Platform Ecosystem Map","Integration Priority Matrix","ASO Optimization"],del:"Platform Distribution Plan"},{num:"03",title:"Affiliate & Ambassador Programs",exs:["Program Model Selection","Commission Structure Design","Ambassador Recruitment"],del:"Affiliate/Ambassador Program Framework"},{num:"04",title:"B2B & Enterprise Channel",exs:["B2B Fit Assessment","Enterprise Package Design","Outbound Playbook"],del:"B2B Channel Strategy Document"}] },
  { number:7, title:"Fundraising & Investor Strategy", tagline:"Investors don't fund ideas. They fund traction, narrative, and the right founder.", description:"When and whether to raise, how to frame the story, what goes in the deck, and how to run a process without losing momentum on the business.", chapters:[{num:"01",title:"Raise or Bootstrap Decision",exs:["Raise/Bootstrap Matrix","Capital Needs Audit","Funding Path Comparison"],del:"Funding Decision Document"},{num:"02",title:"The Investor Narrative",exs:["Investor Narrative Framework","Market Size Framing","Traction Story Build"],del:"Investor Narrative + Key Messages"},{num:"03",title:"Pitch Deck Architecture",exs:["Slide-by-Slide Build","Deck Design Principles","Objection Pre-emption"],del:"Pitch Deck Outline + Slide Brief"},{num:"04",title:"Running the Process",exs:["Investor Target List","Outreach & Follow-Up Cadence","Pipeline Management"],del:"Fundraising Playbook + CRM Template"}] },
];

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function BrandPlaybook() {
  const [st, setSt] = useState({ checked:{}, links:{}, myLinks:{}, unlocked:{} });
  const [activeChap, setActiveChap] = useState(null);
  const [expandedEx, setExpandedEx] = useState({});
  const [editLink, setEditLink] = useState(null);
  const [linkVal, setLinkVal] = useState("");
  const [addMyLink, setAddMyLink] = useState(null);
  const [myLinkLabel, setMyLinkLabel] = useState("");
  const [myLinkUrl, setMyLinkUrl] = useState("");
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [unlockModal, setUnlockModal] = useState(null); // { key, label }
  const [unlockCode, setUnlockCode] = useState("");
  const [unlockErr, setUnlockErr] = useState("");
  const [pricingOpen, setPricingOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Persist with storage
  useEffect(() => {
    try {
      if (window.storage) {
        window.storage.get("brand-playbook-v5").then(r => {
          if (r?.value) setSt({ checked:{}, links:{}, myLinks:{}, unlocked:{}, ...JSON.parse(r.value) });
          setLoaded(true);
        }).catch(() => setLoaded(true));
      } else setLoaded(true);
    } catch { setLoaded(true); }
  }, []);

  const save = useCallback((s) => {
    setSt(s);
    try { if (window.storage) window.storage.set("brand-playbook-v5", JSON.stringify(s)); } catch {}
  }, []);

  const isUnlocked = (section, chapNumber) => {
    if (chapNumber === "00") return true; // Ch.00 always free as a preview
    return st.unlocked["p1full"] || st.unlocked[section==="A" ? "p1a" : "p1b"];
  };

  const handleUnlock = () => {
    if (!unlockCode.trim()) { setUnlockErr("Please enter your access code."); return; }
    // Replace with real LemonSqueezy order validation in production
    // Any non-empty code unlocks for now — swap for API call to validate
    save({ ...st, unlocked: { ...st.unlocked, [unlockModal.key]: true } });
    setUnlockModal(null); setUnlockCode(""); setUnlockErr("");
  };

  const chapProg = (ch) => ({
    done: ch.exercises.filter(e => st.checked[e.id]).length,
    total: ch.exercises.length,
  });
  const totalProg = () => {
    const all = CHAPTERS.filter(c => isUnlocked(c.section, c.number)).flatMap(c => c.exercises.map(e => e.id));
    return { done: all.filter(id => st.checked[id]).length, total: all.length };
  };

  const ac = PC[1].accent;
  const al = PC[1].light;

  if (!loaded) return (
    <div style={{minHeight:"100vh",background:"#F8F7F4",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:32,height:32,border:"3px solid #E0DDD8",borderTopColor:ac,borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  const total = totalProg();
  const pct = total.total > 0 ? Math.round(total.done/total.total*100) : 0;
  const unlockedSections = (st.unlocked["p1a"]||st.unlocked["p1full"] ? 1:0) + (st.unlocked["p1b"]||st.unlocked["p1full"] ? 1:0);

  return (
    <div style={{minHeight:"100vh",background:"#F8F7F4",fontFamily:"'DM Sans',system-ui,sans-serif",color:"#1a1a2e"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet"/>
      <style>{`
        *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .btn-scale{transition:all .15s ease;}
        .btn-scale:hover{transform:translateY(-1px);}
        @media(max-width:640px){
          .hdr-row{flex-direction:column!important;gap:12px!important;}
          .pricing-row{flex-direction:column!important;gap:8px!important;}
          .sec-grid{grid-template-columns:1fr!important;}
          .tools-grid{grid-template-columns:1fr!important;}
          .phase-row{flex-wrap:wrap!important;gap:10px!important;}
          .price-pills{flex-wrap:wrap!important;}
        }
      `}</style>

      {/* ══ UNLOCK MODAL ══ */}
      {unlockModal && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>{setUnlockModal(null);setUnlockCode("");setUnlockErr("");}}>
          <div style={{background:"#fff",borderRadius:20,padding:"28px 24px 24px",maxWidth:400,width:"100%",boxShadow:"0 24px 60px rgba(0,0,0,0.25)"}} onClick={e=>e.stopPropagation()}>
            <div style={{width:44,height:44,borderRadius:12,background:al,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14}}>
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none"><rect x="2" y="10" width="16" height="12" rx="2.5" stroke={ac} strokeWidth="2"/><path d="M6 10V7a4 4 0 018 0v3" stroke={ac} strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <div style={{fontFamily:"'Sora',sans-serif",fontSize:17,fontWeight:700,marginBottom:6}}>Enter Your Access Code</div>
            <p style={{fontSize:13,color:"#6B6B7B",lineHeight:1.65,marginBottom:6}}>Unlocking: <strong style={{color:ac}}>{unlockModal.label}</strong></p>
            <p style={{fontSize:13,color:"#6B6B7B",lineHeight:1.65,marginBottom:18}}>After purchasing, you'll receive a unique code by email. Enter it below to unlock your content.</p>
            <input
              value={unlockCode}
              onChange={e=>{setUnlockCode(e.target.value);setUnlockErr("");}}
              placeholder="e.g. MFG-XXXX-XXXX-XXXX"
              autoFocus
              onKeyDown={e=>{if(e.key==="Enter")handleUnlock();}}
              style={{width:"100%",padding:"11px 13px",fontSize:14,border:`1.5px solid ${unlockErr?"#E44":"#E0E0DE"}`,borderRadius:10,outline:"none",fontFamily:"inherit",background:"#FAFAF8",marginBottom:unlockErr?6:14,letterSpacing:"0.03em"}}
            />
            {unlockErr && <div style={{fontSize:12,color:"#E44",marginBottom:10}}>{unlockErr}</div>}
            <button onClick={handleUnlock} className="btn-scale" style={{width:"100%",padding:"11px",fontSize:14,fontWeight:700,background:ac,color:"#fff",border:"none",borderRadius:10,cursor:"pointer",marginBottom:8}}>Unlock Content →</button>
            <button onClick={()=>{setUnlockModal(null);setUnlockCode("");setUnlockErr("");}} style={{width:"100%",padding:"9px",fontSize:13,background:"#F0F0EE",color:"#777",border:"none",borderRadius:10,cursor:"pointer"}}>Cancel</button>
            <p style={{fontSize:11,color:"#BBBBCC",textAlign:"center",marginTop:14,lineHeight:1.5}}>Don't have a code yet? <a href={unlockModal.lsUrl} target="_blank" rel="noopener noreferrer" style={{color:ac,fontWeight:600,textDecoration:"none"}}>Purchase here →</a></p>
          </div>
        </div>
      )}

      {/* ══ HEADER ══ */}
      <div style={{background:"#fff",borderBottom:"1px solid #ECEAE5",padding:"28px 20px 24px"}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>
          <div className="hdr-row" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:16}}>
            <div>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"3px 11px",background:"#F0F0EE",borderRadius:100,fontSize:11,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:"#6B6B7B",marginBottom:10}}>
                <span style={{width:6,height:6,borderRadius:3,background:ac,display:"inline-block"}}/>Marketing for Good
              </div>
              <h1 style={{fontFamily:"'Sora',sans-serif",fontSize:"clamp(22px,5vw,38px)",fontWeight:800,lineHeight:1.1,margin:"0 0 8px",letterSpacing:"-0.03em"}}>
                Brand Build{" "}
                <span style={{background:`linear-gradient(135deg,${ac},#3D50AB 60%,#7B3FBE)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Playbook</span>
              </h1>
              <p style={{fontSize:14,color:"#8B8B9B",margin:0,maxWidth:420,lineHeight:1.65}}>A step-by-step system for building a brand that works. Buy exactly what you need.</p>
            </div>
            {unlockedSections > 0 && (
              <div style={{display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
                <div style={{position:"relative",width:60,height:60}}>
                  <svg width="60" height="60" viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="24" fill="none" stroke="#ECEAE5" strokeWidth="4"/>
                    <circle cx="30" cy="30" r="24" fill="none" stroke={pct===100?"#1A8A64":ac} strokeWidth="4" strokeDasharray={`${pct*1.508} 150.8`} strokeLinecap="round" transform="rotate(-90 30 30)" style={{transition:"stroke-dasharray 0.4s"}}/>
                  </svg>
                  <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <span style={{fontFamily:"'Sora',sans-serif",fontSize:14,fontWeight:700}}>{pct}%</span>
                  </div>
                </div>
                <div>
                  <div style={{fontSize:14,fontWeight:700}}>{total.done}/{total.total}</div>
                  <div style={{fontSize:11,color:"#AAAABC"}}>exercises done</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{padding:"20px 16px 80px",maxWidth:860,margin:"0 auto"}}>

        {/* ══════════════════════════════════════════════════
            PRICING HUB
        ══════════════════════════════════════════════════ */}
        <div style={{marginBottom:16,borderRadius:18,overflow:"hidden",border:"1px solid #ECEAE5",background:"#fff"}}>

          {/* Hero explainer */}
          <div style={{padding:"28px 24px",background:"linear-gradient(135deg,#0C2030 0%,#163248 100%)"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"3px 11px",background:"rgba(255,255,255,0.1)",borderRadius:100,fontSize:11,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:"rgba(255,255,255,0.55)",marginBottom:14}}>
              💡 How this works
            </div>
            <h2 style={{fontFamily:"'Sora',sans-serif",fontSize:"clamp(18px,4vw,26px)",fontWeight:800,color:"#fff",margin:"0 0 12px",letterSpacing:"-0.02em",lineHeight:1.25}}>
              The exact system agencies charge
              <span style={{color:"#7BB8D8"}}> $20k to run for you.</span>
            </h2>
            <p style={{fontSize:14,color:"rgba(255,255,255,0.65)",lineHeight:1.8,maxWidth:520,margin:"0 0 22px"}}>
              Every framework, exercise, and deliverable a professional brand strategist would walk you through — without the agency price tag. Start where you are, go as deep as you need.
            </p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {[{icon:"①",label:"Buy a section",sub:"One piece at a time"},{icon:"②",label:"Buy a full phase",sub:"Cheaper than both sections"},{icon:"③",label:"Buy the bundle",sub:"All 7 phases — best value"}].map((o,i)=>(
                <div key={i} style={{padding:"10px 14px",background:i===2?"rgba(123,184,216,0.15)":"rgba(255,255,255,0.08)",borderRadius:10,border:i===2?"1px solid rgba(123,184,216,0.3)":"1px solid rgba(255,255,255,0.1)",minWidth:140}}>
                  <div style={{fontSize:11,fontWeight:700,color:i===2?"rgba(123,184,216,0.85)":"rgba(255,255,255,0.45)",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:2}}>{o.icon} {o.label}</div>
                  <div style={{fontSize:13,fontWeight:600,color:i===2?"#7BB8D8":"#fff"}}>{o.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Toggle */}
          <button onClick={()=>setPricingOpen(p=>!p)} style={{width:"100%",padding:"13px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",background:"#F8F7F4",border:"none",borderTop:"1px solid #ECEAE5",cursor:"pointer",fontFamily:"inherit"}}>
            <span style={{fontSize:13,fontWeight:600,color:ac}}>{pricingOpen?"Hide pricing":"See full pricing — all 7 phases"}</span>
            <span style={{fontSize:10,color:"#CCC",transform:pricingOpen?"rotate(180deg)":"none",transition:"transform .2s"}}>▾</span>
          </button>

          {pricingOpen && (
            <div style={{padding:"20px 20px 24px",animation:"fadeUp .2s ease"}}>
              {/* Bundle */}
              <div style={{padding:"14px 18px",background:"linear-gradient(135deg,#0C2030,#163248)",borderRadius:14,marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
                <div>
                  <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:"rgba(123,184,216,0.75)",marginBottom:4}}>Full Bundle — All 7 Phases</div>
                  <div style={{fontFamily:"'Sora',sans-serif",fontSize:15,fontWeight:700,color:"#fff",marginBottom:2}}>Every phase. One purchase.</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.45)"}}>Brand Build · Presence · Monetization · Launch · Growth · Partnerships · Fundraising</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontFamily:"'Sora',sans-serif",fontSize:28,fontWeight:800,color:"#fff"}}>$379</div>
                    <div style={{fontSize:11,color:"#7BB8D8"}}>save ~$85 vs. phases à la carte</div>
                  </div>
                  <a href={LS.bundle} target="_blank" rel="noopener noreferrer" className="btn-scale" style={{padding:"10px 16px",background:"#7BB8D8",color:"#0C2030",fontSize:12,fontWeight:700,borderRadius:9,textDecoration:"none",whiteSpace:"nowrap"}}>Get Bundle →</a>
                </div>
              </div>

              {/* Per-phase rows */}
              {PRICING.map(p => {
                const color = PC[p.phase];
                const isP1 = p.phase === 1;
                return (
                  <div key={p.phase} style={{marginBottom:8,padding:"12px 14px",background:"#FAFAF8",borderRadius:12,border:`1px solid ${color.accent}18`}}>
                    <div className="pricing-row" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,gap:8}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <div style={{width:28,height:28,borderRadius:8,background:color.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:color.accent,fontFamily:"'Sora',sans-serif",flexShrink:0}}>0{p.phase}</div>
                        <div>
                          <span style={{fontSize:13,fontWeight:600}}>{color.name}</span>
                          <span style={{marginLeft:7,fontSize:11,fontWeight:600,color:isP1?color.accent:"#E09000",background:isP1?color.light:"#FFF3D6",padding:"1px 7px",borderRadius:5}}>{isP1?"Live Now":"Coming Soon"}</span>
                        </div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                        <span style={{fontFamily:"'Sora',sans-serif",fontSize:16,fontWeight:800,color:color.accent}}>{p.full}</span>
                        <span style={{fontSize:11,color:"#AAAABC"}}>{p.savings}</span>
                        {isP1 ? (
                          <div style={{display:"flex",gap:5}}>
                            <a href={LS.p1full} target="_blank" rel="noopener noreferrer" className="btn-scale" style={{padding:"5px 12px",background:color.accent,color:"#fff",fontSize:11,fontWeight:700,borderRadius:7,textDecoration:"none"}}>Buy Full</a>
                            <button onClick={()=>setUnlockModal({key:"p1full",label:"Full Phase 1",lsUrl:LS.p1full})} style={{padding:"5px 10px",background:color.light,color:color.accent,border:"none",fontSize:11,fontWeight:600,borderRadius:7,cursor:"pointer"}}>Code</button>
                          </div>
                        ) : (
                          <span style={{padding:"5px 11px",background:"#F0F0EE",color:"#BBBBCC",fontSize:11,fontWeight:600,borderRadius:7}}>Notify Me</span>
                        )}
                      </div>
                    </div>
                    <div className="sec-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                      {[{sec:"A",label:p.labelA,chap:p.chapA,price:p.sectionA,lsUrl:LS.p1a},{sec:"B",label:p.labelB,chap:p.chapB,price:p.sectionB,lsUrl:LS.p1b}].map(s=>(
                        <div key={s.sec} style={{padding:"9px 12px",background:"#fff",borderRadius:10,border:"1px solid #ECEAE5",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
                          <div style={{minWidth:0}}>
                            <div style={{fontSize:10,fontWeight:600,color:"#AAAABC",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:2}}>Section {s.sec} · {s.chap}</div>
                            <div style={{fontSize:12,fontWeight:600,color:"#3A3A4E"}}>{s.label}</div>
                          </div>
                          <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                            <span style={{fontFamily:"'Sora',sans-serif",fontSize:14,fontWeight:800,color:color.accent}}>{s.price}</span>
                            {isP1 ? (
                              <div style={{display:"flex",gap:4}}>
                                <a href={s.lsUrl} target="_blank" rel="noopener noreferrer" className="btn-scale" style={{padding:"4px 10px",background:color.light,color:color.accent,fontSize:11,fontWeight:700,borderRadius:7,textDecoration:"none"}}>Buy</a>
                                <button onClick={()=>setUnlockModal({key:`p1${s.sec.toLowerCase()}`,label:`Section ${s.sec} — ${s.label}`,lsUrl:s.lsUrl})} style={{padding:"4px 8px",background:"#F0F0EE",color:"#888",border:"none",fontSize:11,fontWeight:600,borderRadius:7,cursor:"pointer"}}>Code</button>
                              </div>
                            ) : (
                              <span style={{padding:"4px 9px",background:"#F0F0EE",color:"#BBBBCC",fontSize:11,fontWeight:600,borderRadius:7}}>Soon</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ══════════════════════════════════════════════════
            PHASE 1 HEADER
        ══════════════════════════════════════════════════ */}
        <div style={{marginBottom:10,padding:"16px 18px",background:"#fff",borderRadius:14,border:`1.5px solid ${ac}28`}}>
          <div className="phase-row" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                <div style={{width:32,height:32,borderRadius:9,background:al,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:ac,fontFamily:"'Sora',sans-serif"}}>01</div>
                <span style={{fontFamily:"'Sora',sans-serif",fontSize:16,fontWeight:700}}>Brand Build</span>
                <span style={{fontSize:11,fontWeight:600,color:ac,background:al,padding:"2px 8px",borderRadius:6}}>Available Now</span>
              </div>
              <div style={{fontSize:13,color:"#6B6B7B",paddingLeft:40}}>9 chapters · 8 deliverables · Build it right before you build it fast.</div>
            </div>
            <div className="price-pills" style={{display:"flex",gap:6,flexShrink:0,flexWrap:"wrap"}}>
              {[
                {label:"Section A",sub:"Ch. 00–04",price:"$39",uKey:"A",lsKey:"p1a",lsUrl:LS.p1a},
                {label:"Section B",sub:"Ch. 05–08",price:"$49",uKey:"B",lsKey:"p1b",lsUrl:LS.p1b},
              ].map(s => {
                const unlocked = isUnlocked(s.uKey);
                return (
                  <div key={s.lsKey} style={{padding:"10px 13px",background:unlocked?`${ac}08`:"#F8F7F4",borderRadius:10,border:`1px solid ${unlocked?ac+"30":"#ECEAE5"}`,textAlign:"center",minWidth:112}}>
                    <div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",color:"#AAAABC",marginBottom:2}}>{s.label}</div>
                    <div style={{fontSize:11,color:"#8B8B9B",marginBottom:7}}>{s.sub}</div>
                    {unlocked ? (
                      <div style={{fontSize:12,fontWeight:700,color:ac}}>✓ Unlocked</div>
                    ) : (
                      <div style={{display:"flex",gap:4,justifyContent:"center"}}>
                        <a href={s.lsUrl} target="_blank" rel="noopener noreferrer" className="btn-scale" style={{fontSize:11,fontWeight:700,color:"#fff",background:ac,padding:"5px 10px",borderRadius:7,textDecoration:"none"}}>{s.price}</a>
                        <button onClick={()=>setUnlockModal({key:s.lsKey,label:`${s.label} — ${s.sub}`,lsUrl:s.lsUrl})} style={{fontSize:11,fontWeight:600,color:ac,background:al,border:"none",padding:"5px 8px",borderRadius:7,cursor:"pointer"}}>Code</button>
                      </div>
                    )}
                  </div>
                );
              })}
              <div style={{padding:"10px 13px",background:`${ac}06`,borderRadius:10,border:`1.5px solid ${ac}20`,textAlign:"center",minWidth:112}}>
                <div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",color:"#AAAABC",marginBottom:2}}>Full Phase</div>
                <div style={{fontFamily:"'Sora',sans-serif",fontSize:20,fontWeight:800,color:ac,marginBottom:5}}>$79</div>
                {st.unlocked["p1full"] ? (
                  <div style={{fontSize:12,fontWeight:700,color:ac}}>✓ Unlocked</div>
                ) : (
                  <div style={{display:"flex",gap:4,justifyContent:"center"}}>
                    <a href={LS.p1full} target="_blank" rel="noopener noreferrer" className="btn-scale" style={{fontSize:11,fontWeight:700,color:"#fff",background:ac,padding:"5px 10px",borderRadius:7,textDecoration:"none"}}>Buy</a>
                    <button onClick={()=>setUnlockModal({key:"p1full",label:"Full Phase 1",lsUrl:LS.p1full})} style={{fontSize:11,fontWeight:600,color:ac,background:al,border:"none",padding:"5px 8px",borderRadius:7,cursor:"pointer"}}>Code</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            CHAPTERS
        ══════════════════════════════════════════════════ */}
        {CHAPTERS.map(ch => {
          const unlocked = isUnlocked(ch.section, ch.number);
          const open = activeChap === ch.number && unlocked;
          const p = chapProg(ch);
          const done = unlocked && p.done === p.total;

          return (
            <div key={ch.number} style={{marginBottom:5,borderRadius:13,overflow:"hidden",border:open?`1.5px solid ${ac}40`:"1px solid #ECEAE5",background:"#fff",boxShadow:open?`0 4px 18px ${ac}0A`:"none",opacity:unlocked?1:0.75,transition:"all .2s"}}>

              {/* Row */}
              <div onClick={()=>{if(unlocked)setActiveChap(open?null:ch.number);}} style={{padding:"11px 14px",display:"flex",alignItems:"center",gap:10,cursor:unlocked?"pointer":"default",userSelect:"none"}}>
                {/* Badge */}
                <div style={{width:36,height:36,borderRadius:10,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:!unlocked?"#F0F0EE":done?ac:open?ac:al,color:!unlocked?"#CCC":done||open?"#fff":ac,fontSize:12,fontWeight:700,fontFamily:"'Sora',sans-serif",transition:"all .2s"}}>
                  {!unlocked ? (
                    <svg width="13" height="15" viewBox="0 0 13 15" fill="none"><rect x="1" y="6.5" width="11" height="8.5" rx="1.8" stroke="currentColor" strokeWidth="1.7"/><path d="M3.5 6.5V4.5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
                  ) : done ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3L11.5 3.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  ) : ch.number}
                </div>

                {/* Info */}
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"baseline",gap:7,flexWrap:"wrap"}}>
                    <span style={{fontSize:14,fontWeight:600,color:unlocked?(done?ac:"#1a1a2e"):"#AAAABC"}}>{ch.title}</span>
                    {ch.number==="00" && <span style={{fontSize:10,fontWeight:700,color:"#1A7A3F",background:"#D3EEE0",padding:"1px 7px",borderRadius:5,flexShrink:0}}>Free Preview</span>}
                    <span style={{fontSize:12,color:"#CCCCDD",fontStyle:"italic",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ch.subtitle}</span>
                  </div>
                  {unlocked ? (
                    <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
                      <div style={{flex:1,maxWidth:90,height:3,background:"#ECEAE5",borderRadius:2,overflow:"hidden"}}>
                        <div style={{height:"100%",background:done?"#1A7A3F":ac,borderRadius:2,width:`${(p.done/p.total)*100}%`,transition:"width .3s"}}/>
                      </div>
                      <span style={{fontSize:11,color:"#AAAABC"}}>{p.done}/{p.total}</span>
                      <span style={{fontSize:10,fontWeight:600,color:ac,background:al,padding:"1px 7px",borderRadius:5}}>{ch.phase}</span>
                    </div>
                  ) : (
                    <div style={{fontSize:12,color:"#BBBBCC",marginTop:2}}>Unlock Section {ch.section} to access · {ch.duration}</div>
                  )}
                </div>

                {/* Right controls */}
                <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                  {!unlocked && (
                    <div style={{display:"flex",gap:4}}>
                      <a href={ch.section==="A"?LS.p1a:LS.p1b} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} className="btn-scale" style={{padding:"5px 11px",background:ac,color:"#fff",fontSize:11,fontWeight:700,borderRadius:7,textDecoration:"none",whiteSpace:"nowrap"}}>Buy Section {ch.section}</a>
                      <button onClick={e=>{e.stopPropagation();setUnlockModal({key:`p1${ch.section.toLowerCase()}`,label:`Section ${ch.section}`,lsUrl:ch.section==="A"?LS.p1a:LS.p1b});}} style={{padding:"5px 9px",background:al,color:ac,border:"none",fontSize:11,fontWeight:600,borderRadius:7,cursor:"pointer"}}>Code</button>
                    </div>
                  )}
                  {unlocked && (
                    <>
                      <span style={{padding:"2px 8px",borderRadius:6,fontSize:10,fontWeight:600,background:open?`${ac}12`:"#F3F3F1",color:open?ac:"#AAAABC",textTransform:"uppercase",letterSpacing:"0.04em"}}>{ch.duration}</span>
                      <span style={{fontSize:10,color:"#CCC",transform:open?"rotate(180deg)":"none",transition:"transform .2s"}}>▾</span>
                    </>
                  )}
                </div>
              </div>

              {/* Expanded content */}
              {open && (
                <div style={{borderTop:`1px solid ${ac}12`,animation:"fadeUp .2s ease"}}>
                  <div style={{padding:"18px 16px 24px",paddingLeft:62}}>
                    <p style={{fontSize:15,fontStyle:"italic",color:ac,margin:"0 0 10px",fontWeight:500,lineHeight:1.5}}>"{ch.tagline}"</p>
                    <p style={{fontSize:14,color:"#5A5A6E",lineHeight:1.85,marginBottom:24,maxWidth:640}}>{ch.description}</p>

                    {/* Exercises */}
                    <div style={{marginBottom:24}}>
                      <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:ac,marginBottom:10}}>Step-by-Step Exercises</div>
                      {ch.exercises.map((ex,i) => {
                        const exDone = st.checked[ex.id];
                        const exOpen = expandedEx[ex.id];
                        return (
                          <div key={ex.id} style={{marginBottom:6,background:exDone?`${ac}05`:"#FAFAF8",borderRadius:11,borderLeft:`3px solid ${exDone?ac:`${ac}25`}`,overflow:"hidden"}}>
                            <div style={{display:"flex",gap:10,padding:"12px 14px",alignItems:"flex-start"}}>
                              <button onClick={e=>{e.stopPropagation();save({...st,checked:{...st.checked,[ex.id]:!st.checked[ex.id]}});}} style={{width:22,height:22,borderRadius:7,flexShrink:0,marginTop:1,border:exDone?`2px solid ${ac}`:"2px solid #D0D0D8",background:exDone?ac:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .15s"}}>
                                {exDone && <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5L9 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                              </button>
                              <div style={{flex:1}}>
                                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}>
                                  <span style={{fontSize:10,fontWeight:700,color:ac,padding:"2px 7px",background:al,borderRadius:5}}>{String(i+1).padStart(2,"0")}</span>
                                  <span style={{fontSize:13,fontWeight:600,color:exDone?ac:"#1a1a2e",textDecoration:exDone?"line-through":"none",opacity:exDone?0.55:1}}>{ex.name}</span>
                                </div>
                                <p style={{fontSize:13,color:"#6B6B7B",lineHeight:1.65,margin:"0 0 8px"}}>{ex.short}</p>
                                {ex.detail && (
                                  <button onClick={()=>setExpandedEx(p=>({...p,[ex.id]:!p[ex.id]}))} style={{fontSize:12,fontWeight:600,color:ac,background:`${ac}08`,border:`1px solid ${ac}20`,borderRadius:7,padding:"5px 12px",cursor:"pointer"}}>
                                    {exOpen?"Hide full guide ↑":"Show full guide ↓"}
                                  </button>
                                )}
                              </div>
                            </div>
                            {exOpen && ex.detail && (
                              <div style={{padding:"0 14px 18px 46px",borderTop:`1px solid ${ac}08`}}>
                                <div style={{fontSize:13,color:"#3A3A52",lineHeight:1.95,whiteSpace:"pre-wrap",marginTop:14,maxWidth:600}}>{ex.detail}</div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Key Decisions */}
                    <div style={{background:"#F7F7F5",borderRadius:11,padding:"13px 15px",marginBottom:20,border:`1px solid ${ac}10`}}>
                      <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:ac,marginBottom:9}}>Key Decisions — Must resolve before moving on</div>
                      {ch.keyDecisions.map((d,i)=>(
                        <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:5}}>
                          <div style={{width:4,height:4,borderRadius:2,background:ac,opacity:0.45,flexShrink:0,marginTop:7}}/>
                          <span style={{fontSize:13,color:"#3a3a4e",lineHeight:1.55}}>{d}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tools */}
                    <div style={{marginBottom:20}}>
                      <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:ac,marginBottom:9}}>Recommended Tools</div>
                      <div className="tools-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:6}}>
                        {ch.tools.map((t,i)=>{
                          const tk=`${ch.number}-t${i}`;
                          const sv=st.links[tk];
                          const ed=editLink===tk;
                          return (
                            <div key={i} style={{padding:"10px 12px",background:sv?`${ac}04`:"#FAFAF8",borderRadius:10,border:sv?`1px solid ${ac}20`:"1px solid #ECEAE5"}}>
                              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                                <a href={t.url} target="_blank" rel="noopener noreferrer" style={{fontSize:13,fontWeight:600,color:"#1a1a2e",textDecoration:"none"}} onClick={e=>e.stopPropagation()}>{t.name} <span style={{fontSize:10,opacity:0.3}}>↗</span></a>
                                {!ed && <button onClick={e=>{e.stopPropagation();setEditLink(tk);setLinkVal(sv||"");}} style={{fontSize:10,fontWeight:600,color:sv?ac:"#AAA",background:sv?`${ac}10`:"#F0F0EE",border:"none",borderRadius:5,padding:"2px 7px",cursor:"pointer"}}>{sv?"linked ✓":"+ link"}</button>}
                              </div>
                              <p style={{fontSize:12,color:"#8B8B9B",margin:0,lineHeight:1.5}}>{t.use}</p>
                              {ed && (
                                <div style={{display:"flex",gap:4,marginTop:7}} onClick={e=>e.stopPropagation()}>
                                  <input value={linkVal} onChange={e=>setLinkVal(e.target.value)} placeholder="Paste your URL…" autoFocus onKeyDown={e=>{if(e.key==="Enter"){const n={...st,links:{...st.links}};if(!linkVal.trim())delete n.links[tk];else n.links[tk]=linkVal.trim();save(n);setEditLink(null);setLinkVal("");}if(e.key==="Escape"){setEditLink(null);setLinkVal("");}}} style={{flex:1,padding:"5px 8px",fontSize:12,border:`1px solid ${ac}40`,borderRadius:6,outline:"none",fontFamily:"inherit",background:"#fff"}}/>
                                  <button onClick={()=>{const n={...st,links:{...st.links}};if(!linkVal.trim())delete n.links[tk];else n.links[tk]=linkVal.trim();save(n);setEditLink(null);setLinkVal("");}} style={{padding:"5px 9px",fontSize:11,fontWeight:600,background:ac,color:"#fff",border:"none",borderRadius:6,cursor:"pointer"}}>Save</button>
                                  <button onClick={()=>{setEditLink(null);setLinkVal("");}} style={{padding:"5px 7px",fontSize:11,background:"#F0F0EE",color:"#6B6B7B",border:"none",borderRadius:6,cursor:"pointer"}}>✕</button>
                                </div>
                              )}
                              {!ed && sv && <a href={sv.startsWith("http")?sv:`https://${sv}`} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:ac,textDecoration:"none",display:"block",marginTop:4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} onClick={e=>e.stopPropagation()}>{sv}</a>}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* My Files */}
                    <div style={{marginBottom:20}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}>
                        <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:ac}}>My Files & Links</div>
                        {addMyLink!==ch.number && <button onClick={e=>{e.stopPropagation();setAddMyLink(ch.number);setMyLinkLabel("");setMyLinkUrl("");}} style={{fontSize:11,fontWeight:600,color:ac,background:`${ac}10`,border:`1px dashed ${ac}40`,borderRadius:7,padding:"4px 11px",cursor:"pointer"}}>+ Add</button>}
                      </div>
                      {addMyLink===ch.number && (
                        <div style={{padding:"12px 14px",background:"#FAFAF8",borderRadius:11,border:`1px dashed ${ac}35`,marginBottom:7}} onClick={e=>e.stopPropagation()}>
                          <input value={myLinkLabel} onChange={e=>setMyLinkLabel(e.target.value)} placeholder="Label (e.g. My Brand Inventory)" autoFocus onKeyDown={e=>{if(e.key==="Enter"&&myLinkLabel.trim()){save({...st,myLinks:{...st.myLinks,[ch.number]:[...(st.myLinks[ch.number]||[]),{id:Date.now().toString(),label:myLinkLabel.trim(),url:myLinkUrl.trim()||""}]}});setAddMyLink(null);setMyLinkLabel("");setMyLinkUrl("");}if(e.key==="Escape")setAddMyLink(null);}} style={{width:"100%",padding:"7px 10px",fontSize:13,border:"1px solid #E0E0DE",borderRadius:7,outline:"none",fontFamily:"inherit",background:"#fff",marginBottom:7}}/>
                          <input value={myLinkUrl} onChange={e=>setMyLinkUrl(e.target.value)} placeholder="URL (optional)" onKeyDown={e=>{if(e.key==="Enter"&&myLinkLabel.trim()){save({...st,myLinks:{...st.myLinks,[ch.number]:[...(st.myLinks[ch.number]||[]),{id:Date.now().toString(),label:myLinkLabel.trim(),url:myLinkUrl.trim()||""}]}});setAddMyLink(null);setMyLinkLabel("");setMyLinkUrl("");}}} style={{width:"100%",padding:"7px 10px",fontSize:13,border:"1px solid #E0E0DE",borderRadius:7,outline:"none",fontFamily:"inherit",background:"#fff",marginBottom:9}}/>
                          <div style={{display:"flex",gap:5}}>
                            <button onClick={()=>{if(!myLinkLabel.trim())return;save({...st,myLinks:{...st.myLinks,[ch.number]:[...(st.myLinks[ch.number]||[]),{id:Date.now().toString(),label:myLinkLabel.trim(),url:myLinkUrl.trim()||""}]}});setAddMyLink(null);setMyLinkLabel("");setMyLinkUrl("");}} disabled={!myLinkLabel.trim()} style={{padding:"6px 14px",fontSize:12,fontWeight:600,background:myLinkLabel.trim()?ac:"#D0D0D8",color:"#fff",border:"none",borderRadius:7,cursor:myLinkLabel.trim()?"pointer":"default"}}>Add</button>
                            <button onClick={()=>{setAddMyLink(null);setMyLinkLabel("");setMyLinkUrl("");}} style={{padding:"6px 12px",fontSize:12,background:"#F0F0EE",color:"#6B6B7B",border:"none",borderRadius:7,cursor:"pointer"}}>Cancel</button>
                          </div>
                        </div>
                      )}
                      {(st.myLinks[ch.number]||[]).length > 0 ? (
                        <div style={{display:"flex",flexDirection:"column",gap:5}}>
                          {(st.myLinks[ch.number]||[]).map(e=>(
                            <div key={e.id} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 11px",background:"#FAFAF8",borderRadius:9,border:"1px solid #ECEAE5"}}>
                              <div style={{width:24,height:24,borderRadius:6,flexShrink:0,background:e.url?`${ac}12`:"#F0F0EE",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>{e.url?"🔗":"📄"}</div>
                              <div style={{flex:1,minWidth:0}}>
                                {e.url ? <a href={e.url.startsWith("http")?e.url:`https://${e.url}`} target="_blank" rel="noopener noreferrer" style={{fontSize:13,fontWeight:600,color:"#1a1a2e",textDecoration:"none"}}>{e.label} ↗</a> : <span style={{fontSize:13,fontWeight:600}}>{e.label}</span>}
                                {e.url && <div style={{fontSize:11,color:"#AAAABC",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginTop:1}}>{e.url}</div>}
                              </div>
                              <button onClick={e2=>{e2.stopPropagation();save({...st,myLinks:{...st.myLinks,[ch.number]:(st.myLinks[ch.number]||[]).filter(x=>x.id!==e.id)}});}} style={{width:20,height:20,borderRadius:5,border:"none",background:"transparent",color:"#CCC",cursor:"pointer",fontSize:14,lineHeight:1,flexShrink:0}} onMouseEnter={e2=>e2.currentTarget.style.color="#E44"} onMouseLeave={e2=>e2.currentTarget.style.color="#CCC"}>×</button>
                            </div>
                          ))}
                        </div>
                      ) : addMyLink!==ch.number && (
                        <div style={{padding:"14px",background:"#FAFAF8",borderRadius:10,border:"1px dashed #DDDDDD",textAlign:"center"}}>
                          <div style={{fontSize:14,marginBottom:4,opacity:0.35}}>📎</div>
                          <div style={{fontSize:12,color:"#AAAABC"}}>Add your notes, docs, and links here</div>
                        </div>
                      )}
                    </div>

                    {/* Deliverable */}
                    <div style={{padding:"13px 15px",background:`${ac}06`,borderRadius:11,border:`1px solid ${ac}15`,marginBottom:ch.note?10:0}}>
                      <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:ac,marginBottom:4}}>Chapter Deliverable</div>
                      <div style={{fontFamily:"'Sora',sans-serif",fontSize:14,fontWeight:700,marginBottom:4}}>{ch.deliverable}</div>
                      <p style={{fontSize:13,color:"#5A5A6E",lineHeight:1.65,margin:0}}>{ch.deliverableDetail}</p>
                    </div>

                    {ch.note && (
                      <div style={{padding:"11px 14px",background:"#F7F7F5",borderRadius:10,border:"1px solid #ECEAE5"}}>
                        <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:"#AAAABC",marginBottom:4}}>Facilitator Note</div>
                        <p style={{fontSize:13,color:"#6B6B7B",lineHeight:1.65,fontStyle:"italic",margin:0}}>{ch.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* ══ DIVIDER ══ */}
        <div style={{margin:"36px 0 18px",display:"flex",alignItems:"center",gap:12}}>
          <div style={{flex:1,height:1,background:"linear-gradient(to right,#ECEAE5,transparent)"}}/>
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"6px 16px",background:"#fff",border:"1px solid #ECEAE5",borderRadius:100}}>
            <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:"#AAAABC"}}>Phases 02–07</span>
            <span style={{width:6,height:6,borderRadius:3,background:"#F0A500",display:"inline-block"}}/>
            <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:"#AAAABC"}}>Coming Soon</span>
          </div>
          <div style={{flex:1,height:1,background:"linear-gradient(to left,#ECEAE5,transparent)"}}/>
        </div>

        {/* ══ UPCOMING PHASES ══ */}
        {UPCOMING.map(phase => {
          const color = PC[phase.number];
          const pr = PRICING.find(p=>p.phase===phase.number);
          const isEx = expandedPhase===phase.number;
          return (
            <div key={phase.number} style={{marginBottom:5,borderRadius:13,overflow:"hidden",border:"1px solid #ECEAE5",background:"#fff",opacity:0.88}}>
              <div onClick={()=>setExpandedPhase(isEx?null:phase.number)} style={{padding:"13px 15px",cursor:"pointer",userSelect:"none"}}>
                <div className="phase-row" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
                  <div style={{display:"flex",gap:11,alignItems:"flex-start"}}>
                    <div style={{width:38,height:38,borderRadius:10,flexShrink:0,background:`${color.accent}12`,display:"flex",alignItems:"center",justifyContent:"center",border:`1.5px solid ${color.accent}20`}}>
                      <span style={{fontFamily:"'Sora',sans-serif",fontSize:12,fontWeight:700,color:color.accent}}>0{phase.number}</span>
                    </div>
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3,flexWrap:"wrap"}}>
                        <span style={{fontFamily:"'Sora',sans-serif",fontSize:14,fontWeight:700}}>{phase.title}</span>
                        <span style={{fontSize:11,fontWeight:600,color:"#E09000",background:"#FFF3D6",padding:"2px 7px",borderRadius:5}}>Coming Soon</span>
                      </div>
                      <div style={{fontSize:12,color:"#8B8B9B",fontStyle:"italic"}}>"{phase.tagline}"</div>
                    </div>
                  </div>
                  <div className="price-pills" style={{display:"flex",gap:5,alignItems:"center",flexShrink:0}}>
                    {[{l:"A",v:pr?.sectionA},{l:"B",v:pr?.sectionB}].map(s=>(
                      <div key={s.l} style={{padding:"4px 10px",background:"#F8F7F4",borderRadius:7,textAlign:"center"}}>
                        <div style={{fontSize:9,fontWeight:600,color:"#AAAABC",textTransform:"uppercase",letterSpacing:"0.05em"}}>{s.l}</div>
                        <div style={{fontSize:13,fontWeight:700,color:color.accent}}>{s.v}</div>
                      </div>
                    ))}
                    <div style={{padding:"4px 12px",background:`${color.accent}10`,borderRadius:7,border:`1px solid ${color.accent}20`,textAlign:"center"}}>
                      <div style={{fontSize:9,fontWeight:600,color:color.accent,textTransform:"uppercase",letterSpacing:"0.05em"}}>Full</div>
                      <div style={{fontFamily:"'Sora',sans-serif",fontSize:15,fontWeight:800,color:color.accent}}>{pr?.full}</div>
                    </div>
                    <span style={{fontSize:10,color:"#CCC",transform:isEx?"rotate(180deg)":"none",transition:"transform .2s"}}>▾</span>
                  </div>
                </div>
              </div>

              {isEx && (
                <div style={{borderTop:"1px solid #ECEAE5",padding:"16px 15px 20px",animation:"fadeUp .2s ease"}}>
                  <p style={{fontSize:14,color:"#5A5A6E",lineHeight:1.8,marginBottom:18,maxWidth:640}}>{phase.description}</p>

                  {/* Section A/B buy cards */}
                  <div className="sec-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
                    {[{s:"A",label:pr?.labelA,chap:pr?.chapA,price:pr?.sectionA},{s:"B",label:pr?.labelB,chap:pr?.chapB,price:pr?.sectionB}].map(sec=>(
                      <div key={sec.s} style={{padding:"12px 14px",background:"#F8F7F4",borderRadius:11,border:"1px solid #ECEAE5"}}>
                        <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"#AAAABC",marginBottom:3}}>Section {sec.s} · {sec.chap}</div>
                        <div style={{fontSize:13,fontWeight:600,marginBottom:8}}>{sec.label}</div>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <span style={{fontFamily:"'Sora',sans-serif",fontSize:18,fontWeight:800,color:color.accent}}>{sec.price}</span>
                          <span className="btn-scale" style={{padding:"6px 13px",background:color.accent,color:"#fff",fontSize:11,fontWeight:700,borderRadius:8,cursor:"pointer"}}>Notify Me</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chapters */}
                  {phase.chapters.map((ch,ci)=>(
                    <div key={ci} style={{display:"flex",gap:11,padding:"11px 13px",background:"#FAFAF8",borderRadius:10,marginBottom:5,border:"1px solid #ECEAE5"}}>
                      <div style={{width:28,height:28,borderRadius:8,flexShrink:0,background:`${color.accent}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:color.accent,fontFamily:"'Sora',sans-serif"}}>{ch.num}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:600,marginBottom:5}}>{ch.title}</div>
                        <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:5}}>
                          {ch.exs.map((ex,ei)=>(
                            <span key={ei} style={{fontSize:11,color:color.accent,background:`${color.accent}08`,padding:"2px 8px",borderRadius:5,fontWeight:500}}>{ex}</span>
                          ))}
                        </div>
                        <div style={{fontSize:12,color:"#5A5A6E"}}><span style={{fontWeight:600}}>Deliverable:</span> {ch.del}</div>
                      </div>
                      <div style={{width:18,height:18,borderRadius:5,background:"#F0F0EE",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:3}}>
                        <svg width="9" height="11" viewBox="0 0 9 11" fill="none"><rect x="0.5" y="4" width="8" height="7" rx="1.2" stroke="#BBBBCC" strokeWidth="1.3"/><path d="M2.5 4V2.8a2 2 0 014 0V4" stroke="#BBBBCC" strokeWidth="1.3" strokeLinecap="round"/></svg>
                      </div>
                    </div>
                  ))}

                  {/* Full phase CTA */}
                  <div style={{padding:"12px 15px",background:`${color.accent}06`,borderRadius:11,border:`1px solid ${color.accent}15`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10,marginTop:8}}>
                    <div>
                      <div style={{fontSize:13,fontWeight:600}}>Full Phase 0{phase.number} · {pr?.savings}</div>
                      <div style={{fontSize:12,color:"#6B6B7B"}}>All chapters · Both sections</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontFamily:"'Sora',sans-serif",fontSize:22,fontWeight:800,color:color.accent}}>{pr?.full}</span>
                      <span className="btn-scale" style={{padding:"8px 18px",background:color.accent,color:"#fff",fontSize:12,fontWeight:700,borderRadius:8,cursor:"pointer"}}>Notify Me →</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ══ FOOTER ══ */}
      <div style={{borderTop:"1px solid #ECEAE5",padding:"16px 20px",background:"#fff"}}>
        <div style={{maxWidth:860,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
          <span style={{fontSize:12,color:"#AAAABC"}}>Marketing for Good — Brand Build Playbook v5</span>
          <span style={{fontSize:12,color:ac,fontWeight:600}}>
            {unlockedSections===0 ? "Purchase a section to begin →" : unlockedSections===2 ? "Phase 1 fully unlocked ✓" : `${unlockedSections}/2 sections unlocked`}
          </span>
        </div>
      </div>
    </div>
  );
}
