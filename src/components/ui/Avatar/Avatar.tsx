import * as AvatarPrimitive from '@radix-ui/react-avatar'

interface AvatarProps {
  src?: string
  alt: string
  fallback: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
}

export const Avatar = ({ src, alt, fallback, size = 'md' }: AvatarProps) => (
  <AvatarPrimitive.Root className={`inline-flex items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary ${sizeMap[size]}`}>
    {src ? <AvatarPrimitive.Image src={src} alt={alt} className="h-full w-full object-cover" /> : null}
    <AvatarPrimitive.Fallback className="font-semibold">{fallback}</AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
)
