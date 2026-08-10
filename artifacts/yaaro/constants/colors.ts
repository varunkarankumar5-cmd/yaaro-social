/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    // Legacy aliases (kept for backward compatibility)
    text: '#14213d',
    tint: '#ff6b5f',

    // Core surfaces
    background: '#f7f8fc',
    foreground: '#14213d',

    // Cards / elevated surfaces
    card: '#ffffff',
    cardForeground: '#14213d',

    // Primary action color (buttons, links, active states)
    primary: '#ff6b5f',
    primaryForeground: '#ffffff',

    // Secondary / less-emphasis interactive surfaces
    secondary: '#eef0f8',
    secondaryForeground: '#14213d',

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: '#eef0f8',
    mutedForeground: '#78819a',

    // Accent highlights (badges, selected items, focus rings)
    accent: '#e6e8ff',
    accentForeground: '#4b4fd8',

    // Destructive actions (delete, error states)
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',

    // Borders and input outlines
    border: '#e5e8f1',
    input: '#dce0eb',
  },
  dark: {
    text: '#f7f8fc',
    tint: '#ff8076',
    background: '#0c1020',
    foreground: '#f7f8fc',
    card: '#151b31',
    cardForeground: '#f7f8fc',
    primary: '#ff8076',
    primaryForeground: '#0c1020',
    secondary: '#1b2340',
    secondaryForeground: '#f7f8fc',
    muted: '#1b2340',
    mutedForeground: '#9ca6c4',
    accent: '#252b59',
    accentForeground: '#b9baff',
    destructive: '#ff6b6b',
    destructiveForeground: '#ffffff',
    border: '#252d48',
    input: '#303957',
  },

  // Border radius (in px). Sync from the sibling web artifact's --radius
  // CSS variable. This value applies to cards, buttons, inputs, and modals.
  radius: 8,
};

export default colors;
