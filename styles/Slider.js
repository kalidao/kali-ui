import { styled } from './stitches.config'
import * as SliderPrimitive from '@radix-ui/react-slider'

const StyledSlider = styled(SliderPrimitive.Root, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  touchAction: 'none',
  width: '100%',

  '&[data-orientation="horizontal"]': {
    height: 20,
  },

  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
    width: 20,
    height: 100,
  },
})

const StyledTrack = styled(SliderPrimitive.Track, {
  backgroundColor: '$blackAlpha',
  position: 'relative',
  flexGrow: 1,
  borderRadius: '9999px',

  '&[data-orientation="horizontal"]': { height: 3 },
  '&[data-orientation="vertical"]': { width: 3 },
})

const StyledRange = styled(SliderPrimitive.Range, {
  position: 'absolute',
  backgroundColor: 'white',
  borderRadius: '9999px',
  height: '100%',
})

const StyledThumb = styled(SliderPrimitive.Thumb, {
  all: 'unset',
  display: 'block',
  width: 20,
  height: 20,
  backgroundColor: 'white',
  boxShadow: `0 2px 10px $blackAlpha`,
  borderRadius: 10,
  '&:hover': { backgroundColor: '$purple' },
  '&:focus': { boxShadow: `0 0 0 5px '$blackAlpha'` },
})

export const SliderButton = styled('button', {})

export const Slider = ({ id, defaultValue, max, step, label }) => {
  return (
    <StyledSlider id={id} defaultValue={defaultValue} max={max} step={step} label={label}>
      <StyledTrack>
        <StyledRange />
      </StyledTrack>
      <StyledThumb />
    </StyledSlider>
  )
}
