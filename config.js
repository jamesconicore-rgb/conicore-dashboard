const CONFIG = {
  businessName: "Conicore",
  tagline: "Client Data Centre",
  logo: "",
  theme: {
    primary: "#0f172a",
    primaryLight: "#1e293b",
    accent: "#3b82f6",
    accentEnd: "#06b6d4",
    cardBg: "rgba(30,41,59,0.65)",
    cardBorder: "rgba(255,255,255,0.06)",
    text: "#f1f5f9",
    textMuted: "#94a3b8",
    success: "#22c55e",
    warning: "#f59e0b",
    hot: "#ef4444",
    warm: "#f97316",
    cool: "#3b82f6"
  },
  sheetId: "GOOGLE_SHEET_ID",
  sheets: {
    leads: "Leads",
    messages: "Messages Log"
  },
  refreshInterval: 300000,
  groqApiKey: "",
  webhooks: {
    scanner: "YOUR_N8N_WEBHOOK_URL/webhook/conicore-scanner",
    saveClient: "YOUR_N8N_WEBHOOK_URL/webhook/conicore-save-client"
  },
  links: {
    website: { url: "#", label: "Website" },
    booking: { url: "#", label: "Book Now" },
    phone: { url: "tel:", label: "Phone" },
    email: { url: "mailto:", label: "Email" }
  },
  poweredBy: { name: "Conicore", url: "https://conicore.ai" }
};
