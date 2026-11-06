/* =====================================================================
   SITE CONTENT
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to change the words, links,
   pictures and videos on your website. Change the text between the
   quotes, save, and the page updates. Keep the quotes and commas.

   Pictures and videos live in the "public" folder:
     public/profile.png      → your photo
     public/work/            → website screenshots
     public/videos/          → video files (.mp4)
     public/posters/         → the still picture shown before a video plays
   ===================================================================== */

/* ---------------------------------------------------------------------
   ★ LINKS — CHECK THESE ★
   Every link on the site comes from this one block.
   --------------------------------------------------------------------- */
export const LINKS = {
  email: 'rjmontoya.025@gmail.com',
  linkedin: 'https://www.linkedin.com/in/roger-montoya-jr-44150b2a9/',
  github: 'https://github.com/rjmontoya-dev',

  // Your live website address (used for search engines and link previews).
  siteUrl: 'https://your-site.vercel.app', // REPLACE after you deploy
};

/* ---------------------------------------------------------------------
   ABOUT YOU
   --------------------------------------------------------------------- */
export const ME = {
  name: 'Roger A. Montoya Jr.',
  shortName: 'Roger',
  title: 'Tech-Savvy Virtual Assistant',
  photo: '/profile.png',
  location: 'Oriental Mindoro, Philippines',
  hours: 'Available for US, AU and UK hours',
};

/* ---------------------------------------------------------------------
   1. HERO (top of the page)
   --------------------------------------------------------------------- */
export const HERO = {
  // This line types itself out, letter by letter
  typed: 'Hi, I’m Roger, your Tech-Savvy Virtual Assistant.',
  headline: 'I help executives and entrepreneurs get their time back.',
  // "I can take care of ..." then the words below switch one after another
  rotatingLead: 'I can take care of',
  rotating: [
    'your calendar',
    'your inbox',
    'your CRM',
    'your sales pipeline',
    'cold calling',
    'appointment setting',
    'back-office tasks',
    'research and reports',
  ],
  intro:
    'My background spans administrative support, cold calling, appointment setting and back-office operations, so I can keep your calendar, inbox, CRM and pipeline organized at the same time.',
  primaryButton: 'Work with me',
  secondaryButton: 'LinkedIn',
};

/* ---------------------------------------------------------------------
   SKILLS BAND (the big moving text under the hero)
   --------------------------------------------------------------------- */
export const SKILLS = [
  'Calendar management',
  'Inbox management',
  'Cold calling',
  'Appointment setting',
  'CRM updates',
  'Pipeline tracking',
  'Data entry',
  'Travel planning',
  'Research and reports',
  'Virtual meetings',
  'Social media',
  'Canva graphics',
  'Back-office tasks',
];

/* ---------------------------------------------------------------------
   2. SERVICES (what you offer)
   Shown as a numbered list in two columns, so an even number looks best.
   --------------------------------------------------------------------- */
export const SERVICES_HEAD = {
  heading: 'How I can help you get your time back',
  text: 'From simple everyday tasks to more technical work, beginner to advanced, I take care of the details so you can focus on running and growing your business.',
};

export const SERVICES = [
  {
    title: 'Calendar, meetings and travel',
    text: 'Calendars managed, meetings scheduled across time zones, virtual meetings set up with agendas, and travel organized.',
  },
  {
    title: 'Email and communication',
    text: 'Correspondence handled, messages filtered and inquiries answered on time, so nothing important slips through.',
  },
  {
    title: 'Cold calling and appointment setting',
    text: 'Confident calls to your leads from your script, real rapport with decision-makers, and qualified appointments booked on your calendar.',
  },
  {
    title: 'CRM and pipeline',
    text: 'Contacts, deals and follow-ups kept up to date, so your pipeline stays organized and no lead goes cold.',
  },
  {
    title: 'Back-office operations',
    text: 'Data entry, order and invoice processing, file organizing and the routine tasks that keep your business running.',
  },
  {
    title: 'Research and reporting',
    text: 'Topics researched and findings compiled into clear, simple reports that support your decisions.',
  },
  {
    title: 'Social media and Canva design',
    text: 'Content scheduled, engagement monitored, and on-brand graphics and marketing visuals made in Canva.',
  },
  {
    title: 'Tech-savvy support',
    text: 'Quick to learn new tools and online systems, so the more technical tasks get handled too.',
  },
];

/* ---------------------------------------------------------------------
   ABOUT ME
   --------------------------------------------------------------------- */
export const ABOUT = {
  heading: 'Reliable remote support that helps your business run smoothly and grow.',
  paragraphs: [
    'I’m a confident communicator with strong phone presence, and I build rapport with clients and decision-makers across industries. Most of all, I’m reliable: things get done on time, without you having to chase them.',
    'I’m always exploring more administrative work and learning new skills, so I can take more off your plate and give you back more of your time.',
  ],
};

/* ---------------------------------------------------------------------
   EXPERIENCE
   Add another { ... } block to the list for each new role.
   --------------------------------------------------------------------- */
export const EXPERIENCE = [
  {
    role: 'Virtual Assistant',
    where: 'Freelance / Remote',
    dates: 'June 2019 – 2021',
    duties: [
      { title: 'Executive calendar management', text: 'Managed calendars, scheduled meetings and organized travel for clients.' },
      { title: 'Email and communication', text: 'Handled correspondence, filtered messages and answered inquiries on time.' },
      { title: 'Research and reporting', text: 'Researched topics and compiled reports to support decisions.' },
      { title: 'Virtual meetings', text: 'Coordinated and facilitated virtual meetings, from video setup to agendas.' },
      { title: 'Social media management', text: 'Scheduled content and monitored engagement.' },
      { title: 'Canva design and graphics', text: 'Created graphics and marketing visuals that strengthened client branding.' },
    ],
  },
];

/* ---------------------------------------------------------------------
   3. WORK — brands and projects (shown large with a screenshot or video)
   image → a screenshot in public/work
   video + poster → shows a video instead of a screenshot
   --------------------------------------------------------------------- */
export const PROJECTS = [
  {
    name: 'Nature’s Spring',
    kind: 'Bottled water brand, Philippines',
    url: 'https://naturespring.com.ph/',
    image: '/work/naturespring.jpg',
    imageAlt: 'Nature’s Spring homepage with a water bottle in front of the words Water for the Filipino',
    text: 'I set up a simple content system so the team can update their own website without calling a developer. New content goes up faster, and online engagement grew.',
  },
  {
    name: 'UNIVERS',
    kind: 'Designer fashion retailer, Makati',
    url: 'https://univers.ph/',
    image: '/work/univers.jpg',
    imageAlt: 'UNIVERS homepage showing the inside of their clothing store',
    text: 'Website and online store support for a multi-brand fashion retailer: product and brand pages, new collection launches, and quick fixes.',
  },
  {
    name: 'Project MOSES',
    kind: 'Weather monitoring, Mindoro State University',
    url: 'https://projectmoses.minsu.edu.ph/',
    image: '/posters/project-moses-website-promo.jpg',
    imageAlt: 'Project MOSES website showing the past 7 days of weather and rainfall',
    text: 'A public website with live readings from weather stations in Oriental Mindoro: the past 7 days of weather, rain alerts and a station map.',
  },
  {
    name: 'found3r',
    kind: 'Software services startup, Philippines',
    url: 'https://found3r.co/',
    image: '/work/found3r.jpg',
    imageAlt: 'found3r homepage with the headline Software solutions, next to a 3D laptop and server',
    text: 'The company website for found3r, home of the icr8 website creator and ih0st hosting. Plain words and peso prices for small businesses, schools and developers. Their teaser videos are in the samples below.',
  },
];

/* ---------------------------------------------------------------------
   3b. VIDEO SAMPLES
   featured: true → shown large across the full width (use for one video)
   vertical: true → for tall phone videos (Reels, TikTok)
   --------------------------------------------------------------------- */
export const VIDEOS = [
  {
    src: '/videos/genesis-data-collection.mp4',
    poster: '/posters/genesis-data-collection.jpg',
    title: 'How-it-works walkthrough',
    meta: '27 sec',
    text: 'Shows how weather data travels from sensor to screen in four steps.',
    featured: true,
  },
  {
    src: '/videos/icr8-teaser.mp4',
    poster: '/posters/icr8-teaser.jpg',
    title: 'icr8 website builder teaser',
    meta: '45 sec · vertical',
    text: 'A product teaser showing a café website being built section by section, with 3D models.',
    vertical: true,
  },
  {
    src: '/videos/ih0st-teaser.mp4',
    poster: '/posters/ih0st-teaser.jpg',
    title: 'ih0st hosting teaser',
    meta: '26 sec · vertical',
    text: 'From “it works on my laptop” to a live website, told in under half a minute.',
    vertical: true,
  },
  {
    src: '/videos/ai-promo-reel.mp4',
    title: 'Launch teaser reel',
    meta: '30 sec · vertical',
    text: 'A short AI-assisted teaser made for Reels and TikTok.',
    vertical: true,
  },
];

/* ---------------------------------------------------------------------
   4. TOOLS I USE
   --------------------------------------------------------------------- */
export const TOOLS = [
  { name: 'Microsoft Office', detail: 'Word, Excel, PowerPoint' },
  { name: 'Google Workspace', detail: 'Docs, Sheets, Drive' },
  { name: 'Communication', detail: 'Zoom, Slack' },
  { name: 'Canva', detail: 'Graphics and social content' },
];

/* ---------------------------------------------------------------------
   5. CONTACT
   --------------------------------------------------------------------- */
export const CONTACT = {
  heading: 'Let’s take a few things off your plate.',
  text: 'Tell me what’s keeping you busy. I’ll reply within one business day with ideas on how I can help.',
  button: 'Email me',
};

/* ---------------------------------------------------------------------
   SEARCH ENGINES AND LINK PREVIEWS
   --------------------------------------------------------------------- */
export const SEO = {
  title: 'Roger A. Montoya Jr. | Tech-Savvy Virtual Assistant',
  description:
    'Virtual assistant for executives and entrepreneurs: calendar and inbox management, cold calling, appointment setting, CRM and pipeline updates, back-office operations, research and Canva graphics. Available for US, AU and UK hours.',
};
