export const StatusValues = [
  'applied',
  'interview1',
  'interview2',
  'interview3',
  'interview4',
  'interview5',
  'offer',
  'rejected',
] as const;

export type Status = typeof StatusValues[number];

export const StatusLabels: Record<Status, string> = {
  applied: 'Applied',
  interview1: 'Interview 1',
  interview2: 'Interview 2',
  interview3: 'Interview 3',
  interview4: 'Interview 4',
  interview5: 'Interview 5',
  offer: 'Offer',
  rejected: 'Rejected',
};
