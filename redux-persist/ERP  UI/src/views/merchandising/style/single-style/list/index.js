import '@custom-styles/merchandising/merchandising-core.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import StyleList from './StyleList';


const Styles = () => {
    // ** Global States
    const { styles, total, queryData, selectedSetStyle } = useSelector( ( { styles } ) => styles );
    return (
        <div >
            <StyleList
                styles={styles}
                total={total}
                queryData={queryData}
                selectedSetStyle={selectedSetStyle}
            />
        </div>
    );
};

export default Styles;
