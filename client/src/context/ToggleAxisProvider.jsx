import { ToggleAxisContext } from './ToggleAxisContext';

export const ToggleAxisProvider = ({ children }) => {

    return (
        <ToggleAxisContext.Provider>
            {children}
        </ToggleAxisContext.Provider>
    )
}
