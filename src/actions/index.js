export const userLogin = function(userDetail){
    return (dispatch) => {
      fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: { ...headers,'Content-Type': 'application/json' },
            body: JSON.stringify(userDetail)
        }).then(res => {
            if(res.status === 200){
              console.log("userlogin status:",res.status);
              return res.json();
            }else if(res.status==401){
              alert((res.message)?res.message:"Applicant entered wrong password!!!");
              throw "userlogin Failed !!!"
            }
            else if(res.status==400){
              alert((res.message)?res.message:"Applicant is not registered, First Signup!!");
              throw "User Login Failed !!!"
            }
       }).then(result=>{
           console.log("result",result.loginUser," token :",result.servertoken)
           UTIL.saveServerToken(result);
           //localStorage.setItem("token",result.server_token)
           console.log("results")
           console.log(result.user_Details);
           dispatch(userLoggedIn(result));
           history.push('/feed');
           // history.push('/userprofile');
            //history.push('/listings');
    }).catch(err => {
      alert(err);
            console.log("Error while Sign up!!!");
            return err;
          });
      };
  };