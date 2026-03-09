import { Category, Ingredient } from "./types";

export const INGREDIENTS: Ingredient[] = [
  // 肉类
  { id: 1, name: "肥牛卷", category: Category.MEAT, cookTime: 35, stages: [{ name: "五分熟", time: 15 }, { name: "全熟", time: 35 }] },
  { id: 2, name: "羊肉卷", category: Category.MEAT, cookTime: 60, stages: [{ name: "七分熟", time: 30 }, { name: "全熟", time: 60 }] },
  { id: 3, name: "午餐肉", category: Category.MEAT, cookTime: 120, stages: [{ name: "热透", time: 60 }, { name: "全熟", time: 120 }] },
  { id: 4, name: "手切鲜肉", category: Category.MEAT, cookTime: 60, stages: [{ name: "七分熟", time: 40 }, { name: "全熟", time: 60 }] },
  { id: 5, name: "毛肚", category: Category.MEAT, cookTime: 15, stages: [{ name: "脆嫩", time: 8 }, { name: "全熟", time: 15 }] },
  { id: 6, name: "黄喉", category: Category.MEAT, cookTime: 30, stages: [{ name: "脆爽", time: 15 }, { name: "全熟", time: 30 }] },
  { id: 7, name: "鸭肠", category: Category.MEAT, cookTime: 15, stages: [{ name: "脆嫩", time: 8 }, { name: "全熟", time: 15 }] },
  { id: 18, name: "千层肚", category: Category.MEAT, cookTime: 30, stages: [{ name: "脆嫩", time: 15 }, { name: "全熟", time: 30 }] },
  { id: 19, name: "猪脑花", category: Category.MEAT, cookTime: 600, stages: [{ name: "入味", time: 300 }, { name: "全熟", time: 600 }] },
  { id: 20, name: "嫩牛肉", category: Category.MEAT, cookTime: 180, stages: [{ name: "五分熟", time: 60 }, { name: "七分熟", time: 120 }, { name: "全熟", time: 180 }] },
  { id: 39, name: "猪颈肉", category: Category.MEAT, cookTime: 120, stages: [{ name: "断生", time: 60 }, { name: "全熟", time: 120 }] },
  { id: 40, name: "吊龙", category: Category.MEAT, cookTime: 45, stages: [{ name: "鲜嫩", time: 20 }, { name: "全熟", time: 45 }] },
  { id: 41, name: "牛舌", category: Category.MEAT, cookTime: 60, stages: [{ name: "脆嫩", time: 30 }, { name: "全熟", time: 60 }] },
  { id: 42, name: "牛腩片", category: Category.MEAT, cookTime: 120, stages: [{ name: "入味", time: 60 }, { name: "全熟", time: 120 }] },
  { id: 43, name: "牛腱肉", category: Category.MEAT, cookTime: 120, stages: [{ name: "入味", time: 60 }, { name: "全熟", time: 120 }] },
  { id: 44, name: "酥肉", category: Category.MEAT, cookTime: 180, stages: [{ name: "热透", time: 60 }, { name: "入味", time: 120 }, { name: "全熟", time: 180 }] },
  { id: 45, name: "鸭胗", category: Category.MEAT, cookTime: 120, stages: [{ name: "脆口", time: 60 }, { name: "全熟", time: 120 }] },
  { id: 46, name: "鹌鹑蛋", category: Category.MEAT, cookTime: 60, stages: [{ name: "热透", time: 30 }, { name: "全熟", time: 60 }] },
  { id: 47, name: "肥肠", category: Category.MEAT, cookTime: 300, stages: [{ name: "入味", time: 180 }, { name: "全熟", time: 300 }] },
  { id: 48, name: "牛百叶", category: Category.MEAT, cookTime: 30, stages: [{ name: "脆嫩", time: 15 }, { name: "全熟", time: 30 }] },
  
  // 海鲜
  { id: 9, name: "鲜虾", category: Category.SEAFOOD, cookTime: 180, stages: [{ name: "变红", time: 90 }, { name: "全熟", time: 180 }] },
  { id: 10, name: "耗儿鱼", category: Category.SEAFOOD, cookTime: 300, stages: [{ name: "入味", time: 180 }, { name: "全熟", time: 300 }] },
  { id: 21, name: "鱿鱼须", category: Category.SEAFOOD, cookTime: 120, stages: [{ name: "卷曲", time: 60 }, { name: "全熟", time: 120 }] },
  { id: 22, name: "扇贝肉", category: Category.SEAFOOD, cookTime: 180, stages: [{ name: "变色", time: 90 }, { name: "全熟", time: 180 }] },
  { id: 49, name: "螃蟹", category: Category.SEAFOOD, cookTime: 300, stages: [{ name: "变红", time: 180 }, { name: "全熟", time: 300 }] },
  { id: 50, name: "生蚝", category: Category.SEAFOOD, cookTime: 180, stages: [{ name: "收缩", time: 90 }, { name: "全熟", time: 180 }] },
  { id: 51, name: "鲍鱼", category: Category.SEAFOOD, cookTime: 240, stages: [{ name: "断生", time: 120 }, { name: "全熟", time: 240 }] },
  { id: 52, name: "花蛤", category: Category.SEAFOOD, cookTime: 180, stages: [{ name: "开口", time: 90 }, { name: "全熟", time: 180 }] },
  { id: 53, name: "牛蛙", category: Category.SEAFOOD, cookTime: 300, stages: [{ name: "断生", time: 180 }, { name: "全熟", time: 300 }] },
  
  // 蔬菜
  { id: 11, name: "生菜", category: Category.VEGETABLE, cookTime: 20, stages: [{ name: "断生", time: 10 }, { name: "全熟", time: 20 }] },
  { id: 12, name: "土豆片", category: Category.VEGETABLE, cookTime: 120, stages: [{ name: "脆口", time: 60 }, { name: "粉糯", time: 120 }] },
  { id: 13, name: "藕片", category: Category.VEGETABLE, cookTime: 120, stages: [{ name: "脆口", time: 60 }, { name: "粉糯", time: 120 }] },
  { id: 14, name: "冬瓜", category: Category.VEGETABLE, cookTime: 180, stages: [{ name: "透明", time: 120 }, { name: "全熟", time: 180 }] },
  { id: 23, name: "白萝卜", category: Category.VEGETABLE, cookTime: 180, stages: [{ name: "透明", time: 120 }, { name: "全熟", time: 180 }] },
  { id: 24, name: "海带芽", category: Category.VEGETABLE, cookTime: 60, stages: [{ name: "入味", time: 30 }, { name: "全熟", time: 60 }] },
  { id: 25, name: "贡菜", category: Category.VEGETABLE, cookTime: 120, stages: [{ name: "脆爽", time: 60 }, { name: "全熟", time: 120 }] },
  { id: 54, name: "茼蒿", category: Category.VEGETABLE, cookTime: 30, stages: [{ name: "断生", time: 15 }, { name: "全熟", time: 30 }] },
  { id: 55, name: "莴笋", category: Category.VEGETABLE, cookTime: 60, stages: [{ name: "脆口", time: 30 }, { name: "全熟", time: 60 }] },
  { id: 56, name: "娃娃菜", category: Category.VEGETABLE, cookTime: 120, stages: [{ name: "变软", time: 60 }, { name: "全熟", time: 120 }] },
  { id: 57, name: "山药", category: Category.VEGETABLE, cookTime: 180, stages: [{ name: "脆口", time: 90 }, { name: "粉糯", time: 180 }] },
  { id: 58, name: "玉米", category: Category.VEGETABLE, cookTime: 300, stages: [{ name: "热透", time: 180 }, { name: "全熟", time: 300 }] },
  { id: 59, name: "竹荪", category: Category.VEGETABLE, cookTime: 120, stages: [{ name: "入味", time: 60 }, { name: "全熟", time: 120 }] },
  
  // 菌菇
  { id: 15, name: "香菇", category: Category.MUSHROOM, cookTime: 180, stages: [{ name: "入味", time: 120 }, { name: "全熟", time: 180 }] },
  { id: 16, name: "金针菇", category: Category.MUSHROOM, cookTime: 60, stages: [{ name: "断生", time: 30 }, { name: "全熟", time: 60 }] },
  { id: 17, name: "木耳", category: Category.MUSHROOM, cookTime: 120, stages: [{ name: "脆爽", time: 60 }, { name: "全熟", time: 120 }] },
  { id: 26, name: "杏鲍菇", category: Category.MUSHROOM, cookTime: 180, stages: [{ name: "入味", time: 120 }, { name: "全熟", time: 180 }] },
  
  // 豆制品
  { id: 27, name: "冻豆腐", category: Category.BEAN, cookTime: 180, stages: [{ name: "吸汁", time: 120 }, { name: "全熟", time: 180 }] },
  { id: 28, name: "鲜豆腐", category: Category.BEAN, cookTime: 120, stages: [{ name: "热透", time: 60 }, { name: "全熟", time: 120 }] },
  { id: 29, name: "腐竹", category: Category.BEAN, cookTime: 180, stages: [{ name: "变软", time: 120 }, { name: "全熟", time: 180 }] },
  { id: 30, name: "豆皮", category: Category.BEAN, cookTime: 60, stages: [{ name: "断生", time: 30 }, { name: "全熟", time: 60 }] },
  { id: 60, name: "老油条", category: Category.BEAN, cookTime: 30, stages: [{ name: "吸汁", time: 15 }, { name: "软烂", time: 30 }] },
  { id: 61, name: "面筋泡", category: Category.BEAN, cookTime: 45, stages: [{ name: "吸汁", time: 20 }, { name: "全熟", time: 45 }] },
  { id: 62, name: "千页豆腐", category: Category.BEAN, cookTime: 120, stages: [{ name: "膨胀", time: 60 }, { name: "全熟", time: 120 }] },
  
  // 丸滑
  { id: 8, name: "虾滑", category: Category.BALLS, cookTime: 180, stages: [{ name: "浮起", time: 120 }, { name: "全熟", time: 180 }] },
  { id: 31, name: "牛肉丸", category: Category.BALLS, cookTime: 300, stages: [{ name: "浮起", time: 180 }, { name: "全熟", time: 300 }] },
  { id: 32, name: "鱼丸", category: Category.BALLS, cookTime: 180, stages: [{ name: "浮起", time: 120 }, { name: "全熟", time: 180 }] },
  { id: 33, name: "蟹柳", category: Category.BALLS, cookTime: 120, stages: [{ name: "散开", time: 60 }, { name: "全熟", time: 120 }] },
  { id: 34, name: "墨鱼仔", category: Category.BALLS, cookTime: 180, stages: [{ name: "卷曲", time: 90 }, { name: "全熟", time: 180 }] },
  { id: 63, name: "鱼豆腐", category: Category.BALLS, cookTime: 120, stages: [{ name: "膨胀", time: 60 }, { name: "全熟", time: 120 }] },
  { id: 64, name: "虾饺", category: Category.BALLS, cookTime: 180, stages: [{ name: "浮起", time: 120 }, { name: "全熟", time: 180 }] },
  { id: 65, name: "蛋饺", category: Category.BALLS, cookTime: 180, stages: [{ name: "热透", time: 90 }, { name: "全熟", time: 180 }] },
  
  // 主食
  { id: 35, name: "宽粉", category: Category.STAPLE, cookTime: 300, stages: [{ name: "变软", time: 180 }, { name: "全熟", time: 300 }] },
  { id: 36, name: "方便面", category: Category.STAPLE, cookTime: 120, stages: [{ name: "散开", time: 60 }, { name: "全熟", time: 120 }] },
  { id: 37, name: "年糕", category: Category.STAPLE, cookTime: 120, stages: [{ name: "变软", time: 60 }, { name: "全熟", time: 120 }] },
  { id: 38, name: "乌冬面", category: Category.STAPLE, cookTime: 180, stages: [{ name: "散开", time: 90 }, { name: "全熟", time: 180 }] },
  { id: 66, name: "苕皮", category: Category.STAPLE, cookTime: 120, stages: [{ name: "透明", time: 60 }, { name: "全熟", time: 120 }] },
  { id: 67, name: "水晶粉丝", category: Category.STAPLE, cookTime: 120, stages: [{ name: "变软", time: 60 }, { name: "全熟", time: 120 }] },
];
