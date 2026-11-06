/* The picture shown when someone shares your link on Facebook, LinkedIn,
   Slack, etc. It is generated from text at build time, so there is no
   image file to download or update. */
import { ImageResponse } from 'next/og';
import { ME, HERO } from '../content/site';

export const dynamic = 'force-static';
export const alt = `${ME.name}, ${ME.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#f7faf8',
          color: '#16211b',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: '#1d7350',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            RM
          </div>
          <div style={{ fontSize: 30, fontWeight: 700 }}>{ME.name}</div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, letterSpacing: -2, maxWidth: 1000 }}>
          {HERO.headline}
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#1d7350', fontWeight: 600 }}>
          {ME.title} · {ME.hours}
        </div>
      </div>
    ),
    size
  );
}
