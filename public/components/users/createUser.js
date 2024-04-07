import {useEffect, useRef, useState} from "react";
import loginStyles from '../../styles/login.module.css';
import {UserService} from "../../services/user.service";
import Alert from '../../components/alert';
import { constants } from "../../constants";

export const CreateUser = (props) => {
    const [userExists, setUserExists] = useState(null);
    const email = useRef(null);
    const [userGender, setUserGender] = useState();
    const [userRole, setUserRole] =useState();

    const focusHandler = () => {
        setUserExists(false);
      };

    const getGender = (e) => {
        
        const { value } = e.target;
        setUserGender(value);
    };
    const getRole = (e) => {
        const { value } = e.target;
        setUserRole(value);
    };

    async function createUserCall(e) {
        e.preventDefault();
        const res = await UserService().createUser({
          email: email.current.value,
          password:constants.DEFAULT_PASSWORD,
          gender: userGender,
          role: userRole,
          createdBy: UserService().getCurrentUser().email
        });
        
        res.status == 201 ? props.invokeParent() : null;
        
        res.status == 409 ? setUserExists(true) : null;
    }

  return (

    <div>

        <form onSubmit={createUserCall} >
          
          <div className={loginStyles.container}>
            <label htmlFor="uname">
              <b>Email Address</b>
            </label>
            <input
              ref={email}
              minLength="5"
              className={loginStyles.inputClass}
              type="text"
              placeholder="Enter email"
              name="uname"
              onFocus={focusHandler}
              required
            />
            {userExists ? (
              <Alert type="error">
                <span>user already exists</span>
              </Alert>
            ) : null}
            
               <hr />
            <div className="radio-buttons">
              <b>Male</b>{' '}
              <input
                required
             
                id="male"
                value="male"
                name="gender"
                type="radio"
                onChange={getGender}
              />{' '}
              <b>Female</b>{' '}
              <input
                required
            
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
          
                id="normal"
                value="normal"
                name="role"
                type="radio"
                onChange={getRole}
              />{' '}
              <b>Admin</b>{' '}
              <input
                required
        
                id="admin"
                value="admin"
                name="role"
                type="radio"
                onChange={getRole}
              />
              
            </div>
            
            <button className={loginStyles.buttonClass} type='submit'>
              Save
            </button>
            
          </div>
        </form>

    </div>
  );
};

