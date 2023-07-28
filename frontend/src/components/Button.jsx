import React from 'react';
import Button from '@mui/material/Button';

const button = ({text}) => {
    return (
        <Button variant="contained">{text}</Button>
    );
}

export default button;