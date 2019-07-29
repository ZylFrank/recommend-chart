import React, { PureComponent, Fragment } from "react";
import { connect } from 'dva';

import {
  Chart,
  Geom,
  Tooltip,
  Coord,
  Legend,
} from "bizcharts";
import { Card, Row, Col } from 'antd';

@connect(({ chart }) => ({
  chart,
}))

class Colorrose extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchStory'
    });
  }

  render() {
    const { chart } = this.props;
    const { storyAndNumData } = chart;
    return (
      <Fragment>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <Card
              title="图形描述"
            >
              <Chart height={400} data={storyAndNumData} padding="auto" forceFit>
                <Coord type="polar" />
                <Tooltip />
                <Legend
                  position="right"
                  offsetY={-400 / 2 + 180}
                  // offsetX={-160}
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
          </Col>
          <Col md={12} sm={24}>
            <Card
              title="图形描述"
            >
              <Chart height={400} data={storyAndNumData} padding="auto" forceFit>
                <Coord type="polar" />
                <Tooltip />
                <Legend
                  position="right"
                  offsetY={-400 / 2 + 180}
                  // offsetX={-160}
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
          </Col>
        </Row>

      </Fragment>
    );
  }
}

export default Colorrose;