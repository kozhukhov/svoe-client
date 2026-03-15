export enum MeasureUnitType {
  GRAM = 'GRAM',
  MILLILITER = 'MILLILITER',
  LITER = 'LITER',
}

export enum MenuItemLabel {
  NEW = 'new',
  BESTSELLER = 'bestseller',
}

export type MenuItemModifierGroupDTO = {
  id: string;
  name: string;
  restrictions: {
    minQuantity: number;
    maxQuantity: number;
  };
  items: {
    name: string;
    price: number;
    id: string;
  }[];
};

export type MenuItemSizeDTO = {
  id: string;
  isDefault: boolean;
  measureUnitType: MeasureUnitType;
  name: string;
  price: number;
  sku: string;
  weight: number;
  image: string;
  itemModifierGroups: MenuItemModifierGroupDTO[];
};

export type MenuItemDTO = {
  allergenGroupIds: string[];
  description: string;
  id: string;
  measureUnit: string;
  name: string;
  sku: string;
  itemSizes: MenuItemSizeDTO[];
  labels: MenuItemLabel[];
};

export type MenuDTO = {
  id: string;
  items: MenuItemDTO[];
  labels: string[];
  name: string;
};
