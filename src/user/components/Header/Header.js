import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './headerMega.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../redux/slice/category.slice';
import { getSubcategory } from '../../redux/slice/Subcategory.slice'
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import CartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from '@mui/system';
import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, IconButton, Avatar, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Logout, Settings } from '@mui/icons-material';
import { logoutRequest } from '../../redux/action/auth.action';
import Button from '../../UI/button/Button';


function Header(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openLogoutModal, setOpenLogoutModal] = React.useState(false);

    const category = useSelector((state => state.category));
    const subcategory = useSelector((state => state.subcategory));
    const checklogin = useSelector((state => state.auth.user));

    const cartState = useSelector(state => state.cart);
    let addedCartData = 0;
    if (cartState.items) {
        addedCartData = cartState.items.reduce((acc, val) => acc + val.quantity, 0);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const open = Boolean(anchorEl);
    const profileOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const profileClose = () => {
        setAnchorEl(null);
    };

    const openLogoutAlert = () => {
        setOpenLogoutModal(true);
    };

    const closeLogoutAlert = () => {
        setOpenLogoutModal(false);
    };

    const handleLogout = () => {
        dispatch(logoutRequest())
        navigate('/');
    };

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
        <div>
            <header className="header">
                <div className="container1">
                    <div className="row v-center">
                        <div className="header-item item-left">
                            <div className="logo">
                                <NavLink to={"/"}><img src="../assets/img/italian.jpg" alt="" /></NavLink>
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

                        <div className='header-item item-right'>
                            {checklogin ?
                                <>
                                    <Link to='/cart' style={{ marginRight: '-2px' }}>
                                        <Badge className='ms-3' badgeContent={addedCartData} color="success">
                                            <CartIcon sx={{ color: '#2c4964', fontSize: '20px' }} />
                                        </Badge>
                                    </Link>
                                    <Link to='/wishlist' style={{ paddingRight: '0px' }} >
                                        <Badge className='ms-3' badgeContent={1} color="success">
                                            <FavoriteIcon sx={{ color: '#2c4964', fontSize: '20px' }} />
                                        </Badge>
                                    </Link>
                                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                        <IconButton
                                            onClick={profileOpen}
                                            size="small"
                                            sx={{ ml: 2 }}
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                        >
                                            <Avatar sx={{ width: 35, height: 35 }}><img className='w-100' src='https://firebasestorage.googleapis.com/v0/b/italian-stitch-b0a04.appspot.com/o/user_profile%2F121792221.png?alt=media&token=c4fb3819-cfcd-49f7-b002-18111a10ddc6' /></Avatar>
                                        </IconButton>
                                    </Box>
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={profileClose}
                                        onClick={profileClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} >
                                        <MenuItem onClick={profileClose}>
                                            <Avatar sx={{ width: 35, height: 35 }}><img className='w-100' src='https://firebasestorage.googleapis.com/v0/b/italian-stitch-b0a04.appspot.com/o/user_profile%2F121792221.png?alt=media&token=c4fb3819-cfcd-49f7-b002-18111a10ddc6' /></Avatar>
                                            Profile
                                        </MenuItem>
                                        <MenuItem onClick={profileClose}>
                                            <Avatar sx={{ width: 35, height: 35 }}><img className='w-100' src='https://firebasestorage.googleapis.com/v0/b/italian-stitch-b0a04.appspot.com/o/user_profile%2F121792221.png?alt=media&token=c4fb3819-cfcd-49f7-b002-18111a10ddc6' /></Avatar>
                                            My Account
                                        </MenuItem>
                                        <Divider />
                                        <MenuItem onClick={profileClose}>
                                            <ListItemIcon>
                                                <Settings fontSize="small" />
                                            </ListItemIcon>
                                            Settings
                                        </MenuItem>
                                        <MenuItem onClick={() => { profileClose(); openLogoutAlert(); handleLogout() }}>
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                                :
                                <NavLink to={'/authentication'}> <AccountCircleIcon />My Account </NavLink>
                            }
                            <div className="mobile-menu-trigger" onClick={toggleMenu}>
                                <span />
                            </div>
                        </div>
                        {/* <div className="header-item item-right">
                       
                        <NavLink to={'/cart'}>
                            <ShoppingCartIcon />
                        </NavLink>
                        <NavLink to={'/favourite'}>
                            <FavoriteIcon />
                        </NavLink>
                        <NavLink to={'/authentication'}>
                            <AccountCircleIcon />
                        </NavLink>
                        
                    </div> */}
                    </div>
                </div>
            </header>
            {/* <Dialog
                open={openLogoutModal}
                onClose={() => closeLogoutAlert()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle variant='h4' className="text-center pt-5 px-5 pb-2" id="alert-dialog-title" sx={{ fontWeight: '700' }}>Are you sure?</DialogTitle>
                <DialogContent className="pt-0 px-5 pb-5">
                    <DialogContentText id="alert-dialog-description" className='text-center'>Hello, are you sure you want to logout your account? Remember that once your account is logged out you will not be able to access some pages.</DialogContentText>
                </DialogContent>
                <DialogActions className="justify-content-center pt-0 py-5 pb-5">
                    <Button onClick={() => closeLogoutAlert()}>Close</Button>
                    <Button onClick={() => { handleLogout(); closeLogoutAlert() }} classes={'ms-4'}>Logout</Button>
                </DialogActions>
            </Dialog> */}
        </div>
    );
}

export default Header;
