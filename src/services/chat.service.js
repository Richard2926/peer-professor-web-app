import api from "services/api";

const getChatData = (data) => {
  return api.get("/message/list", { params: data});
};

const initiateCheckout = (milestoneID) => {
  return api.post("/message/initiateCheckout", {milestoneID});
};

const ChatService = {
    getChatData,
    initiateCheckout
};

export default ChatService;
