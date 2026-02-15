# Conicore Security Guide

## 🔐 API Key Management

### Local Development (Dashboard)

**keys.js** - This file contains your API keys and is **gitignored**. Never commit it.

```javascript
var KEYS = {
  groq: "gsk_...",
  googleSearchApiKey: "AIza...",
  googleSearchEngineId: "..."
};
```

**Location:** `/dashboard/keys.js`
**Status:** Gitignored ✅
**Action:** Keep this file local only

### Production (n8n on VPS)

**Credentials** are stored encrypted in n8n's PostgreSQL database using `N8N_ENCRYPTION_KEY`.

**Location:** `/root/n8n-production/.env`
**Encryption:** AES-256-GCM
**Key:** `N8N_ENCRYPTION_KEY=GYAJ7HDWNIyacHZ7Dt1STDweRs9x/Ia5gE/nSvcRNdk=`

⚠️ **CRITICAL:** Never rotate the encryption key after workflows are created. This will break all existing credentials.

---

## 🛡️ Security Checklist

### Infrastructure Security

- [x] HTTPS enabled via Let's Encrypt
- [x] Cloudflare proxy for DDoS protection
- [x] Rate limiting: 100 req/sec average, 200 burst
- [x] Request body size limit: 1MB
- [x] IP allowlist for admin routes
- [x] Security headers: HSTS, X-Frame-Options, CSP
- [x] PostgreSQL password-protected
- [x] Docker containers isolated
- [x] SSH key-based authentication

### API Key Security

- [x] keys.js is gitignored
- [x] keys.js never committed to git
- [x] Google Search API restricted to domain
- [ ] Groq API key rotated (optional - if suspicious activity)
- [ ] Google Search API key rotated (optional)

### Network Security

- [x] Admin routes: IP-restricted to `86.0.80.0/22, 92.239.16.0/20, 103.138.124.44/32`
- [x] Webhook routes: Open (by design, for client integrations)
- [x] Traefik forwards real client IPs from Cloudflare
- [x] Rate limiting per IP address

### Database Security

- [x] PostgreSQL isolated in Docker network
- [x] Not exposed to public internet
- [x] Strong password: 32 characters
- [x] Health checks enabled
- [x] Data encrypted at rest (Docker volume)

---

## 🔄 Key Rotation Procedure

### When to Rotate Keys

1. **Immediate rotation required:**
   - Key exposed in public repository
   - Suspicious API usage detected
   - Unauthorized access suspected

2. **Periodic rotation (recommended every 90 days):**
   - Groq API key
   - Google Search API key

3. **NEVER rotate:**
   - `N8N_ENCRYPTION_KEY` (breaks all workflow credentials)
   - `POSTGRES_PASSWORD` (requires database dump/restore)

### How to Rotate Groq API Key

1. Generate new key at https://console.groq.com/keys
2. Update `dashboard/keys.js` with new key
3. Test dashboard functionality
4. Delete old key from Groq console
5. Document rotation date

### How to Rotate Google Search API Key

1. Create new key at https://console.cloud.google.com/apis/credentials
2. Restrict to Custom Search API + HTTP referrers
3. Update `dashboard/keys.js` with new key
4. Test scanner functionality
5. Delete old key from Google Cloud console
6. Document rotation date

---

## 📊 Security Audit Log

| Date | Action | Notes |
|------|--------|-------|
| 2026-02-15 | Initial security audit | Score: 90/100 |
| 2026-02-15 | Verified keys.js not in git | ✅ Safe |
| 2026-02-15 | Verified HTTPS working | ✅ Cloudflare + Let's Encrypt |
| 2026-02-15 | Created SECURITY.md | Documentation complete |
| | | |

---

## 🚨 Incident Response

If you suspect a security breach:

1. **Immediate actions:**
   - Rotate all API keys immediately
   - Check n8n audit logs for suspicious activity
   - Review Cloudflare analytics for unusual traffic
   - Check Docker logs: `docker logs n8n`

2. **Investigation:**
   - Review recent git commits
   - Check SSH login history: `last -20`
   - Review n8n execution history
   - Analyze Traefik access logs

3. **Recovery:**
   - Update all credentials
   - Review and update IP allowlist
   - Consider enabling 2FA for critical services
   - Document incident in audit log

---

## 📞 Support Contacts

- **Groq Support:** https://console.groq.com/support
- **Google Cloud Support:** https://console.cloud.google.com/support
- **n8n Community:** https://community.n8n.io
- **Cloudflare Support:** https://dash.cloudflare.com/support

---

*Last updated: 2026-02-15*
*Next review: 2026-05-15 (90 days)*
