require('react-datepicker/dist/react-datepicker.css');
import DatePicker from 'react-datepicker';

import moment from 'moment';
import React from 'react';

import BikeChart from './bike-chart';

const MAX_DAYS = 30;

const App = React.createClass({

  getInitialState() {
    return {
      fromDate: moment('2015-06-01'),
      numDays: 1
    }
  },

  onFromDateChanged(date) {
    this.setState({
      fromDate: date
    });
  },

  onNumDaysChanged(ev) {
    this.setState({
      numDays: ev.target.value
    });
  },

  render() {
    return (
      <div style={{
        font: '12px sans-serif'
      }}>

        <h1>Fremont Bicycle Traffic</h1>

        <label>
          <span>From date:</span>
          <DatePicker
            selected={this.state.fromDate}
            onChange={this.onFromDateChanged} />
        </label>

        <label>
          <span>Number of days: {this.state.numDays}</span>
          <input
            type="range"
            min="1"
            max={MAX_DAYS}
            value={this.state.numDays}
            onChange={this.onNumDaysChanged} />
        </label>

        <section style={{paddingTop: '50px'}}>

          <BikeChart
            fromDate={this.state.fromDate}
            toDate={moment(this.state.fromDate).add(this.state.numDays, 'days')} />

        </section>

      </div>
    );
  }
});

export default App;
