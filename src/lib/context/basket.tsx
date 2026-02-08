'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';

import { MenuItemDTO } from 'modules/menu/dto';

export type BasketItem = {
  productId: string;
  productSizeId: string;
  categoryName?: string;
  modifiers: {
    groupId: string;
    modifierId: string;
    price: number;
  }[];
  item: MenuItemDTO;
  price: number;
  count: number;
  finalPrice: number;
};

type BasketContextType = {
  items: BasketItem[];
  addItem: (item: BasketItem) => void;
  removeItem: (item: BasketItem) => void;
  clearBasket: () => void;
  count: number;
};

export const BasketContext = createContext<BasketContextType>({
  items: [] as BasketItem[],
  addItem: () => { },
  removeItem: () => { },
  clearBasket: () => { },
  count: 0,
});

export const useItemBasket = (props: {
  productId: string;
  productSizeId: string;
  categoryName?: string;
  modifiers: {
    groupId: string;
    modifierId: string;
    price: number;
  }[];
  item: MenuItemDTO;
  price: number;
}): {
  count: number;
  finalPrice: number;
  addItem: () => void;
  removeItem: () => void;
  clearBasket: () => void;
  items: BasketItem[];
} => {
  const context = useContext(BasketContext);

  const finalPrice =
    props.price +
    props.modifiers.reduce((acc, modifier) => acc + modifier.price, 0);

  const addItem = useCallback(() => {
    context.addItem({
      productId: props.productId,
      productSizeId: props.productSizeId,
      categoryName: props.categoryName,
      modifiers: props.modifiers,
      count: 1,
      item: props.item,
      price: props.price,
      finalPrice,
    });
  }, [
    context,
    finalPrice,
    props.categoryName,
    props.item,
    props.modifiers,
    props.price,
    props.productId,
    props.productSizeId,
  ]);

  const removeItem = useCallback(() => {
    context.removeItem({
      productId: props.productId,
      productSizeId: props.productSizeId,
      categoryName: props.categoryName,
      modifiers: props.modifiers,
      count: 1,
      item: props.item,
      price: props.price,
      finalPrice,
    });
  }, [
    context,
    finalPrice,
    props.categoryName,
    props.item,
    props.modifiers,
    props.price,
    props.productId,
    props.productSizeId,
  ]);

  const activeItem = context.items.find(
    (i) =>
      i.productId === props.productId &&
      i.productSizeId === props.productSizeId &&
      JSON.stringify(i.modifiers) === JSON.stringify(props.modifiers),
  );

  return {
    count: activeItem?.count ?? 0,
    items: context.items,
    finalPrice,
    addItem,
    removeItem,
    clearBasket: () => {
      context.clearBasket();
    },
  };
};

export const useBasket = (): {
  count: number;
  finalPrice: number;
  addItem: () => void;
  removeItem: () => void;
  clearBasket: () => void;
  items: BasketItem[];
} => {
  const context = useContext(BasketContext);

  return {
    finalPrice: context.items.reduce(
      (acc, item) => acc + item.finalPrice * item.count,
      0,
    ),
    count: context.items.reduce((acc, item) => acc + item.count, 0),
    items: context.items,
    addItem: () => { },
    removeItem: () => { },
    clearBasket: () => {
      context.clearBasket();
    },
  };
};

const isTheSameItem = (item1: BasketItem, item2: BasketItem) => {
  return (
    item1.productId === item2.productId &&
    item1.productSizeId === item2.productSizeId &&
    JSON.stringify(item1.modifiers) === JSON.stringify(item2.modifiers)
  );
};

export const BasketProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setBasket] = useState<BasketItem[]>([]);

  const addItem = (item: BasketItem) => {
    const itemToAdd = items.find((i) => isTheSameItem(i, item));

    if (itemToAdd) {
      setBasket((items) =>
        items.map((i) =>
          isTheSameItem(i, item) ? { ...i, count: i.count + 1 } : i,
        ),
      );
    } else {
      setBasket([...items, item]);
    }
  };

  const removeItem = (item: BasketItem) => {
    const itemToRemove = items.find((i) => isTheSameItem(i, item));

    if (itemToRemove && itemToRemove.count > 1) {
      setBasket((items) =>
        items.map((i) =>
          isTheSameItem(i, item) ? { ...i, count: i.count - 1 } : i,
        ),
      );
    } else {
      setBasket(items.filter((i) => !isTheSameItem(i, item)));
    }
  };

  const clearBasket = () => {
    setBasket([]);
  };

  return (
    <BasketContext.Provider
      value={{ items, count: items.length, addItem, removeItem, clearBasket }}
    >
      {children}
    </BasketContext.Provider>
  );
};
