interface Product {
  id: number
  name: { en: string; vi: string }
  price: number
  discountPrice?: number
  rating: number
  reviews: number
  images: ProductImage[]
  isNew?: boolean
}
interface ProductClient {
  id: number
  name: string
  price: number
  discountPrice?: number
  rating: number
  reviews: number
  images: ProductImage[]
  isNew?: boolean
}
interface ProductSliderProps {
  products: ProductClient[]
}

interface Category {
  id: string
  name: {
    en: string
    vi: string
  }
  href: string
}

interface CategoryClient {
  id: string
  name: string
  href: string
}

interface Slide {
  id: number
  icon: string
  title: { en: string; vi: string }
  description: { en: string; vi: string }
  image: string
  href: string
}

interface SlideClient {
  id: number
  icon: string
  title: string
  description: string
  image: string
  href: string
}

interface CategoryGrid {
  id: string
  name: { en: string; vi: string }
}

interface CategoryGridClient {
  id: string
  name: string
}

// interface CartItem extends ProductClient {
//   quantity: number;
// }

// interface StoreState {
//   cart: CartItem[];
//   wishlist: ProductClient[];
//   addToCart: (product: ProductClient) => void;
//   removeFromCart: (productId: number) => void;
//   updateCartItemQuantity: (productId: number, quantity: number) => void;
// }

interface CartItem extends Product {
  quantity: number
}

interface CartItemClient extends ProductClient {
  quantity: number
}
