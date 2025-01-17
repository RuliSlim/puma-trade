/* eslint-disable @typescript-eslint/ban-ts-ignore */
// eslint-disable-next-line
/* eslint-disable react-hooks/exhaustive-deps ; */
//@typescript-eslint/ban-ts-comment

import React, { useState } from "react";
import { ReactD3TreeItem } from "react-d3-tree";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import { treeOnClick } from "../utils";
import { Loading, MyModal, MySnackbar, Register } from "../components";
import { ModalState } from "../model/components/modal";
import "./../lib/tree.css";
import { formContext } from "../context/form.context";
import { ArrowUpward } from "@material-ui/icons";
import { RegisterInsideModel } from "../model/models/user.model";

const MyTree = React.lazy(() => import("../components/tree/tree"));

export default function Trees(): JSX.Element {
	const [ isOpen, setIsOpen ] = useState<ModalState>({ modal: false, snackbar: false });

	// states
	const { actions, values, postResource } = React.useContext(formContext);
	const { clearPostResource, fetchingData, handleChange } = actions;

	const [ inside, setInside ] = React.useState<RegisterInsideModel>({
		name: "",
		parent: {
			name: ""
		},
		position: ""
	});

	React.useEffect(() => {
		clearPostResource();
	}, []);

	React.useEffect(() => {
		fetchingData("trees");
	}, [ postResource ]);

	const handleClick = (targetNode: ReactD3TreeItem): void => {
		const result = treeOnClick(targetNode);
		//@ts-ignore
		if (result.type === "modal") {
			//@ts-ignore
			setInside(result.data);
			setIsOpen({ ...isOpen, modal: true });
			return;
		}

		if (result === "snackbar") {
			setIsOpen({ ...isOpen, snackbar: true });
			return;
		}

		//@ts-ignore
		fetchingData(result.name);
	};

	const backToSelf = (): void => {
		fetchingData("trees");
	};

	return (
		<Paper>
			<Grid container direction="column" spacing={5}>
				<Grid item>
					<Box p={5}>
						<Typography variant="h4" color="textPrimary">Tree</Typography>
					</Box>
				</Grid>
				<Box width="80vw" height="100vh" mt="-22%">
					<React.Suspense fallback={<Loading thickness={50} position="absolute" top="45%" left="45%" />}>
						<MyTree handleClick={handleClick}/>
						<Box position="absolute" top="20%" left="65vw">
							<Button onClick={backToSelf} variant="contained">
								<ArrowUpward />
								Self
							</Button>
						</Box>
					</React.Suspense>
				</Box>
				{isOpen.modal &&
					<MyModal
						isOpen={isOpen.modal}
						data={inside}
						onClose={(): void => setIsOpen({ ...isOpen, modal: false })}
						message={{ title: "Register Inside", message: "" }}
						buttons={{ cancel: "Cancel", accept: "Register" }}
						content={<Register type="inside"  handleChange={handleChange} values={values} />}
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