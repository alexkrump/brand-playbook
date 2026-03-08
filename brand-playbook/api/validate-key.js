// pages/api/validate-license.js  (if using pages router)
// app/api/validate-license/route.js  (if using app router — see bottom of file)
//
// This runs on the SERVER — your LemonSqueezy API key is never exposed to the browser.

const PRODUCT_MAP = {
  // Map your LemonSqueezy product IDs to your internal unlock keys
  // Find Product ID: LemonSqueezy dashboard → click product → URL shows the ID
 const PRODUCT_MAP = {
  "875307": "p1a",
  "875310": "p1b",
  "875312": "p1full",
};

const ADMIN_CODE = "MFG-ADMIN-2025";

// ─── PAGES ROUTER VERSION ────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "No code provided" });

  // Admin bypass
  if (code.trim() === ADMIN_CODE) {
    return res.status(200).json({ valid: true, unlocks: ["p1a", "p1b", "p1full"] });
  }

  try {
    // Call LemonSqueezy to validate the license key
    const response = await fetch("https://api.lemonsqueezy.com/v1/licenses/validate", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ license_key: code.trim() }),
    });

    const data = await response.json();

    // LemonSqueezy returns { valid: true/false, license_key: { ... }, meta: { ... } }
    if (!data.valid) {
      return res.status(200).json({ valid: false, error: "Invalid or already used code." });
    }

    // Find which product this key belongs to
    const productId = String(data.meta?.product_id);
    const unlockKey = PRODUCT_MAP[productId];

    if (!unlockKey) {
      return res.status(200).json({ valid: false, error: "This code isn't valid for this product." });
    }

    // If it's the full phase, unlock both sections too
    const unlocks = unlockKey === "p1full"
      ? ["p1a", "p1b", "p1full"]
      : unlockKey === "bundle"
      ? ["p1a", "p1b", "p1full", "bundle"]
      : [unlockKey];

    return res.status(200).json({ valid: true, unlocks });

  } catch (err) {
    console.error("LemonSqueezy validation error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}


// ─── APP ROUTER VERSION ──────────────────────────────────────────────────────
// If you're using the app/ directory, delete everything above and use this instead:
//
// export async function POST(req) {
//   const { code } = await req.json();
//   if (!code) return Response.json({ error: "No code provided" }, { status: 400 });
//
//   if (code.trim() === ADMIN_CODE) {
//     return Response.json({ valid: true, unlocks: ["p1a", "p1b", "p1full"] });
//   }
//
//   try {
//     const response = await fetch("https://api.lemonsqueezy.com/v1/licenses/validate", {
//       method: "POST",
//       headers: { "Accept": "application/json", "Content-Type": "application/json" },
//       body: JSON.stringify({ license_key: code.trim() }),
//     });
//     const data = await response.json();
//     if (!data.valid) return Response.json({ valid: false, error: "Invalid or already used code." });
//     const productId = String(data.meta?.product_id);
//     const unlockKey = PRODUCT_MAP[productId];
//     if (!unlockKey) return Response.json({ valid: false, error: "This code isn't valid for this product." });
//     const unlocks = unlockKey === "p1full" ? ["p1a","p1b","p1full"] : unlockKey === "bundle" ? ["p1a","p1b","p1full","bundle"] : [unlockKey];
//     return Response.json({ valid: true, unlocks });
//   } catch (err) {
//     return Response.json({ error: "Something went wrong." }, { status: 500 });
//   }
// }
