import React from 'react';
import { SocialMediaWrapper } from '../../style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Doughnut } from 'react-chartjs-2';
import useChartData from '../../../../hooks/useChartData';
const SocialMediaOverview = props => {
  const { labels, datasets, options, height } = props;
  const { ref } = useChartData();
  const data = {
    labels,
    datasets,
  };

  return (
    <SocialMediaWrapper>
      <Cards title="Attendence Information" size="large">
        <Doughnut ref={ref} data={data} height={height} options={options} />
      </Cards>
    </SocialMediaWrapper>
  );
};

export default SocialMediaOverview;
