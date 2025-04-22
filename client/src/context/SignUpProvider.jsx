import { SignUpContext } from './SignUpContext';

export const SignUpProvider = ({ children }) => {

    return (
        <SignUpContext.Provider>
            {children}
        </SignUpContext.Provider>
    );
};
