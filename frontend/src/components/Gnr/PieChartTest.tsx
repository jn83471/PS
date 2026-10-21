import Highcharts from 'highcharts';
import {HighchartsReact} from 'highcharts-react-official';

export const PieChartTest=()=> {
  const options: Highcharts.Options = {
    
    chart: {
        type: 'pie',
        backgroundColor: "transparent",
        height:200
    },

    title: {
        text: 'Avance de escaneo',
        style:{
            color:"white"
        }
    },

    tooltip: {
        valueSuffix: ''
    },

    series: [{
        name: 'Allocation',
        borderRadius: 0, // Rounded slice corners
        borderWidth: 0,
        innerSize: '80%', // Turning the pie into a donut
        // We can show multiple data labels per point
        dataLabels: [{
            format: '{point.name}'
        }, {
            format: '{point.percentage:.0f}%',
            distance: '-15%', // Placing the label inside
            backgroundColor: 'contrast',
            style: {
                textOutline: 'none'
            }
        }],
        data: [
            ['Faltante', 13],
            ['Escaneado', 12],
            
        ]
    }]
  };

  return (<HighchartsReact highcharts={Highcharts} options={options} />);
}