import { style } from '@vanilla-extract/css';

// export const chatBubbleButton = style({
//   border: 'none',
//   backgroundColor: '#14c879',
//   borderRadius: '5px',
//   padding: '10px',
//   fontWeight: 'bold',
//   color: 'white',
//   cursor: 'pointer',
//   fontFamily: 'inherit',
// })

export const chatBubbleButton = style({
  position: 'fixed',
  bottom: '1rem',
  right: '1rem',
  width: '50px',
  height: '50px',
  borderRadius: '25px',
  backgroundColor: 'white',
  color: 'black',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 8px 0px',
  cursor: 'pointer',
  zIndex: '555555',
  transition: 'all 0.2s ease-in-out 0s',
  left: 'unset',
  transform: 'scale(1)'
});

export const chatBubbleButtonContent = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  zIndex: '666666'
});

export const chatBubbleButtonImage = style({
  width: '50px',
  height: '50px',
  borderRadius: '25px'
});

export const image = style({
  width: '100%',
  marginBottom: '1rem'
});

export const chatOverlay = style({
  border: 'none',
  position: 'fixed',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow:
    'rgba(150, 150, 150, 0.2) 0px 10px 30px 0px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px',
  bottom: '5rem',
  right: '1rem',
  width: '448px',
  height: '85vh',
  maxHeight: '824px',
  borderRadius: '0.75rem',
  display: 'flex',
  zIndex: '111111',
  overflow: 'hidden',
  left: 'unset',
  outline: 'none',
  backgroundColor: 'white'
});

export const chatOverlayVisible = style({
  display: 'block !important',
  animation: 'show 0.3s',
  animationFillMode: 'forwards'
});

export const chatOverlayDimmer = style({
  position: 'fixed',
  display: 'none',
  zIndex: '90',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0'
});

export const chatOverlayDimmerVisible = style({
  display: 'block',
  animation: 'show 0.2s',
  animationFillMode: 'forwards'
});
