// theme/index.js
import { extendTheme, theme } from '@chakra-ui/react'

// Global style overrides
// import styles from 'theme/styles'
import colors from 'theme/foundations/colors'
// Foundational style overrides
// import borders from './foundations/borders'

// Component style overrides
import Button from 'theme/components/button'
import Text from 'theme/components/text'

import { createBreakpoints } from '@chakra-ui/theme-tools'

// 2. Update the breakpoints as key-value pairs
const breakpoints = createBreakpoints({
  md: '960px',
  xl: '1200px',
  '2xl': '1536px',
})

const overrides = {
    colors,
    breakpoints,
    sizes: {
      '18': '4.5rem',  
    },
    space: {
      '18': '4.5rem',  
    },
//   borders,
//   // Other foundational style overrides go here
  components: {
    Button,
    Text
    // Other components go here
  },
}

export default extendTheme(overrides)