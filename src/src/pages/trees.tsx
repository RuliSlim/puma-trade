import React, { useState } from "react";
import Tree, { ReactD3TreeItem } from "react-d3-tree";
import { Box, Typography } from "@material-ui/core";
import { useStyles } from "../utils/styles";
import { structTree, treeOnClick } from "../utils";
import { MyModal, MySnackbar, Register } from "../components";
import { ModalState } from "../model/components/modal";
import "./../lib/tree.css";

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

	const styles = {
		links: {
			stroke: "#fff",
			width: "20rem",
			fill: "#fff"
		},
		nodes: {
			node: {
				circle: {
					fill: "#fff",
					name: {
						fontFamily: "'Roboto', sans-serif",
						fontSize: "1.6rem",
						fill: "#fff",
						fontColor: "#fff"
					},
				},
			},
			leafNode: {
				circle: {
					fill: "#fff",
					name: {
						fontFamily: "'Roboto', sans-serif",
						fontSize: "1.6rem",
						fill: "#fff"
					},
					attributes: {
						x: -10,
					},
				},
			},
		},
	};

	return (
		<Box className={classes.tree}>
			<Typography variant="h4" color="textPrimary">Tree</Typography>
			<Tree
				data={treeData}
				orientation="vertical"
				translate={{ x: window.innerWidth/2.5, y: window.innerHeight/3 }}
				pathFunc={"straight"}
				collapsible={false}
				zoomable={false}
				onClick={handleClick}
				styles={styles}
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
					onClose={(): void => setIsOpen({ ...isOpen, snackbar: false })}
				/>
			}
		</Box>
	);
}