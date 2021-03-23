import { SvgIcon } from '@material-ui/core';
import React from 'react';

const Ellipse: React.FC = () => (
    <SvgIcon
        viewBox="0 0 44 44"
        htmlColor="white"
        style={{
            margin: 10,
            height: 32,
            width: 32
        }}>
        <path d="M44 22C44 28.0751 41.5376 33.5751 37.5563 37.5563C33.5751 41.5376 28.0751 44 22 44C15.9249 44 10.4249 41.5376 6.44365 37.5563C2.46243 33.5751 0 28.0751 0 22C0 15.9249 2.46243 10.4249 6.44365 6.44365C10.4249 2.46243 15.9249 0 22 0C28.0751 0 33.5751 2.46243 37.5563 6.44365C41.5376 10.4249 44 15.9249 44 22Z" fill="#E5E5E5" />
        <path d="M21.2929 22L6.44774 36.8452C2.76239 32.9854 0.5 27.7574 0.5 22C0.5 16.2426 2.76239 11.0146 6.44774 7.15484L21.2929 22ZM37.5523 36.8452L22.7071 22L37.5523 7.15484C41.2376 11.0146 43.5 16.2426 43.5 22C43.5 27.7574 41.2376 32.9854 37.5523 36.8452ZM36.8452 6.44774L22 21.2929L7.15484 6.44774C11.0146 2.76239 16.2426 0.5 22 0.5C27.7574 0.5 32.9854 2.76239 36.8452 6.44774ZM22 22.7071L36.8452 37.5523C32.9854 41.2376 27.7574 43.5 22 43.5C16.2426 43.5 11.0146 41.2376 7.15484 37.5523L22 22.7071Z" stroke="black" strokeOpacity="0.3" />
    </SvgIcon>
)

export default Ellipse;