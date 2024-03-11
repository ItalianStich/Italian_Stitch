import React, { useEffect } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from "../../../user/redux/slice/category.slice";
import { getSubcategory } from "../../../user/redux/slice/Subcategory.slice";
import {getProduct} from '../../../user/redux/slice/Product.slice';

function Dashboard(props) {
    const dispatch = useDispatch();

    const category = useSelector((state => state.category.category));
    const subcategory = useSelector((state => state.subcategory.subcategory));
    const product = useSelector((state => state.product.product));

    useEffect(() => {
        dispatch(getCategory());
        dispatch(getSubcategory());
        dispatch(getProduct());
    }, [])

    return (
        <div className="dash-content">
            <div className="overview">
                <div className="title">
                    <DashboardIcon style={{ marginRight: '7px' }} />
                    <span className="text">Dashboard</span>
                </div>
                <div className="boxes">
                    <div className="box box1">
                        <i className="uil uil-thumbs-up" />
                        <span className="text">Total Category</span>
                        <span className="number">{category.length}</span>
                    </div>
                    <div className="box box2">
                        <i className="uil uil-comments" />
                        <span className="text">Total Subcategory</span>
                        <span className="number">{subcategory.length}</span>
                    </div>
                    <div className="box box3">
                        <i className="uil uil-share" />
                        <span className="text">Total Product</span>
                        <span className="number">{product.length}</span>
                    </div>
                </div>
            </div>
            {/* <div className="activity">
                <div className="title">
                    <span class="text">Recent Activity</span>
                </div>
                <div className="activity-data">
                    <div className="data names">
                        <span class="data-title">Name</span>
                        <span class="data-list">Prem Shahi</span>
                        <span class="data-list">Deepa Chand</span>
                        <span class="data-list">Manisha Chand</span>
                        <span class="data-list">Pratima Shahi</span>
                        <span class="data-list">Man Shahi</span>
                        <span class="data-list">Ganesh Chand</span>
                        <span class="data-list">Bikash Chand</span>
                    </div>
                    <div className="data email">
                        <span class="data-title">Email</span>
                        <span class="data-list">premshahi@gmail.com</span>
                        <span class="data-list">deepachand@gmail.com</span>
                        <span class="data-list">prakashhai@gmail.com</span>
                        <span class="data-list">manishachand@gmail.com</span>
                        <span class="data-list">pratimashhai@gmail.com</span>
                        <span class="data-list">manshahi@gmail.com</span>
                        <span class="data-list">ganeshchand@gmail.com</span>
                    </div>
                    <div className="data joined">
                        <span class="data-title">Joined</span>
                        <span class="data-list">2022-02-12</span>
                        <span class="data-list">2022-02-12</span>
                        <span class="data-list">2022-02-13</span>
                        <span class="data-list">2022-02-13</span>
                        <span class="data-list">2022-02-14</span>
                        <span class="data-list">2022-02-14</span>
                        <span class="data-list">2022-02-15</span>
                    </div>
                    <div className="data type">
                        <span class="data-title">Type</span>
                        <span class="data-list">New</span>
                        <span class="data-list">Member</span>
                        <span class="data-list">Member</span>
                        <span class="data-list">New</span>
                        <span class="data-list">Member</span>
                        <span class="data-list">New</span>
                        <span class="data-list">Member</span>
                    </div>
                    <div className="data status">
                        <span class="data-title">Status</span>
                        <span class="data-list">Liked</span>
                        <span class="data-list">Liked</span>
                        <span class="data-list">Liked</span>
                        <span class="data-list">Liked</span>
                        <span class="data-list">Liked</span>
                        <span class="data-list">Liked</span>
                        <span class="data-list">Liked</span>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default Dashboard;