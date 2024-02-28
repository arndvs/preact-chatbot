import { style } from '@vanilla-extract/css';

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
  zIndex: '999999',
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
