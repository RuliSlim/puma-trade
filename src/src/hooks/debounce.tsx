import AwesomeDebouncePromise from "awesome-debounce-promise";
import React from "react";
import { useHistory } from "react-router-dom";
import { SwipeableHandlers, useSwipeable } from "react-swipeable";
import useConstant from "use-constant";

interface ReturnUseDebounce {
	pages: number;
	eventTouch: SwipeableHandlers;
	// setPages: React.Dispatch<React.SetStateAction<number>>;
}

interface Touch {
	start: number;
	end: number;
}

export const useDebounce = (): ReturnUseDebounce => {
	const routes: string[] = [ "", "trees", "history" ];
	const history = useHistory();
	const [ pages, setPages ] = React.useState<number>(0);
	const [ touch, setTouch ] = React.useState<Touch>({ start: 0, end: 0 });

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

		const index: number = routes.findIndex((value) => value === route);

		if (index !== -1) setPages(index);
	};

	const eventTouch = useSwipeable({
		onSwipedUp: () => {
			setPages(oldPages => oldPages + 1);
		},
		onSwipedDown: () => {
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
		initPage();
	}, []);

	React.useEffect(() => {
		navigating();
	}, [ pages ]);

	return { pages, eventTouch };
};
