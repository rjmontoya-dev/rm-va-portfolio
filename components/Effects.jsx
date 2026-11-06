'use client';

/* Switches on the page effects from lib/effects.js once the page loads.
   The page is fully readable without them. */
import { useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  initTheme, initTyping, initRotator, initSplit, initMarquee, initScene, initMotion, initAutoplayVideos,
} from '../lib/effects';

// Headings whose words rise into view
const SPLIT_HEADINGS = '[data-split], [data-head] h2, .contact h2';

export default function Effects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const stops = [];
    const $ = (selector) => document.querySelector(selector);

    if ($('[data-theme-toggle]')) stops.push(initTheme($('[data-theme-toggle]')));
    if ($('[data-typing]')) stops.push(initTyping($('[data-typing]')));
    if ($('[data-rotator]')) stops.push(initRotator($('[data-rotator]'), gsap));
    if ($('[data-scene]')) stops.push(initScene($('[data-scene]'), THREE));
    stops.push(initSplit(document.querySelectorAll(SPLIT_HEADINGS)));
    document.querySelectorAll('[data-marquee]').forEach((el) => stops.push(initMarquee(el, gsap, ScrollTrigger)));
    stops.push(initAutoplayVideos([...document.querySelectorAll('video[data-autoplay]')]));
    stops.push(initMotion(gsap, ScrollTrigger));

    return () => stops.reverse().forEach((stop) => stop());
  }, []);

  return null;
}
