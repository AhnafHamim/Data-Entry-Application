import React from 'react';
import Button from '@mui/material/Button';

const button = ({text, onClick}) => {
    return (
        <Button onClick={onClick} variant="contained">{text}</Button>
    );
}

export default button;