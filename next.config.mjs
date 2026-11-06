/** @type {import('next').NextConfig} */
const nextConfig = {
  // "export" turns the site into plain HTML/CSS/JS files in the /out folder.
  // That means it can be hosted for free on Vercel, Netlify, or anywhere else.
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
