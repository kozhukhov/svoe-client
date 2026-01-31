/* eslint-disable prettier/prettier */
'use client';

import React, { createContext, useContext, useState } from 'react';

import { MenuItemDTO } from 'modules/menu/dto';

type BasketItem = {
  productId: string;
  item: MenuItemDTO;
  price: number;
  count: number;
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

export const useBasket = (props?: {
  productId: string;
  price: number;
  item: MenuItemDTO;
}): {
  count: number;
  addItem: () => void;
  removeItem: () => void;
  clearBasket: () => void;
  items: BasketItem[];
} => {
  const context = useContext(BasketContext);

  if (props) {
    const activeItem = context.items.find(
      (i) => i.productId === props.productId,
    );

    return {
      count: activeItem?.count ?? 0,
      items: context.items,
      addItem: () => {
        context.addItem({
          productId: props.productId,
          price: props.price,
          count: 1,
          item: props.item,
        });
      },
      removeItem: () => {
        context.removeItem({
          productId: props.productId,
          price: props.price,
          count: 1,
          item: props.item,
        });
      },
      clearBasket: () => {
        context.clearBasket();
      },
    };
  }

  return {
    count: context.items.reduce((acc, item) => acc + item.count, 0),
    items: context.items,
    addItem: () => { },
    removeItem: () => { },
    clearBasket: () => { },
  };
};

export const BasketProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setBasket] = useState<BasketItem[]>([]);

  const addItem = (item: BasketItem) => {
    const itemToAdd = items.find((i) => i.productId === item.productId);

    if (itemToAdd) {
      setBasket((items) =>
        items.map((i) =>
          i.productId === item.productId ? { ...i, count: i.count + 1 } : i,
        ),
      );
    } else {
      setBasket([...items, item]);
    }
  };

  const removeItem = (item: BasketItem) => {
    const itemToRemove = items.find((i) => i.productId === item.productId);

    if (itemToRemove && itemToRemove.count > 1) {
      setBasket((items) =>
        items.map((i) =>
          i.productId === item.productId ? { ...i, count: i.count - 1 } : i,
        ),
      );
    } else {
      setBasket(items.filter((i) => i.productId !== item.productId));
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
