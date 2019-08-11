import React, { PureComponent } from "react";
import { connect } from 'dva';
import {
  Chart,
  Geom,
  Tooltip,
  Legend,
  Axis,
} from "bizcharts";
import { Card, Form, Select, DatePicker, Row, Col, Button } from 'antd';
import moment from 'moment';
import qs from 'qs';

const{ Option } = Select;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

@connect(({ chart }) => ({
  chart,
}))
@Form.create()
class ClickRate extends PureComponent {
  
  render() {
    const { chart, form, history  } = this.props;
    const { clickRateData, query } = chart;
    const { getFieldDecorator, validateFields, resetFields } = form;
    const onSubmit = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          const { dateRange, userType } = values;
          let search = qs.stringify({ userType });
          if (dateRange) {
            search = qs.stringify({ userType, startDate: moment(dateRange[0]).format('YYYY-MM-DD'), endDate: moment(dateRange[1]).format('YYYY-MM-DD') });            
          }
          history.push({search});
        }
      });
    };
  
    const onReset = () => {
      resetFields();
      history.push();
    };

    const cols = {
      month: {
        range: [0, 1]
      }
    };
    return (
      <Card>
        <div className="tableListForm">
          <Form onSubmit={onSubmit}>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <FormItem label="会员类型">
                  {getFieldDecorator('userType', {
                    initialValue: parseInt(query.userType, 10) || '',
                  })(                  
                    <Select style={{width: '100%'}}>
                      <Option key={0} value={0}>非会员</Option>
                      <Option key={1} value={1}>会员</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="日期区间">
                  {getFieldDecorator('dateRange', {
                    initialValue: query.startDate ? [moment(query.startDate), moment(query.endDate)] : null,
                  })(                  
                    <RangePicker />
                  )}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <span>
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={onReset}>
                    重置
                  </Button>
                </span>
              </Col>
            </Row>
          </Form>
        </div>
        <Chart height={400} data={clickRateData} scale={cols} forceFit>
          <Legend />
          <Axis name="month" />
          <Axis
            name="temperature"
            label={{
              formatter: val => `${val}°C`
            }}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="line"
            position="month*temperature"
            size={2}
            color="city"
            shape="smooth"
          />
          <Geom
            type="point"
            position="month*temperature"
            size={4}
            shape="circle"
            color="city"
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </Card>
    )
  }
}

export default ClickRate;