import { pathOr } from './ramdash';

const MAX_HEIGHT = 420;
const MIN_HEIGHT = 250;
const MIN_WIDTH = 220;

const getOffset = (length, index) => (length === index + 1 ? 0 : 3);
const getSafeWidth = (width) => width < MIN_WIDTH ? MIN_WIDTH : width;

const getHWStroke = (h, w) => {
	const widthStroke = getSafeWidth(w);
	const heightStroke = widthStroke * h / w;

	return { heightStroke, widthStroke }
};

const getHeight = (hwList, width) => {
	const hwStroke = hwList.reduce((acc, hw) => {
		acc += hw.boxOrigin.width / hw.boxOrigin.height;

		return acc;
	}, 0);

	return width / hwStroke;
};

const buildRow = (hwList, width) => {
	let height = 0;

	while (height < MIN_HEIGHT) {
		height = getHeight(hwList.slice(0, 10), width);
		if (height < MIN_HEIGHT) {
			hwList.pop();
		}
	}

	return hwList.map((hw) => {
		const { height: originHeight, width: originWidth } = hw.boxOrigin;

		if (height > MAX_HEIGHT) {
			return {
				...hw,
				box: {
					height: originHeight,
					width: originWidth,
				},
			};
		}

		return {
			...hw,
			box: {
				height: Math.round(height),
				// eslint-disable-next-line no-mixed-operators
				width: originWidth * height / originHeight,
			},
		};
	});
};

export const getGeometry = (hwList, width) => {
	let result = [];
	let offset = 0;
	let row;
	let { length } = hwList;

	while (offset !== length) {
		row = buildRow(hwList.slice(offset, length), width);

		if (row.length === 0) {
			// eslint-disable-next-line no-console
			console.warn('Skip media', hwList[offset]);
			hwList.splice(offset, 1);
			result = [];
			offset = 0;
			length -= 1;
		} else {
			result.push(row.slice(0));
			offset += row.length;
		}
	}

	// Скорость выполнения на 30 элементах: 0.072021484375ms
	// eslint-disable-next-line prefer-destructuring, no-plusplus
	for (let i = 0; i < result.length; i++) {
		// eslint-disable-next-line prefer-destructuring, no-plusplus
		for (let j = 0; j < result[i].length; j++) {
			delete result[i][j].boxOrigin;
		}
	}

	return result;
};

const scale = (hw) => {
	const height = 300;
	// eslint-disable-next-line no-mixed-operators
	const width = hw.width * height / hw.height;

	if (width / height > 3) {
		return {
			height,
			width: height * 3, // ~ 300x900
		};
	}

	if (height / width > 2.5) {
		// ...scale
		return {
			height,
			width: 220, // ~ 300x100
		};
	}

	return { height, width };
};

export const injectOriginBox = (imgs, pathToSize = []) => imgs.map((media) => {
	const size = pathOr(undefined, pathToSize, media);
	if (!size || !size.height || !size.width) {
		throw new Error('Incorrect path to the object with height & width');
	}

	return {
		...media,
		boxOrigin: scale({
			height: size.height,
			width: size.width,
		}),
	};
});
