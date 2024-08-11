import { useEffect, useState } from "react";
import ToastComponent from "../common/controls/newtoast";
import { SendMailLog } from "./admin_methods";


export default function SendMail({ User, onEvent }) {
  const [Message, SetMessage] = useState({ message: "", type: "" });
  const [showToast, setShowToast] = useState(false);

  const [UserModel, SetUserModel] = useState({
    name: "",
    email: "",
    IsAccountLocked: false,
    IsEmailVerified: false,
    UserType: "User",
    gender: "Male",
    _id: ""
  });

  const [SendMailModel, SetSendMailModel] = useState({
    FromEmail: "",
    ToEmail: "",
    Subject: "",
    Body: "",
    UserId: ""
  });

  const sendValueToParent = (value) => {
    onEvent(value);
  };
  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  useEffect(() => {
    SetUserModel({
      name: User?.name,
      email: User?.email,
      IsAccountLocked: User?.IsAccountLocked,
      IsEmailVerified: User?.IsEmailVerified,
      UserType: User?.UserType,
      gender: User?.gender,
      _id: User?._id
    });
    SetSendMailModel({
      FromEmail: "",
      ToEmail: User?.email,
      Subject: "",
      Body: "",
      UserId: User?._id
    });
  }, [User?.email]);

  const handleChange = (field, value, call) => {
    if (call == undefined) {
      call = true;
    }
    if (call == true) {
      if (field === "fromemail" && call) {
        SendMailModel.FromEmail = value;
        SetSendMailModel((prev) => ({
          ...prev,
          FromEmail: value
        }));
      }
      if (field === "toemail" && call) {
        SendMailModel.ToEmail = value;
        SetSendMailModel((prev) => ({
          ...prev,
          ToEmail: value
        }));
      }
      if (field === "subject" && call) {
        SendMailModel.Subject = value;
        SetSendMailModel((prev) => ({
          ...prev,
          Subject: value
        }));
      }
      if (field === "body" && call) {
        SendMailModel.Body = value;
        SetSendMailModel((prev) => ({
          ...prev,
          Body: value
        }));
      }
      // SetUserModel(UserModel)
    }
  };

  const HandleSubmit = async (UserModel) => {
    if (UserModel) {
      if (!(UserModel?.FromEmail && UserModel?.FromEmail != "")) {
        SetMessage({
          message: "From Email cannot be blank",
          type: "text-danger"
        });
        handleShowToast();
        return;
      }
      if (!(UserModel?.ToEmail && UserModel?.ToEmail != "")) {
        SetMessage({
          message: "To Email cannot be blank",
          type: "text-danger"
        });
        handleShowToast();
        return;
      }
      if (!(UserModel?.Subject && UserModel?.Subject != "")) {
        SetMessage({
          message: "Subject cannot be blank",
          type: "text-danger"
        });
        handleShowToast();
        return;
      }
      if (!(UserModel?.Body && UserModel?.Body != "")) {
        SetMessage({
          message: "Message Body cannot be blank",
          type: "text-danger"
        });
        handleShowToast();
        return;
      }

      const result = await SendMailLog(UserModel);
      if (result && result?.message && result?.message != "") {
        SetMessage({
          message: result.message,
          type: result?.message.includes("1:") ? "text-success" : "text-danger"
        });
        handleShowToast();
        setTimeout(() => {
          if (result?.message.includes("1:")) {
            sendValueToParent(true);
          }
        }, 500);
      }
    }
  };

  return (
    <>
      <div
        className="position-fixed top-2 end-0 p-3"
        style={{ zIndex: 11, marginTop: "-55px" }}
      >
        <ToastComponent
          show={showToast}
          onClose={handleCloseToast}
          type={Message.type}
          message={Message.message}
          duration={10000}
        />
      </div>

      <div className="container" style={{ width: "60%" }}>
        <div className="form-body" style={{ backgroundColor: "#0090fe26" }}>
          <h3 className="text-center pt-3">Send Mail</h3>
          <form style={{ padding: "0px !important" }}>
            <div className="col-12 col-md-10">
              <div class="form-group d-block">
                <label htmlFor="exampleInputEmail1">From Email</label>
                <input
                  onInput={(e) => handleChange("fromemail", e.target.value)}
                  type="email"
                  value={SendMailModel.FromEmail}
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Fromemail"
                />
              </div>
              <div class="form-group d-block">
                <label htmlFor="exampleInputEmail1">To Email</label>
                <input
                  onInput={(e) => handleChange("toemail", e.target.value)}
                  type="email"
                  value={SendMailModel.ToEmail}
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Toemail"
                />
              </div>
              <div class="form-group d-block">
                <label htmlFor="exampleInputEmail1">Subject</label>
                <input
                  type="email"
                  onInput={(e) => handleChange("subject", e.target.value)}
                  value={SendMailModel.Subject}
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Subject"
                />
              </div>
              <div class="form-group d-block">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Message Body
                </label>
                <textarea
                  onInput={(e) => handleChange("body", e.target.value)}
                  value={SendMailModel.Body}
                  placeholder="Enter Message Body"
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
              <button
                onClick={() => HandleSubmit(SendMailModel)}
                type="button"
                class="btn btn-primary d-flex align-items-center"
              >
                Send&nbsp;<span class="material-symbols-outlined">send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
