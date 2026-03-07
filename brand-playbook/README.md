# Brand Build Playbook — Marketing for Good

A no-fluff, end-to-end brand-building framework with 11 interactive chapters. Track progress, link resources, and build the brand step by step.

## Deploy to Vercel (5 minutes)

### Option A: GitHub → Vercel (recommended)

1. **Create a GitHub repo**
   - Go to [github.com/new](https://github.com/new)
   - Name it `brand-playbook` (or whatever you want)
   - Keep it private if you don't want it public
   - Click "Create repository"

2. **Push this code to GitHub**
   ```bash
   cd brand-playbook
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/brand-playbook.git
   git push -u origin main
   ```

3. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "Add New Project"
   - Import your `brand-playbook` repo
   - Framework Preset will auto-detect as **Vite**
   - Click **Deploy**
   - Done. You'll get a URL like `brand-playbook.vercel.app`

4. **Custom domain (optional)**
   - In Vercel dashboard → your project → Settings → Domains
   - Add your domain and follow the DNS instructions

### Option B: Vercel CLI (fastest)

```bash
npm install -g vercel
cd brand-playbook
npm install
vercel
```

Follow the prompts. Done in 60 seconds.

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## How it works

- **Progress tracking**: Check off exercises, see per-chapter and overall progress
- **Tool linking**: Attach your specific resource URLs to each recommended tool
- **My Files & Links**: Drop any custom links, docs, or notes into each chapter
- **Persistent**: All data saves to localStorage in the browser

## Updating content

All chapter content lives in `src/App.jsx` in the `chapters` array at the top. Each chapter object has:
- `exercises` — the checkable items
- `tools` — recommended tools with URLs
- `keyDecisions` — must-resolve questions
- `deliverable` — what the chapter produces

Edit the array, push to GitHub, Vercel auto-deploys.
