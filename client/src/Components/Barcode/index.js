// import React from 'react';
// import Button from '@mui/material/Button';

// const Barcode = () => {

//     const handleScanStart = () => {
//         // Add your scanning logic here
//         console.log('Scanning started');
//     };

//     return (
//         <div className="scanner">
//             <Button >
//                 Start Scanning
//             </Button>
//         </div>
//     );
// }

// export default Barcode;



import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Barcode = () => {
    const navigate = useNavigate();

    const handleScanStart = () => {
        // Add your scanning logic here
        console.log('Scanning started');
        
        // Navigate to the ProductDetails page
        navigate('/scan'); // Navigate to the ProductDetails page
    };

    return (
        <div className="scanner">
            <Button onClick={handleScanStart} variant="contained" color="primary">
                Start Scanning
            </Button>
        </div>
    );
}

export default Barcode;
