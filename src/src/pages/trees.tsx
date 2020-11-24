import React, { useState } from "react";
import Tree, { ReactD3TreeItem } from "react-d3-tree";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import { structTree, treeOnClick } from "../utils";
import { MyModal, MySnackbar, Register } from "../components";
import { ModalState } from "../model/components/modal";
import "./../lib/tree.css";
import { useDeviceSize } from "../hooks/device";
import { useHistory } from "react-router-dom";
import { useDebounce } from "../hooks/debounce";
import { PagesProps } from "../model/components/pages";

export default function Trees(props: PagesProps): JSX.Element {
	const [ isOpen, setIsOpen ] = useState<ModalState>({ modal: false, snackbar: false });
	const history = useHistory();
	// const { setNow } = useDebounce();

	// states
	const [ treeData, setTreeData ] = useState({});

	React.useEffect(() => {
		const result = structTree;
		setTreeData(result);
	}, []);

	React.useEffect(() => {
		const route: string = history.location.pathname.slice(1);
		// setNow(route);
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
		<Paper>
			<Grid container direction="column" spacing={5}>
				<Grid item>
					<Box p={5}>
						<Typography variant="h4" color="textPrimary">Tree</Typography>
					</Box>
				</Grid>
				<Box width="100vw" height="80vh" mt="-22%">
					<Tree
						data={treeData}
						orientation="vertical"
						translate={{ x: window.innerWidth/2.5, y: window.innerHeight/3 }}
						pathFunc={"straight"}
						collapsible={false}
						zoomable={false}
						onClick={handleClick}
						styles={styles}
						zoom={useDeviceSize().device.isMobile ? 0.45 : 1}
					/>
				</Box>
				{isOpen.modal &&
					<MyModal
						isOpen={isOpen.modal}
						onClose={(): void => setIsOpen({ ...isOpen, modal: false })}
						message={{ title: "Register New Member", message: "" }}
						buttons={{ cancel: "Cancel", accept: "Register" }}
						content={<div>sdafa</div>}
					/>}
				{isOpen.snackbar &&
					<MySnackbar
						isOpen={isOpen.snackbar}
						message="You may not register new member in here"
						variant="error"
						onClose={(): void => setIsOpen({ ...isOpen, snackbar: false })}
					/>
				}
			</Grid>

		</Paper>
	);
}