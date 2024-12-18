import Header from "../Header/Header.tsx";
import { lazy, Suspense } from "react";

const Main = lazy(() => import("../Main/Main"));

const Layout = () => {
	return (
		<div className={"flex flex-col min-h-screen items-center gap-5"}>
			<Header />
			<Suspense>
				<Main />
			</Suspense>
		</div>
	);
};

export default Layout;
