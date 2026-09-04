import { GalleryImage, ProductInfo, ReviewItem } from '../types';
import mainPosterImage from '../assets/images/regenerated_image_1788437822458.webp';
import badamImage from '../assets/images/badam.webp';
import kajuImage from '../assets/images/kaju.webp';
import pistaImage from '../assets/images/pista.webp';
import kishmishImage from '../assets/images/kishmish.webp';
import { ALL_REVIEWS_DATA } from './reviewsData';

export const PRODUCT_DATA: ProductInfo = {
  name: "Rajshahi Nuts 4 KG Royal Dry Fruits Combo Pack",
  hindiName: "Rajshahi Nuts 4 KG Combo Pack (राजशाही नट्स)",
  tagline: "Premium • Royal • Nutritious - 100% Pure & Natural",
  mrp: 3499,
  salePrice: 265,
  discountPercent: 92,
  rating: 4.9,
  totalReviews: 7894,
  weight: "4 KG (Total 4 Kilograms)",
  items: [
    {
      name: "Premium Whole Cashews (kaju)",
      hindiName: "1 KG Cashews (काजू)",
      weight: "1 KG",
      description: "Jumbo whole white cashews (W-180 grade). Naturally sweet, rich in healthy fats, and melt-in-mouth creamy texture.",
      benefits: ["Supports Heart Health", "Rich in Plant Protein & Minerals", "Boosts Energy & Vitality"],
      image: kajuImage,
      alt: "1 KG Kaju (Cashews)"
    },
    {
      name: "California Almonds (badam)",
      hindiName: "1 KG Almonds (बादाम)",
      weight: "1 KG",
      description: "Premium California almonds with high natural oil content. Crunchy, fresh, and deeply nourishing for brain and memory.",
      benefits: ["Packed with Vitamin E & Omega-3", "Enhances Memory & Brain Health", "Promotes Glowing Skin & Hair"],
      image: badamImage,
      alt: "1 KG Badam (Almonds)"
    },
    {
      name: "Roasted Green Pistachios (pista)",
      hindiName: "1 KG Pistachios (पिस्ता)",
      weight: "1 KG",
      description: "Naturally cracked shell roasted pistachios with a touch of sea salt. Vibrant green kernels, crunchy and wholesome.",
      benefits: ["Rich in Antioxidants", "Supports Eye Health & Lutein", "Smart Healthy Snack for Weight Control"],
      image: pistaImage,
      alt: "1 KG Pista (Pistachios)"
    },
    {
      name: "Golden Sweet Raisins (kishmish)",
      hindiName: "1 KG Raisins (किशमिश)",
      weight: "1 KG",
      description: "Long golden seedless raisins naturally sun-dried without chemicals. Juicy, plump, and full of natural sweet energy.",
      benefits: ["High in Iron & Potassium", "Supports Digestion & Gut Health", "Instant Natural Energy Booster"],
      image: kishmishImage,
      alt: "1 KG Kishmish (Raisins)"
    }
  ]
};

// Exactly 5 Photos requested by the user: Main Combo Poster + 4 Uploaded Product Pouch Visuals
export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "combo-main",
    title: "Rajshahi Nuts 4 KG Combo Pack (Official Visual)",
    subtitle: "Complete 4 KG Combo: 1 KG Cashews + 1 KG Almonds + 1 KG Pistachios + 1 KG Raisins @ ₹265",
    url: mainPosterImage,
    thumbnailUrl: "/logo.svg",
    category: "Main Poster",
    displayName: "Main Poster",
    isMainPoster: true
  },
  {
    id: "badam-pouch",
    title: "1 KG California Almonds (badam)",
    subtitle: "100% Real California Crunchy Almonds - 1 KG Sealed Pouch",
    url: badamImage,
    category: "badam",
    displayName: "badam"
  },
  {
    id: "kaju-pouch",
    title: "1 KG Premium Whole Cashews (kaju)",
    subtitle: "100% Real Jumbo Whole White Cashews (W-180 Grade) - 1 KG Sealed Pouch",
    url: kajuImage,
    category: "kaju",
    displayName: "kaju"
  },
  {
    id: "pista-pouch",
    title: "1 KG Roasted Green Pistachios (pista)",
    subtitle: "100% Real In-Shell Roasted & Lightly Salted Green Pistachios - 1 KG Sealed Pouch",
    url: pistaImage,
    category: "pista",
    displayName: "pista"
  },
  {
    id: "kishmish-pouch",
    title: "1 KG Golden Sweet Raisins (kishmish)",
    subtitle: "100% Real Sun-Dried Golden Seedless Raisins - 1 KG Sealed Pouch",
    url: kishmishImage,
    category: "kishmish",
    displayName: "kishmish"
  }
];

export const REVIEWS_DATA: ReviewItem[] = ALL_REVIEWS_DATA;

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi NCR",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Other State / UT"
];
