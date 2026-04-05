# Dog Breed Explorer

A comprehensive, SEO-optimized dog breed website featuring 100+ breeds with detailed information, photos, and characteristics. Built with modern web technologies for optimal performance and search engine visibility.

**Live Demo**: https://dogbreedexplorer.pages.dev

## Features

### Core Features
- **Homepage**: Hero section with random dog images, featured breeds showcase, search functionality
- **Breed Listing**: Complete list of all dog breeds with search and filter capabilities
- **Breed Detail**: Individual breed pages with photo galleries, temperament info, and FAQ sections
- **Favorites System**: Save favorite breeds to localStorage for quick access
- **Breed of the Day**: Daily featured breed highlight

### SEO Implementation
- Dynamic meta titles and descriptions for each page
- Proper heading structure (H1-H3) for accessibility and SEO
- Clean kebab-case URLs (`/breed/golden-retriever`)
- Internal linking throughout the site
- Auto-generated alt text for all images
- JSON-LD structured data (Breed schema, FAQ schema, ItemList schema, Breadcrumb schema)
- XML sitemap and robots.txt
- Open Graph and Twitter Card meta tags

### Performance Optimization
- Code splitting with lazy-loaded pages
- Image lazy loading with native `loading="lazy"`
- Responsive images with `srcset`
- API response caching (5-minute cache)
- Optimized bundle size with manual chunk splitting
- ESBuild minification

### Security
- Content Security Policy headers
- X-XSS-Protection
- X-Content-Type-Options
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui (40+ pre-installed components)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Data Source**: Dog CEO API (https://dog.ceo/dog-api/)
- **Hosting**: Cloudflare Pages

## Project Structure

```
/mnt/okcomputer/output/app/
├── public/                    # Static assets
│   ├── _headers              # Cloudflare headers config
│   ├── _redirects            # Cloudflare redirects config
│   ├── robots.txt            # SEO robots file
│   └── sitemap.xml           # SEO sitemap
├── src/
│   ├── api/                  # API service layer
│   │   └── dogApi.ts         # Dog CEO API functions
│   ├── components/
│   │   ├── seo/              # SEO components
│   │   │   ├── SEO.tsx       # Meta tags component
│   │   │   └── JsonLd.tsx    # JSON-LD structured data
│   │   ├── ui/               # shadcn/ui components
│   │   └── ui-custom/        # Custom UI components
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       ├── BreedCard.tsx
│   │       ├── BreedGallery.tsx
│   │       ├── FAQSection.tsx
│   │       ├── SearchBar.tsx
│   │       ├── BreedOfDay.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── ErrorMessage.tsx
│   ├── hooks/                # Custom React hooks
│   │   ├── useFavorites.ts   # Favorites management
│   │   ├── useBreedOfDay.ts  # Daily breed feature
│   │   └── useScrollToTop.ts # Scroll behavior
│   ├── pages/                # Route pages
│   │   ├── Home.tsx
│   │   ├── BreedList.tsx
│   │   ├── BreedDetail.tsx
│   │   ├── Favorites.tsx
│   │   └── NotFound.tsx
│   ├── types/                # TypeScript types
│   │   └── index.ts
│   ├── App.tsx               # Main app component
│   └── main.tsx              # Entry point
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

## Installation & Setup

### Prerequisites
- Node.js 20+
- npm or yarn

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd dog-breed-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment to Cloudflare Pages

### Method 1: Direct Upload

1. Build the project:
```bash
npm run build
```

2. Log in to [Cloudflare Pages](https://dash.cloudflare.com)

3. Create a new project and upload the `dist/` folder

### Method 2: Git Integration

1. Push your code to GitHub/GitLab

2. In Cloudflare Pages, connect your repository

3. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

4. Deploy!

## Cloudflare Configuration

### Headers (`public/_headers`)
- Security headers (CSP, XSS, Frame Options)
- Cache control for static assets
- Long-term caching for JS/CSS files

### Redirects (`public/_redirects`)
- SPA routing support (`/* -> /index.html`)
- WWW to non-WWW redirect
- HTTP to HTTPS redirect

## API Integration

The app uses the [Dog CEO API](https://dog.ceo/dog-api/) for all dog data:

- `GET /api/breeds/list/all` - List all breeds
- `GET /api/breed/{breed}/images` - Get breed images
- `GET /api/breeds/image/random` - Get random dog image

API responses are cached for 5 minutes to reduce API calls and improve performance.

## SEO Features

### Meta Tags
Dynamic meta tags are generated for each page:
- Title (optimized for search)
- Description
- Keywords
- Canonical URL
- Open Graph tags
- Twitter Card tags

### Structured Data
JSON-LD schemas implemented:
- Website schema
- DogBreed schema
- FAQPage schema
- ItemList schema
- BreadcrumbList schema

### URL Structure
- `/` - Homepage
- `/breeds` - All breeds list
- `/breeds?search={query}` - Search results
- `/breed/{breed-name}` - Individual breed page
- `/favorites` - User's favorite breeds

## Performance Metrics

- **Bundle Size**: ~230KB gzipped (main chunk)
- **Vendor Chunk**: ~48KB gzipped (React, Router)
- **UI Chunk**: ~44KB gzipped (shadcn components)
- **Lazy Loading**: Pages loaded on demand
- **Image Optimization**: Lazy loading + srcset

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Credits

- Dog images provided by [Dog CEO API](https://dog.ceo/dog-api/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)

---

Built with ❤️ for dog lovers everywhere!
# dosbreed
# dogbreed
# dogbreed
