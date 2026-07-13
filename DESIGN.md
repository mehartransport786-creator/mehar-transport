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

The official Mehar Transport accent color is **Orange** (`#F8A731`), as defined by the company's logo.

This is the only primary brand accent permitted throughout the product ecosystem.

> **Note on Deprecation:** The previous gold implementation is deprecated and must not be used for interactive interface elements. Gold must not appear as a primary accent in buttons, navigation, forms, icons, links, hover states, active states, badges, pricing highlights, or component styling. If gold appears in legacy code, it should be considered technical design debt and replaced during the next UI update.

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
