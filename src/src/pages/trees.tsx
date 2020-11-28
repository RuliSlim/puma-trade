import React, { useState } from "react";
import { ReactD3TreeItem } from "react-d3-tree";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import { treeOnClick } from "../utils";
import { Loading, MyModal, MySnackbar, Register } from "../components";
import { ModalState } from "../model/components/modal";
import "./../lib/tree.css";
import { PagesProps } from "../model/components/pages";
import { formContext } from "../context/form.context";
// import MyTree from "../components/tree/tree";

const MyTree = React.lazy(() => import("../components/tree/tree"));

export default function Trees(props: PagesProps): JSX.Element {
	const [ isOpen, setIsOpen ] = useState<ModalState>({ modal: false, snackbar: false });

	// states
	const { actions, values, resource, postResource } = React.useContext(formContext);
	const { clearPostResource, fetchingData, handleChange } = actions;

	React.useEffect(() => {
		fetchingData("trees");
		// clearPostResource();
		console.log("masuk sini ga siiiiiih anjiiing");
	}, [ postResource ]);

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
		<Paper>
			<Grid container direction="column" spacing={5}>
				<Grid item>
					<Box p={5}>
						<Typography variant="h4" color="textPrimary">Tree</Typography>
					</Box>
				</Grid>
				<Box width="100vw" height="80vh" mt="-22%">
					<React.Suspense fallback={<Loading thickness={50}/>}>
						<MyTree handleClick={handleClick}/>
					</React.Suspense>
				</Box>
				{isOpen.modal &&
					<MyModal
						isOpen={isOpen.modal}
						onClose={(): void => setIsOpen({ ...isOpen, modal: false })}
						message={{ title: "Register New Member", message: "" }}
						buttons={{ cancel: "Cancel", accept: "Register" }}
						content={<Register type="register"  handleChange={handleChange} values={values} />}
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