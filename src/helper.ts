const ENDPOINT = "http://localhost:5000"
import axios from "axios";
import { NewResponse, ResponseData } from "./types/APIresponse";


export const sendVerificationCode = async (email : string) => {
    const data = (await axios.post(`${ENDPOINT}/user/getverify`, {
      email:email
    })).data as NewResponse<ResponseData>
    console.log(data)
    if(data.status == 'error') throw new Error(data.message);
    return data;
  }

  export const verifyCode = async (email : string, code : string) => {
    const data = (await axios.post(`${ENDPOINT}/user/verify`, {
      email:email,
      code : code
    })).data as NewResponse<ResponseData>
    if(data.status == 'error') throw new Error(data.message);
    return data;
  }
  export const addToCluster = async (email : string, url : string, paid ?: boolean) => {
    const data = (await axios.post(`${ENDPOINT}/user/register`, {
      email:email,
      url : url,
      paid : paid
    })).data as NewResponse<ResponseData>
    if(data.status == 'error') throw new Error(data.message);
    return data;
  }
  