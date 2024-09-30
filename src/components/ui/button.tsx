/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import * as React from 'react'
import { TbLoader } from 'react-icons/tb'
import cn  from '@/utils/cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, icon, loading, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={loading || props.disabled}
        className={cn(
          'flex items-center justify-center rounded-md px-4 py-2 font-medium outline-none transition-all duration-200 ease-in-out focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        {...props}
      >
        {(loading || icon) && (
          <span className={cn(children && 'mr-2')}>{loading ? <TbLoader className='animate-spin' /> : icon}</span>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
