import React from "react";
import { Member } from "../model/tree_data";

interface TreeProviderProps {
	children: JSX.Element;
	initialData: Array<Member>;
}

interface TreeData {
	data: Array<Member>;
	actions: {
		getData: (parent: string) => void;
	};
}

export const treeData = React.createContext<TreeData>({
	data: [],
	actions: {
		getData: (parent: string): void => undefined,
	},
});

export const TreeProvider = (props: TreeProviderProps): JSX.Element => {
	const { children, initialData } = props;

	const [ data, setData ] = React.useState<Array<Member>>(initialData);

	const getData = (parent: string): void => {
		console.log(parent);
	};

	React.useEffect(() => {
		// const
	}, []);

	return(
		<treeData.Provider
			value={{
				data,
				actions: {
					getData
				}
			}}
		>
			{children}
		</treeData.Provider>
	);
};