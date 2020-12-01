
// import { Button, Grid, Paper, Typography } from "@material-ui/core";
// import React from "react";
// import { withRouter } from "react-router";

// interface StateBoundary {
// 	hasError: boolean;
// 	error: Error | null;
// }

// interface PropsError {
// 	children: React.ReactNode;
// }

// class ErrorBoundaryOriginally extends React.Component<PropsError, StateBoundary> {
// 	state: StateBoundary = { hasError: false, error: null };

// 	static getDerivedStateFromError(error: Error): StateBoundary {
// 		return { hasError: true, error };
// 	}

// 	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
// 		// You can also log the error to an error reporting service
// 		console.log(error, errorInfo, "<<<<<<<<<");
// 	}

// 	render(): React.ReactNode {
// 		const handleClick = (): void => {
// 			this.setState({ hasError: false });
// 			// const history = useHistory();
// 			// history.push("/");
// 			//@ts-ignore
// 			this.props.navigtaion.push("/");
// 		};

// 		if (this.state.hasError && (this.state.error !== null)) {
// 			// You can render any custom fallback UI
// 			return (
// 				<Paper elevation={5} style={{ width: "80vw", margin: "auto", padding: "5em" }}>
// 					<Grid container direction="column" spacing={5}>
// 						<Grid item>
// 							<Typography variant="h1">Opps! Something Went Wrong!</Typography>
// 						</Grid>
// 						<Grid item>
// 							<Typography variant="h5">{this.state.error.name}: {this.state.error.message}</Typography>
// 						</Grid>
// 						<Grid item>
// 							<Button variant="contained" fullWidth onClick={handleClick}>Refresh then try again</Button>
// 						</Grid>
// 					</Grid>
// 				</Paper>
// 			);
// 		}
// 		return this.props.children;
// 	}
// }

// export const ErrorBoundary = withRouter(ErrorBoundaryOriginally);

import React from "react";
import { Button, Grid, Paper, Typography } from "@material-ui/core";

interface ErrorFallbackProps {
	error: Error;
	// resetErrorBoundary: () => void;
}

export default function ErrorFallback(props: ErrorFallbackProps): JSX.Element {
	const { error } = props;
	const resetErrorBoundary = (): void => {
		window.location.reload();
	};
	return (
		<Paper elevation={5} style={{ width: "80vw", margin: "auto", padding: "5em" }}>
			<Grid container direction="column" spacing={5}>
				<Grid item>
					<Typography variant="h1">Opps! Something Went Wrong!</Typography>
				</Grid>
				<Grid item>
					<Typography variant="h5">{error.name}: {error.message}</Typography>
				</Grid>
				<Grid item>
					<Button variant="contained" fullWidth onClick={resetErrorBoundary}>Refresh then try again</Button>
				</Grid>
			</Grid>
		</Paper>
	);
}