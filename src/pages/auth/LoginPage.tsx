import {LoginForm} from "../../features/auth/components/LoginForm.tsx";
import {CgProfile} from "react-icons/cg";

export default function LoginPage(){
    return(
        <div className="min-h-screen bg-gray-50">

            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                    <div className="flex items-center flex-col text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign-in</h1>
                        <CgProfile size={50}/>
                    </div>

                    <LoginForm/>
                </div>
            </div>
        </div>
    )
}