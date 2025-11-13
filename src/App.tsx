
import './App.css'
import {AppRouter} from "./routes";
import { AuthProvider } from './features/auth';

function App() {
    return (
        <AuthProvider>
            <AppRouter/>
        </AuthProvider>
    )
}

export default App
