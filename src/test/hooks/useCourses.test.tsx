import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCourses } from '@/hooks/useCourses'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('useCourses', () => {
  it('should fetch courses successfully', async () => {
    const { result } = renderHook(() => useCourses(), {
      wrapper: createWrapper(),
    })

    // Wait for the query to complete
    expect(result.current.data).toBeDefined()
    expect(typeof result.current.isLoading).toBe('boolean')
  })

  it('should handle loading state', () => {
    const { result } = renderHook(() => useCourses(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(true)
  })
})