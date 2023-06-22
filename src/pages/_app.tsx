import { ToastBar } from '@/components/ToastBar'
import { AuthProvider } from '@/providers/AuthProvider'
import store from '@/store/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <Component {...pageProps} />
          <ToastBar />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  )
}
