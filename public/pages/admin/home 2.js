import Alert from '../../components/alert';
import loginStyles from '../../styles/login.module.css';
import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import Layout from "../../components/layout";
import utilStyles from '../../styles/utils.module.css';
import $ from 'jquery';
import {UserList} from "../../components/users/UserList";
import {UserService} from "../../services";
import { CreateUser } from '../../components/general/createUser';
import {useRouter} from "next/router";

const Admin = () => {

  const [createUserView, setCreateUserView] = useState(null);
  const [userCreated, setUserCreated] = useState(null);
  const router = useRouter();

  useEffect(()=>{
 
    if(!UserService().isAdmin())
      router.push("/");
  },[])

  const closeModal = () => {
    if(!createUserView)
      $('#myModal').hide();
    setCreateUserView(false);
  };
  const showUsersModal = () => {
    $('#myModal').show()
  }
  async function createUser(e) {
    e.preventDefault();
    createUserView ? setCreateUserView(false):setCreateUserView(true)
  }
  async function pullData(){
    setCreateUserView(false);
    setUserCreated(true);
    setTimeout(()=>{
      setUserCreated(false);
    },5000)
  }

  return (
    <Layout admin>
      <Head>
        <title>Admin Dashboard</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <section className={utilStyles.headingMd}>
        <h3>Admin Dashboard</h3>
        
        <div className="modal modal-backdrop" id="myModal" role="dialog" style={{overflow:"auto"}}>
          <div className="modal-dialog">
            <div className="modal-content" style={{  width: "fit-content" }} >
              <div className="modal-header">
                <h4 className="modal-title">
                  <span >Users</span>
                </h4>
                {userCreated ? (
              <Alert type="success">
                <span>New user created.</span>
              </Alert>
            ) : null}
              </div>
              <div className="modal-body">

                  <div className={loginStyles.container}>
                    {createUserView ?   <CreateUser invokeParent={pullData} />: <UserList />}
                  </div>

              </div>
              <div className="modal-footer">
                <span>
                  <button type="button" onClick={closeModal} className="btn btn-danger">Close</button>
                  {createUserView ?  null: <span><button type="button" onClick={createUser}  className="btn btn-success">Create user</button></span>}
                </span>
              </div>
            </div>
          </div>
        </div>

        <button onClick={showUsersModal} className={loginStyles.buttonClass}>
              Users
            </button>
        
      </section>

    </Layout>
  );
};
export default Admin;
