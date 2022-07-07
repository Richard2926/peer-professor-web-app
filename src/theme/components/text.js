const Text = {
    // The styles all Text have in common
    baseStyle: {
        fontFamily: "monospace"
    },
    // // Two sizes: sm and md
    // sizes: {
    //   sm: {
    //     fontSize: 'sm',
    //     px: 4, // <-- px is short for paddingLeft and paddingRight
    //     py: 3, // <-- py is short for paddingTop and paddingBottom
    //   },
    //   md: {
    //     fontSize: 'md',
    //     px: 6, // <-- these values are tokens from the design system
    //     py: 4, // <-- these values are tokens from the design system
    //   },
    // },
    // // Two variants: outline and solid
    variants: {
      medium: {
        fontSize: {
            base: "sm",
            md: "md"
        }
      },
      large: {
        fontSize: {
            base: "md",
            md: "lg"
        }
      },
    },
    
    defaultProps: {
    },
  };

  export default Text;