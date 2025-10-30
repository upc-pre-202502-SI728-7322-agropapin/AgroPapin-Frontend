
import './App.css'
import {AppRouter} from "./routes";
import { AuthProvider } from './features/auth';
import { OnboardingProvider } from './features/auth';

function App() {
    return (
        <AuthProvider>
            <OnboardingProvider>
                <AppRouter/>
            </OnboardingProvider>
        </AuthProvider>
    )
}

export default App
