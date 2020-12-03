import React from "react";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	highlight:
		theme.palette.type === "light"
			? {
				color: theme.palette.secondary.main,
				backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			}
			: {
				color: theme.palette.text.primary,
				backgroundColor: theme.palette.secondary.dark,
			},
	title: {
		flex: "1 1 100%",
	},
}));

interface TitleTableProps {
	numSelected: number;
	title: string;
}

export default function TitleTable (props: TitleTableProps): JSX.Element {
	const classes = useToolbarStyles();
	const { numSelected, title } = props;

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			<Typography className={classes.title} variant="h6" id="tableTitle" component="div">
				{title}
			</Typography>
		</Toolbar>
	);
}
