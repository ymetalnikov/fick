const getOffset = (length, index) => {
    return length === index + 1 ? 0 : 3;
};

const getHeight = (hwList, width) => {
    const hwStroke = hwList.reduce((acc, hw, index) => {
        const offset = getOffset(hw.length, index);

        acc += (hw.width + offset) / hw.height;

        return acc;
    }, 0);

    return width / hwStroke;
};

const buildRow = (hwList, width) => {
    let height = 0;

    while (height < 250) {
        height = getHeight(hwList.slice(0, 8), width);
        if (height < 250) {
            hwList.pop()
        }
    }

    return hwList.map((hw) => {
        if (height > 420) {
            return {
                ...hw,
                box: {
                    height: hw.height,
                    width: hw.width,
                }
            }
        }

        return {
            ...hw,
            box: {
                height,
                width: hw.width * height / hw.height
            }
        };
    });
};

const getGeometry = (hwList, width) => {
    let result = [];
    let offset = 0;
    let row;
    const length = hwList.length;

    while (offset !== length) {
        row = buildRow(hwList.slice(offset, length), width);
        result.push(row.slice(0));
        offset += row.length;
    }

    return result;
};

module.exports = {
    getHeight,
    buildRow,
    getGeometry,
};