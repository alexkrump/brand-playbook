// /api/validate-key.js
// Vercel serverless function that validates Lemon Squeezy license keys

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { licenseKey } = req.body;

  if (!licenseKey || typeof licenseKey !== "string" || licenseKey.trim().length === 0) {
    return res.status(400).json({ error: "License key is required." });
  }

  try {
    // Activate the key with Lemon Squeezy (validates + marks as used)
    const response = await fetch("https://api.lemonsqueezy.com/v1/licenses/activate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        license_key: licenseKey.trim(),
        instance_name: "Brand Playbook",
      }),
    });

    const data = await response.json();

    // If activation fails because already activated, try just validating
    if (data.error && data.error === "license_key_already_activated") {
      const validateResponse = await fetch("https://api.lemonsqueezy.com/v1/licenses/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          license_key: licenseKey.trim(),
        }),
      });
      const validateData = await validateResponse.json();

      if (!validateData.valid) {
        return res.status(400).json({ error: "This license key has already been used." });
      }

      const productName = (validateData.meta?.product_name || "").toLowerCase();
      const phase = mapProductToPhase(productName);

      if (!phase) {
        return res.status(400).json({ error: "Could not determine product. Please contact support." });
      }

      return res.status(200).json({ success: true, phase });
    }

    // Check if activation was successful
    if (!data.activated && !data.valid) {
      return res.status(400).json({
        error: data.error === "license_key_not_found"
          ? "Invalid license key. Please check and try again."
          : data.error === "license_key_expired"
          ? "This license key has expired."
          : data.error === "license_key_disabled"
          ? "This license key has been disabled."
          : "Invalid license key. Please check and try again.",
      });
    }

    // Determine which phase to unlock based on product name
    const productName = (data.meta?.product_name || "").toLowerCase();
    const phase = mapProductToPhase(productName);

    if (!phase) {
      return res.status(400).json({ error: "Could not determine product. Please contact support." });
    }

    return res.status(200).json({ success: true, phase });

  } catch (err) {
    console.error("License validation error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}

function mapProductToPhase(productName) {
  if (productName.includes("bundle") || productName.includes("full")) return "bundle";
  if (productName.includes("clarity")) return "clarity";
  if (productName.includes("identity")) return "identity";
  if (productName.includes("engine")) return "engine";
  return null;
}
