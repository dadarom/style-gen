// 价格套餐配置文件

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  description: string;
  popular?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "single",
    name: "单次生成",
    price: 0.3,
    originalPrice: 0.3,
    quantity: 1,
    description: "单次图片风格生成",
  },
  {
    id: "basic",
    name: "基础套餐",
    price: 2.5,
    originalPrice: 3,
    quantity: 10,
    description: "10次生成，省0.5元",
  },
  {
    id: "standard",
    name: "标准套餐",
    price: 7,
    originalPrice: 9,
    quantity: 30,
    description: "30次生成，省2元",
    popular: true,
  },
  {
    id: "premium",
    name: "高级套餐",
    price: 20,
    originalPrice: 30,
    quantity: 100,
    description: "100次生成，省10元",
  },
];

// 单次使用价格（用于显示在首页）
export const SINGLE_PRICE = 0.3;
// 预计生成时间
export const ESTIMATED_TIME = 60; // 秒