import { motion } from "framer-motion";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
	onClick?: () => void;
	className?: string;
	type?: "submit" | "reset" | "button" | undefined;
	children: React.ReactNode | string;
};

const ActionButton = ({
	children,
	type = "button",
	className,
	onClick,
}: Props) => {
	return (
		<motion.button
			whileTap={{ scale: 0.98 }}
			whileHover={{ scale: 1.02 }}
			type={type}
			className={twMerge(
				"px-3 py-2 text-xs border-xl bg-black text-white rounded-xl",
				className,
			)}
			onClick={onClick}
		>
			{children}
		</motion.button>
	);
};

export default ActionButton;
