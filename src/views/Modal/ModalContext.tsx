import React, {useEffect} from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
	children: React.ReactNode;
	isModalOpened: boolean;
	setIsModalOpened: (val: boolean) => void;
};

const ModalContext = ({ children, isModalOpened, setIsModalOpened }: Props) => {
	const variants = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
		},
		exit: {
			opacity: 0,
		},
	};

	const windowVariants = {
		hidden: {
			scale: 0,
			opacity: 0,
		},
		visible: {
			scale: 1,
			opacity: 1,
		},
	};
	useEffect(() => {
		if (isModalOpened) {
			document.documentElement.style.overflow = "hidden";
			document.body.style.overflow = "hidden";
		} else {
			document.documentElement.style.overflow = "auto";
			document.body.style.overflow = "auto";
		}
		return () => {
			document.documentElement.style.overflow = "auto";
			document.body.style.overflow = "auto";
		};
	}, [isModalOpened]);


	return (
		<AnimatePresence>
			{isModalOpened && (
				<motion.div
					key={"modal"}
					variants={variants}
					initial={"hidden"}
					animate={"visible"}
					exit={"exit"}
					transition={{ type: "spring", bounce: false, duration: 0.4 }}
					role="dialog"
					aria-labelledby="modal-title"
					aria-describedby="modal-description"
					className={
						"flex items-center justify-center fixed top-0 left-0 bg-[rgb(24,24,24,0.3)] w-screen h-screen z-10 "
					}
					onClick={(e) => {
						if (e.target === e.currentTarget) {
							setIsModalOpened(false);
						}
					}}
				>
					<motion.div
						variants={windowVariants}
						initial="hidden"
						animate={"visible"}
						transition={{
							type: "spring",
							ease: "linear",
							bounce: false,
							duration: 0.4,
						}}
						className={
							"z-20 flex flex-col gap-3 max-sm:min-h-72 max-sm:min-w-72 min-h-96 max-h-96 min-w-96 bg-white rounded-lg shadow-md p-5"
						}
					>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ModalContext;
