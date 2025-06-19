import Drawer from "./drawer";
import Logo from "../../header_logo";
import ProfileButton from "../button/profile_button";



export default function Header(){

    return(
        <nav className=" flex flex-row justify-between p-2 mb-5 " >
            <Drawer/>
            <Logo />
            <ProfileButton />
        </nav>
    );
}