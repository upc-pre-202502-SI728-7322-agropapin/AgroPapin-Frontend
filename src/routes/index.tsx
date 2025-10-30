import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {authRoutes} from "./authRoutes.tsx";
import {dashboardRoutes} from "./dashboardRoutes.tsx";

const router=createBrowserRouter([
    ...authRoutes,
    ...dashboardRoutes
    ]
);

export function AppRouter(){
    return <RouterProvider router={router}/>
}