import React, { PureComponent } from "react";
import {
  Chart,
  Geom,
  Tooltip,
  Coord,
  Legend,
  Label,
} from "bizcharts";
import { Card } from 'antd';
import request from '@/utils/request';


class Colorrose extends PureComponent {
  state = {
    data: [],
  }

  componentDidMount() {
    // 使用request调接口实例
    // request('/api/rule', {
    //   method: 'POST',
    //   data: {
    //     ...params,
    //     method: 'delete',
    //   },
    // });
    request('/api/project/notice').then((e) => {
      // e 就是接口返回的结果
      // eslint-disable-next-line no-console
      console.log(e);
      this.setState({
        data: [
          {
            year: "2001",
            population: 41.8
          },
          {
            year: "2002",
            population: 38
          },
          {
            year: "2003",
            population: 33.7
          },
          {
            year: "2004",
            population: 30.7
          },
          {
            year: "2005",
            population: 25.8
          },
          {
            year: "2006",
            population: 31.7
          },
          {
            year: "2007",
            population: 33
          },
          {
            year: "2008",
            population: 46
          },
          {
            year: "2009",
            population: 38.3
          },
          {
            year: "2010",
            population: 28
          },
          {
            year: "2011",
            population: 42.5
          },
          {
            year: "2012",
            population: 30.3
          }
        ],
      });
    });
  }

  render() {
    const { data } = this.state;

    return (
      <Card
        title="图形描述"
      >
        <Chart height={window.innerHeight} data={data} padding="auto" forceFit>
          <Coord type="polar" />
          <Tooltip />
          <Legend
            position="right"
            offsetY={-window.innerHeight / 2 + 180}
            offsetX={-160}
          />
          <Geom
            type="interval"
            color="year"
            position="year*population"
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label
              content="population"
              offset={-15}
              textStyle={{
                textAlign: "center",
                fontWeight: "bold",
                fill: '#ffffff',
                fontSize: 18
              }}
            />
          </Geom>
        </Chart>
      </Card>
    );
  }
}

export default Colorrose;