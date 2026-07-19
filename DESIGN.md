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
