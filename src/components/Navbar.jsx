import { useState, useContext } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from '../assets/images/logo.png'

import { AppContext } from "../context"

const NavbarItem = ({title, classprops}) => (
    <li className={`mx-4 cursor-pointer hover:scale-125 transition ${classprops}`}>{title}</li>
)

const Navbar = () => {

    const {navItems} = useContext(AppContext)

    const [isShowNavMenu, useIsShowNavMenu] = useState(false)

    return (
        <nav className="flex bg-transparent w-full md:justify-center justify-between items-center p-5">
            <div className='md:flex-[0.6] flex-initial justify-center items-center  animate-bounce'>
                <img src={logo} alt="logo"  className='w-32 cursor-pointer'/>
            </div>
            <ul className='md:flex hidden text-white flex-row justify-between items-center flex-initial'>
                {
                    navItems.map((item, index)=>(<NavbarItem key={item + index} title={item.title}/>))
                }
                <li className='gradient-bg-btn py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>EXPLORE</li>
            </ul>
            <div className="md:hidden">
                {!isShowNavMenu && (
                    <HiMenuAlt4 fontSize={30} className="tex-white cursor-pointer" onClick={()=>useIsShowNavMenu(true)}/>
                )}
                <ul className={`z-10 fixed -top-0 -right-7 p-3 ${isShowNavMenu ? 'w-[60vw]' : 'w-0'} h-screen shadow-2xl md:hidden list-none 
                flex flex-col justify-start items-end rounded-md text-white blurry-bg-tsp truncate`}>
                    <li className="text-xl w-full my-2">
                        <AiOutlineClose fontSize={20} className="cursor-pointer" onClick={()=>useIsShowNavMenu(false)} />
                    </li>
                    {navItems.map(
                        (item, index) => <NavbarItem key={item + index} title={item.title} classprops="my-2 text-lg px-3" />
                    )}
                    <NavbarItem title={"EXPLORE"} classprops="my-2 text-lg text-white px-3 gradient-text hover:text-cyan-400"/>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
