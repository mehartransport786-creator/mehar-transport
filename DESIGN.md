# Mehar Transport Design System

## Brand Identity & Color Authority

### Design Philosophy

The Mehar Transport Design System exists to ensure every interface, component, and customer interaction reflects a consistent, premium, and trustworthy transportation brand. Every design decision must reinforce reliability, professionalism, simplicity, and ease of booking while maintaining a modern visual identity.

This document is the single source of truth for all designers, frontend developers, backend developers, QA engineers, and product stakeholders. No UI implementation may deviate from the standards defined in this specification without explicit approval.

---

## Brand Authority

The **Mehar Transport logo is the primary source of the brand identity**.

All visual decisions—including color, typography, spacing, component styling, and interaction design—must align with and support the logo rather than compete with it.

The logo defines the brand.
The interface must follow the logo.

---

## Official Brand Color Policy

The official Mehar Transport accent color is **Orange** (`#df9a26`), as defined by the company's logo.

This primary brand accent is used throughout the product ecosystem.

The brand also incorporates a **Gold** color which is specifically reserved for key interactive elements, such as primary buttons.

---

## Component Styles

### Typography
All text must adhere to the following professional typography system to maintain the premium look:
- **H1 (Main Headings):** Montserrat
- **H2 (Section Headings):** Lora
- **Paragraphs & Body Text:** Hind Madurai

### 4. Button Design System
We use two professional button variants to establish a clear visual hierarchy.

- **Primary Button (`.btn-primary` or `.btn-luxury`):** 
  - **Background:** Solid Gold (`bg-secondary`).
  - **Text:** White, to maintain a clean, high-contrast aesthetic.
  - **Use Case:** Main call-to-actions (e.g., "Book Now").

- **Secondary / Outline Button (`.btn-outline`):**
  - **Background:** White (`bg-white`) or Transparent.
  - **Border:** Thin light-gray border (`border-slate-300`).
  - **Text:** Navy Blue (`text-primary`).
  - **Use Case:** Secondary actions (e.g., "Learn About Us", "View Details"). Often paired with a right arrow (`→`).

- **Shared Properties (All Buttons):**
  - **Hover State (Slide-Up Animation):** All buttons feature a premium slide-up fill effect on hover. An `absolute` Navy Blue (`var(--color-primary)`) background span slides up from the bottom, and the text seamlessly transitions to White.
  - **Border Radius:** Use a distinctly rounded, softer border radius (`12px` or `xl`) to match the brand's welcoming and modern aesthetic. Avoid sharp corners or overly rigid boxes.
  - **Implementation:** Both variants are centralized in `globals.css` as `@utility` classes. Simply apply `className="btn-primary"` or `className="btn-outline"`.

### Hero Section Design

The hero section across the application (especially the Homepage and About pages) must follow a cinematic, highly polished presentation that emphasizes the premium nature of the brand.

- **Sizing & Dimensions:** The hero container must fill the screen optimally using dynamic viewport units (`min-h-[calc(100svh+4rem)] lg:min-h-[calc(100vh+6rem)]`), ensuring it looks majestic on both mobile and large desktop displays.
- **Imagery:** High-quality, professional photography must be used. Images are to be served using optimized components (e.g., Next.js `<Image />`) with `quality={100}` and `priority` to guarantee immediate, crisp loading above the fold.
- **Cinematic Overlays:** To guarantee text legibility while maintaining the image's beauty, the hero requires a layered overlay approach:
  1. A subtle **radial vignette** (`bg-[radial-gradient(ellipse_at_35%_40%,transparent_0%,rgba(0,0,0,0.5)_100%)]`) to frame the focus.
  2. A **directional side gradient** (`bg-gradient-to-l from-black/90 via-black/50 to-transparent`) placed strategically behind the text content to ensure high contrast without completely blacking out the background.
  3. A **bottom shadow** (`bg-gradient-to-t from-black/60 to-transparent`) to blend smoothly into the subsequent section.
- **Text Alignment:** The primary headline, subheadline, and call-to-action buttons should be grouped and aligned to one side (typically right-aligned with `ml-auto text-left rtl:text-right` for optimal reading flow) to balance the visual weight of the background image.

---

## Brand Consistency Principle

Every visual element should immediately communicate that it belongs to the Mehar Transport ecosystem.

To achieve this, every interface must consistently use:

- The official orange brand accent.
- Neutral white and light-gray backgrounds.
- Dark, highly readable typography.
- Consistent spacing and layout.
- Unified component styling.
- High-quality imagery.
- Accessible color contrast.
- Elegant and restrained motion.

*Introducing alternative accent colors without a documented business reason is prohibited.*

---

## Design Philosophy

The objective is not to imitate luxury brands through decorative styling. Instead, the interface should communicate quality through exceptional execution.

The user experience should feel:

- **Professional** before decorative.
- **Premium** before flashy.
- **Elegant** before complex.
- **Functional** before animated.
- **Consistent** before creative.

A customer should immediately trust the platform because of its clarity, organization, visual balance, and attention to detail.

---

## Design Principles

Every new page, component, or feature must follow these principles:

1. Brand consistency above personal preference.
2. Simplicity before complexity.
3. Readability before decoration.
4. Accessibility before aesthetics.
5. Performance before visual effects.
6. Consistency before originality.
7. Reusable components before custom implementations.
8. Mobile-first responsive design.
9. WCAG 2.2 AA compliance by default.
10. Every UI decision must improve the booking experience.

---

## Color Governance

The official orange palette shall be defined as reusable design tokens and referenced throughout the application.

- **Hard-coded color values are not permitted.**
- All colors must be consumed through centralized design tokens (CSS Variables and Tailwind configuration) to ensure consistency, maintainability, and scalability.
- Any future brand updates must be implemented by modifying the design tokens rather than individual components.

---

## Long-Term Vision

The Mehar Transport Design System is intended to evolve into a scalable enterprise design language that supports future products, including:

- Customer applications
- Partner portals
- Driver applications
- Administrative dashboards
- APIs
- Marketing websites
- Mobile platforms

Every future product must inherit this design system to maintain a unified and recognizable Mehar Transport brand across all customer touchpoints.

## Motion & Animation

Motion here is **confirmation, not decoration**. It exists to show that something changed, where it came from, and that the interface is responding. A pilgrim booking a 3 AM airport pickup should never wait on an animation, notice one, or be distracted by one.

Three rules that override everything else:

1. **Nothing moves without a reason.** Every animation answers "what changed?" If it can't, remove it.
2. **Short and quiet.** Nothing exceeds 400ms. Nothing travels more than 16px. Nothing bounces, spins, parallaxes, or plays twice.
3. **Content never waits on motion.** Text is readable and buttons are tappable at frame one. Animation is a layer over already-usable UI, never a gate in front of it.

### Token Set

**Duration scale** � four values only, no ad-hoc timings anywhere in the codebase:

| Token | Value | Use |
|---|---|---|
| --duration-instant | 120ms | Hover, focus, active, colour and border changes |
| --duration-quick | 200ms | Dropdowns, tooltips, small state changes, tab switches |
| --duration-base | 300ms | Scroll reveals, accordion expand/collapse, card entrances |
| --duration-slow | 400ms | Modals, drawers, page-level transitions. Nothing exceeds this. |

**Easing** � three curves only:

| Token | Value | Use |
|---|---|---|
| --ease-out | cubic-bezier(0.22, 1, 0.36, 1) | Default. Anything entering or responding to a tap. Fast start, soft settle. |
| --ease-in-out | cubic-bezier(0.65, 0, 0.35, 1) | Elements moving between two on-screen positions |
| --ease-in | cubic-bezier(0.4, 0, 1, 1) | Exits only � things leaving the screen |

No spring physics, no bounce, no elastic, no linear except indeterminate loaders.

**Distance scale** � motion is felt, not watched:

| Token | Value | Use |
|---|---|---|
| --motion-sm | 4px | Hover lift, button press |
| --motion-md | 8px | Dropdowns, tooltips |
| --motion-lg | 16px | Scroll reveals, modal entrance. Hard ceiling. |

**Stagger** � 60ms between siblings, capped at 5 items. Item 6 onward shares item 5's delay. Never stagger more than one group per viewport.

### Allowed Inventory

**Permitted**
- Hover / focus / active on interactive elements: opacity, background, border colour, up to 4px translate � --duration-instant, --ease-out.
- Scroll reveal: opacity 0 ? 1 plus 	ranslateY(16px) ? 0, --duration-base, --ease-out, fires **once** per element, never replays on scroll back.
- Accordion / FAQ expand and collapse: height and opacity, --duration-base. (Use grid-rows 1fr to  fr technique).
- Modal, drawer, mobile nav: backdrop fade plus panel translate � --duration-slow in, --duration-quick out.
- Form and booking state: focus rings, inline validation appearing, button loading spinner, success confirmation.
- Skeleton or shimmer placeholders while fare and availability data loads.
- Step transitions in the booking flow: a plain crossfade, --duration-quick.

**Forbidden � remove on sight**
- Parallax, scroll-hijacking, scroll-linked scrubbing, smooth-scroll libraries.
- Autoplaying hero animations, animated gradients, floating background shapes, particles.
- Text animating in per-character or per-word.
- Counters that tick up; animated progress rings on trust badges.
- Auto-advancing carousels.
- Anything looping infinitely except loading indicators.
- Entrance animation on the hero headline, primary CTA, phone number, WhatsApp button, or price � these are visible and interactive at first paint, always.

### Performance and Accessibility Constraints

- **Animate 	ransform and opacity only.** Never width, height, 	op, left, margin, or ox-shadow. For accordions use a grid-rows (1fr/ fr) technique.
- **No permanent will-change.** Apply for the duration of an animation, or not at all.
- **Scroll reveals use one shared IntersectionObserver**, not one per element � ootMargin: "0px 0px -10% 0px", 	hreshold: 0.1, unobserve after firing. Use the <Reveal> component.
- **No new animation dependency.** CSS transitions, keyframes, and IntersectionObserver cover this entire spec.
- **No layout shift.** Revealed elements occupy their final space from first paint and only fade/translate within it.
- **prefers-reduced-motion: reduce** disables all transform motion and all scroll reveals globally, leaving opacity changes at 120ms and instant state changes. Reduced-motion users must still see every element in its final state; never leave content stuck at opacity: 0.
- **No-JS safety.** If JavaScript fails or is slow, scroll-reveal elements default to visible. The hidden state is set from JS (or via a .js root class), never as the CSS default.
- **Motion budget:** at most 2 distinct animated moments per viewport-height of scroll.

### Navbar Behavior
- **Transparency:** The navbar must be transparent when the user is at the top of the page (scroll position 0) and must transition to a solid white background when scrolling down. This behavior applies globally across all pages.


### Accordion & FAQ Style

All accordions across the application must strictly adhere to the following unified style structure:

- **Container:** `border rounded-2xl transition-all duration-300 bg-background`
- **Container Active State:** `border-secondary bg-muted`
- **Container Hover State (Inactive):** `hover:border-primary/30`
- **Button Header:** `w-full px-6 py-5 flex items-center justify-between text-left`
- **Question Text:** `font-bold text-primary pr-8 rtl:pr-0 rtl:pl-8`
- **Toggle Icon Container:** A small circle (`w-8 h-8 rounded-full flex items-center justify-center transition-colors`).
- **Toggle Icon Inactive:** `bg-muted text-muted-foreground` with a `<Plus className="w-4 h-4" />` icon.
- **Toggle Icon Active:** `bg-secondary text-secondary-foreground` with a `<Minus className="w-4 h-4" />` icon.
- **Animation:** Use `framer-motion` (`<AnimatePresence>` and `<motion.div>`) or CSS Grid (`grid-template-rows: 0fr / 1fr`) to smoothly animate the height. If using framer-motion: `duration: 0.3`.
- **Answer Container:** `px-6 pb-5 pt-1 text-muted-foreground leading-relaxed font-medium`

This specific style replaces all other custom accordion variations (e.g. ChevronDown, card shadows, alternative paddings).
