import React from 'react';
import { Focard, RatioCard } from '../../dashboard/style';
import { Row, Col, Progress } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../../components/cards/frame/cards-frame';
import Heading from '../../../components/heading/heading';
import { ChartjsAreaChart } from '../../../components/charts/chartjs';
import { chartLinearGradient } from '../../../components/utilities/utilities';

function EnqGraph() {
  return (
    <Row gutter={25}>
      <Col sm={24} xs={24} md={24}>
        <Focard>
          <div className="forcast-card-box">
            {/* <Cards headless> */}
            <div className="focard-details growth-upward">
              <Heading as="h1">8792</Heading>
              <p className="focard-status">
                <span className="focard-status__percentage">
                  <FeatherIcon icon="arrow-up" /> 25%
                </span>
                <span>Since last month</span>
              </p>
            </div>
            <ChartjsAreaChart
              id="grossProfit"
              labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'july', 'Aug', 'Sep', 'Oct']}
              datasets={[
                {
                  data: [30, 10, 50, 25, 20, 30, 15, 25, 15, 10],
                  borderColor: '#20C997',
                  borderWidth: 3,
                  fill: true,
                  pointHoverBackgroundColor: '#20c997',
                  pointHoverBorderWidth: 0,
                  pointHoverBorderColor: 'transparent',
                  backgroundColor: () =>
                    chartLinearGradient(document.getElementById('grossProfit'), 80, {
                      start: '#20C99712',
                      end: '#20C99702',
                    }),
                },
              ]}
              height={50}
            />
            {/* </Cards> */}
          </div>
        </Focard>
      </Col>
    </Row>
  );
}

export default EnqGraph;
