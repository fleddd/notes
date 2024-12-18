import FilterButton from "./FilterButton.tsx";
import { useStore } from "../../../store/store.ts";
import { Checkbox } from "../../../components/ui";

type Props = {
	filters: string[];
};

const Filters = ({ filters }: Props) => {
	const { setHideCompleted, isHideCompleted } = useStore();

	return (
		<div className={"w-full flex flex-col gap-5"}>
			<div
				className={
					"flex flex-col sm:flex-row justify-between items-center max-sm:gap-3"
				}
			>
				<div className={"flex flex-nowrap"}>
					{filters.map((filter) => (
						<FilterButton key={filter} filterName={filter} />
					))}
				</div>
				<div className={"flex items-center gap-1"}>
					<button onClick={setHideCompleted} className={"flex"}>
						<Checkbox
							id={"hideCompleted"}
							size={25}
							isChecked={isHideCompleted}
						/>
						<label
							htmlFor={"hideCompleted"}
							className={"select-none cursor-pointer"}
						>
							Hide completed
						</label>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Filters;
