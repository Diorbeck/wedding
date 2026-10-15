import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

const NIGHT = '#15120F', IVORY = '#F3EDE1', GOLD = '#D9BD86', BRONZE = '#B48F57';
const SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="14 18 240 204" width="240" height="204"><circle cx="112" cy="115" r="90" fill="none" stroke="#D9BD86" stroke-width="1.8"/><g fill="#D9BD86"><path transform="translate(22.0 182)" d="M71.3 1.0Q64.6 1.0 54.7 0.2Q44.9 -0.5 36.5 -0.5Q28.8 -0.5 21.6 -0.2Q14.4 0.0 8.6 0.0Q8.2 0.0 8.2 -1.4Q8.2 -2.9 8.6 -2.9Q17.8 -2.9 22.4 -4.1Q27.1 -5.3 28.7 -8.9Q30.2 -12.5 30.2 -19.4V-130.6Q30.2 -137.5 28.7 -141.0Q27.1 -144.5 22.6 -145.8Q18.0 -147.1 8.9 -147.1Q8.4 -147.1 8.4 -148.6Q8.4 -150.0 8.9 -150.0Q14.6 -150.0 21.7 -149.6Q28.8 -149.3 36.5 -149.3Q44.2 -149.3 52.9 -149.9Q61.7 -150.5 67.9 -150.5Q93.6 -150.5 112.8 -140.9Q132.0 -131.3 142.7 -114.7Q153.4 -98.2 153.4 -77.5Q153.4 -59.5 146.9 -45.0Q140.4 -30.5 129.0 -20.3Q117.6 -10.1 102.7 -4.6Q87.8 1.0 71.3 1.0ZM68.9 -2.2Q89.0 -2.2 104.5 -10.2Q120.0 -18.2 128.9 -34.0Q137.8 -49.7 137.8 -72.2Q137.8 -93.4 129.5 -110.3Q121.2 -127.2 106.1 -137.3Q91.0 -147.4 70.1 -147.4Q55.4 -147.4 49.2 -144.4Q43.0 -141.4 43.0 -130.1V-22.1Q43.0 -11.8 47.9 -7.0Q52.8 -2.2 68.9 -2.2Z"/><path transform="translate(112.0 212) scale(.75)" d="M28.8 -25.0 31.2 -144.5 36.5 -144.0 34.3 -25.0Q34.1 -12.7 38.3 -7.8Q42.5 -2.9 54.5 -2.9Q55.0 -2.9 55.0 -1.4Q55.0 0.0 54.5 0.0Q49.2 0.0 43.6 -0.2Q37.9 -0.5 31.2 -0.5Q25.4 -0.5 20.2 -0.2Q14.9 0.0 10.1 0.0Q9.6 0.0 9.6 -1.4Q9.6 -2.9 10.1 -2.9Q20.2 -2.9 24.4 -7.8Q28.6 -12.7 28.8 -25.0ZM193.7 -2.9Q194.4 -2.9 194.4 -1.4Q194.4 0.0 193.7 0.0Q187.9 0.0 180.8 -0.2Q173.8 -0.5 165.8 -0.5Q158.4 -0.5 152.2 -0.2Q145.9 0.0 140.9 0.0Q140.4 0.0 140.4 -1.4Q140.4 -2.9 140.9 -2.9Q152.9 -2.9 156.4 -6.0Q159.8 -9.1 159.4 -19.4L155.0 -137.8L162.0 -146.6L99.1 -1.7Q98.9 -0.7 97.2 -0.7Q95.5 -0.7 95.0 -1.7L36.5 -130.1Q28.8 -147.1 11.8 -147.1Q11.3 -147.1 11.3 -148.6Q11.3 -150.0 11.8 -150.0Q15.4 -150.0 19.4 -149.8Q23.5 -149.5 26.2 -149.5Q29.5 -149.5 32.4 -149.8Q35.3 -150.0 36.7 -150.0Q40.1 -150.0 42.0 -147.8Q43.9 -145.7 47.8 -137.5L102.7 -18.7L96.5 -8.6L155.5 -144.0Q156.7 -146.6 158.8 -148.3Q160.8 -150.0 162.7 -150.0Q163.9 -150.0 166.3 -149.8Q168.7 -149.5 171.8 -149.5Q178.1 -149.5 181.9 -149.8Q185.8 -150.0 190.1 -150.0Q190.6 -150.0 190.6 -148.6Q190.6 -147.1 190.1 -147.1Q178.3 -147.1 172.8 -144.1Q167.3 -141.1 167.5 -131.0L172.1 -19.4Q172.3 -12.5 173.9 -8.9Q175.4 -5.3 180.0 -4.1Q184.6 -2.9 193.7 -2.9Z"/></g></svg>';
const MONO = 'data:image/svg+xml;base64,' + btoa(SVG);
const UA = 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1';

async function font(family) {
  const css = await fetch('https://fonts.googleapis.com/css2?family=' + encodeURIComponent(family) + '&display=swap', { headers: { 'User-Agent': UA } }).then((r) => r.text());
  const m = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!m) throw new Error('no font file for ' + family);
  return fetch(m[1]).then((r) => r.arrayBuffer());
}

const h = (type, props, ...children) => ({ type, props: { ...props, children: children.length === 1 ? children[0] : children } });

export default async function handler() {
  const [vibes, forum] = await Promise.all([font('Great Vibes'), font('Forum')]);
  const sep = h('span', { style: { color: BRONZE, fontSize: 40, margin: '0 14px' } }, '·');
  const tree = h('div', { style: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: NIGHT, backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(180,143,87,0.18) 0%, rgba(21,18,15,0) 60%)', color: IVORY, fontFamily: 'Forum' } },
    h('img', { src: MONO, width: 170, height: 145 }),
    h('div', { style: { fontFamily: 'Great Vibes', fontSize: 84, marginTop: 14, color: IVORY } }, 'Diyorbek & Mubinaxon'),
    h('div', { style: { display: 'flex', alignItems: 'center', fontSize: 40, letterSpacing: 4, marginTop: 10 } }, '22', sep, '10', { ...sep }, '2026'),
    h('div', { style: { fontSize: 20, letterSpacing: 5, color: GOLD, marginTop: 24 } }, 'YAKKASAROY PALACE · BACCARAT')
  );
  return new ImageResponse(tree, {
    width: 1000,
    height: 525,
    fonts: [
      { name: 'Great Vibes', data: vibes, style: 'normal', weight: 400 },
      { name: 'Forum', data: forum, style: 'normal', weight: 400 }
    ],
    headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=2592000' }
  });
}
