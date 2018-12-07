import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import moment from 'moment';
import { Card, DatePicker, Row, Col } from 'antd';
import { NumberInfo } from 'ant-design-pro';
import ReactHighcharts from 'react-highcharts';
import styles from './style.less';

const { RangePicker } = DatePicker;

@cssModules(styles)
class LineChart extends Component {
  static defaultProps = {
    ranges: {
      今日: [moment(), moment()],
      本周: [moment().startOf('week'), moment()],
      本月: [moment().startOf('month'), moment()],
      本年: [moment().startOf('year'), moment()]
    }
  }

  renderDashboard() {
    const { dashboardData } = this.props;

    return (
      <Row>
        <Col span={8}>
          <NumberInfo
            subTitle="曝光"
            total={dashboardData.impression}
          />
        </Col>
        <Col span={8}>
          <NumberInfo
            subTitle="点击"
            total={dashboardData.click}
          />
        </Col>
        <Col span={8}>
          <NumberInfo
            subTitle="总取量"
            total={dashboardData.data}
          />
        </Col>
      </Row>
    );
  }

  render() {
    const { loading, ranges, chartOptions, onRangeChange } = this.props;
    return (
      <Card
        bordered={false}
        style={{ marginTop: 40, minHeight: 548 }}
        loading={loading}
      >
        <div styleName="chart-toolbar">
          <RangePicker
            format="YYYY-MM-DD"
            defaultValue={[moment(), moment()]}
            ranges={ranges}
            onChange={onRangeChange}
          />
        </div>
        {this.renderDashboard()}
        <div styleName="chart">
          <ReactHighcharts
            config={chartOptions}
          />
        </div>
      </Card>
    );
  }
}

export default LineChart;
