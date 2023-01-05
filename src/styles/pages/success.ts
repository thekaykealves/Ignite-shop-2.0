import { styled } from "..";

export const HeaderSuccessContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    marginTop: '5rem',
    display: 'block',
    textDecoration: 'none',
    fontSize: '$lg',
    fontWeight: 'bold',
    color: '$green500',

    '&:hover': {
      color: '$green300',
    }
  }
})

export const SuccessImageContainer = styled('div', {
  width: '100%',
  maxWidth: 130,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  height: 145,
  marginTop: '4rem',
  clipPath: 'circle()',

  padding: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  }
})