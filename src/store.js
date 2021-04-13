import create from 'zustand';

export const useStore = create((set) => ({
  backgroundColor: 'transparent',
  // var(--white)
  logoColor: '#ffeacc',
  // var(--accent)
  logoActiveColor: '#f95421',
  // var(--white)
  color: '#ffeacc',
  // var(--accent)
  activeColor: '#f95421',
  logoReduced: false,
}));
