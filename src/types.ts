export interface ProductInfo {
  name: string;
  hindiName: string;
  tagline: string;
  mrp: number;
  salePrice: number;
  discountPercent: number;
  rating: number;
  totalReviews: number;
  weight: string;
  items: {
    name: string;
    hindiName: string;
    weight: string;
    description: string;
    benefits: string[];
    image: string;
    alt: string;
  }[];
}

export interface GalleryImage {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  category: string;
  isMainPoster?: boolean;
  thumbnailUrl?: string;
  displayName?: string;
}

export interface OrderAddress {
  fullName: string;
  phone: string;
  altPhone?: string;
  addressLine: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  quantity: number;
}

export type PaymentMethod = 'upi' | 'qr' | 'card' | 'netbanking';

export interface OrderConfirmation {
  orderId: string;
  transactionId: string;
  date: string;
  amount: number;
  customer: OrderAddress;
  estimatedDelivery: string;
  paymentMethod: string;
  paymentScreenshot?: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  city: string;
  state: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  avatar: string;
}
