import React, { useContext, useEffect, useState } from "react";
import { fetchallUsers, fetchEmailLogs } from "./admin_methods";
import _authContext from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import TableSkeletonLoader from "./table.skeleton";
import TableUsers from "./usertable";
import CreateUsers from "./createusers";
import SendMail from "./sendMail";
import EmailLogs from "./emaillog";

export default function Users() {
  const navigate = useNavigate();
  const [User,SetUser]=useState({})
  const { isAuthenticated, logout } = useContext(_authContext);
  const [UserList, SetUserLists] = useState([]);
  const [EmailList, SetEmailList] = useState([]);
  
  const [Loading, SetLoading] = useState(true);
  const [Action,SetAction]=useState('')
  const [Grid_Form,setGridOrForm]=useState(true);
  const Hanlde_View_User_EmailLog=()=>{
    SetAction(Action == 'mail' ? 'grid':'mail');
  }
  const HanldeState = async(value,action) => {
    SetAction(action)
    if(action == 'delete')
    {
      alert('delete')
      
    }
    if(action == 'delete')
      {
        alert('delete')
  
      }
    else{

    setGridOrForm(!Grid_Form);
    if(!Grid_Form){
    SetUser({ name: "",
      email: "",
      IsAccountLocked: false,
      IsEmailVerified: false,
      UserType:'',
      gender:'',
      _id: ""
  })
  if(value)
  {
    let res=await _fetchData();
  }
}
    }
  };

  const _fetchData = async () => {
    SetLoading(true);
    let Res=undefined;
    if (isAuthenticated) {
      if(Action == 'mail')
      {
        Res = await fetchEmailLogs();
      }
      else{
       Res = await fetchallUsers();
      }
      if (Res && Res.message == undefined) {
        setTimeout(() => {
          SetLoading(false);
        }, 10000);
        if(Action == 'mail')
          {
SetEmailList(Res);
          }
          else{
          SetUserLists(Res);
          }
      } else {
        logout();
        navigate("/Login"); // Handle the case where there's no message or an empty message
      }
    } else {
      logout();
      navigate("/Login");
    }
  };

  const handleChildEvent = (value,action) => {
    //setMessage(value);
    //SetUser(value)
    SetUser({ name: value?.name,
      email: value?.email,
      IsAccountLocked: value?.IsAccountLocked,
      IsEmailVerified: value?.IsEmailVerified,
      UserType:value?.UserType,
      gender:value?.gender,
      _id: value?._id
  })
    HanldeState(User,action);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        let Res = await fetchallUsers();
        console.log(Res);
        if (Res && Res.message == undefined) {
          setTimeout(() => {
            SetLoading(false);
          }, 1000);
         
          SetUserLists(Res);
         
        } else {
          logout();
          navigate("/Login"); // Handle the case where there's no message or an empty message
        }
      } else {
        logout();
        navigate("/Login");
      }
    };
    fetchData();
    return () => {
      // Code to run on component unmount (cleanup)
    };
  }, [isAuthenticated, logout, navigate]);

  return (
    <>

       <div className="row"> 
        <div className="col-md-7" style={{    fontWeight:'bold'}}>{Grid_Form ? Action == 'mail' ? 'User Email Log' : 'User Management':'Add User'} </div>
        <div className="col-md-5 d-flex justify-content-end">
          {Grid_Form && <button style={{marginLeft:'10px'}}
            type="button"
            onClick={_fetchData} disabled={Loading}
            className=" ml-10 btn btn-outline-warning justify-content-center align-items-center d-flex"
          >
            <span class="material-symbols-outlined">sync</span> Refresh
          </button> }
          <button style={{marginLeft:'10px'}}
            type="button" disabled={Loading}
            onClick={Hanlde_View_User_EmailLog}
            className=" ml-10 btn btn-primary justify-content-center align-items-center d-flex"
          >
            <span class="material-symbols-outlined">{Grid_Form ? 'list_alt' :'arrow_back'}</span>{Grid_Form && Action == 'mail' ? 'View Users': Grid_Form && Action !== 'mail' ? 'View Logs' : 'Back'}
          </button>
          <button style={{marginLeft:'10px'}}
            type="button" disabled={Loading}
            onClick={HanldeState}
            className=" ml-10 btn btn-primary justify-content-center align-items-center d-flex"
          >
            <span class="material-symbols-outlined">{Grid_Form ? 'person_add':'arrow_back'}</span>{Grid_Form ? 'Add':'Back'}
          </button>
        </div>
      </div> 
      {Loading && <TableSkeletonLoader />}
      {Loading == false  && (<>{ Grid_Form ? Action == 'mail' ? <EmailLogs EmailList={EmailList} /> :  <TableUsers UserList={UserList} onEvent={handleChildEvent} />:
      Action !== 'mail' ?
      <CreateUsers User={User} onEvent={HanldeState} /> : <SendMail User={User} onEvent={HanldeState} /> }</>)}
    </>
  );
}
