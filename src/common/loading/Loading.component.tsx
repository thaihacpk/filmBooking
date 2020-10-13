import * as React from 'react';
// Sass
import './Loading.component.scss'

const LoadingComponent = () => {
    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="lds-ellipsis" style={{ background: "grey" }}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>


    );
};
export default LoadingComponent;