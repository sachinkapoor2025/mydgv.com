import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const PAGES = {
  home: 'You run the business. We make AI run your IT.',
  about: 'About Divit Global Ventures',
  contact: 'Contact DGV',
  services: 'IT services overview',
  faq: 'Frequently asked questions',
  products: 'Products we own and operate',
  'case-studies': 'Case studies',
  'how-we-build': 'How we build',
  insights: 'Insights',
  pricing: 'Pricing',
  default: 'Divit Global Ventures',
};

const root = process.cwd();
const outDir = path.join(root, 'public/og');
const fontData = fs.readFileSync(path.join(root, 'src/assets/fonts/Geist-SemiBold.ttf'));
fs.mkdirSync(outDir, { recursive: true });

async function render(slug, title) {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background: 'linear-gradient(135deg, #0B1426 0%, #152033 55%, #0B1426 100%)',
          color: '#F7F8FA',
          fontFamily: 'Geist',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column', gap: '18px' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 28,
                      color: '#38BDF8',
                      letterSpacing: 4,
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    },
                    children: 'Divit Global Ventures',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: title.length > 48 ? 48 : 58,
                      fontWeight: 650,
                      lineHeight: 1.15,
                      maxWidth: 980,
                    },
                    children: title,
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: { fontSize: 24, color: '#A8B0BF' },
              children: 'www.mydgv.com',
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'Geist', data: fontData, weight: 600, style: 'normal' }],
    },
  );

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  const file = path.join(outDir, `${slug}.png`);
  fs.writeFileSync(file, png);
  console.log('OG', file);
}

for (const [slug, title] of Object.entries(PAGES)) {
  await render(slug, title);
}
