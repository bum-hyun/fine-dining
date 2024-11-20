import { cva } from 'styled-system/css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ children, variant, size, ...props }) => {
  return (
    <button className={button({ variant, size })} {...props}>
      {children}
    </button>
  );
};

export default Button;

const button = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'md',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, color 0.2s ease',
    _hover: {
      opacity: 0.9,
    },
  },
  variants: {
    variant: {
      solid: {
        backgroundColor: 'blue.500',
        color: 'white',
        _hover: {
          backgroundColor: 'blue.600',
        },
      },
      outline: {
        backgroundColor: 'transparent',
        border: '2px solid',
        borderColor: 'blue.500',
        color: 'blue.500',
        _hover: {
          backgroundColor: 'blue.50',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: 'blue.500',
        _hover: {
          backgroundColor: 'blue.100',
        },
      },
    },
    size: {
      sm: {
        fontSize: 'sm',
        padding: '0.25rem 0.5rem',
      },
      md: {
        fontSize: 'md',
        padding: '0.5rem 1rem',
      },
      lg: {
        fontSize: 'lg',
        padding: '0.75rem 1.5rem',
      },
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
});
