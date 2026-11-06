import './globals.css';
import { LINKS, ME, SEO } from '../content/site';

/* Page title, description and link-preview (Open Graph) tags.
   Edit the words in content/site.js, not here. */
export const metadata = {
  metadataBase: new URL(LINKS.siteUrl),
  title: SEO.title,
  description: SEO.description,
  authors: [{ name: ME.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: ME.name,
    title: SEO.title,
    description: SEO.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.title,
    description: SEO.description,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7faf8' },
    { media: '(prefers-color-scheme: dark)', color: '#0e1411' },
  ],
};

// Applies the visitor's saved light/dark choice before the page draws,
// so there is no flash of the wrong colors.
const themeScript = `try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
