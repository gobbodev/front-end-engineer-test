import { IconType } from "react-icons";

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: IconType;
}
export interface CategoryStore {
  categories: Category[];
  selectedCategory: string;
  selectCategory: (categoryId: string) => void;
}

