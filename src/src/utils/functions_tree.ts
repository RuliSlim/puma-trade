import { ReactD3TreeItem } from "react-d3-tree";

// CLICK TREE
export const treeOnClick = (e: ReactD3TreeItem): string | { data: ReactD3TreeItem; type: string } | ReactD3TreeItem => {
	if(e.name === "register here") {
		return {
			data: e,
			type: "modal"
		};
	} else if(e.name === "empty") {
		return "snackbar";
	} else {
		return e;
	}
};
