export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export type ProgramType = 'corporate' | 'individual' | 'learning';

export interface ProgramItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  type: ProgramType;
  tag?: string;
  price?: string;
  duration?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'trekking' | 'teambuilding' | 'gathering' | 'learning';
  image: string;
  description?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  company: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface FeatureStripItem {
  icon: string;
  title: string;
  description: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  status: 'draft' | 'published';
}

