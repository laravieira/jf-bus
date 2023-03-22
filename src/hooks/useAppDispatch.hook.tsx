import { AppDispach } from '../store';
import { useDispatch } from 'react-redux';

type DispatchFunc = () => AppDispach;
const useAppDispatch: DispatchFunc = useDispatch;

export default useAppDispatch;