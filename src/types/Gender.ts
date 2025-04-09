export type Gender = 'boy' | 'girl';

export interface RevealScreenProps {
  gender: Gender;
  revealDate?: string;
  parents?: string;
}