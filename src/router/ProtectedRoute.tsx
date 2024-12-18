import { ReactNode, useEffect } from "react";
import { useStore } from "../store/store.ts";
import { useNavigate } from "react-router-dom";
import { load } from "../services/auth.ts";

type Props = {
	children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
	const { setToken, setUsername, setEmail } = useStore();
	const navigate = useNavigate();

	const { token, userName, email } = load();

	useEffect(() => {
		if (!token || !email || !userName) {
			navigate("/login", {
				replace: true,
			});
			return;
		} else {
			setToken(token);
			setEmail(email);
			setUsername(userName);
		}
	}, [token, email, userName, setUsername, setEmail, setToken, navigate]);

	return <>{children}</>;
};

export default ProtectedRoute;
