import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CartProvider } from '@features/cart/CartContext';

import { HeaderLayoutProvider } from './HeaderLayoutContext';
import { MobileMenuProvider } from './MobileMenuContext';
import { AuthProvider } from './AuthContext';

interface AppProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <HeaderLayoutProvider>
        <MobileMenuProvider>
          <AuthProvider>
            <CartProvider>{children}</CartProvider>
          </AuthProvider>
        </MobileMenuProvider>
      </HeaderLayoutProvider>
    </QueryClientProvider>
  );
}
