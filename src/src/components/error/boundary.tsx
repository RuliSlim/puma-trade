import React from "react";

interface StateBoundary {
	hasError: boolean;
	error: Error | null;
}

interface PropsError {
	children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<PropsError, StateBoundary> {
	state: StateBoundary = { hasError: false, error: null };

	static getDerivedStateFromError(error: Error): StateBoundary {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		// You can also log the error to an error reporting service
		console.log(error, errorInfo, "<<<<<<<<<");
	}

	render() {
		if (this.state.hasError && (this.state.error !== null)) {
			// You can render any custom fallback UI
			return (
				<>
					<div>Something went wrong: {this.state.error.message}</div>
					<div>Please Refresh the page</div>
				</>
			);
		}
		return this.props.children;
	}
}
