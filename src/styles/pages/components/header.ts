import { styled } from "../..";

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const CarryBag = styled('div', {
  padding: 12,
  backgroundColor: '$gray800',
  borderRadius: 6,
  cursor: 'pointer',
  position: 'relative',

  span: {
    position: 'absolute',
    content: '',
    top: -6,
    right: -6,
    width: 24,
    height: 24,
    clipPath: 'circle()',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '$green500',
    color: '$white',
  },
})