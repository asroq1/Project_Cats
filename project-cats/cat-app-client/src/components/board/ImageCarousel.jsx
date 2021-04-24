import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';

import Slider from 'react-slick';

import styled, { createGlobalStyle } from 'styled-components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const SlickWrapper = styled.div`

    margin-top: 1rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    height: calc(100% - 44px);
    background: lightgray;

    border-radius: 10px;
`;

export const ImgWrapper = styled.div`
    // padding: 2rem;
    text-align: center;

    & img {
        margin: 0 auto;
        max-height: 200px;
    }
`;

export const Indicator = styled.div`
    text-align: center;

    & > div {
        width: 75px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        background: #313131;
        display: inline-block;
        text-align: center;
        color: white;
        font-size: 15px;
    }
`;

export const Global = createGlobalStyle`
    .slick-slide {
        display: inline-block;
    }
`;

const ImageCarousel = ({ images }) => {

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
                        {images.map((v) => (
                            <ImgWrapper key={v.src}>
                                <img src={v.src} alt={v.src} />
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
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageCarousel;
