// 风格数据配置文件
export interface Style {
  id: string;
  name: string;
  category: string;
  img: string;
}

export const CATEGORIES = ["全部", "艺术风格", "摄影风格", "电商专用", "人像美化", "创意风格"];

export const STYLES: Style[] = [
  // 艺术风格
  { id: "oil", name: "油画", category: "艺术风格", img: "/abstract-oil-painting.png" },
  { id: "watercolor", name: "水彩", category: "艺术风格", img: "/watercolor.jpg" },
  { id: "sketch", name: "素描", category: "艺术风格", img: "/pencil-sketch.png" },
  { id: "cartoon", name: "卡通", category: "艺术风格", img: "/cartoon-art.jpg" },
  { id: "manga", name: "漫画", category: "艺术风格", img: "/manga-style.jpg" },

  // 摄影风格
  { id: "film", name: "复古胶片", category: "摄影风格", img: "/vintage-film.png" },
  { id: "cinematic", name: "电影感", category: "摄影风格", img: "/cinematic-shot.jpg" },
  { id: "cyberpunk", name: "赛博朋克", category: "摄影风格", img: "/cyberpunk-city.png" },
  { id: "ins", name: "INS风", category: "摄影风格", img: "/instagram-filter.jpg" },

  // 电商专用
  { id: "product_polish", name: "商品精修", category: "电商专用", img: "/product-photography-still-life.png" },
  { id: "white_bg", name: "白底图", category: "电商专用", img: "/white-background-product.jpg" },
  { id: "scene", name: "场景图", category: "电商专用", img: "/product-lifestyle.png" },
  { id: "model", name: "模特展示", category: "电商专用", img: "/fashion-model.png" },

  // 人像美化
  { id: "beauty", name: "美颜滤镜", category: "人像美化", img: "/beauty-portrait.jpg" },
  { id: "id_photo", name: "证件照", category: "人像美化", img: "/id-photo.jpg" },
  { id: "art_portrait", name: "艺术肖像", category: "人像美化", img: "/artistic-portrait.png" },

  // 创意风格
  { id: "pixel", name: "像素艺术", category: "创意风格", img: "/pixel-art-cityscape.png" },
  { id: "abstract", name: "抽象画", category: "创意风格", img: "/abstract-composition.png" },
  { id: "ink", name: "国风水墨", category: "创意风格", img: "/chinese-ink-painting.jpg" },
];