import {useEffect, useRef, useState} from "react";
import loginStyles from '../../styles/login.module.css';
import {UserService} from "../../services/user.service";
import Alert from '../../components/alert';
import $ from 'jquery';

export const ViewUser = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userUpdated, setUserUpdated] = useState(null);
    const [userDeleted, setUserDeleted] = useState(null);
    
    const [error, setError] = useState(null);
    const [email,setEmail] = useState(null);
    const [userGender, setUserGender] = useState(null);
    const [userRole, setUserRole] =useState(null);

    useEffect(()=>{;
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
    const showModel=()=>{
      $("#deleteModal").show();
    }
    const hideModel=()=>{
      $("#deleteModal").hide();
    }
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

        <div id="deleteModal" tabindex="-1" class=" flex items-center justify-center h-screen modal-backdrop" style={{display:"none"}} >
       
            <div class="relative max-w-md ">
              
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button  onClick={hideModel} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-4 md:p-5 text-center">
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
                        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this user?</h3>
                        <button onClick={deleteUser} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                            Yes, I'm sure
                        </button>
                        <button onClick={hideModel} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>

        
        <img onClick={showModel} style={{cursor: 'grab', width: "10%", float:"right"}} title="Delete this user" src="/images/delete.png" className="hover:bg-orange-300" />
        <form id="formId" onSubmit={updateUserCall} className={loginStyles.formClass}>
        {userUpdated ? (
                          <Alert type="success">
                            <span>User updated successfully.</span>
                          </Alert>
                    ) : null}
                    {error ? (
                          <Alert type="error">
                            <span>Error occurred! </span>
                          </Alert>
                        ) : null}
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

