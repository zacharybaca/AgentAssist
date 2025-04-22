import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './AuthProvider.jsx';
import { ArticlesProvider } from './ArticlesProvider.jsx';
import { MenuToggleContextProvider } from './MenuToggleContextProvider.jsx';
import { SignUpProvider } from './SignUpProvider.jsx';

export const AppProviders = ({ children }) => {
    return (
        <Router>
            <MenuToggleContextProvider>
                <SignUpProvider>
                    <AuthProvider>
                        <ArticlesProvider>
                            {children}
                        </ArticlesProvider>
                    </AuthProvider>
                </SignUpProvider>
            </MenuToggleContextProvider>
        </Router>
    )
}
