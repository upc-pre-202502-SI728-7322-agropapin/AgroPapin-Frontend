import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {authRoutes} from "./authRoutes.tsx";

const router=createBrowserRouter([
    ...authRoutes
    ]
);

export function AppRouter(){
    return <RouterProvider router={router}/>
}