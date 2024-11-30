export class CreateProduct {
  name: string = 'ALERT_SAVINGS';
}

export class EnableProduct {
  id: string = '604d1d36-d666-49be-bdec-58449015af02';
}

export class DisableProduct {
  id: string = '604d1d36-d666-49be-bdec-58449015af02';
}

export const getProductsResponse = [
  {
    id: '604d1d36-d666-49be-bdec-58449015af02',
    name: 'ALERT_SAVINGS',
    createdAt: new Date(),
  },
];

export const createProductResponse = {
  success: true,
  messgae: 'ALERT_SAVINGS',
};

export const enableProductResponse = {
  success: true,
  message: 'ALERT_SAVINGS has been enabled',
};

export const disableProductResponse = {
  success: true,
  message: 'ALERT_SAVINGS has been disabled',
};
