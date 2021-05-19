import create from 'zustand';

export const useStore = create((set) => ({
  documentFullscreen: null,
  backgroundColor: 'transparent',
  // var(--rich-black-FOGRA-29)
  logoColor: '#121821',
  // var(--accent)
  logoActiveColor: '#f95421',
  // var(--white)
  color: '#ffeacc',
  // var(--accent)
  activeColor: '#f95421',
  logoReduced: false,
  //
  openDocumentFullScreen: (documentFullscreen) => {
    // document.body.style.overflow = 'hidden';
    return set(state => ({
      documentFullscreen,
      previousColor: state.color,
      color: '#ffeacc'
    }))
  },
  closeDocumentFullScreen: () => {
    // document.body.style.overflow = 'scroll';
    return set(state => ({
      documentFullscreen: null,
      previousColor: '#ffeacc',
      color: state.previousColor
    }))
  },
}));
