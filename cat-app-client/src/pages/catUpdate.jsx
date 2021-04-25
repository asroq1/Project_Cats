import React, { useMemo } from 'react';

import palette from '../styles/palette';

import CatsUpdateContainer from '../components/catsUpdate/CatsUpdateContainer';

const CatUpdate = () => {
    const bgColor = useMemo(() => ({backgroundColor: palette.beige}), []);
    
    return (
        <>
        <div style={bgColor}>                
                <CatsUpdateContainer/>
        </div>
        </>
    );
};

export default CatUpdate;