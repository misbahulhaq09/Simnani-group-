export interface AdditionalContact {
  phone: string;
  whatsapp: string;
}

export interface Venture {
  name: string;
  description: string;
  phone: string;
  whatsapp: string;
  website: string;
  image?: string; // Base64 or URL
  watermarkImage?: string;
  backgroundImage?: string;
  iconName: string;
  additionalContacts?: AdditionalContact[];
}

export interface SocialLinks {
  whatsapp: string;
  email: string;
}

export interface AppData {
  logoUrl: string;
  heroBackground: string;
  heroBackgroundType: 'video' | 'image';
  ventures: Venture[];
  socialLinks: SocialLinks;
}
