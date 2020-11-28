import AwesomeDebouncePromise from "awesome-debounce-promise";
import React from "react";
import { useHistory } from "react-router-dom";
import { SwipeableHandlers, SwipeEventData, useSwipeable } from "react-swipeable";
import useConstant from "use-constant";

interface PageProviderProps {
	children: JSX.Element;
	initialData: number;
}

interface PageData {
	page: number;
	eventTouch: SwipeableHandlers | string;
}

interface Touch {
	start: number;
	end: number;
}

export const pageData = React.createContext<PageData>({
	page: 0,
	eventTouch: ""
});

const routes: string[] = [ "", "trees", "history" ];

export const PageProvider = (props: PageProviderProps): JSX.Element => {
	const { children, initialData } = props;
	const history = useHistory();

	const [ page, setPage ] = React.useState<number>(initialData);

	React.useEffect(() => {
		// const
		console.log(page, "<<<<<<<<<<<CSADS");
	}, [ page ]);

	const [ touch, setTouch ] = React.useState<Touch>({ start: 0, end: 0 });
	const [ now, setNow ] = React.useState<string>("");

	const navigating = (): void => {
		// console.log("masuk looh", page);
		if (page === routes.length) {
			setPage(oldVal => oldVal - 1);
			return;
		}

		history.push(`/${routes[page]}`);
	};

	const onScroll = (e: WheelEvent): void => {
		// NOTE: beacause use awesomeDebouncePromise pages will still as 0;
		if (e.deltaY > 0) {
			setPage(oldVal => oldVal + 1);
		} else {
			if (history.location.pathname === "/") {
				setPage(0);
				return;
			} else {
				setPage(oldVal => oldVal - 1);
			}
		}
	};

	const debounceNav = useConstant(() => AwesomeDebouncePromise(onScroll, 500));

	const initPage = (): void => {
		const route: string = history.location.pathname.slice(1);
		setNow(route);
		console.log(route, "ini t page etersuada <<<<<<<<>>>>>>>>>>>>>>>>>><<><><><>");

		const index: number = routes.findIndex((value) => value === route);

		if (index !== -1) setPage(index);
	};

	const eventTouch = useSwipeable({
		onSwipedLeft: (e: SwipeEventData): void => {
			console.log("masuk sinig asiih");
			setPage(oldPages => oldPages + 1);
		},
		onSwipedRight: (e: SwipeEventData): void => {
			console.log("masuk sinig asiih");
			if (history.location.pathname === "/") return;
			setPage(oldPages => oldPages - 1);
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
		initPage();
	}, []);

	React.useEffect(() => {
		navigating();
		console.log("APA MASUKD SIDNSIADNA>>>>>>>>>>>>");
		// initPage();
	}, [ page ]);

	return(
		<pageData.Provider
			value={{
				page,
				eventTouch
			}}
		>
			{children}
		</pageData.Provider>
	);
};