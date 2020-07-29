import React from 'react';
import {Line} from 'react-chartjs-2';


export default function TimeLine(props){

    let {data=[]} = props;
    let ids = data.map((value)=>{
        return value.objectID;
    })
    let points = data.map((value)=>{
        return value.points;
    })

    const state = {
        labels: ids,
        datasets: [
            {
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: points
            }
        ]
    }
        return (
            <div>
                <Line
                    data={state}
                    options={{
                        title:{
                            display:true,
                            text:'Timeline',
                            fontSize:20
                        },
                        legend:{
                            display:false,
                        },
                        scales: {
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Votes'
                                }
                            }],
                            xAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'ID'
                                }
                            }],
                        }
                    }}
                />
            </div>
        );
}
