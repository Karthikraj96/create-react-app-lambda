import React from 'react';
import PropTypes from 'prop-types';
import { GalleryCard } from '../style';
import Heading from '../../../components/heading/heading';

const SubjectCards = ({ item, onCardClickHandle }) => {
  const { name, img, category } = item;
  return (
    <GalleryCard
      onClick={() => {
        onCardClickHandle(item);
      }}
      style={{ marginBottom: '25px' }}
    >
      <figure>
        <img style={{ width: '100%', height: '190px' }} src={img} alt="" />
        <figcaption>
          <div className="gallery-single-content">
            <Heading className="gallery-single-title" as="h4">
              {name}
            </Heading>
            <p>{category}</p>
          </div>
        </figcaption>
      </figure>
    </GalleryCard>
  );
};

SubjectCards.propTypes = {
  item: PropTypes.object,
};

export default SubjectCards;
