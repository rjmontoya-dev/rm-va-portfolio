/* =====================================================================
   PAGE EFFECTS (plain JavaScript)
   Each function starts one effect and returns a "stop" function.
   They are switched on in components/Effects.jsx.

   - initTheme    light / dark mode button (remembers the choice)
   - initTyping   the hero line that types itself out
   - initRotator  the switching words under the headline
   - initSplit    splits headings into words so they can rise into view
   - initMarquee  the moving rows of skills and tools (GSAP)
   - initAutoplayVideos  plays videos on loop while they are on screen
   - initScene    the 3D rings orbiting the profile photo (three.js)
   - initMotion   text and scroll animations (GSAP)
   ===================================================================== */

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* The current theme: the visitor's choice, or their device setting */
export function currentTheme() {
  const chosen = document.documentElement.dataset.theme;
  if (chosen) return chosen;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/* ---------- Light / dark mode button ---------- */
export function initTheme(button) {
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  const update = () => {
    const theme = currentTheme();
    button.dataset.mode = theme;
    button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  };
  const onClick = () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
    update();
    window.dispatchEvent(new Event('themechange'));
  };
  const onSystemChange = () => { update(); window.dispatchEvent(new Event('themechange')); };

  update();
  button.addEventListener('click', onClick);
  media.addEventListener('change', onSystemChange);
  return () => {
    button.removeEventListener('click', onClick);
    media.removeEventListener('change', onSystemChange);
  };
}

/* ---------- Typing text ---------- */
export function initTyping(el, speed = 45) {
  if (prefersReducedMotion()) return () => {};
  const text = el.textContent;
  let i = 0;
  let timer;
  el.textContent = '';
  const step = () => {
    el.textContent = text.slice(0, ++i);
    if (i < text.length) timer = setTimeout(step, text[i - 1] === ',' ? speed * 6 : speed);
    else el.parentElement.classList.add('typed-done');
  };
  timer = setTimeout(step, 400);
  return () => { clearTimeout(timer); el.textContent = text; };
}

/* ---------- Switching words (letters flip in one by one) ---------- */
const toLetters = (text) =>
  [...text].map((ch) => `<span class="char">${ch === ' ' ? '&nbsp;' : ch}</span>`).join('');

export function initRotator(el, gsap, interval = 2800) {
  const words = JSON.parse(el.dataset.words);
  if (prefersReducedMotion() || words.length < 2) return () => {};
  let index = 0;
  const timer = setInterval(() => {
    index = (index + 1) % words.length;
    gsap.timeline()
      .to(el.querySelectorAll('.char').length ? el.querySelectorAll('.char') : el, {
        yPercent: -100, opacity: 0, duration: 0.3, stagger: 0.012, ease: 'power2.in',
      })
      .call(() => { el.innerHTML = toLetters(words[index]); })
      .add(() => {
        gsap.from(el.querySelectorAll('.char'), {
          yPercent: 100, rotateX: -80, opacity: 0, duration: 0.5, stagger: 0.025, ease: 'back.out(1.8)',
        });
      });
  }, interval);
  return () => { clearInterval(timer); el.textContent = words[0]; };
}

/* ---------- Autoplaying videos ----------
   Videos marked data-autoplay play (muted, looping) while they are on
   screen and pause when scrolled away, so the page stays fast.
   They don't start on their own if the visitor prefers reduced motion. */
export function initAutoplayVideos(videos) {
  if (prefersReducedMotion() || !videos.length) return () => {};
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) target.play().catch(() => {}); // if the browser blocks it, the play button still works
      else target.pause();
    });
  }, { threshold: 0.35 });
  videos.forEach((v) => io.observe(v));
  return () => {
    io.disconnect();
    videos.forEach((v) => v.pause());
  };
}

/* ---------- Split headings into words ----------
   Each word sits in a mask so it can slide up into view.
   Screen readers still read the full heading from aria-label. */
export function initSplit(elements) {
  if (prefersReducedMotion()) return () => {};
  const originals = [];
  elements.forEach((el) => {
    const text = el.textContent;
    originals.push([el, el.innerHTML]);
    el.setAttribute('aria-label', text);
    el.innerHTML = text
      .split(' ')
      .map((w) => `<span class="word-mask" aria-hidden="true"><span class="word">${w}</span></span>`)
      .join(' ');
  });
  return () => originals.forEach(([el, html]) => { el.innerHTML = html; el.removeAttribute('aria-label'); });
}

/* ---------- Moving text carousel (marquee) ----------
   Repeats the list until it fills the screen twice, then slides it in a
   seamless loop. Slows down on hover, speeds up while you scroll.
   data-direction="right" reverses it, data-speed sets pixels per second. */
export function initMarquee(el, gsap, ScrollTrigger) {
  if (prefersReducedMotion()) return () => {};
  const track = el.querySelector('.marquee-track');
  const originals = [...track.children];
  const speed = Number(el.dataset.speed) || 60;
  const toRight = el.dataset.direction === 'right';
  let tween;
  let trigger;

  const build = () => {
    if (tween) tween.kill();
    track.querySelectorAll('[data-clone]').forEach((c) => c.remove());
    gsap.set(track, { x: 0 });
    el.classList.add('is-animated');

    // Add copies until, after sliding one full set away, the screen is still full
    const oneSet = track.scrollWidth;
    let copies = 0;
    do {
      originals.forEach((li) => {
        const clone = li.cloneNode(true);
        clone.dataset.clone = '';
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
      copies++;
    } while (track.scrollWidth < oneSet + el.clientWidth + 100 && copies < 20);

    // Width of one full set, including the gap after it
    const setWidth = track.children[originals.length].offsetLeft - originals[0].offsetLeft;
    tween = gsap.fromTo(
      track,
      { x: toRight ? -setWidth : 0 },
      { x: toRight ? 0 : -setWidth, duration: setWidth / speed, ease: 'none', repeat: -1 }
    );
  };
  build();

  const slow = () => gsap.to(tween, { timeScale: 0.2, duration: 0.6 });
  const normal = () => gsap.to(tween, { timeScale: 1, duration: 0.6 });
  el.addEventListener('mouseenter', slow);
  el.addEventListener('mouseleave', normal);

  // Scrolling the page gives the row a short burst of speed
  if (ScrollTrigger) {
    trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 5);
        gsap.to(tween, { timeScale: boost, duration: 0.2, overwrite: true, onComplete: normal });
      },
    });
  }

  let resizeTimer;
  const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(build, 200); };
  window.addEventListener('resize', onResize);

  return () => {
    tween.kill();
    if (trigger) trigger.kill();
    clearTimeout(resizeTimer);
    window.removeEventListener('resize', onResize);
    el.removeEventListener('mouseenter', slow);
    el.removeEventListener('mouseleave', normal);
    track.querySelectorAll('[data-clone]').forEach((c) => c.remove());
    gsap.set(track, { clearProps: 'transform' });
    el.classList.remove('is-animated');
  };
}

/* ---------- 3D rings around the photo (three.js) ----------
   The photo sits on the page. The canvas sits on top of it and draws
   rings with small blocks circling the photo. An invisible disc the size
   of the photo hides the blocks while they pass behind it. */
export function initScene(mount, THREE, photoSize = 0.62) {
  const reduceMotion = prefersReducedMotion();

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    return () => {}; // no 3D support: the photo still shows
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  mount.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0, 9);
  // Half the visible height at the photo's depth, used to size things
  const half = 9 * Math.tan(THREE.MathUtils.degToRad(20));
  const photoRadius = half * photoSize;

  const palette = () =>
    currentTheme() === 'dark'
      ? { line: 0x5ccb94, block: 0x5ccb94, soft: 0x2f7a57 }
      : { line: 0x1d7350, block: 0x1d7350, soft: 0x8fd1ae };
  let colors = palette();

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const key = new THREE.DirectionalLight(0xffffff, 1.5);
  key.position.set(4, 6, 6);
  scene.add(key);

  // Invisible disc: writes depth only, so objects behind the photo are hidden
  const occluder = new THREE.Mesh(
    new THREE.CircleGeometry(photoRadius * 0.98, 64),
    new THREE.MeshBasicMaterial({ colorWrite: false })
  );
  occluder.renderOrder = -1;
  scene.add(occluder);

  const world = new THREE.Group();
  scene.add(world);

  const ringMat = new THREE.MeshBasicMaterial({ color: colors.line, transparent: true, opacity: 0.45 });
  const blockMat = new THREE.MeshStandardMaterial({ color: colors.block, roughness: 0.4 });
  const softMat = new THREE.MeshStandardMaterial({ color: colors.soft, roughness: 0.4 });

  const orbits = [
    { radius: photoRadius * 1.32, tilt: [1.2, 0, 0.35], speed: 0.22, count: 4, geo: new THREE.BoxGeometry(0.3, 0.3, 0.3), mat: blockMat },
    { radius: photoRadius * 1.5, tilt: [1.35, 0.2, -0.5], speed: -0.16, count: 3, geo: new THREE.SphereGeometry(0.13, 24, 24), mat: softMat },
  ];
  const pivots = orbits.map((o) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(o.radius, 0.012, 8, 180), ringMat);
    ring.rotation.set(...o.tilt);
    world.add(ring);
    const pivot = new THREE.Group();
    pivot.rotation.set(...o.tilt);
    for (let i = 0; i < o.count; i++) {
      const a = (i / o.count) * Math.PI * 2;
      const mesh = new THREE.Mesh(o.geo, o.mat);
      mesh.position.set(Math.cos(a) * o.radius, Math.sin(a) * o.radius, 0);
      pivot.add(mesh);
    }
    world.add(pivot);
    return { pivot, speed: o.speed };
  });

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = mount;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(mount);

  const onTheme = () => {
    colors = palette();
    ringMat.color.set(colors.line);
    blockMat.color.set(colors.block);
    softMat.color.set(colors.soft);
    renderer.render(scene, camera);
  };
  window.addEventListener('themechange', onTheme);

  const pointer = { x: 0, y: 0 };
  const onMove = (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onMove, { passive: true });

  const clock = new THREE.Clock();
  let frame = null;
  let visible = true;
  const tick = () => {
    const t = clock.getElapsedTime();
    pivots.forEach((p) => { p.pivot.rotation.z = t * p.speed; });
    pivots.forEach((p) => p.pivot.children.forEach((m) => m.rotation.set(t * 0.8, t * 0.5, 0)));
    world.rotation.y += (pointer.x * 0.25 - world.rotation.y) * 0.04;
    world.rotation.x += (pointer.y * 0.15 - world.rotation.x) * 0.04;
    renderer.render(scene, camera);
    frame = visible ? requestAnimationFrame(tick) : null;
  };

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !frame && !reduceMotion) frame = requestAnimationFrame(tick);
  });
  io.observe(mount);

  if (reduceMotion) renderer.render(scene, camera);
  else frame = requestAnimationFrame(tick);

  return () => {
    if (frame) cancelAnimationFrame(frame);
    io.disconnect();
    ro.disconnect();
    window.removeEventListener('themechange', onTheme);
    window.removeEventListener('pointermove', onMove);
    scene.traverse((obj) => obj.geometry && obj.geometry.dispose());
    [ringMat, blockMat, softMat, occluder.material].forEach((m) => m.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}

/* ---------- Scroll animations (GSAP) ----------
   data-hero-fade → hero items fade in on load
   data-reveal    → fades up when scrolled into view
   data-stagger   → its children fade up one after another
   data-parallax  → screenshots drift slightly while scrolling */
export function initMotion(gsap, ScrollTrigger) {
  if (prefersReducedMotion()) return () => {};
  gsap.registerPlugin(ScrollTrigger);

  const ctx = gsap.context(() => {
    // Hero: headline words rise one by one, then the rest fades in
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
    intro
      .from('[data-split="hero"] .word', { yPercent: 115, rotate: 4, duration: 0.9, stagger: 0.06 })
      .from('[data-hero-fade]', { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.5');
    gsap.from('.hero-photo', { scale: 0.9, opacity: 0, duration: 1, ease: 'power3.out' });

    // Section headings: label fades, heading words rise, then the line below
    gsap.utils.toArray('[data-head]').forEach((head) => {
      gsap.timeline({ scrollTrigger: { trigger: head, start: 'top 85%', once: true } })
        .from(head.querySelector('.eyebrow'), { y: 12, opacity: 0, duration: 0.5, ease: 'power2.out' })
        .from(head.querySelectorAll('h2 .word'), { yPercent: 115, duration: 0.8, stagger: 0.05, ease: 'power3.out' }, '-=0.2')
        .from(head.querySelectorAll('p:not(.eyebrow)'), { y: 12, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.5');
    });

    // Contact heading words
    gsap.from('.contact h2 .word', {
      yPercent: 115, duration: 0.8, stagger: 0.05, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact', start: 'top 80%', once: true },
    });

    // Project text slides in from the side, line by line
    gsap.utils.toArray('.project-text').forEach((text, i) => {
      gsap.from(text.children, {
        x: i % 2 ? -30 : 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: text, start: 'top 85%', once: true },
      });
    });

    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        y: 30, opacity: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    gsap.utils.toArray('[data-stagger]').forEach((group) => {
      gsap.from(group.children, {
        y: 30, opacity: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: { trigger: group, start: 'top 88%', once: true },
      });
    });

    gsap.utils.toArray('[data-parallax]').forEach((el) => {
      gsap.fromTo(el, { yPercent: -4 }, {
        yPercent: 4, ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      });
    });
  });

  return () => ctx.revert();
}
