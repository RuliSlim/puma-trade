import AwesomeDebouncePromise from "awesome-debounce-promise";
import React from "react";

interface Device {
	isMobile: boolean;
	isTablet: boolean;
	isLaptop: boolean;
}

export const useDeviceSize = (): {device: Device} => {
	const [ device, setDevice ] = React.useState<Device>({
		isLaptop: false,
		isMobile: false,
		isTablet: false
	});

	const resizeWindow = (): void => {
		console.log("masuk sini");
		const size = window.innerWidth;
		if (size <= 960) setDevice({ ...device, isMobile: true });
		if (size > 960 && size < 1280) setDevice({ ...device, isTablet: true });
		if (size > 1280) setDevice({ ...device, isLaptop: true });
	};

	const debounceResize = AwesomeDebouncePromise(resizeWindow, 200);

	React.useEffect(() => {
		debounceResize();
	}, []);

	return { device };
};
