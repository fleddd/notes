import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../views/Layout/Layout.tsx";
import Register from "../views/Auth/Register.tsx";
import Login from "../views/Auth/Login.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

const routes = createBrowserRouter([
	{
		element: (
			<ProtectedRoute>
				<Layout />
			</ProtectedRoute>
		),
		path: "/",
	},
	{
		element: <Register />,
		path: "/register",
	},
	{
		element: <Login />,
		path: "/login",
	},
]);

export const AppRouter = () => {
	return <RouterProvider router={routes} />;
};
