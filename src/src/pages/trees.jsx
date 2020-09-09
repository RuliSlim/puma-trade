import React, { useState } from "react";
import Tree from "react-d3-tree";
import { Box } from "@material-ui/core";
import { useStyles } from "../utils/styles";
import { structTree, treeOnClick } from "../utils";
import { MyModal, MySnackbar } from "../components";

export default function Trees() {
	const classes = useStyles();
	const [isOpen, setIsOpen] = useState({modal: false, snackbar: false});

	// states
	const [treeData, setTreeData] = useState({});

	useState(() => {
		const result = structTree;
		setTreeData(result);
	}, []);

	const handleClick = (e) => {
		const result = treeOnClick(e);
		if (result === "modal") {
			setIsOpen({...isOpen, modal: true});
			return;
		}

		if (result === "snackbar") {
			setIsOpen({...isOpen, snackbar: true});
			return;
		}
	};

	return (
		<Box className={classes.tree}>
			<Tree 
				data={treeData}
				orientation="vertical"
				translate={{x: window.innerWidth/2, y: window.innerHeight/3}}
				pathFunc={"straight"}
				collapsible={false}
				onClick={handleClick}
			/>
			{isOpen.modal && 
				<MyModal 
					isOpen={isOpen} 
					onClose={() => setIsOpen({...isOpen, modal: false})}
				/>}
			{isOpen.snackbar &&
				<MySnackbar 
					isOpen={isOpen.snackbar} 
					message="You may not register new member in here" 
					variant="error" 
					onClose={() => setIsOpen({...isOpen, snackbar: false})}
				/>
			}
		</Box>
	);
}