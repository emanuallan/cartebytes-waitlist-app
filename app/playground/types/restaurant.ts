export type RestaurantT = {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  logo: string;
  colors: RestaurantColorsT;
  socials: {
    mainUrl?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    tiktokUrl?: string;
    whatsappUrl?: string;
    twitterUrl?: string;
    youtubeUrl?: string;
  };
};

export type RestaurantColorsT = {
  primary: string;
  secondary: string;
  primary_text: string;
  secondary_text: string;
  accent: string;
};
