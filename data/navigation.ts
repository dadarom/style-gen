// 导航和页脚链接配置文件

// 导航链接
export const NAVIGATION_LINKS = [
  { id: "home", label: "首页", href: "/" },
  { id: "features", label: "功能介绍", href: "#features" },
  { id: "pricing", label: "价格", href: "#pricing" },
  { id: "faq", label: "常见问题", href: "#faq" },
];

// 页脚链接分组
export const FOOTER_LINKS = {
  product: [
    { id: "features", label: "功能", href: "#features" },
    { id: "pricing", label: "定价", href: "#pricing" },
    { id: "api", label: "API", href: "/api" },
  ],
  support: [
    { id: "faq", label: "常见问题", href: "#faq" },
    { id: "tutorial", label: "使用教程", href: "/tutorial" },
    { id: "contact", label: "联系我们", href: "/contact" },
  ],
  legal: [
    { id: "terms", label: "服务条款", href: "/terms" },
    { id: "privacy", label: "隐私政策", href: "/privacy" },
    { id: "copyright", label: "版权声明", href: "/copyright" },
  ],
};

// 社交媒体链接
export const SOCIAL_LINKS = [
  { id: "wechat", label: "微信", href: "#wechat" },
  { id: "qq", label: "QQ", href: "#qq" },
  { id: "douyin", label: "抖音", href: "#douyin" },
];