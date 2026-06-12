import { useSelector,useDispatch } from 'react-redux';
import { changeName } from '../features/authSlice';

function About(){
    const user = useSelector((state)=>state.auth.user);
    const dispatch = useDispatch();
    return(
        <>
            <h1>This is about page</h1>
            <h1>{user?.name}</h1>
            <input type="text" placeholder='type name' value={user?.name || ""} onChange={(e)=>dispatch(changeName(e.target.value))}/>
            <button onClick={()=>dispatch(changeName("Lenin"))}>Click</button>
        </>
    )
}
export default About;