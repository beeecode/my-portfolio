# Manageull server-rendered publishing

The portfolio reads `GET /runtime/site/:siteKey/content?path=/` on the server.
Only the current published snapshot is used; drafts are never requested. The same
sanitized snapshot supplies HTML, React hydration, document language and SEO metadata.
Visitors do not load the DOM-patching runtime. It is loaded after hydration only
when the site is embedded, to retain Manageull's authenticated visual editor bridge.
Site verification remains available as the `manageull-site-verification` meta tag.

## Deployment

1. Deploy this repository to its existing Next.js server/Vercel project using Node.js
   22.12 or newer (not a static export).
2. Set `APP_URL` to the portfolio's public HTTPS origin. The public Manageull origin,
   site key and verification token already default to this portfolio's installation.
3. For immediate publishing, set `MANAGEULL_SITE_ID` to the site's ID and
   `MANAGEULL_WEBHOOK_SECRET` to a randomly generated secret in deployment settings.
   This is a server-only secret, not a script key or admin API token.
4. In that site's Manageull Publish Settings, select **API**, set the URL to
   `https://<portfolio-domain>/api/manageull/revalidate`, and enter the same secret.
5. Test the connection, then publish a heading edit. View source or use an HTTP client
   to confirm the new heading is in the returned HTML. Refresh and check a rollback too.

The webhook uses Manageull's HMAC-SHA256 signature over the raw body, verifies the
site ID and a five-minute delivery window, and supports `connection.test`,
`release.published`, and `release.rolled_back`. It expires the published-content
cache and invalidates the root layout. Repeated delivery is safe: it only invalidates
cache and never writes content. Keep server clocks synchronized. No secret is included
in client props, HTML or logs.

## Caching and failures

Next's persistent Data Cache stores validated snapshots for 60 seconds. Without a
configured webhook, the first visit after that interval triggers background refresh;
subsequent visits receive the refreshed version. This is request-driven, not a timer.
The webhook expires the cache so the next visit waits for fresh published content.
Already-open pages need a refresh to see a new release.

Upstream requests time out after eight seconds. On a background refresh error Next
keeps its last successful cached result. On a cold cache or after explicit invalidation,
a failed request renders the built-in portfolio content and logs a short warning.
A 404 means no published page and resets overrides to the built-in content. These
fallbacks keep the site usable; they are not an independent backup of published content.
The durable source of published content remains Manageull's database.

## Rendering and maintenance

`usePublishedTree` applies published values to the existing native/motion JSX tree
before rendering. It reproduces the crawler's ID / nth-of-type selectors, including
mapped arrays, and changes only fields marked changed by Manageull. This keeps
existing published element records working without a re-crawl. It never executes
opaque React components or accepts arbitrary attributes. Rich HTML is sanitized on
the server with Manageull's small tag allowlist (inline formatting only inside headings
and paragraphs, to avoid invalid HTML and hydration repairs). Only safe image sources,
alt text and link destinations are applied; form state and event handlers stay local.

Each section calls the hook on its root JSX. A nested component that contains editable
content must declare its DOM root via `manageullTag`, accept `manageullPath`, and pass
that path to the hook, as `SectionLabel` does. Icons stay opaque. Fragments and
`AnimatePresence` are transparent. If a redesign changes nesting or sibling order,
re-crawl and review affected selectors before publishing. Existing explicit IDs and
`data-manageull-id` selectors are supported, but adding/changing them is a content
migration and should be coordinated with Manageull.

Run `npm test`, `npm run typecheck`, and `npm run build` before deployment.
After building, `npm run test:integration` starts an isolated local fixture API and
production Next server to verify HTTP publishing and rollback without changing live data.
