import React from 'react';
import { Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useSelector } from 'react-redux';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import Swiper from 'react-id-swiper';
import { TestimonialStyleWrapper } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';

import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([Navigation, Pagination]);
const Testimonials = props => {
  const { users } = useSelector(state => {
    return {
      users: state.users,
    };
  });

  const paramsOne = {
    slidesPerView: 3,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
  };
  const paramsTwo = {
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },
  };
  const galleryParams = {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet(index, className) {
        return `<span class="${className} pagination-thumb"><img src="${require(`../../${users[index].img}`)}" alt="" /></span>`;
      },
    },
  };
  const paramsThree = {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };
  const calledFrom = props?.calledFrom || '';
  return (
    <>
      {calledFrom !== 'dashboard' && (
        <PageHeader
          title="Testimonials"
          buttons={[
            <div key="1" className="page-header-actions">
              <CalendarButtonPageHeader />
              <ExportButtonPageHeader />
              <ShareButtonPageHeader />
              <Button size="small" type="primary">
                <FeatherIcon icon="plus" size={14} />
                Add New
              </Button>
            </div>,
          ]}
        />
      )}

      <Row gutter={25}>
        <Col lg={24} xxl={24} sm={24} xs={24}>
          <TestimonialStyleWrapper>
            <Cards headless>
              {props.requestedType !== undefined && props.requestedType !== null && props.requestedType === '1' && (
                <div className="testimonial-block theme-1">
                  <Swiper {...paramsOne}>
                    {users.map((user, index) => {
                      return (
                        <div className="testimonial-block__single">
                          <figure>
                            <img src={require(`../../${user.img}`)} alt="" />
                            <figcaption>
                              <h2 className="client-name">Teacher Name</h2>
                              <p className="client-designation">Education Designation</p>
                              <p className="client-designation">Perambur</p>
                              {/* <p className="client-review">{user.content}</p> */}
                            </figcaption>
                          </figure>
                        </div>
                      );
                    })}
                  </Swiper>
                </div>
              )}
              {props.requestedType !== undefined && props.requestedType !== null && props.requestedType === '2' && (
                <div className="testimonial-block theme-2">
                  <h2 className="testimonial-title">Testimonial 2</h2>
                  <Swiper {...paramsTwo}>
                    {users.map((user, index) => {
                      return (
                        <div className="testimonial-block__single">
                          <span className="quotation">
                            <img src={require(`../../static/img/icon/quote.png`)} alt="" />
                          </span>
                          <div className="testimonial-block__author">
                            <img src={require(`../../${user.img}`)} alt="" />
                            <div className="author-info">
                              <h2 className="client-name">{user.name}</h2>
                              <p className="client-designation">{user.designation}</p>
                            </div>
                          </div>
                          <div className="testimonial-block__review">
                            <p>
                              It is a long established fact that a reader will page when looking at its was layout. The
                              point of be distracted by the readable will page when looking at its was layout will page
                              when looking.
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </Swiper>
                </div>
              )}
              {props.requestedType !== undefined && props.requestedType !== null && props.requestedType === '3' && (
                <div className="testimonial-block theme-3">
                  <div className="testimonial-wrapper">
                    <Swiper {...galleryParams}>
                      {users.map((user, index) => {
                        return (
                          <div className="testimonial-block__single">
                            <div className="testimonial-block__inner">
                              {/* <div className="testimonial-block__review">
                                <p>
                                  It is a long established fact that a reader will page when looking at its was layout.
                                  The point of be distracted by the readable will page when looking at its was layout
                                  will page when looking.
                                </p>
                              </div> */}
                              {/* <div className="testimonial-block__author">
                                <div className="author-info">
                                  <h2 className="author-name">{user.name}</h2>
                                  <p className="author-designation">{user.designation}</p>
                                </div>
                              </div> */}
                            </div>
                          </div>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
              )}
              {props.requestedType !== undefined && props.requestedType !== null && props.requestedType === '4' && (
                <div className="testimonial-block theme-4">
                  <h2 className="testimonial-title">Testimonial 4</h2>
                  <Swiper {...paramsThree}>
                    {users.map((user, index) => {
                      return (
                        <div className="testimonial-block__single">
                          <div className="testimonial-block__inner">
                            <div className="testimonial-block__author">
                              <img src={require(`../../${user.img}`)} alt="" />
                            </div>
                            <div className="testimonial-block__review">
                              <p>
                                It is a long established fact that a reader will page when looking at its was layout.
                                The point of be distracted by the readable will page when looking at its was layout will
                                page when looking.
                              </p>
                            </div>
                            <div className="author-info">
                              <h2 className="client-name">{user.name}</h2>
                              <p className="client-designation">{user.designation}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Swiper>
                </div>
              )}
            </Cards>
          </TestimonialStyleWrapper>
        </Col>
      </Row>
    </>
  );
};

export default Testimonials;
