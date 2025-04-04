import Button from '@mui/material/Button';
import { FaAngleRight } from "react-icons/fa6";
import { MdInterests } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { MyContext } from '../../App';



const Sidebar = () => {

    const [activeTab, setactiveTab] = useState(0);
    const [isToggleSubmenu, setisToggleSubmenu] = useState(false);

    const context = useContext(MyContext);
    const isOpenSubmenu = (index) => {
        setactiveTab(index);
        setisToggleSubmenu(!isToggleSubmenu);
    }
    return (
        <>
            <div className="sidebar">
                <ul>
                    
                    <li>

                        <Button className={`w-100 ${activeTab === 1 ? 'active' : ''}`} onClick={() => isOpenSubmenu(1)}>
                            <span className='icon'><FaUser /></span>
                            User
                            <span className='arrow'><FaAngleRight /></span>
                        </Button>
                        <div className={` submenuWrapper ${activeTab === 1 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li><Link to="/user"><Button >User List</Button></Link></li>
                            </ul>
                        </div>

                    </li>
                    <li>

                        <Button className={`w-100 ${activeTab === 2 ? 'active' : ''}`} onClick={() => isOpenSubmenu(2)}>
                            <span className='icon'><MdInterests /></span>
                            Products
                            <span className='arrow'><FaAngleRight /></span>
                        </Button>
                        <div className={` submenuWrapper ${activeTab === 2 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li><Link to="/products"><Button >Product List</Button></Link></li>
                                <li><Link to="/product/upload"><Button>Product Upload</Button></Link></li>
                            </ul>
                        </div>

                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar;