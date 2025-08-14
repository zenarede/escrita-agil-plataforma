import { describe, it, expect } from 'vitest'
import { render } from '../utils/test-utils'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('renders button with text', () => {
    const { getByRole, getByText } = render(<Button>Click me</Button>)
    expect(getByRole('button')).toBeInTheDocument()
    expect(getByText('Click me')).toBeInTheDocument()
  })

  it('can be disabled', () => {
    const { getByRole } = render(<Button disabled>Disabled Button</Button>)
    const button = getByRole('button')
    expect(button).toBeDisabled()
  })
})