import React, { PureComponent } from "react";
import { connect } from 'dva';
import {
  Chart,
  Geom,
  Tooltip,
  Coord,
  Legend,
} from "bizcharts";
import { Card, Row, Col, Select, Form, Button, DatePicker } from 'antd';
import moment from 'moment';
import qs from 'qs';

const{ Option } = Select;
const FormItem = Form.Item;

@connect(({ chart }) => ({
  chart,
}))
@Form.create()
class Colorrose extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchStory'
    });
  }

  render() {
    const { chart, form, history } = this.props;
    const { getFieldDecorator, validateFields, resetFields } = form;

    const { storyAndNumData, query } = chart;
    const { date, userType=0, rank=0 } = query;
    const onSubmit = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          const { date:dateValue, ...otherValues } = values
          const search = qs.stringify({ date: moment(dateValue).format('YYYY-MM-DD'), ...otherValues });
          history.push({search});
        }
      });
    };
  
    const onReset = () => {
      resetFields();
      history.push();
    };
    const disabledDate = (current) => {
      return current && current < moment('2019-07-30', 'YYYY-MM-DD');
    }
    return (
      <Card
        title="图形描述"
      >
        <div className="tableListForm">
          <Form onSubmit={onSubmit}>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={6} sm={24}>
                <FormItem label="会员类型">
                  {getFieldDecorator('userType', {
                    initialValue: parseInt(userType, 10),
                  })(                  
                    <Select style={{width: '100%'}}>
                      <Option key={0} value={0}>非会员</Option>
                      <Option key={1} value={1}>会员</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col md={6} sm={24}>
                <FormItem label="故事排名">
                  {getFieldDecorator('rank', {
                    initialValue: parseInt(rank, 10),
                  })(
                    <Select style={{width: '100%'}}>
                      <Option key={1} value={1}>1</Option>
                      <Option key={2} value={2}>2</Option>
                      <Option key={3} value={3}>3</Option>
                      <Option key={4} value={4}>4</Option>
                      <Option key={5} value={5}>5</Option>
                      <Option key={6} value={6}>6</Option>
                      <Option key={7} value={7}>7</Option>
                      <Option key={8} value={8}>8</Option>
                      <Option key={9} value={9}>9</Option>
                      <Option key={10} value={10}>10</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col md={6} sm={24}>
                <FormItem label="日期">
                  {getFieldDecorator('date', {
                    initialValue: date ? moment(date, 'YYYY-MM-DD') : null,
                  })(
                    <DatePicker disabledDate={disabledDate} style={{width: '100%'}} />
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
        <Chart height={window.innerHeight-200} data={storyAndNumData} padding="auto" forceFit>
          <Coord type="polar" />
          <Tooltip />
          <Legend
            position="right"
            offsetY={-(window.innerHeight-200) / 2 + 180}
            offsetX={-160}
          />
          <Geom
            type="interval"
            color="story_name"
            position="story_name*story_num"
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          />
        </Chart>
      </Card>

    );
  }
}

export default Colorrose;