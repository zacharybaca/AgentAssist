import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './AuthProvider.jsx';
import { ArticlesProvider } from './ArticlesProvider.jsx';
import { MenuToggleContextProvider } from './MenuToggleContextProvider.jsx';

export const AppProviders = ({ children }) => {
    return (
        <Router>
            <MenuToggleContextProvider>
                <AuthProvider>
                    <ArticlesProvider>
                        {children}
                    </ArticlesProvider>
                </AuthProvider>
            </MenuToggleContextProvider>
        </Router>
    )
}
