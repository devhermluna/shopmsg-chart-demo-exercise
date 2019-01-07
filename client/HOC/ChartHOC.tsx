import React, { Component, Fragment } from 'react';
import RepositoryFactory from '../API';
import {
  Form,
  DatePicker,
  Card,
  Switch
} from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const Optins = RepositoryFactory.get('optins');
const Recipients = RepositoryFactory.get('recipients');

const defaults = {
  from: '2018-12-01',
  to: '2018-12-31'
}

export default (WrappedComponent) => {
  return class HOC extends Component {
    state = {
      chart: {
        label: [],
        optins: [],
        recipients: []
      },
      switches: {
        optins: true,
        recipients: true
      }
    }
  
    setData = (chartKey, data) => {
      const { chart } = this.state;
  
      this.setState({
        chart: {
          ...chart,
          [chartKey]: data
        }
      });
    }
  
    getRecipients = async (from, to) => {
      let response = await Recipients.get(`from=${from}&to=${to}`);
      this.setData('recipients', response);
    }
  
    getOptins = async (from, to) => {
      let response = await Optins.get(`from=${from}&to=${to}`);
      this.setData('optins', response);
    }

    onDateChanged = (date, dateString) => {
      this.getRecipients(dateString[0], dateString[1]);
      this.getOptins(dateString[0], dateString[1]);
    }

    switchChanged = (switchKey, status) => {
      const { switches } = this.state;
      this.setState({
        switches: {
          ...switches,
          [switchKey]: status
        }
      })
    }

    switchOptinsChanged = (checked) => {
      this.switchChanged('optins', checked);
    }
    
    switchRecipientsChanged = (checked) => {
      this.switchChanged('recipients', checked);      
    }
  
    componentDidMount() {
      const { from, to } = defaults;
      this.getRecipients(from, to);
      this.getOptins(from, to);
    }

    render() {
      const { chart, switches } = this.state;
      const dateFormat = 'YYYY/MM/DD';
      const { from, to } = defaults;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
          md: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
          md: { span: 8 }
        },
      };

      return (
        <Fragment>
          <Card style={{ marginBottom: 20 }}>
            <Form>
              <Form.Item
                {...formItemLayout}
                label="Date Range"
              >
                <RangePicker
                  defaultValue={[
                    moment(from, dateFormat),
                    moment(to, dateFormat)
                  ]}
                  onChange={this.onDateChanged}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Show Optins"
              >
                <Switch defaultChecked onChange={this.switchOptinsChanged} />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Show Recipients"
              >
                <Switch defaultChecked onChange={this.switchRecipientsChanged} />
              </Form.Item>
            </Form>
          </Card>
          <Card>
            <WrappedComponent chart={chart} switches={switches} />
          </Card>
        </Fragment>
      )
    }
  }
}