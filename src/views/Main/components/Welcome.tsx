import { NavLink } from "react-router-dom";

const Welcome = () => {
	return (
		<div className={" w-full flex flex-col justify-center items-center gap-5"}>
			<div className={"px-5"}>
				Login into existing account or create a new one to use this app.
			</div>
			<div className={"flex gap-5"}>
				<NavLink
					to={"Login"}
					className={"bg-black text-white px-2 py-1 rounded-xl"}
				>
					Login
				</NavLink>
				<NavLink
					to={"Register"}
					className={"bg-black text-white px-2 py-1 rounded-xl"}
				>
					Register
				</NavLink>
			</div>
		</div>
	);
};

export default Welcome;
