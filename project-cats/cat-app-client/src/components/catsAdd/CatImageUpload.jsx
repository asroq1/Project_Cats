import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './canvasUtils';





import useInput from '../../hooks/useInput'

const CatImageUpload = ({}) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useInput(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels
            );
            console.log('donee', { croppedImage });
            setCroppedImage(croppedImage);
        } catch (e) {
            console.error(e);
        }
    }, [imageSrc, croppedAreaPixels]);

    const onClose = useCallback(() => {
        setCroppedImage(null);
    }, []);

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            let imageDataUrl = await readFile(file);

            setImageSrc(imageDataUrl);
        }
    };

    return (
        <>
            <div>
                <div style={{ height: '50vh', position:'relative' }}>
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1 / 1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>
                <div className="control">
                    <div className="sliderContainer">
                        <input
                            type="range"
                            name="zoom"
                            value={zoom}
                            min="1"
                            max="3"
                            step="0.1"
                            aria-labelledby="Zoom"
                            onChange={setZoom}
                        />
                    </div>
                </div>
                <input type="file" onChange={onFileChange} accept="image/*" />
            </div>
        </>
    );
};

function readFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result), false);
        reader.readAsDataURL(file);
    });
}

export default CatImageUpload;
