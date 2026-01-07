export enum MeasureUnitType {
  GRAM = 'GRAM',
  MILLILITER = 'MILLILITER',
  LITER = 'LITER',
}

export type MenuItemSizeDTO = {
  id: string;
  isDefault: boolean;
  measureUnitType: MeasureUnitType;
  name: string;
  price: number;
  sku: string;
  weight: number;
  image: string;
};

export type MenuItemDTO = {
  allergenGroupIds: string[];
  description: string;
  id: string;
  measureUnit: string;
  name: string;
  sku: string;
  itemSizes: MenuItemSizeDTO[];
};

export type MenuDTO = {
  name: string;
  id: string;
  items: MenuItemDTO[];
};
