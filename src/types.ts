export type TradeType = 'electrician' | 'plumber' | 'hvac' | 'general';

export interface TradeTheme {
  id: TradeType;
  name: string;
  emoji: string;
  colorName: string;
  primaryColor: string; // e.g. '#FFE600'
  accentColor: string;  // e.g. '#FF2E93'
  borderColor: string;
  shadowColor: string;
  bgGradient: string;
  headingText: string;
  slogan: string;
  characterDescription: string;
  stickerLabel: string;
}

export interface CarouselSlide {
  id: string;
  trade: TradeType;
  businessName: string;
  slogan: string;
  heroHeadline: string;
  primaryColor: string;
  accentColor: string;
  accentEmoji: string;
  tags: string[];
  features: string[];
}

export interface LeadSim {
  id: string;
  name: string;
  phone: string;
  service: string;
  location: string;
  timestamp: string;
  status: 'pending' | 'synthesizing' | 'delivered';
}
