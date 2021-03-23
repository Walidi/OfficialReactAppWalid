import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function ProtectedRoute({/* isAuth: isAuth,*/ component: Component, ...rest}) {
    return <Route {...rest} render={(props)=> {
      if (localStorage.getItem("loggedIn") == "Yes")/*isAuth == true)*/ {  //If authentication is success (logged in / 'true) we send the component/page to the user
      console.log("Home still open!")
          return <Component />;
      } else  {
          console.log("Home not open!");
          return (  //Else we will be returned to the login screen! 
               <Redirect to ={{pathname: "/", state:{from: props.location}}} />
          );
      }
     }  
}/>;
}

export default ProtectedRoute;