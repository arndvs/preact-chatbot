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
  borderRadius: '25px',
  color: 'black'
});
