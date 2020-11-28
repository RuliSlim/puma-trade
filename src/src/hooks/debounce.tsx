import AwesomeDebouncePromise from "awesome-debounce-promise";
import React from "react";
import { useHistory } from "react-router-dom";
import { SwipeableHandlers, SwipeEventData, useSwipeable } from "react-swipeable";
import useConstant from "use-constant";
import { getToken } from "../utils/auth";

interface ReturnUseDebounce {
	pages: number;
	eventTouch: SwipeableHandlers;
	initPage: () => void;
	// setNow: React.Dispatch<React.SetStateAction<string>>;
	// setPages: React.Dispatch<React.SetStateAction<number>>;
}

interface Touch {
	start: number;
	end: number;
}

export const useDebounce = (): ReturnUseDebounce => {
	const routes: string[] = [ getToken() ? "" : "login", "trees", "history" ];
	const history = useHistory();
	const [ pages, setPages ] = React.useState<number>(0);
	const [ touch, setTouch ] = React.useState<Touch>({ start: 0, end: 0 });
	const [ now, setNow ] = React.useState<string>("");

	const navigating = (): void => {
		console.log("masuk looh", pages);
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

	const debounceNav = useConstant(() => AwesomeDebouncePromise(onScroll, 500));

	const initPage = (): void => {
		const route: string = history.location.pathname.slice(1);
		setNow(route);
		console.log(route, "ini t page etersuada <<<<<<<<>>>>>>>>>>>>>>>>>><<><><><>");

		const index: number = routes.findIndex((value) => value === route);

		if (index !== -1) setPages(index);
		else setPages(1);
	};

	const eventTouch = useSwipeable({
		onSwipedLeft: (e: SwipeEventData): void => {
			setPages(oldPages => oldPages + 1);
		},
		onSwipedRight: (e: SwipeEventData): void => {
			if (history.location.pathname === "/") return;
			setPages(oldPages => oldPages - 1);
		}
	});

	const touchStart = (e: TouchEvent): void => {
		setTouch({ ...touch, start: e.targetTouches[0].clientY });
	};

	const touchMove = (e: TouchEvent): void => {
		setTouch({ ...touch, end: e.targetTouches[0].clientY });
	};

	React.useEffect(() => {
		document.addEventListener("wheel", debounceNav);
		document.addEventListener("touchstart", touchStart);
		document.addEventListener("touchmove", touchMove);
		console.log("masuk sini dulu ga siiih????");
		// initPage();
	}, []);

	// React.useEffect(() => {
	// 	const route: string = history.location.pathname.slice(1);
	// 	const index: number = routes.findIndex((value) => value === route);

	// 	if (index !== -1) setPage(index);
	// }, [ history.location.pathname ]);

	// React.useEffect(() => {
	// 	console.log("masuk sinidas");
	// 	initPage();
	// }, [ now ]);

	// React.useEffect(() => {
	// 	navigating();
	// }, [ pages ]);

	React.useEffect(() => {
		navigating();
		console.log("APA MASUKD SIDNSIADNA>>>>>>>>>>>>");
		// initPage();
	}, [ pages ]);

	// React.useEffect(() => {
	// 	navigating();
	// 	console.log("<<<<<<<<NIH MASDUSAKDSA>>>>>>>>");
	// 	initPage();
	// }, [ history.location.pathname.slice(1) ]);

	return { pages, eventTouch, initPage };
};
