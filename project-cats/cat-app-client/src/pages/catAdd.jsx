import React, { useMemo } from 'react';

import palette from '../styles/palette';
import CatsAddContainer from '../components/catsAdd/CatsAddContainer';

const CatAdd = () => {
    const bgColor = useMemo(() => ({ backgroundColor: palette.beige }), []);

    return (
        <>
            <div style={bgColor}>
                <CatsAddContainer />
            </div>
        </>
    );
};

export default CatAdd;
