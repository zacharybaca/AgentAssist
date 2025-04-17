import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './AuthProvider.jsx';
import { ArticlesProvider } from './ArticlesProvider.jsx';

export const AppProviders = ({ children }) => {
    return (
        <Router>
            <AuthProvider>
                <ArticlesProvider>
                    {children}
                </ArticlesProvider>
            </AuthProvider>
        </Router>
    )
}
