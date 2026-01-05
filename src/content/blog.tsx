import type { ReactNode } from 'react';

export interface BlogAuthor {
  name: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  datePublished: string; // ISO date (YYYY-MM-DD)
  dateModified?: string; // ISO date (YYYY-MM-DD)
  author: BlogAuthor;
  category: string;
  readTimeMinutes: number;
  tags: string[];
  coverImage?: string;
  content: ReactNode;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'huong-dan-giu-mong-khoe-gel-dip-acrylic',
    title: 'How to keep your nails healthy with Gel / Dip Powder / Acrylic (no thinning, peeling, or brittleness)',
    description:
      'A practical checklist to keep nails strong before, during, and after gel, dip powder, or acrylic—how to choose the right service, care for your cuticles, prevent breakage, and know when it’s time to remove.',
    datePublished: '2026-01-05',
    dateModified: '2026-01-05',
    author: { name: 'Helen Pham' },
    category: 'Nail Care',
    readTimeMinutes: 10,
    tags: ['nail care', 'gel', 'dip powder', 'acrylic', 'aftercare'],
    coverImage: '/images/gallery/service-organic.jpg',
    content: (
      <>
        <p className="text-foreground/90 leading-relaxed">
          If you’ve ever noticed your nails becoming <strong>thin, brittle, or peeling</strong> after a few sets of
          gel/dip/acrylic, the cause usually isn’t “getting nails done” in general—it’s your
          <strong>maintenance habits</strong>, your <strong>removal method</strong>, and whether the
          <strong>service truly matches your natural nail</strong>.
        </p>

        <p className="text-foreground/90 leading-relaxed">
          This guide is organized into three stages: <strong>before</strong>, <strong>during</strong>, and <strong>after</strong>.
          Follow the checklist and you’ll significantly reduce lifting, chipping, and breakage.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">1) Before your appointment: choose the right service for your nails</h2>
        <p className="text-foreground/90 leading-relaxed">
          The “best” service is the one that fits your <strong>nail thickness</strong>, your <strong>desired length</strong>,
          and how hard you are on your hands (dishwashing, typing, gym, cleaning products, etc.).
        </p>

        <div className="mt-4 grid gap-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">Gel (gel polish)</h3>
            <p className="text-foreground/80 leading-relaxed">
              Great if you want a clean, glossy, natural look. Gel can be durable, but your natural nail is still the base—
              if your nails are thin or break easily, consider a protective overlay (builder gel) or switch to dip.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">Dip Powder</h3>
            <p className="text-foreground/80 leading-relaxed">
              Often feels stronger than gel and is a good fit if you break nails easily or want extra durability.
              The key is <strong>proper thickness</strong>—too thick can feel bulky and crack; too thin can lift.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">Acrylic / Extension</h3>
            <p className="text-foreground/80 leading-relaxed">
              Best when you want added length or maximum strength. But it’s also a “discipline” service:
              you’ll need <strong>fills on schedule</strong> and <strong>proper removal</strong> to protect your natural nail.
            </p>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">2) During the service: 5 technical details that protect nail health</h2>
        <ol className="list-decimal pl-5 space-y-3 text-foreground/90 leading-relaxed">
          <li>
            <strong>No aggressive filing on the natural nail:</strong> prep is for adhesion—not for thinning.
          </li>
          <li>
            <strong>Clean cuticles without injury:</strong> over-cutting can cause irritation, inflammation, and pain.
          </li>
          <li>
            <strong>Balanced thickness:</strong> too thick can crack from impact; too thin can lift.
          </li>
          <li>
            <strong>Seal the free edge:</strong> helps keep water/chemicals from sneaking in and causing lifting.
          </li>
          <li>
            <strong>Avoid product on skin:</strong> gel on skin can increase irritation risk—clean it promptly.
          </li>
        </ol>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">3) Aftercare: a 2-minute daily routine to prevent lifting</h2>
        <p className="text-foreground/90 leading-relaxed">
          The longevity of your set is often 50% aftercare. You only need 2 minutes a day:
        </p>
        <ul className="list-disc pl-5 space-y-3 text-foreground/90 leading-relaxed">
          <li>
            <strong>Cuticle oil</strong> 1–2x/day (especially after washing hands/dishes). Dry cuticles = more peeling/lifting.
          </li>
          <li>
            <strong>Wear gloves for water/chemicals</strong> (cleaning, dishwashing). Constant water + soap is the #1 enemy of adhesion.
          </li>
          <li>
            <strong>Don’t use nails as tools</strong> (opening cans, peeling labels, prying boxes). This habit is the #1 cause of cracks and breaks.
          </li>
          <li>
            <strong>Fill on time</strong> (usually every 2–3 weeks). Waiting too long increases leverage near the cuticle and can break the natural nail.
          </li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">4) When should you remove it (and how to do it safely)?</h2>
        <p className="text-foreground/90 leading-relaxed">
          If you notice lifting at the edges, gaps, or any soreness—don’t try to “push through.” Most importantly:
          <strong>don’t pick or peel</strong>. Peeling gel/dip/acrylic usually takes layers of your natural nail with it.
        </p>
        <div className="rounded-2xl border border-border bg-secondary/30 p-5 mt-4">
          <p className="text-foreground/90 leading-relaxed">
            Safe tip: if you need a temporary fix, <strong>trim shorter</strong> to reduce leverage and schedule a professional removal.
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">5) Quick schedule: stay pretty without stressing your nails</h2>
        <ul className="list-disc pl-5 space-y-3 text-foreground/90 leading-relaxed">
          <li><strong>Gel:</strong> typically every 2–3 weeks, depending on growth and lifestyle.</li>
          <li><strong>Dip:</strong> typically every ~3 weeks; do a proper refresh or remove + reapply when needed.</li>
          <li><strong>Acrylic:</strong> fills every 2–3 weeks; avoid going past 4 weeks if you’re hard on your hands.</li>
        </ul>

        <hr className="my-10 border-border" />

        <p className="text-foreground/90 leading-relaxed">
          If you want quick guidance on which option fits your nails best (<strong>gel / dip / acrylic</strong>),
          stop by or book an appointment—choosing the right service + a simple routine is the fastest way to keep nails both beautiful and healthy.
        </p>
      </>
    ),
  },

  {
    slug: 'cuticle-oil-101-why-it-works-and-how-to-use-it',
    title: 'Cuticle Oil 101: why it works (and how to use it so your manicure lasts longer)',
    description:
      'Cuticle oil is the fastest, cheapest way to improve nail flexibility, reduce peeling, and keep gel or dip from lifting. Here’s a simple routine that actually sticks.',
    datePublished: '2026-01-06',
    dateModified: '2026-01-06',
    author: { name: 'Helen Pham' },
    category: 'Tips and Hacks',
    readTimeMinutes: 6,
    tags: ['cuticle oil', 'aftercare', 'manicure', 'nail health', 'tips'],
    coverImage: '/images/gallery/service-organic.jpg',
    content: (
      <>
        <p className="text-foreground/90 leading-relaxed">
          If you only adopt <strong>one</strong> aftercare habit, make it cuticle oil. It sounds simple, but it solves
          the most common problems we see between appointments: <strong>dry, peeling nails</strong>,
          <strong>hangnails</strong>, and <strong>lifting around the cuticle line</strong>.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">What cuticle oil actually does</h2>
        <ul className="list-disc pl-5 space-y-3 text-foreground/90 leading-relaxed">
          <li>
            <strong>Improves flexibility:</strong> nails that can flex a little are less likely to crack or peel.
          </li>
          <li>
            <strong>Reduces dryness at the seal:</strong> the skin around your nail is where lifting often begins.
          </li>
          <li>
            <strong>Protects the nail plate:</strong> consistent oiling helps keep the top layers from splitting.
          </li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">How to use it (the routine that works)</h2>
        <div className="rounded-2xl border border-border bg-card p-5">
          <ol className="list-decimal pl-5 space-y-3 text-foreground/90 leading-relaxed">
            <li>
              Apply a small drop to each nail at the cuticle line.
            </li>
            <li>
              Massage for 10–15 seconds per nail (this matters more than the brand).
            </li>
            <li>
              Do it <strong>after washing hands</strong> or showering—water strips oils fast.
            </li>
          </ol>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">Best times to oil your cuticles</h2>
        <p className="text-foreground/90 leading-relaxed">
          Aim for <strong>1–2 times per day</strong>. If you work with water or sanitizer, go for 3.
        </p>
        <ul className="list-disc pl-5 space-y-3 text-foreground/90 leading-relaxed">
          <li>After dishes/cleaning (or after removing gloves)</li>
          <li>Before bed (the easiest habit to keep)</li>
          <li>Before a long drive or movie (your hands are idle anyway)</li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">Common mistakes</h2>
        <ul className="list-disc pl-5 space-y-3 text-foreground/90 leading-relaxed">
          <li>
            <strong>Using oil only when you remember:</strong> consistency beats intensity.
          </li>
          <li>
            <strong>Skipping oil because of “greasy hands”:</strong> use a smaller amount and massage it in.
          </li>
          <li>
            <strong>Picking hangnails:</strong> trim cleanly and oil; picking tears the skin and causes soreness.
          </li>
        </ul>

        <hr className="my-10 border-border" />
        <p className="text-foreground/90 leading-relaxed">
          Want a routine tailored to your nails and lifestyle? Ask us at your next appointment—we’ll recommend the best
          service (gel, dip, builder overlay, or acrylic) and the aftercare steps that keep it looking fresh.
        </p>
      </>
    ),
  },

  {
    slug: 'gel-vs-dip-vs-acrylic-which-one-should-you-choose',
    title: 'Gel vs Dip vs Acrylic: how to choose the right service for your nails',
    description:
      'Confused about gel, dip powder, and acrylic? Use this quick decision guide based on nail strength, length goals, lifestyle, and maintenance schedule.',
    datePublished: '2026-01-07',
    dateModified: '2026-01-07',
    author: { name: 'Helen Pham' },
    category: 'Salon Tips',
    readTimeMinutes: 8,
    tags: ['gel', 'dip powder', 'acrylic', 'service guide', 'nail care'],
    coverImage: '/images/gallery/service-combo.jpg',
    content: (
      <>
        <p className="text-foreground/90 leading-relaxed">
          The best manicure isn’t the trendiest—it’s the one that fits your <strong>natural nail</strong> and your
          daily routine. Here’s a practical way to decide between <strong>gel</strong>, <strong>dip powder</strong>,
          and <strong>acrylic</strong>.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">Start with 3 questions</h2>
        <ol className="list-decimal pl-5 space-y-3 text-foreground/90 leading-relaxed">
          <li>
            <strong>Do you want length?</strong> If yes, acrylic (or extensions) usually wins.
          </li>
          <li>
            <strong>Do your nails peel or break easily?</strong> Dip or a protective overlay can help.
          </li>
          <li>
            <strong>How hard are you on your hands?</strong> Cleaning, gym, and frequent hand-washing require extra durability.
          </li>
        </ol>

        <div className="mt-6 grid gap-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">Gel polish</h3>
            <p className="text-foreground/80 leading-relaxed">
              Best for a natural feel and shine. Ideal when your nails are already in good shape and you’re not chasing extra length.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">Dip powder</h3>
            <p className="text-foreground/80 leading-relaxed">
              Great for clients who want more strength without adding length. A good choice if you chip gel quickly or have thin nails.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">Acrylic / extensions</h3>
            <p className="text-foreground/80 leading-relaxed">
              Best for added length and shape changes. Works well when you want dramatic looks—but it requires consistent fills and safe removal.
            </p>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">Maintenance: what to expect</h2>
        <ul className="list-disc pl-5 space-y-3 text-foreground/90 leading-relaxed">
          <li><strong>Gel:</strong> refresh every 2–3 weeks.</li>
          <li><strong>Dip:</strong> refresh every ~3 weeks (remove/reapply when needed).</li>
          <li><strong>Acrylic:</strong> fills every 2–3 weeks (avoid going too long).</li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">The deal-breaker: removal</h2>
        <p className="text-foreground/90 leading-relaxed">
          Most “damage” comes from <strong>peeling</strong> or overly aggressive filing. If you’re not sure you’ll remove
          it safely, choose a service you can maintain comfortably and schedule professional removal.
        </p>
      </>
    ),
  },

  {
    slug: 'best-nail-shape-for-your-fingers-round-square-almond-coffin',
    title: 'Best nail shape for your fingers: Round vs Square vs Almond vs Coffin',
    description:
      'Picking a nail shape isn’t just aesthetics—it affects durability, breakage, and how long your manicure looks “fresh.” Here’s how to choose confidently.',
    datePublished: '2026-01-08',
    dateModified: '2026-01-08',
    author: { name: 'Helen Pham' },
    category: 'Lifestyle',
    readTimeMinutes: 7,
    tags: ['nail shapes', 'almond', 'square', 'coffin', 'style guide'],
    coverImage: '/images/gallery/service-combo.jpg',
    content: (
      <>
        <p className="text-foreground/90 leading-relaxed">
          Nail shape changes your whole look—hands, fingers, and even how “clean” your manicure appears as it grows out.
          Here’s a salon-pro approach to picking a shape based on <strong>your nail strength</strong> and <strong>your lifestyle</strong>.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">If you prioritize durability</h2>
        <div className="grid gap-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">Round / Oval</h3>
            <p className="text-foreground/80 leading-relaxed">
              Most durable for natural nails. The curved edge distributes pressure and is less likely to snag or chip.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">Soft Square (Squoval)</h3>
            <p className="text-foreground/80 leading-relaxed">
              A balanced option: clean lines without the sharp corners that catch on hair, clothes, and bags.
            </p>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">If you want a longer look</h2>
        <p className="text-foreground/90 leading-relaxed">
          Almond and coffin create a slimming effect, especially with solid colors or simple French tips.
          They look amazing—but long shapes can increase leverage (and breakage) if you’re hard on your hands.
        </p>
        <ul className="list-disc pl-5 space-y-3 text-foreground/90 leading-relaxed">
          <li><strong>Almond:</strong> elegant and flattering; best with medium length and good structure.</li>
          <li><strong>Coffin / Ballerina:</strong> trendy and bold; needs strong support (dip overlay or acrylic) for longer lengths.</li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">Quick rule of thumb</h2>
        <div className="rounded-2xl border border-border bg-secondary/30 p-5">
          <p className="text-foreground/90 leading-relaxed">
            If you type all day, clean a lot, or wear contacts: choose <strong>round/oval</strong> or <strong>soft square</strong>.
            If you want glam photos and don’t mind maintenance: choose <strong>almond</strong> or <strong>coffin</strong>.
          </p>
        </div>
      </>
    ),
  },

  {
    slug: 'how-to-make-your-manicure-last-3-weeks',
    title: 'How to make your manicure last 3 weeks (without lifting or chipping)',
    description:
      'A practical checklist: what to do in the first 48 hours, how to protect your nails from water and chemicals, and when a “tiny lift” becomes a bigger problem.',
    datePublished: '2026-01-09',
    dateModified: '2026-01-09',
    author: { name: 'Helen Pham' },
    category: 'Tips and Hacks',
    readTimeMinutes: 9,
    tags: ['aftercare', 'manicure longevity', 'gel', 'dip powder', 'tips'],
    coverImage: '/images/gallery/service-organic.jpg',
    content: (
      <>
        <p className="text-foreground/90 leading-relaxed">
          When a manicure doesn’t last, it’s usually not just “bad luck.” Longevity depends on adhesion, daily habits,
          and catching small issues early. Here’s the system we recommend if you want <strong>2–3 weeks</strong> of wear.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">The first 48 hours: set yourself up for success</h2>
        <ul className="list-disc pl-5 space-y-3 text-foreground/90 leading-relaxed">
          <li>
            Avoid long hot showers or baths if possible (heat + water can soften the nail and stress the seal).
          </li>
          <li>
            Use gloves for dishes and cleaning.
          </li>
          <li>
            Start cuticle oil right away—dryness at the cuticle line can start lifting early.
          </li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">Daily habits that matter most</h2>
        <ol className="list-decimal pl-5 space-y-3 text-foreground/90 leading-relaxed">
          <li>
            <strong>Gloves for water/chemicals.</strong> Repeated soaking is the #1 reason sets lift.
          </li>
          <li>
            <strong>Don’t use nails as tools.</strong> Opening cans, scratching labels, and prying boxes creates micro-cracks.
          </li>
          <li>
            <strong>Oil + lotion combo.</strong> Oil feeds the nail/cuticle; lotion seals moisture on the skin.
          </li>
        </ol>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">If you notice a small lift…</h2>
        <p className="text-foreground/90 leading-relaxed">
          A tiny lift can grow quickly because water and soap get underneath. The safest move is:
          <strong>don’t pick</strong>, trim the nail shorter to reduce leverage, and schedule a quick fix.
        </p>

        <div className="rounded-2xl border border-border bg-card p-5 mt-4">
          <p className="text-foreground/90 leading-relaxed">
            Pro tip: lifting is easier to repair early. Waiting can turn a 10-minute fix into a full removal.
          </p>
        </div>
      </>
    ),
  },

  {
    slug: 'pedicure-between-visits-simple-at-home-maintenance',
    title: 'Pedicure between visits: a simple at-home routine for smooth heels',
    description:
      'Keep your feet soft between pedicures with a gentle routine that avoids over-scrubbing, cracking, and irritation—plus the #1 thing to stop doing right now.',
    datePublished: '2026-01-10',
    dateModified: '2026-01-10',
    author: { name: 'Helen Pham' },
    category: 'Nail Care',
    readTimeMinutes: 7,
    tags: ['pedicure', 'foot care', 'heels', 'routine', 'tips'],
    coverImage: '/images/gallery/service-pedicure.jpg',
    content: (
      <>
        <p className="text-foreground/90 leading-relaxed">
          Great pedicures don’t have to fade in a week. With the right at-home routine you can keep your feet smooth
          and comfortable—without over-scrubbing (which can make calluses come back thicker).
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">The goal: soften, don’t sand</h2>
        <p className="text-foreground/90 leading-relaxed">
          Many people attack their heels with aggressive tools. The problem: your skin responds by thickening to protect itself.
          Instead, aim for gentle consistency.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">A 3-step routine (10 minutes)</h2>
        <ol className="list-decimal pl-5 space-y-3 text-foreground/90 leading-relaxed">
          <li>
            <strong>Quick soak:</strong> 5 minutes in warm water (not hot). Pat dry.
          </li>
          <li>
            <strong>Gentle smoothing:</strong> use a fine foot file lightly—stop as soon as the surface feels even.
          </li>
          <li>
            <strong>Moisturize + seal:</strong> apply a thick foot cream, then wear socks for 20–30 minutes.
          </li>
        </ol>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">The #1 thing to stop doing</h2>
        <div className="rounded-2xl border border-border bg-secondary/30 p-5">
          <p className="text-foreground/90 leading-relaxed">
            Stop using razor-style callus shavers at home. They can cause cuts, infection risk, and can trigger thicker regrowth.
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">How often?</h2>
        <ul className="list-disc pl-5 space-y-3 text-foreground/90 leading-relaxed">
          <li>Moisturize: daily (especially after showers)</li>
          <li>Gentle smoothing: 1–2x/week</li>
          <li>Pedicure appointments: every 3–5 weeks for most people</li>
        </ul>
      </>
    ),
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
