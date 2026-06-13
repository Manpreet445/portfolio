# /public/art

Drop real project screenshots / mockups here (WebP or PNG), then point a
project's image at them in [`data/projects.ts`](../../data/projects.ts):

```ts
images: [
  { alt: "Atlas dashboard", src: "/art/atlas-dashboard.webp", rotate: -3 },
  { alt: "Atlas on mobile", src: "/art/atlas-mobile.webp", rotate: 4 },
],
```

When `src` is set, the taped-photo frame renders your real image via
`next/image`. When it's absent, a procedural placeholder mockup is drawn
instead (`mockup` + `tone` fields). Recommended export width: ~1200px,
compressed WebP. Keep a roughly 16:11 aspect for the cleanest framing.
