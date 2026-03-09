export enum Category {
  ALL = "全部",
  MEAT = "肉类",
  BALLS = "丸滑",
  SEAFOOD = "海鲜",
  VEGETABLE = "蔬菜",
  MUSHROOM = "菌菇",
  BEAN = "豆制品",
  STAPLE = "主食",
}

export interface TimerStage {
  name: string;
  time: number; // seconds from start
}

export interface Ingredient {
  id: number;
  name: string;
  category: Category;
  cookTime: number; // in seconds (final stage/total time)
  stages?: TimerStage[];
}

export enum TimerState {
  RUNNING = "running",
  PAUSED = "paused",
  COMPLETED = "completed",
}

export interface ActiveTimer {
  id: string; // unique instance id
  ingredientId: number;
  name: string;
  startTime: number; // timestamp
  totalTime: number; // seconds
  elapsed: number; // seconds
  state: TimerState;
}

export interface HistoryItem {
  id: string;
  name: string;
  totalTime: number;
  completedAt: number; // timestamp
}
