import {Navbar} from "../ui/Navbar.tsx";
import {Outlet} from "react-router-dom";

export default function MainLayout(){
    return(
        <div className="main-layout">
            <header>
                <Navbar/>
            </header>

            <main>
                <Outlet></Outlet>
            </main>

            <footer>
                <p>Main Layout</p>
            </footer>
        </div>
    )
};