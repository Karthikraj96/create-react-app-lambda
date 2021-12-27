import React, { useState, useEffect } from 'react';
import { Row, Col, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CardBarChart } from '../../style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';
import { ChartjsBarChartTransparent } from '../../../../components/charts/chartjs';
import { youtubeSubscribeFilterData, youtubeSubscribeGetData } from '../../../../redux/chartContent/actionCreator';

const YoutubeSubscribers = props => {
  const dispatch = useDispatch();
  const { youtubeSubscribeState, yuIsLoading } = useSelector(state => {
    return {
      youtubeSubscribeState: state.chartContent.youtubeSubscribeData,
      yuIsLoading: state.chartContent.yuLoading,
    };
  });

  const [state, setState] = useState({
    youtubeSubscribeTabActive: 'year',
  });

  useEffect(() => {
    if (youtubeSubscribeGetData) {
      dispatch(youtubeSubscribeGetData());
    }
  }, [dispatch]);

  const youtubeSubscribeDatasets = youtubeSubscribeState !== null && [
    {
      data: youtubeSubscribeState.gained,
      backgroundColor: '#5F63F280',
      hoverBackgroundColor: '#5F63F2',
      label: 'Gained',
      maxBarThickness: 10,
      barThickness: 12,
    },
    {
      data: youtubeSubscribeState.lost,
      backgroundColor: '#FF4D4F80',
      hoverBackgroundColor: '#FF4D4F',
      label: 'Lost',
      maxBarThickness: 10,
      barThickness: 12,
    },
  ];

  const handleActiveChangeYoutube = value => {
    setState({
      ...state,
      youtubeSubscribeTabActive: value,
    });
    dispatch(youtubeSubscribeFilterData(value));
  };

  return (
    <>
      {youtubeSubscribeState !== null && (
        <Cards
          isbutton={
            <div className="card-nav">
              <ul>
                <li className={state.youtubeSubscribeTabActive === 'week' ? 'active' : 'deactivate'}>
                  <Link onClick={() => handleActiveChangeYoutube('week')} to="#">
                    Week
                  </Link>
                </li>
                <li className={state.youtubeSubscribeTabActive === 'month' ? 'active' : 'deactivate'}>
                  <Link onClick={() => handleActiveChangeYoutube('month')} to="#">
                    Month
                  </Link>
                </li>
                <li className={state.youtubeSubscribeTabActive === 'year' ? 'active' : 'deactivate'}>
                  <Link onClick={() => handleActiveChangeYoutube('year')} to="#">
                    Year
                  </Link>
                </li>
              </ul>
            </div>
          }
          title={props.title}
          size="large"
        >
          {yuIsLoading ? (
            <div className="sd-spin">
              <Spin />
            </div>
          ) : (
            <CardBarChart>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div className="card-bar-top">Audio Player Library</div>
                {/* <ul>
                  {youtubeSubscribeDatasets &&
                    youtubeSubscribeDatasets.map((item, key) => {
                      return (
                        <li key={key + 1}>
                          <span
                            style={{
                              backgroundColor: item.hoverBackgroundColor,
                            }}
                          />
                          {item.label}
                        </li>
                      );
                    })}
                </ul> */}
              </div>
              {props.principalSpeech.map(item => (
                <div>
                  <Row justify="center" gutter={25}>
                    <Col sm={22} xs={22} md={22} lg={22} xxl={22}>
                      {item.title}
                    </Col>
                    <Col sm={2} xs={2} md={2} lg={2} xxl={2}>
                      P
                    </Col>
                  </Row>
                </div>
              ))}
            </CardBarChart>
          )}
        </Cards>
      )}
    </>
  );
};

export default YoutubeSubscribers;
