import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './AuthProvider.jsx';
import { ArticlesProvider } from './ArticlesProvider.jsx';
import { MenuToggleContextProvider } from './MenuToggleContextProvider.jsx';
import { SignUpProvider } from './SignUpProvider.jsx';
import { AgentProvider } from './AgentProvider.jsx';

export const AppProviders = ({ children }) => {
    return (
        <Router>
            <MenuToggleContextProvider>
                <AgentProvider>
                    <SignUpProvider>
                        <AuthProvider>
                            <ArticlesProvider>
                                {children}
                            </ArticlesProvider>
                        </AuthProvider>
                    </SignUpProvider>
                </AgentProvider>
            </MenuToggleContextProvider>
        </Router>
    )
}
