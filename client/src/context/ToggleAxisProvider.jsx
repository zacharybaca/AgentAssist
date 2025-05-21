import { ToggleAxisContext } from './ToggleAxisContext';
import { useState } from 'react';

export const ToggleAxisProvider = ({ children }) => {
    const [axis, setAxis] = useState("");
    return (
        <ToggleAxisContext.Provider
            value={{axis, setAxis}}
        >
            {children}
        </ToggleAxisContext.Provider>
    )
}
