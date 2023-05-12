import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import './App.css'
import { ErrorResponseData, NewResponse, ResponseData } from './types/response'

function App() {
  const [verifyEmail, setVerifyEmail] = useState(false)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [apiMessage, setApiMessage] = useState('')
  const ENDPOINT = "http://localhost:5000"
  const sendVerificationCode = async (email : string) => {
    const data = (await axios.post(`${ENDPOINT}/user/getverify`, {
      email:email
    })).data as NewResponse<ResponseData>
    console.log(data)
    if(data.status == 'error') throw new Error(data.message);
    return data;
  }

  const verifyCode = async (email : string, code : string) => {
    const data = (await axios.post(`${ENDPOINT}/user/verify`, {
      email:email,
      code : code
    })).data as NewResponse<ResponseData>
    if(data.status == 'error') throw new Error(data.message);
    return data;
  }
  const addToCluster = async (email : string, url : string, paid ?: boolean) => {
    const data = (await axios.post(`${ENDPOINT}/user/register`, {
      email:email,
      url : url,
      paid : paid
    })).data as NewResponse<ResponseData>
    if(data.status == 'error') throw new Error(data.message);
    return data;
  }
  const handleForm = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{
      if(verifyEmail){
        const response = await addToCluster(email, 'https://www.edx.com/cart/subscribe/course/7800722')
        if(response.status == 'success'){
           setVerifyEmail(false)
           setShowCode(false)
           setEmail('')
           setCode('')
           setApiMessage(response.message)
          }
      }
      else{
        if(code)
        {
          const response = await verifyCode(email, code)
          if(response.status == 'success') setVerifyEmail(true)
          setShowCode(false)
          setCode('')
          setApiMessage(response.message)
        }
        else{
          const response = await sendVerificationCode(email)
          if(response.status == 'success') setShowCode(true)
          setApiMessage(response.message)

          
        }
      }
    }catch(e) 
    {
      console.log(e)
      if((e as AxiosError).response) {
        setApiMessage(((e as AxiosError)?.response?.data as NewResponse<ErrorResponseData>).message)
        return;
      }
      setApiMessage((e as Error).message)
    }
  }

  // aniezeoformic@gmail.com

  return (
    <>
      SignUp for This course
      <form onSubmit={handleForm}>
        <input type="email" title="email" placeholder="put in your email" value={email} onChange={e=> setEmail(e.target.value)}/>
        {
          showCode ?  <input type="text" title="code" placeholder="verification code" onChange={e => setCode(e.target.value)} /> 
          : ''
        }
        <button>
          {verifyEmail ? "Join Group" :  showCode ?  "verify Email" : 'send email verification code' }
        </button>
        {apiMessage}
      </form>
    </>
  )
}

export default App
