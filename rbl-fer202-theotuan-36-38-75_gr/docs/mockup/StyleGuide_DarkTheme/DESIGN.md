---
name: Velocity Nocturne
colors:
  surface: '#141313'
  surface-dim: '#141313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2b2a2a'
  surface-container-highest: '#353434'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c9c6c5'
  primary: '#c9c6c5'
  on-primary: '#313030'
  primary-container: '#050505'
  on-primary-container: '#797777'
  inverse-primary: '#5f5e5e'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#4a4949'
  on-secondary-container: '#bab8b7'
  tertiary: '#c6c6c6'
  on-tertiary: '#2f3131'
  tertiary-container: '#040505'
  on-tertiary-container: '#767777'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c9c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#e3e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#464747'
  background: '#141313'
  on-background: '#e5e2e1'
  surface-variant: '#353434'
typography:
  display-lg:
    fontFamily: Anybody
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 80px
    letterSpacing: 0.05em
  headline-lg:
    fontFamily: Anybody
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: 0.03em
  headline-lg-mobile:
    fontFamily: Anybody
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: 0.03em
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style
The design system embodies the atmosphere of a high-end supercar atelier at midnight. It targets a high-net-worth audience, evoking an emotional response of exclusivity, raw power, and technical precision. 

The aesthetic is a sophisticated blend of **Minimalism** and **Glassmorphism**. It relies on deep obsidian voids, cinematic lighting through subtle gradients, and the tactile quality of brushed metals. Surfaces should feel like polished carbon fiber or smoked glass, using glossy reflections to create a sense of physical presence and luxury.

## Colors
The palette is rooted in a "Black Hole" dark mode strategy. 

- **Primary (#050505):** The foundation. Used for the deepest background layers to create infinite depth.
- **Secondary (#121212):** Used for elevated containers and "sheet" components to provide structural definition.
- **Brushed Silver (#C0C0C0):** Utilized for primary iconography, borders, and high-emphasis labels to mimic metallic trim.
- **Subtle Gold (#D4AF37):** Reserved strictly for micro-interactions, calls to action, and premium status indicators. It represents the "spark" of the ignition.
- **Functional Gradients:** Use linear gradients from `#1A1A1A` to `#050505` at a 135-degree angle to simulate light falling across a curved car body.

## Typography
Typography is a critical differentiator. **Anybody** provides a wide, aggressive, and industrial feel for headlines, mirroring the stance of a wide-body supercar. It should always be used with increased tracking (letter-spacing) to emphasize luxury.

**Manrope** serves as the body face, chosen for its modern, geometric clarity that remains highly readable against dark backgrounds. For technical data and labels, **Space Grotesk** is used to provide a "dashboard" feel, emphasizing the engineering aspect of the brand.

## Layout & Spacing
The layout follows a strict **12-column fluid grid** for desktop, transitioning to a **4-column grid** for mobile. Spacing is generous ("Airy Brutalism") to allow the high-quality product imagery to breathe.

Internal component spacing uses a 1:2:3 ratio based on the 8px base unit. Negative space is used as a luxury element; avoid crowding components. Large sections should be separated by clear horizontal rules in low-opacity Silver (#C0C0C0 at 10% opacity) to mimic precision-cut panel gaps.

## Elevation & Depth
Depth is achieved through **Glassmorphism** and specular highlights rather than traditional shadows.

1.  **Level 0 (Floor):** Solid `#050505`.
2.  **Level 1 (Surface):** Glass effect using `background: rgba(18, 18, 18, 0.7)` with a `backdrop-filter: blur(20px)`.
3.  **Level 2 (Active):** Add a 1px inner border (stroke) using a gradient from white (10% opacity) to white (2% opacity) to simulate a "glint" on the edge of a glass pane.

Shadows, when used, are localized "ground shadows" beneath cars or cards—highly diffused, dark, and tight to the element to suggest a low center of gravity.

## Shapes
The shape language balances aggression with elegance. We utilize **Level 2 (Rounded)** settings:
- **Small components (Inputs, Chips):** 8px radius.
- **Standard Cards:** 16px radius.
- **Featured Hero Modules:** 24px radius.

All shapes should feature a "gloss" treatment—a very subtle radial gradient near the top-left corner to simulate overhead showroom lighting hitting the surface.

## Components
- **Buttons:** Primary buttons use a solid Gold (#D4AF37) background with black text. Secondary buttons are "ghost" style: 1px Silver border with a backdrop blur. On hover, they should transition to a subtle white glow.
- **Cards:** Use the Glassmorphism stack defined in the Elevation section. Cards should have no visible outer shadow, only the 1px interior highlight border.
- **Inputs:** Darker than the background (#000000), 1px Silver bottom-border only. When focused, the border transitions to Gold.
- **Chips/Badges:** Small, all-caps labels using Space Grotesk. Backgrounds should be semi-transparent Silver (15% opacity).
- **Progress/Technical Bars:** Ultra-thin (2px) lines. The background is a dark track; the active fill is a Gold gradient.
- **Specialty Component: The Spec Grid:** A data-heavy component for car performance (0-60, Top Speed). Uses thin Silver dividers and high-contrast display typography.