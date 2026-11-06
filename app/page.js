/* =====================================================================
   THE PAGE LAYOUT
   This file arranges the sections. To change the WORDS, LINKS, PHOTOS
   or VIDEOS, edit content/site.js instead.
   ===================================================================== */
/* eslint-disable @next/next/no-img-element */
import {
  LINKS, ME, HERO, SKILLS, SERVICES_HEAD, SERVICES, ABOUT, EXPERIENCE, PROJECTS, VIDEOS, TOOLS, CONTACT,
} from '../content/site';
import Effects from '../components/Effects';
import Icon from '../components/Icon';

const mailto = `mailto:${LINKS.email}?subject=${encodeURIComponent('Hi Roger, I’d like to work with you')}`;
const hostname = (url) => new URL(url).hostname.replace('www.', '');

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      {/* ---------- Top bar: name, light/dark switch, hire button ---------- */}
      <header className="topbar">
        <div className="container topbar-inner">
          <span className="brand">
            <img src={ME.photo} alt="" width="36" height="36" />
            <span>{ME.name}</span>
          </span>
          <div className="topbar-actions">
            <button type="button" className="theme-toggle" data-theme-toggle aria-label="Switch light or dark mode">
              <span className="icon-sun"><Icon name="sun" /></span>
              <span className="icon-moon"><Icon name="moon" /></span>
            </button>
            <a className="btn btn-primary btn-small" href={mailto}>Hire me</a>
          </div>
        </div>
      </header>

      <main id="main">
        {/* ---------- 1. Hero ---------- */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="typed-line">
                <span className="sr-only">{HERO.typed}</span>
                <span aria-hidden="true" data-typing>{HERO.typed}</span>
                <span className="cursor" aria-hidden="true" />
              </p>
              <h1 id="hero-title" data-split="hero">{HERO.headline}</h1>
              <p className="rotator-line" data-hero-fade>
                <span className="sr-only">{HERO.rotatingLead} {HERO.rotating.join(', ')}.</span>
                <span aria-hidden="true">
                  {HERO.rotatingLead}{' '}
                  <span className="rotator-window">
                    <span className="rotator" data-rotator data-words={JSON.stringify(HERO.rotating)}>
                      {HERO.rotating[0]}
                    </span>
                  </span>
                </span>
              </p>
              <p className="hero-intro" data-hero-fade>{HERO.intro}</p>
              <div className="hero-actions" data-hero-fade>
                <a className="btn btn-primary" href={mailto}><Icon name="mail" /> {HERO.primaryButton}</a>
                <a className="btn btn-ghost" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                  <Icon name="linkedin" /> {HERO.secondaryButton}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
              <p className="hero-meta" data-hero-fade>
                <span className="pulse" aria-hidden="true" /> {ME.hours} · {ME.location}
              </p>
            </div>

            <div className="hero-visual">
              <img className="hero-photo" src={ME.photo} alt={`Portrait of ${ME.name}`} width="400" height="400" />
              <div className="hero-scene" data-scene aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ---------- Skills band: big moving text ---------- */}
        <section className="skills-band" aria-label="Skills">
          <div className="marquee marquee-big" data-marquee data-speed="70">
            <ul className="marquee-track">
              {SKILLS.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </div>
          <div className="marquee marquee-outline" data-marquee data-direction="right" data-speed="55" aria-hidden="true">
            <ul className="marquee-track">
              {[...SKILLS].reverse().map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </div>
        </section>

        {/* ---------- 2. Services ---------- */}
        <section className="section" aria-labelledby="services-title">
          <div className="container">
            <div className="section-head" data-head>
              <p className="eyebrow">What I do</p>
              <h2 id="services-title">{SERVICES_HEAD.heading}</h2>
              <p>{SERVICES_HEAD.text}</p>
            </div>
            <ol className="services" data-stagger>
              {SERVICES.map((s, i) => (
                <li key={s.title}>
                  <span className="service-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- About me ---------- */}
        <section className="section section-alt" aria-labelledby="about-title">
          <div className="container about">
            <div className="section-head" data-head>
              <p className="eyebrow">About me</p>
              <h2 id="about-title">{ABOUT.heading}</h2>
            </div>
            <div className="about-text" data-stagger>
              {ABOUT.paragraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </section>

        {/* ---------- Experience ---------- */}
        <section className="section" aria-labelledby="experience-title">
          <div className="container">
            <div className="section-head" data-head>
              <p className="eyebrow">Experience</p>
              <h2 id="experience-title">Where I’ve helped before</h2>
            </div>
            {EXPERIENCE.map((job) => (
              <article className="job" key={job.role + job.dates}>
                <header className="job-head" data-reveal>
                  <h3>{job.role}</h3>
                  <p>{job.where} · {job.dates}</p>
                </header>
                <ul className="duties" data-stagger>
                  {job.duties.map((d) => (
                    <li key={d.title}>
                      <h4>{d.title}</h4>
                      <p>{d.text}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- 3. Work: brands and projects ---------- */}
        <section className="section section-alt" aria-labelledby="work-title">
          <div className="container">
            <div className="section-head" data-head>
              <p className="eyebrow">Selected work</p>
              <h2 id="work-title">Brands and projects I’ve supported</h2>
            </div>

            <div className="projects">
              {PROJECTS.map((p) => (
                <article className="project" key={p.name} data-reveal>
                  <div className="browser">
                    <div className="browser-bar" aria-hidden="true">
                      <i /><i /><i />
                      <span>{hostname(p.url)}</span>
                    </div>
                    <div className="browser-view">
                      {p.video ? (
                        <video controls muted loop playsInline data-autoplay preload="metadata" poster={p.poster} src={p.video} aria-label={p.imageAlt} />
                      ) : (
                        <img src={p.image} alt={p.imageAlt} loading="lazy" data-parallax />
                      )}
                    </div>
                  </div>
                  <div className="project-text">
                    <p className="project-kind">{p.kind}</p>
                    <h3>{p.name}</h3>
                    <p>{p.text}</p>
                    <a className="text-link" href={p.url} target="_blank" rel="noopener noreferrer">
                      Visit {hostname(p.url)} <Icon name="external" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 3b. Video samples ---------- */}
        <section className="section" aria-labelledby="videos-title">
          <div className="container">
            <div className="section-head" data-head>
              <p className="eyebrow">Video samples</p>
              <h2 id="videos-title">Promo videos and social content</h2>
              <p>The videos play on their own with the sound off. Use the speaker button to turn sound on.</p>
            </div>
            <div className="videos" data-stagger>
              {VIDEOS.map((v) => (
                <figure className={`video${v.vertical ? ' video-vertical' : ''}${v.featured ? ' video-featured' : ''}`} key={v.src}>
                  <div className="video-frame">
                    <video
                      controls muted loop playsInline data-autoplay preload="metadata"
                      poster={v.poster}
                      src={v.poster ? v.src : `${v.src}#t=0.1`}
                      aria-label={v.title}
                    />
                  </div>
                  <figcaption>
                    <strong>{v.title}</strong> <span className="video-meta">{v.meta}</span>
                    <span>{v.text}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 4. Tools ---------- */}
        <section className="section section-alt" aria-labelledby="tools-title">
          <div className="container">
            <div className="section-head" data-head>
              <p className="eyebrow">Tools I use</p>
              <h2 id="tools-title">Ready to work in the tools you already use</h2>
            </div>
            <dl className="tools" data-stagger>
              {TOOLS.map((t) => (
                <div key={t.name}>
                  <dt>{t.name}</dt>
                  <dd>{t.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------- 5. Contact ---------- */}
        <section className="section" aria-labelledby="contact-title">
          <div className="container">
            <div className="contact" data-reveal>
              <img src={ME.photo} alt="" width="88" height="88" />
              <h2 id="contact-title">{CONTACT.heading}</h2>
              <p>{CONTACT.text}</p>
              <a className="btn btn-primary btn-large" href={mailto}><Icon name="mail" /> {CONTACT.button}</a>
              <p className="contact-meta">
                <span className="contact-email">{LINKS.email}</span>
                <span>{ME.hours}</span>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} {ME.name}, {ME.title}</span>
          <span className="footer-links">
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </span>
        </div>
      </footer>

      <Effects />
    </>
  );
}
