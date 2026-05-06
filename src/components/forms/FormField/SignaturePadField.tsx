import { useRef, useState, type PointerEvent } from 'react'

interface SignaturePadFieldProps {
  value?: string
  onChange: (nextValue: string) => void
}

export const SignaturePadField = ({ value, onChange }: SignaturePadFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const getContext = (): CanvasRenderingContext2D | null => {
    const canvas = canvasRef.current
    if (!canvas) {
      return null
    }
    const context = canvas.getContext('2d')
    if (context) {
      context.lineJoin = 'round'
      context.lineCap = 'round'
      context.strokeStyle = '#111928'
      context.lineWidth = 2
    }
    return context
  }

  const start = (event: PointerEvent<HTMLCanvasElement>): void => {
    const context = getContext()
    if (!context) {
      return
    }
    setIsDrawing(true)
    const rect = event.currentTarget.getBoundingClientRect()
    context.beginPath()
    context.moveTo(event.clientX - rect.left, event.clientY - rect.top)
  }

  const draw = (event: PointerEvent<HTMLCanvasElement>): void => {
    if (!isDrawing) {
      return
    }
    const context = getContext()
    if (!context) {
      return
    }
    const rect = event.currentTarget.getBoundingClientRect()
    context.lineTo(event.clientX - rect.left, event.clientY - rect.top)
    context.stroke()
    if (canvasRef.current) {
      onChange(canvasRef.current.toDataURL('image/png'))
    }
  }

  const stop = (): void => {
    setIsDrawing(false)
  }

  const clearSignature = (): void => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const context = canvas.getContext('2d')
    if (!context) {
      return
    }
    context.clearRect(0, 0, canvas.width, canvas.height)
    onChange('')
  }

  return (
    <div className="space-y-2">
      <canvas
        ref={canvasRef}
        width={640}
        height={160}
        className="h-40 w-full rounded-md border border-border bg-white"
        onPointerDown={start}
        onPointerMove={draw}
        onPointerUp={stop}
        onPointerLeave={stop}
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-secondary">{value ? 'Signature captured' : 'Draw your signature above'}</span>
        <button type="button" onClick={clearSignature} className="text-xs font-medium text-primary hover:text-primary-active">
          Clear
        </button>
      </div>
    </div>
  )
}
