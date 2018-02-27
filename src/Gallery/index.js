import React, { Component } from 'react';
import getGridGeometry from '../gridGeometry';
import imgs from '../data/imgs.json';

console.time('flick');
const imgsStroke = getGridGeometry(
    imgs,
    { containerWidth: '1200' },
);
console.timeEnd('flick');

const thousand = new Array(1000);

console.time('thousand');
thousand.forEach((item, index) => { new Object({ index }); });
console.timeEnd('thousand');

console.time('second');
setTimeout(() => {
    console.timeEnd('second');
}, 1000);

const colors = require('../data/colors');

class Gallery extends Component {

    componentDidMount() {
        console.timeEnd('render');
    }

    render() {
        console.time('render');
        let i = 0;

        return <div style={{
            width: "1200px",
            // border: '1px solid black',
            display: "inline-block"
        }}>
            {imgsStroke.map((row) => (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px",
                        // marginRight: "3px",
                    }}
                >
                    {row.map((item, index) => {
                    const { box } = item;
                    return <div
                        style={{
	                        backgroundImage: `url(${item.src})`,
	                        backgroundSize: 'cover',
	                        backgroundPosition: 'center center',
                            backgroundColor: colors[i++],
                            display: "inline-block",
                            height: `${box.height}px`,
                            width: `${box.width}px`,
	                        // marginRight: row.length === index + 1 ? "0" : "20px",
                        }}
                    />
                })}
                </div>
            ))}
        </div>
    }
}

export default Gallery;
