import { useContext } from 'react';
import { ToggleAxisContext } from '../context/MenuToggleContext';

export const useToggleAxis = () => useContext(ToggleAxisContext);
