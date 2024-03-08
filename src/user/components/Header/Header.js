import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './headerMega.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../redux/slice/category.slice';
import { getSubcategory } from '../../redux/slice/Subcategory.slice'
import { Link } from 'react-router-dom';

function Header(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const dispatch = useDispatch();

    const category = useSelector((state => state.category));
    const subcategory = useSelector((state => state.subcategory));

    useEffect(() => {
        dispatch(getCategory())
        dispatch(getSubcategory())
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isMenuOpen) {
                toggleMenu();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const showSubMenu = (e) => {
        const parentListItem = e.target.closest('.menu-item-has-children');
        if (parentListItem) {
            const subMenu = parentListItem.querySelector('.sub-menu');
            subMenu.classList.add('active');
            subMenu.style.animation = 'slideLeft 0.5s ease forwards';
            const menuTitle = parentListItem.querySelector('a').textContent;
            document.querySelector('.current-menu-title').innerHTML = menuTitle;
            document.querySelector('.mobile-menu-head').classList.add('active');
        }
    };

    const hideSubMenu = () => {
        const subMenu = document.querySelector('.sub-menu.active');
        if (subMenu) {
            subMenu.style.animation = 'slideRight 0.5s ease forwards';
            setTimeout(() => {
                subMenu.classList.remove('active');
            }, 300);
            document.querySelector('.current-menu-title').innerHTML = '';
            document.querySelector('.mobile-menu-head').classList.remove('active');
        }
    };

    return (
        <header className="header">
            <div className="container1">
                <div className="row v-center">
                    <div className="header-item item-left">
                        <div className="logo">

                        </div>
                    </div>
                    <div className="header-item item-center">
                        <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} />
                        <nav className={`menu ${isMenuOpen ? 'active' : ''}`}>
                            <div className="mobile-menu-head">
                                <div className="go-back" onClick={hideSubMenu}><i className="fa fa-angle-left" /></div>
                                <div className="current-menu-title" />
                                <div className="mobile-menu-close" onClick={toggleMenu}>×</div>

                            </div>

                            <ul className="menu-main" onClick={showSubMenu}>
                                <li>
                                    <NavLink to={'/'}>Home</NavLink>
                                </li>
                                <li className="menu-item-has-children">
                                    <NavLink to={"/shop"}>Shop  <i className="fa fa-angle-down" /></NavLink>
                                    <div className="sub-menu mega-menu mega-menu-column-4">
                                        {
                                            category.category.map((value) => {
                                                return (
                                                    <div className="list-item" key={value.id}>
                                                        <NavLink to={"/product/" + value.category_name + '/' + value.id}><h4 className="title">{value.category_name}</h4></NavLink>
                                                        <ul>
                                                            {
                                                                subcategory.subcategory.map((subCategory) => {
                                                                    if (value.id === subCategory.category_id) {
                                                                        return (
                                                                            <li key={subCategory.id}><Link to={'/shop/' + subCategory.id}>{subCategory.sub_name}</Link></li>
                                                                        )
                                                                    } else {
                                                                        return null
                                                                    }
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </li>
                                <li>
                                    <NavLink to={'/about'}>About</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/contact'}>Contact</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="header-item item-right">
                        <a href="#"><i className="fas fa-search" /></a>
                        <a href="#"><i className="far fa-heart" /></a>
                        <a href="#"><i className="fas fa-shopping-cart" /></a>
                        <div className="mobile-menu-trigger" onClick={toggleMenu}>
                            <span />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
