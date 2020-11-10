import AwesomeDebouncePromise from "awesome-debounce-promise";
import React from "react";
import { useHistory } from "react-router-dom";
import useConstant from "use-constant";

interface ReturnUseDebounce {
	pages: number;
}

export const useDebounce = (): ReturnUseDebounce => {
	const routes: string[] = [ "", "trees", "history" ];
	const history = useHistory();
	const [ pages, setPages ] = React.useState<number>(0);

	const navigating = (): void => {
		if (pages === routes.length) {
			setPages(oldVal => oldVal - 1);
			return;
		}

		history.push(`/${routes[pages]}`);
	};

	const onScroll = (e: WheelEvent): void => {
		// NOTE: beacause use awesomeDebouncePromise pages will still as 0;
		if (e.deltaY > 0) {
			setPages(oldVal => oldVal + 1);
		} else {
			if (history.location.pathname === "/") {
				setPages(0);
				return;
			} else {
				setPages(oldVal => oldVal - 1);
			}
		}
	};

	const debounceNav = useConstant(() => AwesomeDebouncePromise(onScroll, 1000));

	const initPage = (): void => {
		const route: string = history.location.pathname.slice(1);

		const index: number = routes.findIndex((value) => value === route);

		if (index !== -1) setPages(index);
	};

	React.useEffect(() => {
		document.addEventListener("wheel", debounceNav);
		initPage();
	}, []);

	React.useEffect(() => {
		navigating();
	}, [ pages ]);

	return { pages };
};
