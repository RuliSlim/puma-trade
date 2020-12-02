// const baseUrl = "http://192.168.43.77:8000";
const baseUrl = "https://libra-trade.herokuapp.com";

export const loginUrl = `${baseUrl}/user-management/login/`;
export const registerUrl = `${baseUrl}/user-management/create-user/`;
export const logoutUrl = `${baseUrl}/user-management/logout/`;

// dashboard
export const tokenUrl = `${baseUrl}/transaction/token-user/`;
export const pointUrl = `${baseUrl}/transaction/poin-user/`;
export const bonusUrl = `${baseUrl}/transaction/total-bonus/`;
export const cappingUrl = `${baseUrl}/transaction/capping/`;
export const depositUrl = `${baseUrl}/transaction/deposit/`;
export const investUrl = `${baseUrl}/transaction/invest/`;
export const convertUrl = `${baseUrl}/transaction/convert/`;
export const transferUrl = `${baseUrl}/transaction/transfer/`;

// tree
export const treeUrl = `${baseUrl}/user-management/tree/`;

// profile
export const changePassword = `${baseUrl}/user-management/change-password/`;

// HISTORY
export const historyDepositUrl = `${baseUrl}/transaction/history-depo/`;
export const historyInvestUrl = `${baseUrl}/transaction/history-invest/`;
export const historyConvertUrl = `${baseUrl}/transaction/history-convert/`;
export const historyTransferUrl = `${baseUrl}/transaction/history-transfer/`;
export const historyWithdrawUrl = `${baseUrl}/transaction/history-withdraw/`;
export const historySponsorUrl = `${baseUrl}/transaction/history-bonus-sponsor/`;
