const Button = {
    // The styles all button have in common
    baseStyle: {
      fontWeight: 'bold',
      fontFamily: 'monospace',
      textTransform: 'uppercase',
      borderRadius: 'base', // <-- border radius is same for all variants and sizes
    },
    // Two sizes: sm and md
    sizes: {
      sm: {
        fontSize: 'sm',
        px: 4, // <-- px is short for paddingLeft and paddingRight
        py: 3, // <-- py is short for paddingTop and paddingBottom
      },
      md: {
        fontSize: 'md',
        px: 6, // <-- these values are tokens from the design system
        py: 4, // <-- these values are tokens from the design system
      },
    },
    // Two variants: outline and solid
    variants: {
      outline: {
        fontSize: {
            base: "xs",
            md: "xs"
        },
        borderColor: 'primary.900',
        color: 'primary.900',
        _hover: {
          bg: "gray.200"
        },
      },
      delete: {
        fontSize: {
            base: "xs",
            md: "xs"
        },
        borderColor: 'red.600',
        borderWidth: "1px",
        color: 'red.600',
        _hover: {
          bg: "red.600",
          color: "white",
        },
      },
      solid: {
        bg: 'purple.500',
        color: 'white',
      },
      explore: {
        fontSize: {
            base: "xs",
            md: "xs"
        },
        bg: 'primary.900',
        color: 'white',
        _hover: {
          bg: "gray.700"
        },
      },
      plain: {
        fontSize: {
            base: "md",
            md: "md"
        },
        bg: 'white',
        color: 'black',
        _hover: {
          bg: "gray.200"
        },
        textTransform: 'none',
        fontWeight: 'light'
      },
      landing: {
        bg: "primary.900",
        color: "white",
        _hover: {
          bg: "secondary.900"
        },
        fontWeight: "semibold"
      }
    },
    // The default size and variant values
    defaultProps: {
      size: 'md',
      variant: 'solid',
    },
  };

  export default Button;