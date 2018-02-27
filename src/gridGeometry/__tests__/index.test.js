import getGridGeometry from '../index';

describe('getGridGeometry', () => {
	it('Empty list', () => {
		expect(getGridGeometry([])).toEqual([]);
	});

	it('Wrong type list', () => {
		expect(() => getGridGeometry({}))
			.toThrowError('The list param must be an array!');
		expect(() => getGridGeometry(undefined))
			.toThrowError('The list param must be an array!');
	});

	it('Empty size data', () => {
		expect(() => getGridGeometry([{}]))
			.toThrowError('Incorrect path to the object with height & width');
	});

	it('Matrix inject into box!', () => {
		const geometry = getGridGeometry([
			{ width: 350, height: 300 },
			{ width: 250, height: 300 },
			{ width: 350, height: 300 },
			{ width: 450, height: 300 },
			{ width: 350, height: 300 },
			{ width: 250, height: 300 },
			{ width: 350, height: 300 },
			{ width: 450, height: 300 },
		]);

		expect(geometry.length).toEqual(2);
		expect(geometry[0].length).toEqual(4);
		expect(geometry[1].length).toEqual(4);

		expect(geometry).toEqual([
			[
				{ box: { height: 256, width: 298.08374733853793 }, height: 300, width: 350 },
				{ box: { height: 256, width: 212.91696238466994 }, height: 300, width: 250 },
				{ box: { height: 256, width: 298.08374733853793 }, height: 300, width: 350 },
				{ box: { height: 256, width: 383.25053229240586 }, height: 300, width: 450 },
			],
			[
				{ box: { height: 256, width: 298.08374733853793 }, height: 300, width: 350 },
				{ box: { height: 256, width: 212.91696238466994 }, height: 300, width: 250 },
				{ box: { height: 256, width: 298.08374733853793 }, height: 300, width: 350 },
				{ box: { height: 256, width: 383.25053229240586 }, height: 300, width: 450 },
			]]);
	});

	it('Matrix unlimited width!', () => {
		const geometry = getGridGeometry([
			{ width: 9000, height: 300 },
		]);

		expect(geometry)
			.toEqual([[{
				box: { height: 400, width: 1200 },
				width: 9000,
				height: 300,
			}]]);
	});

	it('Matrix unlimited height!', () => {
		const geometry = getGridGeometry([
			{ width: 300, height: 9000 },
		]);

		expect(geometry)
			.toEqual([[{
				box: { height: 300, width: 100 },
				height: 9000,
				width: 300,
			}]]);
	});
});
