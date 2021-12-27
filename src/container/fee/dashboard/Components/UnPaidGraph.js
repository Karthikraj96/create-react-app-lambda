import React from 'react';
import { Focard, RatioCard } from '../../../dashboard/style';
import { Row, Col, Progress } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';
import { ChartjsAreaChart } from '../../../../components/charts/chartjs';
import { chartLinearGradient } from '../../../../components/utilities/utilities';

function UnPaidGraph() {
  return (
    <Row gutter={25}>
      <Col md={12}>
        <Focard>
          <div className="forcast-card-box">
            <Cards headless title="Net Profit">
              <div className="focard-details growth-downward">
                <Heading as="h1">$25.3k</Heading>
                <p className="focard-status">
                  <span className="focard-status__percentage">
                    <FeatherIcon icon="arrow-down" /> 25%
                  </span>
                  <span>Since last month</span>
                </p>
              </div>
              <ChartjsAreaChart
                id="netProfit"
                labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'july', 'Aug', 'Sep', 'Oct']}
                datasets={[
                  {
                    data: [30, 10, 20, 25, 20, 30, 15, 25, 15, 10],
                    borderColor: '#20C997',
                    borderWidth: 3,
                    fill: true,
                    pointHoverBackgroundColor: '#5F63F2',
                    pointHoverBorderWidth: 0,
                    pointHoverBorderColor: 'transparent',
                    backgroundColor: () =>
                      chartLinearGradient(document.getElementById('netProfit'), 80, {
                        start: '#20C99712',
                        end: '#20C99702',
                      }),
                  },
                ]}
                height={80}
              />
            </Cards>
          </div>
        </Focard>
      </Col>
    </Row>
  );
}

export default UnPaidGraph;
