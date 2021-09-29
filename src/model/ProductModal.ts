export interface ProductAction {
  title: string;
  description: string;
  tags: string[];
  url: string;
  id: string;
  category: string;
}

export interface ProductInterface {
  title: string;
  description: string;
  tags: Tag[];
  url: string;
  id: string;
  category: Category;
}

export interface ProductList {
  qas: ProductInterface[];
  count: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  name: string;
}
