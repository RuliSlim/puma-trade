// import { Box, CircularProgress } from "@material-ui/core";
// import React from "react";

// export default function Loading(): JSX.Element {
// 	return(
// 		<Box position="absolute" left="50%" top="40%">
// 			<CircularProgress variant="indeterminate" size={100} />
// 		</Box>
// 	);
// }

import React from "react";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
	circle: {
		stroke: "url(#linearColors)"
	}
}));

interface Props {
	left?: string;
	top?: string;
	position?: string;
	thickness: number;
}

export default function Loading(props: Props): JSX.Element {
	const classes = useStyles({});
	const { left, position, top, thickness } = props;
	return (
		<div style={{ width: "20%" }}>
			<svg style={{ width: "20%" }}>
				<linearGradient id="linearColors" x1="0" y1="0" x2="1" y2="1">
					<stop offset="10%" stopColor="#fa100b" />
					<stop offset="50%" stopColor="#b7f446" />
					<stop offset="90%" stopColor="#04f723" />
				</linearGradient>
			</svg>
			<Box width="20%" position={position ? position : undefined} left={left ? left : undefined} top={top ? top : undefined}>
				<CircularProgress size={thickness} thickness={5} classes={{ circle: classes.circle }} />
			</Box>
		</div>
	);
}
