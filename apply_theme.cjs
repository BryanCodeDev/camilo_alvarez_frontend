const fs = require('fs');
const path = require('path');

const base = path.join(__dirname);

// Full theme replacements (reused from update_theme.cjs)
const themeReplacements = [
  // Hardcoded hex gold → charcoal
  [/bg-gradient-to-br from-\[#C9A860\] to-\[#E8C97A\]/g, 'bg-gradient-to-br from-charcoal-600 to-charcoal-700'],
  [/from-\[#C9A860\]/g, 'from-charcoal-600'],
  [/to-\[#E8C97A\]/g, 'to-charcoal-700'],
  [/bg-\[#C9A860\]/g, 'bg-charcoal-600'],
  [/text-\[#C9A860\]/g, 'text-charcoal-600'],
  [/border-\[#C9A860\]/g, 'border-charcoal-600'],
  [/hover:text-\[#C9A860\]/g, 'hover:text-charcoal-600'],
  [/hover:border-\[#C9A860\]/g, 'hover:border-charcoal-600'],
  [/hover:bg-\[#C9A860\]/g, 'hover:bg-charcoal-600'],
  [/bg-gradient-to-br from-gold-600 to-gold-400/g, 'bg-gradient-to-br from-charcoal-600 to-charcoal-500'],
  [/from-gold-600 to-gold-400/g, 'from-charcoal-600 to-charcoal-500'],
  [/from-gold-600 to-gold-500/g, 'from-charcoal-600 to-charcoal-400'],
  [/from-gold-400 via-gold-500 to-gold-600/g, 'from-charcoal-500 via-charcoal-600 to-charcoal-700'],
  [/from-gold-500 via-gold-600 to-gold-700/g, 'from-charcoal-400 via-charcoal-500 to-charcoal-600'],
  [/bg-primary-900\/95/g, 'bg-white/95'],
  [/bg-primary-900\/90/g, 'bg-white/90'],
  [/bg-primary-900\/80/g, 'bg-white/80'],
  [/bg-primary-900\/60/g, 'bg-white/60'],
  [/bg-primary-900\/50/g, 'bg-primary-50/50'],
  [/bg-primary-900\/40/g, 'bg-primary-50/50'],
  [/bg-primary-900\/30/g, 'bg-primary-50/30'],
  [/bg-primary-900\/20/g, 'bg-primary-50/20'],
  [/bg-primary-900\/10/g, 'bg-primary-50/10'],
  [/bg-primary-900/g, 'bg-white'],
  [/bg-primary-950/g, 'bg-white'],
  // bg-primary-800 opacity
  [/bg-primary-800\/90/g, 'bg-primary-50/90'],
  [/bg-primary-800\/80/g, 'bg-primary-50/80'],
  [/bg-primary-800\/60/g, 'bg-primary-50'],
  [/bg-primary-800\/50/g, 'bg-primary-50'],
  [/bg-primary-800\/40/g, 'bg-primary-50'],
  [/bg-primary-800\/30/g, 'bg-primary-50'],
  [/bg-primary-800\/20/g, 'bg-primary-50'],
  [/bg-primary-800/g, 'bg-primary-50'],
  // bg-primary-700
  [/bg-primary-700\/50/g, 'bg-primary-100'],
  [/bg-primary-700\/30/g, 'bg-primary-100'],
  [/bg-primary-700\/20/g, 'bg-primary-100'],
  [/bg-primary-700/g, 'bg-primary-100'],
  // bg-primary-600
  [/bg-primary-600/g, 'bg-primary-200'],
  // hover bg-primary
  [/hover:bg-primary-700/g, 'hover:bg-primary-100'],
  [/hover:bg-primary-800/g, 'hover:bg-primary-50'],
  [/hover:bg-primary-900/g, 'hover:bg-primary-50'],
  // bg-black overlays
  [/bg-black\/60/g, 'bg-black/20'],
  [/bg-black\/50/g, 'bg-black/20'],
  [/bg-black\/40/g, 'bg-black/15'],
  [/bg-black\/30/g, 'bg-black/10'],
  // Gold text → charcoal text
  [/hover:text-gold-400/g, 'hover:text-charcoal-600'],
  [/hover:text-gold-300/g, 'hover:text-charcoal-500'],
  [/hover:text-gold-500/g, 'hover:text-charcoal-500'],
  [/text-gold-400/g, 'text-charcoal-600'],
  [/text-gold-500/g, 'text-charcoal-500'],
  [/text-gold-300/g, 'text-charcoal-400'],
  [/text-gold-600/g, 'text-charcoal-600'],
  [/text-gold-200/g, 'text-charcoal-300'],
  [/text-gold-100/g, 'text-charcoal-200'],
  // Gold bg → charcoal bg
  [/hover:bg-gold-600/g, 'hover:bg-charcoal-600'],
  [/hover:bg-gold-500/g, 'hover:bg-charcoal-500'],
  [/bg-gold-600\/90/g, 'bg-charcoal-600'],
  [/bg-gold-600\/30/g, 'bg-charcoal-600/10'],
  [/bg-gold-600\/20/g, 'bg-charcoal-600/10'],
  [/bg-gold-600\/10/g, 'bg-charcoal-600/5'],
  [/bg-gold-600/g, 'bg-charcoal-600'],
  [/bg-gold-500/g, 'bg-charcoal-500'],
  [/bg-gold-400/g, 'bg-charcoal-400'],
  // Border gold → charcoal
  [/border-gold-500/g, 'border-charcoal-500'],
  [/border-gold-600\/50/g, 'border-charcoal-300'],
  [/border-gold-600\/40/g, 'border-charcoal-300'],
  [/border-gold-600\/30/g, 'border-charcoal-600/20'],
  [/border-gold-600\/20/g, 'border-charcoal-300'],
  [/border-gold-600/g, 'border-charcoal-600'],
  [/hover:border-gold-500/g, 'hover:border-charcoal-500'],
  [/hover:border-gold-600\/50/g, 'hover:border-charcoal-300'],
  [/hover:border-gold-600\/30/g, 'hover:border-charcoal-300'],
  [/hover:border-gold-600/g, 'hover:border-charcoal-600'],
  [/focus:border-gold-500/g, 'focus:border-charcoal-500'],
  // Focus ring gold → charcoal
  [/focus:ring-gold-500/g, 'focus:ring-charcoal-500'],
  [/focus:ring-gold-400/g, 'focus:ring-charcoal-400'],
  // Shadows
  [/hover:shadow-gold/g, 'hover:shadow-card-hover'],
  [/shadow-gold/g, 'shadow-card'],
  [/shadow-gold-sm/g, 'shadow-sm'],
  [/shadow-gold-lg/g, 'shadow-lg'],
  // text-primary-* adjustments for light theme (darker on white bg)
  [/text-primary-500/g, 'text-primary-700'],
  [/text-primary-600/g, 'text-primary-800'],
  [/text-primary-400/g, 'text-primary-500'],
  [/text-primary-300/g, 'text-primary-500'],
  [/text-primary-200/g, 'text-primary-400'],
  [/text-primary-100/g, 'text-primary-300'],
  // prose
  [/prose-invert/g, 'prose'],
  // Colors
  [/text-green-500/g, 'text-green-600'],
  [/text-red-400/g, 'text-red-500'],
];

// text-white → text-primary-900 (for light-themed files)
const textWhiteReplacements = [
  [/text-white\/95/g, 'text-primary-700/95'],
  [/text-white\/90/g, 'text-primary-700/90'],
  [/text-white\/80/g, 'text-primary-800/80'],
  [/text-white\/70/g, 'text-primary-800/70'],
  [/text-white\/60/g, 'text-primary-700/60'],
  [/text-white\/50/g, 'text-primary-700/50'],
  [/text-white\/40/g, 'text-primary-700/40'],
  [/text-white\/30/g, 'text-primary-800/30'],
  [/text-white\/20/g, 'text-primary-700/20'],
  [/text-white\/10/g, 'text-primary-300/10'],
  [/text-white/g, 'text-primary-900'],
];

// Fix-back: restore text-white on dark charcoal backgrounds
const fixbackReplacements = [
  // bg-charcoal-600 dark bg + text-primary-900 → text-white
  [/bg-charcoal-600 text-primary-900/g, 'bg-charcoal-600 text-white'],
  [/bg-charcoal-600\/20 text-primary-900/g, 'bg-charcoal-600/20 text-white'],
  [/bg-charcoal-600\/10 text-primary-900/g, 'bg-charcoal-600/10 text-white'],
  // bg-charcoal-700 dark bg
  [/bg-charcoal-700 text-primary-900/g, 'bg-charcoal-700 text-white'],
  // bg-primary-950 dark bg (footer)
  [/bg-primary-950 text-primary-900/g, 'bg-primary-950 text-white'],
  // For gradient backgrounds containing from-charcoal-600, fix the text-primary-900 that follows
  // Pattern: bg-gradient-to-br from-charcoal-600 to-charcoal-500 ... text-primary-900
  // We handle these per-file with targeted edits instead
];

// Files that need FULL theme processing (admin + error boundary)
const fullThemeFiles = [
  'src/layouts/AdminLayout.jsx',
  'src/components/ErrorBoundary.jsx',
  'src/components/auth/RouteGuards.jsx',
  'src/pages/admin/Dashboard.jsx',
  'src/pages/admin/Products.jsx',
  'src/pages/admin/Categories.jsx',
  'src/pages/admin/Settings.jsx',
  'src/pages/admin/Orders.jsx',
  'src/pages/admin/Users.jsx',
  'src/pages/admin/ProductForm.jsx',
];

// Files that need text-white→text-primary-900 only (already themed)
const textOnlyFiles = [
  'src/pages/Store.jsx',
  'src/pages/Category.jsx',
  'src/pages/ProductDetail.jsx',
  'src/pages/Search.jsx',
  'src/pages/Cart.jsx',
  'src/pages/Checkout.jsx',
  'src/pages/CheckoutSuccess.jsx',
  'src/pages/CheckoutFailure.jsx',
  'src/pages/CheckoutPending.jsx',
  'src/pages/auth/Login.jsx',
  'src/pages/auth/Register.jsx',
  'src/pages/account/Account.jsx',
  'src/pages/account/OrderDetail.jsx',
  'src/pages/About.jsx',
  'src/pages/Contact.jsx',
  'src/pages/NotFound.jsx',
  'src/pages/legal/index.jsx',
];

// Special: hex color #C9A860 in JS (Dashboard.jsx COLORS array)
const hexReplacements = [
  [/'#C9A860'/g, "'#616151'"],
  [/fill="#C9A860"/g, 'fill="#616151"'],
  [/stroke="#C9A860"/g, 'stroke="#616151"'],
  [/="#C9A860"/g, '="#616151"'],
];

// Process full theme files
for (const file of fullThemeFiles) {
  const fullPath = path.join(base, file);
  if (!fs.existsSync(fullPath)) {
    console.log(`SKIP (not found): ${file}`);
    continue;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  let origLen = content.length;

  // Apply hex replacements first
  for (const [regex, replacement] of hexReplacements) {
    content = content.replace(regex, replacement);
  }
  // Apply theme replacements
  for (const [regex, replacement] of themeReplacements) {
    content = content.replace(regex, replacement);
  }
  // Apply text-white → text-primary-900
  for (const [regex, replacement] of textWhiteReplacements) {
    content = content.replace(regex, replacement);
  }
  // Fix-back: restore text-white on dark charcoal backgrounds
  for (const [regex, replacement] of fixbackReplacements) {
    content = content.replace(regex, replacement);
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`FULL: ${file} (${origLen} → ${content.length})`);
}

// Process text-only files
for (const file of textOnlyFiles) {
  const fullPath = path.join(base, file);
  if (!fs.existsSync(fullPath)) {
    console.log(`SKIP (not found): ${file}`);
    continue;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  let origLen = content.length;

  // Just text-white → text-primary-900
  for (const [regex, replacement] of textWhiteReplacements) {
    content = content.replace(regex, replacement);
  }
  // Fix-back: restore text-white on dark charcoal backgrounds
  for (const [regex, replacement] of fixbackReplacements) {
    content = content.replace(regex, replacement);
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`TEXT: ${file} (${origLen} → ${content.length})`);
}

// Special: CartDrawer.jsx — fix shadow-gold and text-primary-500
const cartFile = 'src/components/cart/CartDrawer.jsx';
const cartPath = path.join(base, cartFile);
if (fs.existsSync(cartPath)) {
  let content = fs.readFileSync(cartPath, 'utf8');
  content = content.replace(/shadow-gold/g, 'shadow-card');
  content = content.replace(/text-primary-500/g, 'text-primary-700');
  fs.writeFileSync(cartPath, content, 'utf8');
  console.log(`CART: ${cartFile}`);
}

// Special: Newsletter.jsx — fix text-primary-500
const newsletterFile = 'src/components/home/Newsletter.jsx';
const newsletterPath = path.join(base, newsletterFile);
if (fs.existsSync(newsletterPath)) {
  let content = fs.readFileSync(newsletterPath, 'utf8');
  content = content.replace(/text-primary-500/g, 'text-primary-700');
  fs.writeFileSync(newsletterPath, content, 'utf8');
  console.log(`NEWS: ${newsletterFile}`);
}

console.log('Done.');
