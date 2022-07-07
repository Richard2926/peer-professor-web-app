import api from "services/api";

const getAssignments = (filters) => {
  return api.get("/assignment/listAll", { params: filters});
};

const getUserAssignments = () => {
  return api.get("/assignment/list");
};

const getHelperAssignments = () => {
  return api.get("/assignment/helper-list");
};

const getApplicants = (assignmentID) => {
  return api.get("/assignment/getApplicants", { params: { assignmentID } });
};

const getAssignmentData = (assignmentID) => {
  return api.get("/assignment/getAssignmentData", { params: { assignmentID } });
};

const getAutoComplete = (start) => {
  return api.get("/assignment/autoCompleteCourses", { 
    params: {start}
  });
};

const getCourses = (start) => {
  return api.get("/assignment/getCourses", { 
    params: {start}
  });
};

const createAssignment = (assignment) => {
  return api.post("/assignment/createAssignment", assignment);
};

const AssignmentService = {
  getAssignments,
  getAutoComplete,
  getCourses,
  createAssignment,
  getUserAssignments,
  getHelperAssignments,
  getApplicants,
  getAssignmentData
};

export default AssignmentService;
