import React, { useState, useEffect } from 'react'
import '../App'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'




function ReportMoney({ children }) {
    const [data, setData] = useState([]);

    // useEffect(() => {
    //     fetchData();
    // }, []);

    async function fetchData() {
        try {
            const response = await axios.get(
                `https://soukphasone.onrender.com/orders`
            );
            setData(response.data);
            // console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchData();
    },);

    // const filterDataByDate = () => {
    //     const currentDate = new Date().toISOString().split("T")[0];
    //     return data.filter((item) => item.createdAt.startsWith(currentDate));
    // };

    // const filteredData = filterDataByDate();
    const userId = localStorage.getItem('user_id').replace(/^"(.*)"$/, '$1');
    const CashtotalToday = () => {   
    const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in the format 'YYYY-MM-DD'
    return data
        .filter(
            (item) =>
                item.createdAt.startsWith(currentDate) &&
                item.money === "cash" &&
                item.userId === userId
        )
        .reduce((total, item) => (total += item.amount), 0);
};

    const TranfertotalToday = () => {
        const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in the format 'YYYY-MM-DD'
        return data
        .filter(
            (item) =>
                item.createdAt.startsWith(currentDate) &&
                item.money === "transfer" &&
                item.userId === userId
        )
            .reduce((total, item) => (total += item.amount), 0);
    };
    return (

        <div className="card-report" style={{ boxShadow: "10px 10px" }}>
            <h3>ລວມຍອດມື້ນີ້ :</h3>
            <hr></hr>

            <div style={{ display: "flex" }}><p>ລວມຍອດ :</p><span>{TranfertotalToday() + CashtotalToday()}</span></div>
            <div style={{ display: "flex" }}><p>ເງິນໂອນ :</p><span>{TranfertotalToday()}</span></div>
            <div style={{ display: "flex" }}><p>ເງີນສົດ :</p><span> {CashtotalToday()}</span></div>
            <Link as={Link} to="/moneyhistory">
                <Button style={{ marginTop: "0rem", color: "white", width: "100%", background: "#0B666A", border: "none" }} className='btn '> ເບິ່ງລາຍລະອຽດ</Button>
            </Link>
        </div>


    )
}

export default ReportMoney