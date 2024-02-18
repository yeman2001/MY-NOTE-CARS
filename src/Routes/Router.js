import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../Pages/LoginPage'
import Body from '../Pages/Body'
import Checkout from '../Pages/Checkout'
import CarHistory from '../Pages/CarHistory'
import BalanceHistoryForm from '../Pages/BanlanceHistory'
import Contect from '../Pages/Contect'



function Router() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    // handle login
    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    return (
        <div>
            {/* <Navbarr /> */}
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage onLogin={handleLogin} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/" element={isLoggedIn ? <Body /> : <Navigate to="/login" />} />
                    <Route path="/Checkout" element={isLoggedIn ? <Checkout /> : <Navigate to="/" />} />
                    <Route path="/Carhistory" element={isLoggedIn ? <CarHistory /> : <Navigate to="/" />} />
                    <Route path="/moneyhistory" element={isLoggedIn ? <BalanceHistoryForm /> : <Navigate to="/" />} />
                    {/* <Route path="/Contect" element={isLoggedIn ? <Contect /> : <Navigate to="/" />} /> */}
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router