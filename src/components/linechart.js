import React from "react";
import * as d3 from "d3";

export class LineChart extends React.Component {
    render() {

        let {data=[]} = this.props;

        const width = 700, height = 600;

        let marginLeft = 60, marginRight=30, marginBottom=30, marginTop=10;

        const h = height-marginTop-marginBottom, w = width-marginLeft-marginRight;

        //x scale
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.objectID))
            .range([marginLeft, w]).padding(0.2)

        //y scale
        const yScale = d3.scaleLinear()
            .domain([100,4000])
            .range([height, 0])

        //line generator: each point is [x(d.a), y(d.b)] where d is a row in data
        // and x, y are scales (e.g. x(10) returns pixel value of 10 scaled by x)
        const line = d3.line()
            .x(d => xScale(d.objectID))
            .y(d => yScale(d.points))
            .curve(d3.curveMonotoneX)

        const xAxisData = data.map((d)=>{
            return(
                <g  className={"axis"} transform={`translate(${xScale(d.objectID)},${h-250})`}>
                <text transform={'rotate(-90)'} fontSize={'11px'}>{d.objectID}</text>
                <line x1='0' x1='0' y1='0' y2='5' transform="translate(0,-20)"/>
            </g>);
        })

        const yTicks = yScale.ticks(4).map(d => (
                <g transform={`translate(${marginLeft-30},${yScale(d)})`}>
                    <text x="-12" y="5">{d}</text>
                    <line x1='0' x1='5' y1='0' y2='0' transform="translate(-5,0)"/>
                    <line className='gridline' x1='0' x1={w - 0} y1='0' y2='0' transform="translate(-5,0)"/>
                </g>
        ))

        return  (
            <svg width={width} height={height}>
                <line className="axis" x1={marginLeft} x2={w} y1={h} y2={h}/>
                <line className="axis" x1={marginLeft} x2={marginLeft} y1={marginTop} y2={h}/>
                <path stroke={"#69b3a2"} fill={"none"} strokeWidth={"1.5"} d={line(data)}/>
                <g transform={`translate(0,${h-280})`} >
                    {xAxisData}
                </g>
                <g>
                    {yTicks}
                </g>
                <g >
                    {data.map((d, i) => {
                        return <circle
                            key={i}
                            cx={xScale(d.objectID)}
                            cy={yScale(d.points)}
                            r={5}
                            style={{
                                fill: '#69b3a2',
                                stroke: '#69b3a2'
                            }}
                        />
                    })}
                </g>
            </svg>
        )
    }
}

