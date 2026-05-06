import * as Separator from '@radix-ui/react-separator'

interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
}

export const Divider = ({ orientation = 'horizontal' }: DividerProps) => (
  <Separator.Root
    orientation={orientation}
    decorative
    className={orientation === 'horizontal' ? 'h-px w-full bg-border' : 'h-full w-px bg-border'}
  />
)
