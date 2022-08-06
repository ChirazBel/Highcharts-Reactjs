import React from 'react';
import { render } from 'react-dom';
// Import Highcharts
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import UserFunctions from './UserFunctions.js'
// Load Highcharts modules
import HighchartsData from 'highcharts/modules/data';
import HighchartsExporting from 'highcharts/modules/exporting';
import StockTools from "highcharts/modules/stock-tools.js";
import 'bootstrap/dist/css/bootstrap.min.css';

HighchartsData(Highcharts);
HighchartsExporting(Highcharts);
StockTools(Highcharts);


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        chartOptions :{
          title: {
            text: 'HighChart ',
          },
        
          subtitle: {
            text: 'Data input from DataBase',
          },
          series:{
            data:null,
            dataGrouping: {
            forced: true,
            units: [['year',[1]]]
          }
          },
          
          xAxis: {
            type: 'datetime',
            gridLineWidth: 1,
            crosshair: true,
          },
        yAxis: {
            gridLineWidth: 1,
            title: {
              text: 'Gain'
          }
        }
        },
        chartOptions1 :{
          title: {
            text: 'HighChart ',
          },
        
          subtitle: {
            text: 'Data input from DataBase',
          },
          series:{
            data:null,
            dataGrouping: {
            forced: true,
            units: [['year',[1]]]
          }
          },
          
          xAxis: {
            gridLineWidth: 1,
            crosshair: true,
            title: {
              text: 'Cout'
          }
          },
        yAxis: {
            gridLineWidth: 1,
            title: {
              text: 'Gain'
          }
        }
        }
    }
    this.handleClickY = this.handleClickY.bind(this);
    this.handleClickX = this.handleClickX.bind(this);
}

handleClickX(event) {
  this.setState({value: event.target.value});
  console.log("===>",event.target.value);

  UserFunctions.get_dash1().then((res) => {
    //console.log(res.data) 
    if (res.data == null) {
        this.props.history.push('/');
 
    }
    let newData = [];
    for (let i = 0; i < res.data.length; i++) {
      let day=res.data[i]['Date'].substring(0, 2);
          let month=res.data[i]['Date'].substring(3, 5);
          let year=res.data[i]['Date'].substring(6,10 );
          const str = year+"-"+month+"-"+day;
          let date=new Date(str);
      newData.push([
        date,
        res.data[i][event.target.value]
      ]);
    }
    console.log(newData)
    this.setState({ 
    chartOptions:{
      xAxis:{
        categories: newData,
        title: {
          text: event.target.value
      }
      },
      series:{
        data: newData,
        dataGrouping: {
          forced: true,
          units: [['year',[1]]]
        }
      }

    }});
    
});
}

handleClickY(event) {
  this.setState({value: event.target.value});
  console.log("===>",event.target.value);

  UserFunctions.get_dash1().then((res) => {
    //console.log(res.data)
    if (res.data == null) {
        this.props.history.push('/');
 
    }
    let newData = [];
    for (let i = 0; i < res.data.length; i++) {
      let day=res.data[i]['Date'].substring(0, 2);
          let month=res.data[i]['Date'].substring(3, 5);
          let year=res.data[i]['Date'].substring(6,10 );
          const str = year+"-"+month+"-"+day;
          let date=new Date(str);
      newData.push([
        date,
        res.data[i][event.target.value]
      ]);
    }
    console.log(newData)
    this.setState({ 
    chartOptions:{
      yAxis:{
        categories: newData,
        title: {
          text: event.target.value
      }
      },

        series:{
          data: newData,
          dataGrouping: {
            forced: true,
            units: [['year',[1]]]
          }
        }
    


    }});
    
});
}

componentDidMount() {
  UserFunctions.get_dash1().then((res) => {
        if (res.data == null) {
            this.props.history.push('/');   
        }
        let newData = [];
        for (let i = 0; i < res.data.length; i++) {
          let day=res.data[i]['Date'].substring(0, 2);
          let month=res.data[i]['Date'].substring(3, 5);
          let year=res.data[i]['Date'].substring(6,10 );
          const str = year+"-"+month+"-"+day;
          let date=new Date(str);
          
          newData.push([
            date,
            res.data[i]['Gain']
          ]);
        }
        console.log("*",newData)
        this.setState({ 
        
          plotOptions: {
            series:{
              data: newData,
              dataGrouping: {
                forced: true,
                units: [['year',[1]]]
            }
        }
        }});
        
    });
}

  render() {
    return (
      <div>
        <h3> Change YAxis attribut</h3>
        <select id="attributY" onChange={this.handleClickY} value={this.state.value}>
          <option value="Rating">Rating</option>
          <option value="Gain">Gain</option>
          <option value="Total">Total</option>
          <option value="Prix unitaire">Prix unitaire</option>
          <option value="Quantité">Quantité</option>
          <option value="Coût">Coût</option>
        </select>
        <h3> Change xAxis attribut</h3>
        <select id="attributY" onChange={this.handleClickX} value={this.state.value}>
          <option value="Rating">Rating</option>
          <option value="Gain">Gain</option>
          <option value="Total">Total</option>
          <option value="Prix unitaire">Prix unitaire</option>
          <option value="Quantité">Quantité</option>
          <option value="Coût">Coût</option>
        </select>
        <HighchartsReact highcharts={Highcharts} constructorType={"stockChart"} options={this.state.chartOptions}/>
        
      </div>
      
    );
  }
}

render(<App />, document.getElementById('root'));