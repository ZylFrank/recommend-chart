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
    const { clickRateData=[], query } = chart;
    const { getFieldDecorator, validateFields, resetFields } = form;
    const onSubmit = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          const { dateRange, userType, type } = values;
          let search = qs.stringify({ userType });
          if (dateRange) {
            search = qs.stringify({ userType, type, startDate: moment(dateRange[0]).format('YYYY-MM-DD'), endDate: moment(dateRange[1]).format('YYYY-MM-DD') });            
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
      date: {
        range: [0, 1]
      }
    };
    return (
      <Card>
        <div className="tableListForm">
          <Form onSubmit={onSubmit}>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={6} sm={24}>
                <FormItem label="用户类型">
                  {getFieldDecorator('userType', {
                    initialValue: parseInt(query.userType, 10),
                    rules: [{ required: true, message: '请选择用户类型'}],
                  })(                  
                    <Select style={{width: '100%'}}>
                      <Option key={0} value={0}>非会员</Option>
                      <Option key={1} value={1}>会员</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col md={6} sm={24}>
                <FormItem label="纬度">
                  {getFieldDecorator('type', {
                    initialValue: query.type || '',
                    rules: [{ required: true, message: '请选择纬度'}],
                  })(                  
                    <Select style={{width: '100%'}}>
                      <Option key={0} value='user_click_one_rate'>点击一个内容</Option>
                      <Option key={1} value='user_click_two_rate'>点击二个内容</Option>
                      <Option key={2} value='user_click_three_rate'>点击三个内容</Option>
                      <Option key={3} value='user_click_have_rate'>有过点击行为</Option>
                      <Option key={4} value='user_click_site_zero_rate'>点击第一个内容</Option>
                      <Option key={5} value='user_click_site_one_rate'>点击第二个内容</Option>
                      <Option key={6} value='user_click_site_two_rate'>点击第三个内容</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col md={6} sm={24}>
                <FormItem label="日期区间">
                  {getFieldDecorator('dateRange', {
                    initialValue: query.startDate ? [moment(query.startDate), moment(query.endDate)] : null,
                    rules: [{ required: true, message: '请选择日期区间'}],
                  })(                  
                    <RangePicker />
                  )}
                </FormItem>
              </Col>
              <Col md={6} sm={24}>
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
          <Axis name="date" />
          <Axis
            name="score"
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="line"
            position="date*score"
            size={2}
            color="type"
            shape="smooth"
          />
          <Geom
            type="point"
            position="date*score"
            size={4}
            shape="circle"
            color="type"
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