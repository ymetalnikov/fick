import { injectOriginBox, getGeometry } from './utils';

const DEFAULT_CONTAINER_WIDTH = 1200;

/**
 * Calculate scale sizes for grid
 * @param {Array} list
 * @param {Object} props
 * @param {Array} props.pathToSize
 * @param {(String|Number)} props.containerWidth
 * @returns {Array}
 */
const getGridGeometry = (list, props = {}) => {
	if (!Array.isArray(list)) {
		throw new Error('The list param must be an array!');
	}

	if (list.length === 0) {
		return [];
	}
	const { pathToSize = [], containerWidth = DEFAULT_CONTAINER_WIDTH } = props;
	const hwList = injectOriginBox(list, pathToSize);

	return getGeometry(hwList, containerWidth);
};

export default getGridGeometry;
