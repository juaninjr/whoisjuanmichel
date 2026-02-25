# Setup & Deployment — whoisjuanmichel.com

## Local Development

```bash
# Install dependencies
npm install

# Start dev server at localhost:3000
npm run dev
```

Visit:
- `http://localhost:3000` — ecosystem landing
- `http://localhost:3000/architect` — architecture persona
- `http://localhost:3000/academic` — academic persona
- `http://localhost:3000/musician` — musician persona
- `http://localhost:3000/artist` — artist persona
- `http://localhost:3000/emisito` — emisito (dark theme)

---

## Adding Your Content

Edit `lib/content.ts` to replace the placeholder data with your real work:

- **Studio projects**: Add entries to `studioProjects[]`
- **Papers**: Add entries to `papers[]`
- **CV**: Edit `cvEntries[]` with your education/experience/awards
- **Courses**: Edit `courses[]`
- **Music projects**: Edit `musicProjects[]`
- **Performances**: Edit `performances[]`
- **Art**: Edit `artPieces[]`
- **emisito releases**: Edit `emisitoReleases[]`

### Adding images

Place images in `public/images/` with the following structure:

```
public/
  images/
    studio/       ← architectural project images
    art/          ← personal art images
    emisito/      ← album/EP covers
```

Update the `coverImage` / `image` fields in `lib/content.ts` to match your file paths (e.g. `/images/studio/my-project.jpg`).

---

## Deploying to Vercel

### Step 1: Push to GitHub

Create a GitHub repo and push the project:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/whoisjuanmichel.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Click **Add New → Project**
3. Import your GitHub repo
4. Vercel auto-detects Next.js — no configuration needed
5. Click **Deploy**

### Step 3: Connect your domain

1. In your Vercel project dashboard, go to **Settings → Domains**
2. Add `whoisjuanmichel.com`
3. Also add `www.whoisjuanmichel.com` if you want the www subdomain

### Step 4: Configure DNS

At your domain registrar (GoDaddy, Namecheap, Google Domains, etc.), update the DNS records:

| Type  | Name | Value                  |
|-------|------|------------------------|
| A     | @    | `76.76.21.21`          |
| CNAME | www  | `cname.vercel-dns.com` |

DNS propagation takes up to 48 hours (usually much faster).

Vercel will automatically provision an SSL/TLS certificate.

### Step 5: Verify

Once DNS propagates, visit `https://whoisjuanmichel.com` — the site should be live.

---

## Persona URLs

| URL | Persona | What's prominent |
|-----|---------|-----------------|
| `/` | Ecosystem landing | Persona selector |
| `/architect` | Architect | Studio, CV (featured) |
| `/academic` | Academic | Papers, Studio (featured) |
| `/musician` | Musician | Music, Performances (featured) |
| `/artist` | Artist | Art (featured) |
| `/emisito` | emisito | Dark theme, releases (featured) |

---

## Adding/Editing Personas

All persona configurations live in `lib/personas.ts`. To change what's featured on a persona:

```ts
architect: {
  sections: [
    { id: 'studio',  variant: 'featured',  order: 1 },  // ← change variant here
    { id: 'cv',      variant: 'featured',  order: 2 },
    // ...
  ],
},
```

Variants: `'featured'` | `'standard'` | `'compact'` | `'hidden'`

---

## Adding Spanish Translations

Translations live in `lib/context/LanguageContext.tsx` under the `translations.es` object.

Replace the placeholder values with your Spanish text. The language toggle button (EN/ES) in the nav is already wired up.

---

## Social Links

Update the footer links in `components/Footer.tsx`:

```tsx
const socialLinks = [
  { label: 'Email', href: 'mailto:YOUR@EMAIL.com' },
  { label: 'Instagram', href: 'https://instagram.com/YOUR_HANDLE' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/YOUR_PROFILE' },
  { label: 'Spotify', href: 'https://open.spotify.com/artist/YOUR_ID' },
];
```
