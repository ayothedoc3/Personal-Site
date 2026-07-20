# Domain & Subdomain Setup (manual actions for the site owner)

No secrets in this file. These are the infrastructure steps I cannot perform
(no DNS or Coolify access). The code ships host-based routing; these steps make
the `aios.` hostname resolve and serve.

## Target hostname rules
- `ayothedoc.com` -> healthcare site (root host)
- `www.ayothedoc.com` -> 301 to `ayothedoc.com`
- `aios.ayothedoc.com` -> AIOS site
- Do NOT create `www.aios.ayothedoc.com` or extra AIOS aliases.

## 1. DNS (Cloudflare)
The site is behind Cloudflare. Add one record:

| Type | Name | Target | Proxy | TTL |
|---|---|---|---|---|
| CNAME | `aios` | `ayothedoc.com` | Proxied (orange cloud) | Auto |

(Equivalent: `A` record `aios` -> `2.59.156.125`, proxied.)

Verify: `dig aios.ayothedoc.com` resolves; `curl -I https://aios.ayothedoc.com` returns a response from the origin, not a 1016/1001 error.

## 2. Coolify (same app, second domain)
The healthcare + AIOS sites are ONE app (host-based routing), so add the
subdomain to the existing Personal-Site app rather than creating a new app.

1. Coolify -> Personal-Site app -> Configuration -> Domains.
2. Current value keeps `https://ayothedoc.com,https://www.ayothedoc.com`.
3. Add `https://aios.ayothedoc.com` to the domains list.
4. Save + redeploy so Coolify requests a certificate for the new host.

Verify: `aios.ayothedoc.com` loads with valid SSL (padlock), no cert warning.

## 3. www redirect
If not already enforced, add a Cloudflare Redirect Rule (or Coolify redirect):
`www.ayothedoc.com/*` -> `https://ayothedoc.com/$1` (301). Do not redirect the
apex or the `aios` host.

## 4. SSL
- Cloudflare SSL/TLS mode: Full (strict) recommended; the Coolify origin cert
  covers all three hostnames once the domain is added in step 2.
- Confirm the edge certificate covers `aios.ayothedoc.com` (Cloudflare universal
  cert covers one level of subdomain, so `aios.` is covered).

## 5. Mailboxes (required before publishing the addresses)
The healthcare contact form and AIOS form reference addresses. Confirm these
exist and receive mail, or the code falls back to the existing working address:
- `hello@ayothedoc.com` (healthcare project enquiries)
- `aios@ayothedoc.com` (AIOS enquiries)

If either does not exist yet, tell me and I will keep the current working
receiving address until the mailbox is live. Do not publish a dead address.

## 6. Search Console / Analytics (owner account access)
- Add `aios.ayothedoc.com` as a property in Google Search Console; submit
  `https://aios.ayothedoc.com/sitemap.xml`.
- Keep `ayothedoc.com` property; resubmit its (now healthcare-only) sitemap.
- Analytics: the code tags each hostname; confirm your GA property records the
  `page_location` host so both can be filtered. Optional: a second GA stream for
  the subdomain.

## Verification checklist
- [ ] `aios.ayothedoc.com` resolves and serves the AIOS site.
- [ ] `ayothedoc.com` serves the healthcare site (not AIOS, not a redirect).
- [ ] `www.ayothedoc.com` 301s to `ayothedoc.com`.
- [ ] Valid SSL on all three hostnames.
- [ ] `hello@` and `aios@` mailboxes receive test mail (or documented as pending).
- [ ] Both sitemaps reachable at their correct hosts.
