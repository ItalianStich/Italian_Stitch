
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../user/components/Header/Header';
import Home from '../user/container/Home';
import Footer from '../user/components/Footer/Footer';
import Shop from '../user/container/Shop/Shop';
import About from '../user/container/About';
import Contact from '../user/container/Contact';
import Cart from '../user/container/Cart';
import Checkout from '../user/container/Checkout';
import Thankyou from '../user/container/Thankyou';
import ShopDetails from '../user/container/Shop/ShopDetails';
import Authentication from '../user/container/Authentication/Authentication';
import Favourite from '../user/Containers/Favourite/Favourite'
import PrivateRoutes from './PrivateRoutes';

function UserRoutes(props) {
    return (
        <>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/shop" element={<Shop />} />
                <Route exact path="/product_details/:id" element={<ShopDetails />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/contact" element={<Contact />} />

                <Route element={<PrivateRoutes />}>
                <Route exact path="/cart" element={<Cart />} />
                <Route path="/favourite" element={<Favourite />} />
                </Route>

                <Route exact path='/checkout' element={<Checkout />} />
                <Route exact path='/thankyou' element={<Thankyou />} />

                <Route exact path='/authentication' element={<Authentication />} />
                
            </Routes>
            <Footer />
        </>
    );
}

export default UserRoutes;