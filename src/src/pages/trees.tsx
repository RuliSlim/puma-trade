import React, { useState } from "react";
import Tree, { ReactD3TreeItem } from "react-d3-tree";
import { Box } from "@material-ui/core";
import { useStyles } from "../utils/styles";
import { structTree, treeOnClick } from "../utils";
import { MyModal, MySnackbar, Register } from "../components";
import { ModalState } from "../model/components/modal";

export default function Trees(): JSX.Element {
	const classes = useStyles();
	const [ isOpen, setIsOpen ] = useState<ModalState>({ modal: false, snackbar: false });

	// states
	const [ treeData, setTreeData ] = useState({});

	React.useEffect(() => {
		const result = structTree;
		setTreeData(result);
	}, []);

	const handleClick = (targetNode: ReactD3TreeItem): void => {
		const result = treeOnClick(targetNode);
		if (result === "modal") {
			setIsOpen({ ...isOpen, modal: true });
			return;
		}

		if (result === "snackbar") {
			setIsOpen({ ...isOpen, snackbar: true });
			return;
		}
	};

	return (
		<Box className={classes.tree}>
			<Tree
				data={treeData}
				orientation="vertical"
				translate={{ x: window.innerWidth/2.5, y: window.innerHeight/3 }}
				pathFunc={"straight"}
				collapsible={false}
				zoomable={false}
				onClick={handleClick}
			/>
			{isOpen.modal &&
				<MyModal
					isOpen={isOpen.modal}
					onClose={(): void => setIsOpen({ ...isOpen, modal: false })}
					message={{ title: "Register New Member", message: "" }}
					buttons={{ cancel: "Cancel", accept: "Register" }}
					content={<Register />}
				/>}
			{isOpen.snackbar &&
				<MySnackbar
					isOpen={isOpen.snackbar}
					message="You may not register new member in here"
					variant="error"
					onClose={() => setIsOpen({ ...isOpen, snackbar: false })}
				/>
			}
		</Box>
	);
}