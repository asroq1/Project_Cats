import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import styled from 'styled-components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SlickWrapper = styled.div`
    margin-top: 1rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    height: calc(100% - 44px);
    background: lightgray;

    border-radius: 10px;

    .slider-initialized {
        overflow: hidden;
    }
`;

const ImgWrapper = styled.div`
    text-align: center;
    & img {
        margin: 0 auto;
        max-height: 250px;
        max-width: 250px;
        object-fit: contain;
        overflow: hidden;
    }
`;

// const Indicator = styled.div`
//     text-align: center;
//     & > div {
//         width: 75px;
//         height: 30px;
//         line-height: 30px;
//         border-radius: 15px;
//         background: #313131;
//         display: inline-block;
//         text-align: center;
//         color: white;
//         font-size: 15px;
//     }
// `;

const ImageCarousel = ({ photos }) => {
    return (
        <>
            <SlickWrapper>
                <div>
                    <Slider
                        initialSlide={0}
                        dots={true}
                        speed={500}
                        infinite
                        arrows={false}
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {photos.map((v) => (
                            // <ImgWrapper key={v.src}>
                            //     <img src={v.src} alt={v.src} />
                            // </ImgWrapper>
                            <ImgWrapper key={v.slice(0, 10)}>
                                <img src={v} alt="img" />
                            </ImgWrapper>
                        ))}
                    </Slider>
                    {/* Slick이 저절로 여기 div들을 carousel로 만들어줌 */}
                </div>
            </SlickWrapper>
        </>
    );
};

ImageCarousel.propTypes = {
    photos: PropTypes.arrayOf(String).isRequired,
};

export default ImageCarousel;
