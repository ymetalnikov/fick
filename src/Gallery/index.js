import React, { Component } from 'react';
import { getGeometry } from '../utils/index';
import imgs from '../data/imgs.json';

console.time('flick');
const imgsStroke = getGeometry(imgs, 1000);
console.timeEnd('flick');

const thousand = new Array(1000);

console.time('thousand');
thousand.forEach((item, index) => { new Object({ index }); });
console.timeEnd('thousand');

const colors = require('../data/colors');

class Gallery extends Component {
    render() {
        let i = 0;

        return <div style={{ width: "1000px", border: '1px solid black', display: "inline-block"}}>
            {imgsStroke.map((row) => (
                row.map(box => (
                    <div
                        style={{
                            backgroundColor: colors[i++],
                            boxShadow: 'insert 3px 4px 5px #000',
                            display: "inline-block",
                            height: `${box.height}px`,
                            width: `${box.width}px`,
                        }}
                    />
                ))
            ))}
        </div>
    }
}

export default Gallery;
