import api from "services/api";

const getStudentTest = () => {
  return api.get("/student/test");
};

const verifyStudentSession = () => {
  return api.get("/auth/verify");
};

const applyAssignment = (assignmentID) => {
  return api.post("/helper/apply", {assignmentID});
};

const becomeHelper = (profile_data) => {
  return api.post("/helper/becomeHelper", profile_data);
};

const acceptHelper = (pendingApplicationID) => {
  return api.post("/student/acceptHelper", {pendingApplicationID});
};

const getProfileData = (username) => {
  return api.get("/student/getProfileData", { params: {username} });
};

const updateProfile = (profile_data) => {
  return api.post("/helper/updateProfile", profile_data);
};

const reviewHelper = (data) => {
  return api.post("/helper/reviewHelper", data);
};

const getOnboardLink = () => {
  return api.get("/helper/getOnboardLink");
};

const report = (data) => {
  return api.post("/student/report", data);
}

const getBalanceData = (data) => {
  return api.get("/helper/getBalanceData");
};

const deleteNotification = (notificationID, text) => {
  return api.post("/auth/deleteNotification", {
    notificationID,
    text
  });
};

const StudentService = {
  getStudentTest,
  applyAssignment,
  verifyStudentSession,
  becomeHelper,
  acceptHelper,
  getProfileData,
  updateProfile,
  reviewHelper,
  report,
  getBalanceData,
  getOnboardLink,
  deleteNotification
};

export default StudentService;
