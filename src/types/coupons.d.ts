import { z } from "zod";

export const CouponSchema = z.object({
  id: z.string(),
  code: z.string().min(3).max(50),
  type: z.enum(["fixed", "percentage"]),
  value: z.number().positive(),
  expiresAt: z.date(),
  isActive: z.boolean().default(true),
  minPurchaseAmount: z.number().default(0),
  maxUses: z.number().optional(),
  currentUses: z.number().default(0),
});

export type Coupon = z.infer<typeof CouponSchema>;
