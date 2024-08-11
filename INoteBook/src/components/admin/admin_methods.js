
const fetchallUsers=async()=>{
    try {
        const response = await fetch(`http://localhost:3001/api/Admin/getUsers`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        });

        const json = await response.json();
        return json;
      } catch (err) {
    return   { messsage:err.message}
    }
}


const fetchEmailLogs=async()=>{
  try {
      const response = await fetch(`http://localhost:3001/api/Admin/GetEmailLogs`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });

      const json = await response.json();
      return json;
    } catch (err) {
  return   { messsage:err.message}
  }
}



const CreateUser=async(User,Methods)=>{
  try {
    const response = await fetch("http://localhost:3001/api/Admin/"+Methods, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: User?.name,
        email: User?.email,
        Gender: User?.gender,
        UserType: User?.UserType,
        IsAccountLocked: User?.IsAccountLocked,
        IsEmailVerified: User?.IsEmailVerified,
        
        UserType:User?.UserType,
        _id: User?._id
      })
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

const SendMailLog =async(MailBody)=>{
  try {
    const response = await fetch("http://localhost:3001/api/Admin/SendMail", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        FromEmail:MailBody.FromEmail,
        ToEmail:MailBody.ToEmail,
        Subject:MailBody.Subject,
        Body:MailBody.Body,
        User:MailBody.UserId
      })
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}


module.exports={fetchallUsers,SendMailLog,CreateUser,fetchEmailLogs}
