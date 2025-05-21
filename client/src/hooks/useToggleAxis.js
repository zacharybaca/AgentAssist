import { useContext } from 'react';
import { ToggleAxisContext } from '../context/ToggleAxisContext';

export const useToggleAxis = () => useContext(ToggleAxisContext);
