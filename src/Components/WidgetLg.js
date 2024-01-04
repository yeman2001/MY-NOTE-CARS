
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function WidgetLg() {
    const Button = ({ type }) => {
        return <button className={`widgetLgButton ${type}`}>{type}</button>;
    };

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axios.get("orders");
                setOrders(res.data);
            } catch {
                console.log("Error");
            }
        };
        getOrders();
    }, []);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const userInfo = await axios.get(`user/find/${orders._id}`);
                // navigate to user profile page
                navigate(`/users/${userInfo.data.id}`);
            } catch (error) {
                console.log(error);
            }
        };
        getUserInfo();
    }, [orders, navigate]);

    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest transactions</h3>
            <table className="widgetLgTable">
                <tbody>
                    <tr className="widgetLgTr">
                        <th className="widgetLgTh">Customer</th>
                        <th className="widgetLgTh">Date</th>
                        <th className="widgetLgTh">Amount</th>
                        <th className="widgetLgTh">Status</th>
                    </tr>
                    {orders.map((order) => (
                        <tr className="widgetLgTr" key={order._id}>
                            <td className="widgetLgUser">
                                <img
                                    src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                    alt=""
                                    className="widgetLgImg"
                                />
                                <span className="widgetLgName">Username</span>
                            </td>
                            <td className="widgetLgDate">{order.createdAt}</td>
                            <td className="widgetLgAmount">${order.amount}</td>
                            <td className="widgetLgStatus">
                                <Button type={order.status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
