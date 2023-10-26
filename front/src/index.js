import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import AppProvider from './providers/AppProvider'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<AppProvider />
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
)
