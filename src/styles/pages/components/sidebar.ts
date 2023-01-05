import { styled } from '../..';

export const SidebarContainer = styled('div', {
  position: 'fixed',
  right: 0,
  top: 0,
  zIndex: 3,
  width: '100%',
  maxWidth: 480,
  height: '100vh',
  backgroundColor: '$gray800',
})

export const ButtonClose = styled('div', {
  padding: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',

  button: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '$gray400',
    cursor: 'pointer',

    transition: 'all 0.2s',

    '&:hover': {
      color: '$gray300',
    },
  },
})

export const SidebarWrapper = styled('div', {
  paddingLeft: 48,
  paddingRight: 48,
  paddingBottom: 48,

  h3: {
    fontSize: '$lg',
    fontWeight: 'bold',
  },
})

export const ProductsSelected = styled('div', {
  marginTop: 32,
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
})

export const ProductSelected = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 20,

  img: {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 6,
    maxWidth: 110,  
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }
})

export const ProductDescription = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: 90,

  div: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },

  'div span': {
    fontSize: '$lg',
    color: '$gray300',
  },

  'div strong': {
    fontSize: '$lg',
  },

  button: {
    backgroundColor: 'transparent',
    border: 'none',
    textAlign: 'left',
    color: '$green500',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
    cursor: 'pointer',
    
    transition: 'color 0.2s',

    '&:hover': {
      color: '$green300',
    },
  },
})

export const InfosShoppingCartWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  div: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  button: {
    marginTop: 55,
    border: 'none',
    backgroundColor: '$green500',
    paddingBlock: 20,
    color: '$white',
    fontWeight: 'bold',
    fontSize: '$md',
    borderRadius: 8,
    cursor: 'pointer',

    '&:disabled': {
      opacity: '0.6',
      cursor: 'not-allowed'
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },
  }
})

export const InfosShoppingCart = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 7,

  marginTop: 10,
})