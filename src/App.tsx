import { AppRouter } from "./router/router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const query = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={query}>
			<AppRouter />
			<ToastContainer
				position="top-right"
				pauseOnHover={false}
				pauseOnFocusLoss={false}
				closeOnClick={true}
			/>
		</QueryClientProvider>
	);
}

export default App;
