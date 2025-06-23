# WaxHeave Color Customization Guide

## Quick Color Changes

To change your brand colors, simply update the hex values in `client/src/index.css` at lines 45-50:

```css
/* STEP 1: Update these hex codes to change your brand colors */
--brand-lemon-chiffon: #fbf8cc;   /* Lemon Chiffon - light backgrounds */
--brand-champagne-pink: #fde4cf;  /* Champagne Pink - soft backgrounds */
--brand-baby-pink: #ffcfd2;       /* Baby Pink - medium accents */
--brand-pink-lavender: #f1c0e8;   /* Pink Lavender - headers, borders */
--brand-lavender-blue: #cfbaf0;   /* Lavender Blue - form inputs */
--brand-baby-blue: #a3c4f3;       /* Baby Blue Eyes - accent buttons */
```

## Current Color Palette (Soft Pastels)

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Lemon Chiffon | `#FBF8CC` | Background highlights, section topbars |
| Champagne Pink | `#FDE4CF` | Light backgrounds, cards (low priority) |
| Baby Pink | `#FFCFD2` | Medium accents, cards (medium priority) |
| Pink Lavender | `#F1C0E8` | **Main brand color** - headers, borders |
| Lavender Blue | `#CFBAF0` | Form inputs, tabs, hover states |
| Baby Blue Eyes | `#A3C4F3` | Accent buttons, call-to-action elements |

## Color Roles

The semantic color system maps your brand colors to specific UI roles:

- **Primary**: Main brand color for buttons, links, headers
- **Primary Dark**: Darker variant for hover states and emphasis
- **Primary Light**: Lighter variant for backgrounds and subtle elements
- **Secondary**: Supporting color for secondary UI elements
- **Accent**: Highlight color for call-to-action elements
- **Neutral**: Subtle color for text and borders

## How to Change Color Roles

If you want to change which color is used for what purpose, update the assignments in `client/src/index.css` at lines 53-58:

```css
/* STEP 2: Assign colors to roles (or keep as-is) */
--color-primary: var(--brand-mauve);           /* Main buttons & links */
--color-primary-dark: var(--brand-dark-purple); /* Hover states */
--color-primary-light: var(--brand-dusty-rose); /* Backgrounds */
--color-secondary: var(--brand-medium-purple);  /* Secondary elements */
--color-accent: var(--brand-pale-pink);        /* Call-to-action */
--color-neutral: var(--brand-soft-pink);       /* Subtle elements */
```

## Available Utility Classes

Use these CSS classes in your components:

### Text Colors
- `.text-brand-primary`
- `.text-brand-secondary`
- `.text-brand-accent`
- `.text-brand-neutral`

### Background Colors
- `.bg-brand-primary`
- `.bg-brand-secondary`
- `.bg-brand-accent`
- `.bg-brand-neutral`

### Gradients
- `.bg-gradient-brand` - Primary to dark gradient
- `.bg-gradient-brand-soft` - Light to secondary gradient
- `.bg-gradient-brand-accent` - Secondary to accent gradient
- `.text-gradient-brand` - Text with brand gradient

### Hover States
- `.hover:bg-brand-primary:hover`
- `.hover:text-brand-accent:hover`

## Examples

### Change to Blue Theme
```css
--brand-dark-purple: #1e3a8a;     /* Navy blue */
--brand-medium-purple: #3b82f6;   /* Blue */
--brand-mauve: #60a5fa;           /* Light blue */
--brand-dusty-rose: #93c5fd;      /* Sky blue */
--brand-soft-pink: #dbeafe;       /* Very light blue */
--brand-pale-pink: #eff6ff;       /* Lightest blue */
```

### Change to Green Theme
```css
--brand-dark-purple: #14532d;     /* Dark green */
--brand-medium-purple: #16a34a;   /* Green */
--brand-mauve: #22c55e;           /* Light green */
--brand-dusty-rose: #4ade80;      /* Mint green */
--brand-soft-pink: #86efac;       /* Very light green */
--brand-pale-pink: #dcfce7;       /* Lightest green */
```

The entire application will automatically update when you save the CSS file!