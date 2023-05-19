import { real_estate } from '@prisma/client';

type RealEstate = Omit<
  real_estate,
  're_id' | 'images' | 'description' | 'created' | 'updated' | 'price'
> & { price_min: number; price_max: number };

export type RealEstateQuery = Partial<RealEstate>;
