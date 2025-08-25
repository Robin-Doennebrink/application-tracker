export const StageValues = [
  'none',
  'acknowledgment',
  'interview1',
  'interview2',
  'interview3',
  'interview4',
  'interview5',
  'offer',
] as const;

export type Stage = typeof StageValues[number];

export const StageLabels: Record<Stage, string> = {
  none: 'None',
  acknowledgment: 'Acknowledgment',
  interview1: 'Interview 1',
  interview2: 'Interview 2',
  interview3: 'Interview 3',
  interview4: 'Interview 4',
  interview5: 'Interview 5',
  offer: 'Offer',
};
