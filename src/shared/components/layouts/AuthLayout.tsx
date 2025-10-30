import {Outlet} from "react-router-dom";
import {Navbar} from "../ui/Navbar.tsx";


export default function AuthLayout(){
    return(
        <div className="main-layout">
            <header>
                <Navbar/>
            </header>

            <main>

                <Outlet></Outlet>
            </main>

        </div>
    )
}