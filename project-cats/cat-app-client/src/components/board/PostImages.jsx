import React,{setShowImagesZoom,useCallback,useState} from 'react';
import PropTypes from 'prop-types';

import ImageCarousel from './ImageCarousel'

const PostImages = ({images}) => {
    return (
        <>
            {showImagesZoom && <ImageCarousel images = {images} onClose = {onClose} />}
        </>
        )
}

PostImages.propTypes = {
    images: PropTypes.arrayOf (PropTypes.object)
}
export default PostImages;