interface Coupon {
  id: string;
  code: string;
  type: "fixed" | "percentage";
  value: number;
  expiresAt: Date;
  isActive: boolean;
  minPurchaseAmount: number;
  maxUses?: number;
  currentUses: number;
}

interface CouponResponse {
  code: string;
  type: string;
  value: number;
}
