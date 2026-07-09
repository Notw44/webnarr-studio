import { TradeTheme, CarouselSlide } from './types';

export const TRADE_THEMES: Record<string, TradeTheme> = {
  general: {
    id: 'general',
    name: 'Classic Slate',
    emoji: '🏛',
    colorName: 'Polished Chrome',
    primaryColor: '#E2E8F0',
    accentColor: '#F1F5F9',
    borderColor: '#2D3748',
    shadowColor: '#E2E8F0',
    bgGradient: 'from-[#0A0D14] via-[#121622] to-[#0A0D14]',
    headingText: 'Websites that win the job before the phone rings.',
    slogan: 'Custom Web Design Studio for Local Service Contractors.',
    characterDescription: 'Our architectural web interface. Click a trade chip below to see how our engineering system re-skins the layout for specific commercial services.',
    stickerLabel: 'PREMIUM QUALITY'
  },
  electrician: {
    id: 'electrician',
    name: 'Volt Chromium',
    emoji: '⚡',
    colorName: 'Brushed Chromium',
    primaryColor: '#A5F3FC',
    accentColor: '#E2E8F0',
    borderColor: '#2D3748',
    shadowColor: '#A5F3FC',
    bgGradient: 'from-[#0A0D14] via-[#101827] to-[#0A0D14]',
    headingText: 'HIGH-VOLTAGE WEBSITES FOR ELECTRIFYING RESULTS.',
    slogan: 'Precision-engineered platforms for electrical contractors.',
    characterDescription: 'Flickering lights? Outdated panels? We build high-trust web interfaces that convince local homeowners of your elite technical mastery and safety standards.',
    stickerLabel: 'CERTIFIED HIGH-TRUST'
  },
  plumber: {
    id: 'plumber',
    name: 'Iron Flow',
    emoji: '🪠',
    colorName: 'Satin Gunmetal',
    primaryColor: '#94A3B8',
    accentColor: '#E2E8F0',
    borderColor: '#2D3748',
    shadowColor: '#94A3B8',
    bgGradient: 'from-[#0A0D14] via-[#0E131F] to-[#0A0D14]',
    headingText: 'SUPER SOAKING DESIGNS FOR DRAIN MONSTERS.',
    slogan: 'Industrial-grade digital systems for master plumbers.',
    characterDescription: 'No leaks, no callbacks. We build highly professional, streamlined web portals that attract premium residential repiping and commercial contracts.',
    stickerLabel: 'MASTER LEVEL'
  },
  hvac: {
    id: 'hvac',
    name: 'Aero Steel',
    emoji: '❄️',
    colorName: 'Icy Titanium',
    primaryColor: '#F1F5F9',
    accentColor: '#E2E8F0',
    borderColor: '#2D3748',
    shadowColor: '#F1F5F9',
    bgGradient: 'from-[#0A0D14] via-[#111724] to-[#0A0D14]',
    headingText: 'CHILL CODES & HOT LOADS. STYLED FOR BLASTS.',
    slogan: 'Thermal mechanics & ventilation architecture optimized for conversions.',
    characterDescription: 'Thermal comfort, clean air. Your site will feature sleek call-routing triggers designed to capture local emergency heating and cooling service needs immediately.',
    stickerLabel: 'COMMERCIAL CLASS'
  }
};

export const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 'slide-1',
    trade: 'electrician',
    businessName: 'KENSINGTON ELECTRIC',
    slogan: 'Los Angeles High-Voltage Engineers',
    heroHeadline: 'Premium electrical architecture. Safe, certified, and compliant.',
    primaryColor: '#C9A24B',
    accentColor: '#000000',
    accentEmoji: '⚡',
    tags: ['Lic #982110', '24/7 Dispatch', 'EV Systems'],
    features: [
      'Interactive Panel Upgrader visualizer',
      'Instant Quote dispatch form',
      'Direct-to-SMS owner alert integration'
    ]
  },
  {
    id: 'slide-2',
    trade: 'plumber',
    businessName: 'VERNON & SONS PLUMBING',
    slogan: 'Master Hydraulics, Drainage & Piping',
    heroHeadline: 'Engineered drainage solutions for modern residences.',
    primaryColor: '#C9A24B',
    accentColor: '#000000',
    accentEmoji: '🪠',
    tags: ['Family Owned', 'Hydro-Jetting', 'Sewer Scans'],
    features: [
      'Live Emergency Dispatch ticker',
      'Video inspection logs gallery',
      'No-Surprise-Rates estimator'
    ]
  },
  {
    id: 'slide-3',
    trade: 'hvac',
    businessName: 'AERO-THERMAL CLIMATE',
    slogan: 'Los Angeles HVAC Mechanics & Air Specialists',
    heroHeadline: 'Precision climate systems. Restoring thermal balance.',
    primaryColor: '#C9A24B',
    accentColor: '#000000',
    accentEmoji: '❄️',
    tags: ['EPA Certified', 'NATE Techs', '0% Financing'],
    features: [
      'AC System Selector quiz',
      'Seasonal tune-up scheduler',
      'Live ambient temperature feed'
    ]
  },
  {
    id: 'slide-4',
    trade: 'electrician',
    businessName: 'APEX POWER & AUTOMATION',
    slogan: 'Smart Home Power Architecture',
    heroHeadline: 'Optimize your backup power generators before the grid gets tired.',
    primaryColor: '#C9A24B',
    accentColor: '#000000',
    accentEmoji: '🔌',
    tags: ['Tesla Certified', 'Lutron Pros', 'Free Audits'],
    features: [
      'Smart Home savings calculator',
      'Interactive fixture gallery',
      'Instant tech arrival ETA tracker'
    ]
  },
  {
    id: 'slide-5',
    trade: 'plumber',
    businessName: 'PACIFIC BASIN DRAINAGE',
    slogan: 'High-Trust Water Logistics. Since 1994.',
    heroHeadline: 'We repair the structural piping other contractors guessed at.',
    primaryColor: '#C9A24B',
    accentColor: '#000000',
    accentEmoji: '🏛',
    tags: ['Master License', 'LA Basin Specialist', 'Fixed Rates'],
    features: [
      'Sleek leak diagnosis sheet',
      'Click-to-Call direct dispatch',
      'Local discount generator'
    ]
  }
];

export const BENTO_FEATURES = [
  {
    title: 'Custom design',
    badge: '100% BESPOKE',
    desc: 'No templates. Your site is designed around your trade, your service area, and your license — with the interactive polish customers expect from a major brand, not a local shop. That first impression is what turns lookers into callers.',
    colorClass: 'from-[#C9A24B] to-[#101828]',
    accentEmoji: '🎨'
  },
  {
    title: 'Built-in lead capture',
    badge: '3-SECOND DELIVERY',
    desc: 'When a customer reaches out, their name, phone, and requested service are formatted into a clean lead ticket and piped directly to your mobile phone as an SMS in under three seconds.',
    colorClass: 'from-[#C9A24B] to-[#101828]',
    accentEmoji: '📠'
  },
  {
    title: 'Trade-specific calculators',
    badge: 'PREMIUM INTERACTIVE',
    desc: 'Keep high-intent homeowners on your site twice as long with custom-tailored widgets: main electrical panel estimators, seasonal BTU climate calculators, or water heating size selectors.',
    colorClass: 'from-[#C9A24B] to-[#101828]',
    accentEmoji: '🧮'
  },
  {
    title: 'Neighborhood SEO grids',
    badge: 'LOCAL SERVICE TARGETS',
    desc: 'We construct hyper-targeted neighborhood hubs (e.g., Burbank Electrician, Silverlake Plumber, Pasadena HVAC) so you capture local searches exactly where you want to work.',
    colorClass: 'from-[#C9A24B] to-[#101828]',
    accentEmoji: '📍'
  }
];

export const CLIENT_TESTIMONIALS = [
  {
    name: 'Dave K.',
    trade: 'Dave\'s Sparky Shop',
    quote: 'WebNar built my site in exactly 5 days. Homeowners kept telling me they chose me because my site looked so premium. The first job paid for the entire build. Radical!',
    avatar: '👨‍🔧',
    rating: 5,
    location: 'Burbank'
  },
  {
    name: 'Big Mike',
    trade: 'Mike\'s Rooter & Hydro',
    quote: 'I was sick of paying $300/month for Wix sites that look like standard medical clinics. WebNar made a slime-green page that kids and builders remember. Leads go straight to my phone!',
    avatar: '🧔',
    rating: 5,
    location: 'Encino'
  },
  {
    name: 'Sonia R.',
    trade: 'Westside Thermal Pro',
    quote: 'Our previous agency was charging us $1k a month for absolutely nothing. WebNar gave us our code, built a neat system calculator, and now we rank #1 in Culver City!',
    avatar: '👩‍🔧',
    rating: 5,
    location: 'Culver City'
  }
];
