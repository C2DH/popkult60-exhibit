import create from 'zustand';

export const useStore = create((set) => ({
  backgroundColor: 'transparent',
  logoReduced: false,
}));
