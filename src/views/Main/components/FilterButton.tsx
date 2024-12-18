import { motion } from "framer-motion";
import { useStore } from "../../../store/store.ts";

type Props = {
	filterName: string;
};

const FilterButton = ({ filterName }: Props) => {
	const { setCurrentFilter, currentFilter } = useStore();
	const isActive = currentFilter === filterName;
	const handleOnClick = () => {
		setCurrentFilter(filterName);
	};
	const variants = {
		hidden: {
			borderColor: "#eeeeee",
		},
		visible: {
			borderColor: "#242424",
		},
	};
	return (
		<motion.button
			variants={variants}
			initial={false}
			transition={{ type: "spring" }}
			animate={isActive ? "visible" : "hidden"}
			className={`leading-2 text-center min-w-20 sm:min-w-24 border-b-2  pb-1 ${isActive ? "border-black" : "border-gray-200"}`}
			type={"button"}
			onClick={handleOnClick}
		>
			{filterName}
		</motion.button>
	);
};
export default FilterButton;
