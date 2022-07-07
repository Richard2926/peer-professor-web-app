import { combineReducers } from "redux";
import auth from "redux/reducers/auth";
import explore from "redux/reducers/explore";
import createAssignment from "redux/reducers/createAssignment";
import apply from "redux/reducers/apply";
import helper from "redux/reducers/helper";
import assignment from "redux/reducers/assignment";
import chat from "redux/reducers/chat";
import profile from "redux/reducers/profile";
import report from "redux/reducers/report";
import balance from "redux/reducers/balance";

const RootReducer = combineReducers({
    auth,
    explore,
    createAssignment,
    apply,
    helper,
    assignment,
    chat,
    profile,
    report,
    balance
});

export default RootReducer;
