import {useEffect, useRef, useState} from "react";
import loginStyles from '../../styles/login.module.css';
import {UserService} from "../../services/user.service";
import Alert from '../../components/alert';
import { constants } from "../../constants";


export const ViewUser = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userUpdated, setUserUpdated] = useState(null);
    const [userDeleted, setUserDeleted] = useState(null);
    
    const [error, setError] = useState(null);
    const [email,setEmail] = useState(null);
    const [userGender, setUserGender] = useState(null);
    const [userRole, setUserRole] =useState(null);

    useEffect(()=>{
      
      setCurrentUser(UserService().getSingletUser(props.email));
      setUserGender(UserService().getSingletUser(props.email).gender);
      setUserRole(UserService().getSingletUser(props.email).role);
      setEmail(props.email);
     
    },[])


    if(!currentUser)
      return null;

    const focusHandler = () => {
      setError(false);
    };
    const chnageHandler = (e) => {
      setUserUpdated(false);
      setEmail(e.target.value);
    };
      
    const getGender = (e) => {
      setUserUpdated(false);
       setUserGender(e.target.value);
    };
    const getRole = (e) => {
      setUserUpdated(false);
        setUserRole(e.target.value);
    };

    async function updateUserCall(e) {
        e.preventDefault();

        const res = await UserService().editUser({
          email: email,
          gender: userGender,
          role: userRole,
          previousEmail: props.email
        });
        res.status == 200 ? setUserUpdated(true) : setError(true);
      }

      async function deleteUser(e) {
        e.preventDefault();

        const res = await UserService().DeleteUser({
          email: email
        });
        res.status == 200 ? setUserDeleted(true) : setError(true);
        
        if(res.status == 200)
          props.invokeParent();
        
      }

  return (
  
    <div >
        {userUpdated ? (
              <Alert type="success">
                <span>User updated successfully.</span>
              </Alert>
        ) : null}
        {userDeleted ? (
              <Alert type="success">
                <span>User deleted successfully.</span>
              </Alert>
        ) : null}
         {error ? (
              <Alert type="error">
                <span>Error occurred! </span>
              </Alert>
            ) : null}
        <img onClick={deleteUser} style={{cursor: 'grab'}}  title="Delete this user" src="/images/delete.png" className={loginStyles.deleteClass} />
        <form onSubmit={updateUserCall} className={loginStyles.formClass}>

          <div className={loginStyles.container}>
            <label htmlFor="uname">
              <b>Email Address</b>
            </label>
            <input
              value={email}
              onChange={chnageHandler}
              minLength="5"
              className={loginStyles.inputClass}
              type="text"
              placeholder="Enter email"
              name="uname"
              onFocus={focusHandler}
              required
            />
            
               <hr />
            <div className="radio-buttons">
              <b>Male</b>{' '}
              <input
                required
                checked = {userGender == "male"}
                id="male"
                value="male"
                name="gender"
                type="radio"
                onChange={getGender}
              />{' '}
              <b>Female</b>{' '}
              <input
                required
                checked = {userGender == "female"}
                id="female"
                value="female"
                name="gender"
                type="radio"
                onChange={getGender}
              />
              
            </div>
            <hr />
            <div className="radio-buttons">
              <b>Normal</b>{' '}
              <input
                required
                checked = {userRole == "normal"}
                id="normal"
                value="normal"
                name="role"
                type="radio"
                onChange={getRole}
              />{' '}
              <b>Admin</b>{' '}
              <input
                required
                checked = {userRole == "admin"}
                id="admin"
                value="admin"
                name="role"
                type="radio"
                onChange={getRole}
              />
              
            </div>
            
            <button className={loginStyles.buttonClass} type='submit'>
              Save changes
            </button>
            
          </div>
        </form>

    </div>
  );
};

