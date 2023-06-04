const ENDPOINT = "http://localhost:5000"
import axios from "axios";
import { GetEmailVerifyResponse, NewResponse, ResponseData } from "./types/APIresponse";


export const sendVerificationCode = async (email : string) => {
    const data = (await axios.post(`${ENDPOINT}/user/getverify`, {
      email:email
    })).data as NewResponse<ResponseData>
    console.log(data)
    if(data.status == 'error') throw new Error(data.message);
    return data;
  }

  export const verifyCode = async (email : string, code : string, rememberMe = false) => {
    const data = (await axios.post(`${ENDPOINT}/user/verify`, {
      email:email,
      code : code,
      rememberMe
    })).data as NewResponse<GetEmailVerifyResponse>
    if(data.status == 'error') throw new Error(data.message);
    return data;
  }
  export const addToCluster = async (email : string, url : string, paid ?: boolean) => {
    const data = (await axios.post(`${ENDPOINT}/user/register`, {
      email:email,
      url : url,
      paid : paid,
      rememberToken:localStorage.getItem('remembermeToken')
    })).data as NewResponse<ResponseData>
    if(data.status == 'error') throw new Error(data.message);
    return data;
  }
  

  export const getCurrentTab = async () => {
  const tabs = await chrome.tabs.query({active: true, currentWindow:true})
  return tabs[0].url
}