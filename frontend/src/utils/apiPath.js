export const BACKEND_URL = "http://localhost:5000";

export const API_PATHS = {
    AUTH: {
        LOGIN: "api/v1/auth/login",
        REGISTER: "api/v1/auth/register",
        GET_USER_INFO: "api/v1/auth/getUser",
    },
    DASHBOARD: {
        GET_DATA: "api/v1/dashboard",
    },
    INCOME: {
        ADD_INCOME: "api/v1/income/addIncome",
        GET_ALL_INCOME: "api/v1/income/getIncome",
        DELETE_INCOME:(incomeId)=> `api/v1/income/${incomeId}`,
        DOWNLOAD_INCOME: "api/v1/income/download",
    },
    EXPENSE: {
        ADD_EXPENSE: "api/v1/expense/addExpense",
        GET_ALL_EXPENSE: "api/v1/expense/getExpense",
        DELETE_EXPENSE: (expenseId)=> `api/v1/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: "api/v1/expense/download",
    },
    IMAGE: {
        UPLOAD_IMAGE: "api/v1/auth/upload-image",  
    },
     GROUPS: {
    GET_ALL: "api/v1/groups",
    CREATE: "api/v1/groups",
    ADD_MEMBER: (groupId) => `api/v1/groups/${groupId}/member`,
    JOIN_CHALLENGE: (challengeId) => `api/v1/groups/challenge/${challengeId}/join`,
  },
  GROUP: {
  GET_ALL: "api/v1/groups",
  CREATE: "api/v1/groups",
  INVITE: (groupId, userId) => `api/v1/groups/${groupId}/invite/${userId}`,
  ACCEPT: (groupId) => `api/v1/groups/${groupId}/accept`,
  REJECT: (groupId) => `api/v1/groups/${groupId}/reject`,
  CONTRIBUTE: (groupId) => `api/v1/groups/${groupId}/contribute`,
  UPDATE: "/api/v1/groups",   
  DELETE: "/api/v1/groups", 
},

};