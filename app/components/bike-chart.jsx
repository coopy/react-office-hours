require('es6-promise').polyfill();

import d3Scale from 'd3-scale';
import moment from 'moment';
import React from 'react';
import { VictoryChart, VictoryAxis, VictoryLine } from 'victory';

import { fetchData } from '../data';

const BikeChart = React.createClass({
  getInitialState() {
    return {
      data: [{
        x: '2015-01-01',
        y: 0
      },
      {
        x: '2015-01-02',
        y: 0
      }]
    };
  },

  update(fromDate, toDate) {
    fetchData(fromDate, toDate)
      .then((data) => this.setState({ data: data }));
  },

  componentDidMount() {
    const { fromDate, toDate } = this.props;
    this.update(fromDate, toDate);
  },

  componentWillReceiveProps(nextProps) {
    const { fromDate, toDate } = nextProps;
    if (fromDate !== this.props.fromDate || toDate !== this.props.toDate) {
      this.update(fromDate, toDate);
    }
  },

  render() {
    return (
      <div>
        <VictoryChart
          animate={{velocity: 0.02}}
          height={450}
          width={800}
          scale={{
            x: d3Scale.time()
          }}
          padding={{
            bottom: 100
          }}>

          <VictoryAxis
            label='Date'
            style={{
              axisLabel: {padding: 55},
              grid: {stroke: 'gray', opacity: 0.3},
              ticks: {stroke: 'transparent', padding: 10},
              tickLabels: {fill: 'blue'}
            }}
            tickFormat={(x) => moment(x).format('YYYY-MM-DD')+ '\n' + moment(x).format('dddd') + '\n' + moment(x).format('hA')}/>

          <VictoryLine
            interpolation='basis'
            style={{
              data: {
                stroke: (datum) => datum.y > 400 ? 'red' : 'grey',
                strokeWidth: 2
              }
            }}
            data={this.state.data}/>

        </VictoryChart>
      </div>
    );
  }
});

export default BikeChart;
