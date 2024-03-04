'use client'

import {NextUIProvider} from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from 'react-query'

const client = new QueryClient();

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <QueryClientProvider client={client}>
        {children}
      </QueryClientProvider>
    </NextUIProvider>
  )
}