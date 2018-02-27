import { getGeometry } from '../index';

describe('getGeometry', () => {
	let warn;

	beforeAll(() => {
		// eslint-disable-next-line
		warn = global.console.warn;
		global.console.warn = () => {};
	});

	afterAll(() => {
		global.console.warn = warn;
	});

	it('Skip over proportion img fist', () => {
		const result = getGeometry([
			{ boxOrigin: { width: 1800, height: 300 } },
			{ boxOrigin: { width: 300, height: 300 } },
			{ boxOrigin: { width: 500, height: 300 } },
			{ boxOrigin: { width: 600, height: 300 } },
		], 1200);

		expect(result)
			.toEqual([[
				{ box: { height: 256, width: 255.500354861604 } },
				{ box: { height: 256, width: 425.83392476934 } },
				{ box: { height: 256, width: 511.000709723208 } },
			]]);
	});

	it('Skip over proportion img in the middle', () => {
		const result = getGeometry([
			{ boxOrigin: { width: 300, height: 300 } },
			{ boxOrigin: { width: 500, height: 300 } },
			{ boxOrigin: { width: 1800, height: 300 } },
			{ boxOrigin: { width: 600, height: 300 } },
		], 1200);

		expect(result)
			.toEqual([[
				{ box: { height: 256, width: 255.500354861604 } },
				{ box: { height: 256, width: 425.83392476934 } },
				{ box: { height: 256, width: 511.000709723208 } },
			]]);
	});

	it('Skip over proportion img in the last', () => {
		const result = getGeometry([
			{ boxOrigin: { width: 300, height: 300 } },
			{ boxOrigin: { width: 500, height: 300 } },
			{ boxOrigin: { width: 600, height: 300 } },
			{ boxOrigin: { width: 1800, height: 300 } },
		], 1200);

		expect(result)
			.toEqual([[
				{ box: { height: 256, width: 255.500354861604 } },
				{ box: { height: 256, width: 425.83392476934 } },
				{ box: { height: 256, width: 511.000709723208 } },
			]]);
	});

	it('Skip odd over proportion imgs ', () => {
		const result = getGeometry([
			{ boxOrigin: { width: 300, height: 300 } },
			{ boxOrigin: { width: 1800, height: 300 } },
			{ boxOrigin: { width: 500, height: 300 } },
			{ boxOrigin: { width: 1800, height: 300 } },
			{ boxOrigin: { width: 600, height: 300 } },
			{ boxOrigin: { width: 1800, height: 300 } },
		], 1200);

		expect(result)
			.toEqual([[
				{ box: { height: 256, width: 255.500354861604 } },
				{ box: { height: 256, width: 425.83392476934 } },
				{ box: { height: 256, width: 511.000709723208 } },
			]]);
	});
});
