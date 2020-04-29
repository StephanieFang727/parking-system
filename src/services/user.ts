import request from '@/utils/request';
import {baseURL} from "../../config/constants";

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function queryCurrent(userid: string): Promise<any> {
  if(userid==="2"){
    return {
      "data": [
        {
          "userid": 2,
          "username": "管理员",
        }
      ],
      "status": "success"
    } ;
  }
  return request(`${baseURL}/api/getBasciInfo?userid=${userid}`);
}

export async function updateUserInfo(payload: object) {
  return request(`${baseURL}/api/updateUserinfo`, {
    method: 'POST',
    data: payload,
  });
}

export async function getUserParkInfo(userId:string) {
  if(userId === "2"){
    return request(`${baseURL}/api/getUserParkingInfo`);
  }
  return request(`${baseURL}/api/getUserParkingInfo?userid=${userId}`);
}

export async function addBreakInfo(payload: object){
  return request(`${baseURL}/api/addBreakinfo`, {
    method: 'POST',
    data: payload,
  });
}


export async function getParkInfo() {
  return request(`${baseURL}/api/getParkingInfo`);
}

export async function getThreshold() {
  return request(`${baseURL}/api/getPrice`);
}

export async function updateThreshold(payload: object){
  return request(`${baseURL}/api/updatePrice`, {
    method: 'POST',
    data: payload,
  });
}

export async function bookParking(payload: object){
  return request(`${baseURL}/api/BookParking`, {
    method: 'POST',
    data: payload,
  });
}

export async function cancelBooking(payload: object){
  return request(`${baseURL}/api/CancelBooking`, {
    method: 'POST',
    data: payload,
  });
}

export async function register(payload: object){
  return request(`${baseURL}/api/register`, {
    method: 'POST',
    data: payload,
  });
}

export async function updatePay(payload: object){
  return request(`${baseURL}/api/updatePayStatus`, {
    method: 'POST',
    data: payload,
  });
}

export async function getUserInfo() {
  return request(`${baseURL}/api/getAllUserInfo`);
}

export async function deleteUser(userid) {
  return request(`${baseURL}/api/deleteUser?userid=${userid}`);
}
