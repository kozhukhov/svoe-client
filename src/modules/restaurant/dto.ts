export type RestaurantDTO = {
  id: string;
  name: string;
  slug: string;
  address: string;
  phone: string;
  city: string;
  workingHours: string;
  mapUrl: string;
  instagramUrl?: string | null;
  vkUrl?: string | null;
  deliveryMinFreeSum?: number | null;
  deliveryPaidCost?: number | null;
  deliveryTimeMinutes?: number | null;
  deliveryZoneMapUrl?: string | null;
  googleMapUrl?: string | null;
  yandexMapUrl?: string | null;
};
