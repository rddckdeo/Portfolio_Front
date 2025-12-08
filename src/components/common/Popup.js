// eslint-disable-next-line
import React, { useState } from 'react'

const Popup = ({open, onClose, children}) => {
    if(!open) return null;
    return (
        <div>
            {open && (
                <div className='overlay' onClick={onClose}>
                    <div className='popup' onClick={(e) => e.stopPropagation()}>
                        <div className='popupHeader'>
                            <p className='popupTitle'>TITLE</p>
                            <div className='popupClose' onClick={onClose}>X</div>
                        </div>
                        <div className="popupContent">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Popup