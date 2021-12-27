import React, { useEffect } from 'react';
import { Row, Col, Radio, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { Focard, CardGroup } from '../../style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';
import { ChartjsAreaChart } from '../../../../components/charts/chartjs';
import { forcastOverviewGetData, forcastOverviewFilterData } from '../../../../redux/chartContent/actionCreator';
import { chartLinearGradient } from '../../../../components/utilities/utilities';

const FacebookOverview = props => {
  const dispatch = useDispatch();
  const { forcastOverviewState, foIsLoading } = useSelector(state => {
    return {
      forcastOverviewState: state.chartContent.forcastData,
      foIsLoading: state.chartContent.foLoading,
    };
  });

  useEffect(() => {
    if (forcastOverviewGetData) {
      dispatch(forcastOverviewGetData());
    }
  }, [dispatch]);

  const forcastOverview = e => {
    dispatch(forcastOverviewFilterData(e.target.value));
  };

  return (
    <CardGroup>
      <div className="forcast-overview">
        {forcastOverviewState !== null && (
          <Cards
            isbutton={
              <div className="card-radio">
                <Radio.Group onChange={forcastOverview} defaultValue="today">
                  <Radio.Button value="today">Today</Radio.Button>
                  <Radio.Button value="week">Week</Radio.Button>
                  <Radio.Button value="month">Month</Radio.Button>
                  <Radio.Button value="year">Year</Radio.Button>
                </Radio.Group>
              </div>
            }
            title={props.title}
            size="large"
          >
            {foIsLoading ? (
              <div className="sd-spin">
                <Spin />
              </div>
            ) : (
              <Row gutter={25}>
                <Col xl={24} md={24}>
                  <div>
                    {props.announcements.map(item => (
                      <>
                        <p style={{ marginTop: '8px', marginBottom: '0px', fontSize: '0.9vw', fontWeight: 500 }}>
                          {item}
                        </p>
                        <span style={{ fontSize: '0.73vw' }}>More info can be displayed here </span>
                      </>
                    ))}
                  </div>
                  <br />
                </Col>
              </Row>
            )}
          </Cards>
        )}
      </div>
    </CardGroup>
  );
};

export default FacebookOverview;
