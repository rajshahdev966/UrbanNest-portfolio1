---
version: "2.0"
name: "UrbanNest Luxe"
description: "UrbanNest Luxe is a cinematic luxury interior design system crafted for modern premium residential and commercial experiences. Inspired by warm architectural lighting, glassmorphism, elegant editorial layouts, and luxury hotel aesthetics, the interface blends emotional storytelling with sophisticated interaction design."

colors:
  primary: "#D2691E"
  primary-dark: "#A44E13"
  primary-light: "#E89B62"

  secondary: "#556B2F"
  secondary-dark: "#3F5122"
  secondary-light: "#7E9653"

  tertiary: "#C5A059"
  tertiary-dark: "#9C7A37"
  tertiary-light: "#E2C98D"

  neutral: "#1A1A1A"
  neutral-light: "#2B2B2B"
  neutral-soft: "#3A3A3A"

  background: "#F9F7F2"
  background-dark: "#121212"

  surface: "#FFFFFF"
  surface-soft: "#F2EEE8"
  surface-dark: "#1F1F1F"

  glass: "rgba(255,255,255,0.08)"
  glass-border: "rgba(255,255,255,0.18)"

  text-primary: "#1A1A1A"
  text-secondary: "#5C5C5C"
  text-light: "#FFFFFF"
  text-muted: "#8A8A8A"

  border: "#E7E1D8"
  border-dark: "#2A2A2A"

  success: "#6D8A47"
  warning: "#C5A059"
  error: "#C0392B"

  overlay-dark: "rgba(0,0,0,0.45)"
  overlay-soft: "rgba(0,0,0,0.25)"

  shadow-warm: "rgba(210,105,30,0.15)"
  shadow-dark: "rgba(0,0,0,0.18)"

typography:
  display-xl:
    fontFamily: "Playfair Display"
    fontSize: "96px"
    fontWeight: 700
    lineHeight: "102px"
    letterSpacing: "-0.04em"

  display-lg:
    fontFamily: "Playfair Display"
    fontSize: "72px"
    fontWeight: 700
    lineHeight: "82px"
    letterSpacing: "-0.03em"

  display-md:
    fontFamily: "Playfair Display"
    fontSize: "56px"
    fontWeight: 600
    lineHeight: "64px"
    letterSpacing: "-0.025em"

  headline-lg:
    fontFamily: "Playfair Display"
    fontSize: "42px"
    fontWeight: 600
    lineHeight: "52px"

  headline-md:
    fontFamily: "Playfair Display"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: "42px"

  title-lg:
    fontFamily: "Inter"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: "34px"

  body-lg:
    fontFamily: "Inter"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "30px"

  body-md:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "26px"

  body-sm:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "22px"

  label-lg:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: "20px"
    letterSpacing: "0.08em"
    textTransform: "uppercase"

  label-md:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: "16px"
    letterSpacing: "0.12em"
    textTransform: "uppercase"

rounded:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
  full: "9999px"

spacing:
  base: "4px"

  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "48px"
  xxl: "80px"
  xxxl: "120px"

  gap-sm: "12px"
  gap-md: "20px"
  gap-lg: "32px"
  gap-xl: "48px"

  section-padding: "120px"
  section-padding-mobile: "72px"

  container-max: "1440px"
  container-wide: "1680px"

  navbar-height: "88px"
  hero-spacing: "180px"

layout:
  type: "Editorial Cinematic"
  grid: "12-column"
  content-width: "1440px"
  mobile-grid: "4-column"

  margins:
    desktop: "80px"
    tablet: "40px"
    mobile: "20px"

  gutters:
    desktop: "32px"
    mobile: "16px"

elevation:
  glass-blur: "24px"

  shadows:
    soft: "0px 10px 40px rgba(0,0,0,0.08)"
    warm: "0px 20px 60px rgba(210,105,30,0.15)"
    cinematic: "0px 30px 80px rgba(0,0,0,0.28)"
    floating: "0px 8px 30px rgba(0,0,0,0.12)"

  borders:
    soft: "1px solid rgba(255,255,255,0.18)"
    dark: "1px solid rgba(255,255,255,0.06)"

motion:
  level: "cinematic"

  durations:
    fast: "200ms"
    medium: "500ms"
    slow: "900ms"
    ultra: "1400ms"

  easing:
    smooth: "cubic-bezier(0.22, 1, 0.36, 1)"
    soft: "ease"
    premium: "cubic-bezier(0.16, 1, 0.3, 1)"

  hover-effects:
    - "scale"
    - "ambient-glow"
    - "glass-shift"
    - "image-zoom"
    - "parallax"

components:

  navbar:
    style: "Floating Glass Dock"
    background: "rgba(255,255,255,0.72)"
    blur: "24px"
    border: "{elevation.borders.soft}"
    radius: "{rounded.full}"
    shadow: "{elevation.shadows.floating}"

  hero-section:
    style: "Luxury Cinematic"
    overlay: "{colors.overlay-dark}"
    height: "100vh"
    alignment: "center"
    content-width: "980px"

  button-primary:
    background: "{colors.primary}"
    textColor: "{colors.text-light}"
    padding: "18px 36px"
    radius: "{rounded.full}"
    typography: "{typography.label-lg}"
    shadow: "{elevation.shadows.warm}"

  button-secondary:
    background: "rgba(255,255,255,0.12)"
    border: "{elevation.borders.soft}"
    blur: "20px"
    textColor: "{colors.text-light}"
    padding: "18px 36px"
    radius: "{rounded.full}"

  card-glass:
    background: "{colors.glass}"
    border: "{colors.glass-border}"
    blur: "24px"
    radius: "{rounded.lg}"
    shadow: "{elevation.shadows.soft}"

  project-card:
    radius: "{rounded.xl}"
    overflow: "hidden"
    image-overlay: "{colors.overlay-soft}"
    hover-scale: "1.04"

  stats-card:
    background: "rgba(255,255,255,0.78)"
    blur: "18px"
    radius: "{rounded.lg}"
    shadow: "{elevation.shadows.soft}"

  input:
    background: "rgba(255,255,255,0.08)"
    border: "1px solid rgba(255,255,255,0.14)"
    radius: "{rounded.md}"
    padding: "18px 20px"
    focus-border: "{colors.primary}"

  chips:
    background: "rgba(85,107,47,0.12)"
    textColor: "{colors.secondary}"
    radius: "{rounded.full}"
    padding: "8px 14px"

  pricing-card:
    background: "{colors.surface}"
    radius: "{rounded.xl}"
    shadow: "{elevation.shadows.soft}"
    border-top: "4px solid {colors.primary}"

  testimonial-card:
    background: "rgba(255,255,255,0.82)"
    blur: "20px"
    radius: "{rounded.xl}"
    shadow: "{elevation.shadows.soft}"

sections:

  hero:
    mood: "Luxury Penthouse"
    imagery: "Warm ambient lighting, floor-to-ceiling windows, cinematic depth"
    interactions:
      - "Parallax Background"
      - "Floating Light Particles"
      - "Fade-up Text Animation"

  services:
    layout: "Immersive Grid"
    hover: "Expand + Video Reveal"

  portfolio:
    layout: "Masonry Editorial"
    interactions:
      - "Image Zoom"
      - "Dark Overlay Fade"
      - "Case Study Slide"

  pricing:
    layout: "Interactive Estimator"
    style: "Luxury configurator"

  testimonials:
    layout: "Floating Glass Cards"
    style: "Client storytelling"

  consultation:
    layout: "Split-screen cinematic"
    interaction: "Glow focus animation"

brand-direction:
  personality:
    - "Premium"
    - "Warm"
    - "Architectural"
    - "Sophisticated"
    - "Modern"
    - "Emotional"

  inspiration:
    - "Luxury hotels"
    - "Apple storytelling"
    - "High-end architecture studios"
    - "Modern penthouse interiors"
    - "Editorial magazines"

  visual-language:
    - "Soft Glassmorphism"
    - "Warm Lighting"
    - "Deep Shadows"
    - "Cinematic Composition"
    - "Luxury Editorial Layouts"

do:
  - "Use warm cinematic imagery"
  - "Maintain large whitespace"
  - "Use elegant typography hierarchy"
  - "Use smooth premium animations"
  - "Keep layouts breathable and immersive"
  - "Use floating glass cards over imagery"

dont:
  - "Do not use flat corporate grids"
  - "Do not overuse bright colors"
  - "Do not use harsh shadows"
  - "Do not clutter sections with dense text"
  - "Do not use sharp corners"
  - "Do not use generic SaaS layouts"

ux-principles:
  - "Every section should feel like entering a new room"
  - "Navigation should feel lightweight and floating"
  - "Interactions should feel soft and premium"
  - "Imagery must dominate over decorative graphics"
  - "Storytelling should guide users emotionally"

advanced-effects:
  - "Gradient light streaks"
  - "Dynamic glass reflections"
  - "Luxury cursor interactions"
  - "Mouse-follow ambient glow"
  - "Cinematic scroll transitions"
  - "Image depth parallax"

mobile-strategy:
  navbar: "Bottom Floating Navigation"
  hero-height: "90vh"
  typography-scale: "Responsive editorial"
  interactions:
    - "Swipe portfolio"
    - "Sticky CTA"
    - "Thumb-first spacing"

final-feel:
  "The interface should feel like walking through a luxury smart apartment during golden hour — elegant, warm, emotional, cinematic, and deeply immersive."
---