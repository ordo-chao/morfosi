import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes

      retry: 2,

      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },

    mutations: {
      retry: 0,
    },
  },
});

export default queryClient;