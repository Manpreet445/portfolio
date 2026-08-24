# /public/art

Project artwork, exported as WebP in two widths:

```
recepie.webp      900px — desktop cards
recepie-sm.webp   500px — phones (picked via srcset)
```

Point a project at the wide file in
[`data/projects.ts`](../../data/projects.ts); the card derives the `-sm`
variant automatically:

```ts
images: [{ alt: "Recepie meal planner", src: "/art/recepie.webp" }],
```

If `src` is omitted the card falls back to a procedural SVG mockup driven by
the `mockup` and `tone` fields.
