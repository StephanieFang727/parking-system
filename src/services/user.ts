import request from '@/utils/request';
import {baseURL} from "../../config/constants";

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function queryCurrent(userid: string): Promise<any> {
  return request(`${baseURL}/api/getBasciInfo?userid=${userid}`);
}

export async function updateUserInfo(payload: object) {
  return request(`${baseURL}/api/updateBasicInfo`, {
    method: 'POST',
    data: payload,
  });
}

export async function getUserParkInfo(userId:string) {
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
  return request(`${baseURL}/api/getLightThreshold`);
}

export async function updateThreshold(payload: object){
  return request(`${baseURL}/api/updateLightThreshold`, {
    method: 'POST',
    data: payload,
  });
}

export async function updateBookStatus(payload: object){
  return request(`${baseURL}/api/updateBookStatus`, {
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
