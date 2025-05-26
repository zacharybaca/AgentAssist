import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./AuthProvider.jsx";
import { ArticlesProvider } from "./ArticlesProvider.jsx";
import { MenuToggleContextProvider } from "./MenuToggleContextProvider.jsx";
import { SignUpProvider } from "./SignUpProvider.jsx";
import { CategoryProvider } from "./CategoryProvider.jsx";
import { ToggleAxisProvider } from "./ToggleAxisProvider.jsx";
import { AlertProvider } from "./AlertProvider.jsx";

export const AppProviders = ({ children }) => {
  return (
    <Router>
      <AlertProvider>
        <ToggleAxisProvider>
          <MenuToggleContextProvider>
            <CategoryProvider>
              <SignUpProvider>
                <AuthProvider>
                  <ArticlesProvider>{children}</ArticlesProvider>
                </AuthProvider>
              </SignUpProvider>
            </CategoryProvider>
          </MenuToggleContextProvider>
        </ToggleAxisProvider>
      </AlertProvider>
    </Router>
  );
};
