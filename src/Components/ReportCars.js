import React, { useState, useEffect } from 'react'
import '../App'

import { Link } from 'react-router-dom';
import axios from 'axios'
import { Button } from 'react-bootstrap'



function ReportCars() {//props
    const [datacars, setDataCars] = useState([]);

    async function fetchData() {
        try {
            const response = await axios.get(
                `https://soukphasone.onrender.com/report/?status=ONLINE`
            );
            setDataCars(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchData();
    },);

    return (
        <>
            <div className="card-report " style={{ boxShadow: "10px 10px" }}>
                <h3>ລົດໃນຄອກຂະນະນີ້:</h3>
                <hr></hr>
                <div>
                    <div style={{ display: "flex" }} className='report-title'><span>ລົດຈັກ :</span><p>{datacars.totalBike}</p></div>
                    <div style={{ display: "flex" }} className='report-title'><span>ລົດຖີບ :</span><p>{datacars.totalCycle}</p></div>
                    <div style={{ display: "flex" }} className='report-title'><span>ລົດໃຫຍ່ :</span><p>{datacars.totalCars}</p></div>
                </div>
                <Link as={Link} to="/Checkout">
                    <Button style={{ marginTop: "0rem", color: "white", width: "100%", background: "#0B666A", border: "none", }} className='btn hover '> ເບິ່ງລາຍລະອຽດ</Button>
                </Link>
            </div>
        </>
    )
}

export default ReportCars

// import React, { useState, useEffect } from 'react'
// import '../App'

// import { Link } from 'react-router-dom';
// import axios from 'axios'
// import { Button } from 'react-bootstrap'



// function ReportCars() {//props
//     const userId = localStorage.getItem('user_id').replace(/^"(.*)"$/, '$1');
//     const [datacars, setDataCars] = useState([]);

//     async function fetchData() {
//         try {
//             const response = await axios.get(
//                 `https://soukphasone.onrender.com/report/?status=ONLINE&userId=${userId}`
//             );
//             setDataCars(response.data);
//             // console.log(response.data);
//         } catch (error) {
//             console.error(error);
//         }
//     }
//     useEffect(() => {
//         fetchData();
//     },);

//     return (
//         <>
//             <div className="card-report " style={{ boxShadow: "10px 10px" }}>
//                 <h3>ລົດໃນຄອກຂະນະນີ້:</h3>
//                 <hr></hr>
//                 <div>
//                     <div style={{ display: "flex" }} className='report-title'><span>ລົດຈັກ :</span><p>{datacars.totalBike}</p></div>
//                     <div style={{ display: "flex" }} className='report-title'><span>ລົດຖີບ :</span><p>{datacars.totalCycle}</p></div>
//                     <div style={{ display: "flex" }} className='report-title'><span>ລົດໃຫຍ່ :</span><p>{datacars.totalCars}</p></div>
//                 </div>
//                 <Link as={Link} to="/Checkout">
//                     <Button style={{ marginTop: "0rem", color: "white", width: "100%", background: "#0B666A", border: "none", }} className='btn hover '> ເບິ່ງລາຍລະອຽດ</Button>
//                 </Link>
//             </div>
//         </>
//     )
// }

// export default ReportCars