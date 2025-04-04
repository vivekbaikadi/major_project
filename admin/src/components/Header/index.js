import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import Button from '@mui/material/Button';
import { RiMenuUnfold4Line2 } from "react-icons/ri";
import { RiMenuFill } from "react-icons/ri";
import SearchBox from "../SearchBox";
import { HiMiniUserCircle } from "react-icons/hi2";


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { MdAccountCircle } from "react-icons/md";
import { LuShieldAlert } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { MyContext } from '../../App';




const Header = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const context = useContext(MyContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <header className="d-flex align-items-center">
                <div className="container-fluid w-100">
                    <div className="d-flex align-items-center">
                        <div className="col-sm-2 part1">
                            <Link to={'/'} className="logo"><img src={logo} /></Link>
                        </div>


                        <div className="col-sm-3 part2 d-flex align-items-center ">
                            <Button className="rounded-circle " onClick={() => context.setisToggleSidebar(!context.isToggleSidebar)}>
                                {
                                    context.isToggleSidebar === false ? <RiMenuUnfold4Line2 /> : <RiMenuFill />
                                }
                            </Button>
                            <SearchBox />
                        </div>
                        <div className=" col-sm-7 d-flex align-items-center justify-content-end" style={{marginRight:'60px'}}>
                            {
                                context.isLogin !== true ? <Button className='btn-blue'>sign in</Button> :

                                    <div className='accountWrapper'>
                                        <Button className="myAcc d-flex align-items-center" onClick={handleClick} >

                                            <HiMiniUserCircle />

                                            <div className="userInfo">
                                                <h4>Vivek Goud</h4>
                                                <p className="mb-0">@vivek12</p>
                                            </div>

                                        </Button>
                                        <Menu
                                            anchorEl={anchorEl}
                                            id="account-menu"
                                            open={open}
                                            onClose={handleClose}
                                            onClick={handleClose}
                                            slotProps={{
                                                paper: {
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
                                                        '&::before': {
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
                                                },
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <MdAccountCircle />
                                                </ListItemIcon>
                                                My Account
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <LuShieldAlert />
                                                </ListItemIcon>
                                                Reset Password
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <IoIosLogOut />
                                                </ListItemIcon>
                                                Logout
                                            </MenuItem>
                                        </Menu>
                                    </div>
                            }
                        </div>




                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;