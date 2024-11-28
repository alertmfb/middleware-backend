export class PromoCode {
  title: string = 'SIGN UP BONUS';
  key: string = 'LA7AONPAX';
  amount: number = 1000;
  usage: number = 20;
  expirationDate: Date = new Date('2025-01-29');
}

export const getCodesResponse = [
  {
    id: '479c7d31-fffe-4b90-8e1a-82945a7df3ed',
    title: 'SIGN UP BONUS',
    key: 'LA7AONPAX',
    amount: '1000',
    usage: 20,
    expirationDate: '2025-01-29T00:00:00.000Z',
    createdAt: '2024-11-28T03:26:43.089Z',
    updatedAt: '2024-11-28T03:26:43.089Z',
  },
];

export const createCodeResponse = {
  success: true,
  id: '479c7d31-fffe-4b90-8e1a-82945a7df3ed',
};
