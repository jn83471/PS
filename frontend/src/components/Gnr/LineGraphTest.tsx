import Highcharts from 'highcharts';
import {HighchartsReact} from 'highcharts-react-official';

export const LineGraphTest=()=> {
  const options: Highcharts.Options = {
    chart: {
      type: "areaspline",
      height: 200,
      backgroundColor: "#fff",
    },

    title: {
      text: "Producción vs Meta",
      align: "left",
      
      style: {
        fontWeight: "bold",
        fontSize:12
      },
    },

    credits: {
      enabled: false,
    },

    xAxis: {
      categories: ["07", "08", "09", "10", "11", "12", "13", "14", "15", "16"],
      gridLineWidth: 1,
    },

    yAxis: {
      title: {
        text: "",
      },
      min: 0,
      max: 80,
      tickInterval: 20,
    },

    legend: {
      align: "right",
      verticalAlign: "top",
      layout: "horizontal",
      style: {
        fontWeight: "bold",
        fontSize:12
      },
    },

    tooltip: {
      shared: true,
    },

    plotOptions: {
      series: {
        marker: {
          enabled: true,
          radius: 4,
          lineWidth: 2,
          fillColor: "#fff",
        },
      },
      areaspline: {
        fillOpacity: 0.15,
      },
    },

    series: [
      {
        type: "areaspline",
        name: "Producción",
        color: "#1976d2",
        lineWidth: 3,
        marker: {
          lineColor: "#1976d2",
        },
        data: [55, 55, 55, 40, 30, 30, 30, 30, 30, 30],
      },
      {
        type: "line",
        name: "Meta",
        color: "#f44336",
        lineWidth: 3,
        marker: {
          lineColor: "#f44336",
        },
        data: [63, 63, 63, 63, 63, 63, 63, 63, 63, 63],
      },
    ],
  };

  return (<HighchartsReact highcharts={Highcharts} options={options} />);
}