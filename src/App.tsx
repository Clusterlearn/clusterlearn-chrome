import { useState, useRef, useEffect } from 'react'
import { AxiosError } from 'axios'
import './App.css'
import { ErrorResponseData, NewResponse, StatesTypesObject } from './types/APIresponse'
import { addToCluster, sendVerificationCode, verifyCode } from './helper'
import { Messages } from './types/chromeMessages'
import { ChromeRuntimeResponse, GetURLRESPONSE } from './types/chromeResponse'

function App() {
  const [verifyEmail, setVerifyEmail] = useState(false)
  const [email, setEmail] = useState(localStorage.getItem('email') || '')
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [apiMessage, setApiMessage] = useState('')
  const RememberMe = useRef<HTMLInputElement|null>(null)
  let localStorageEmail = false
  useEffect(() => {
    localStorageEmail = email !== '';
  }, [])
  
  const changeStates = (data : StatesTypesObject) => {
    const newdata  = {verifyEmail, email, code, showCode, apiMessage, ...data}
    setVerifyEmail(newdata.verifyEmail)
    setEmail(newdata.email)
    setCode(newdata.code)
    setShowCode(newdata.showCode)
    setApiMessage(newdata.apiMessage)
  }
  
  const getUrl = async () => {
    const data: ChromeRuntimeResponse<GetURLRESPONSE> = await chrome.runtime.sendMessage(Messages.GET_CURRENT_TAB_URL);
    console.log(data)
    return data?.data.url
  }
  const handleForm = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const url = await getUrl()
    console.log(url)
    try{
      if(verifyEmail){
        const response = await addToCluster(email, url)
        if(response.status == 'success') changeStates({verifyEmail:false,showCode:false,email:'',code:'',apiMessage : response.message})
        return
      }
      if(code){
        const response = await verifyCode(email, code)
        if(RememberMe.current?.checked) localStorage.setItem('email', email)
        RememberMe.current?.setAttribute('checked', 'false')
        if(response.status == 'success') changeStates({verifyEmail:true,showCode:false, code:'',apiMessage:response.message})
      }
      else{
        const response = await sendVerificationCode(email)
        if(response.status == 'success') setShowCode(true)
        setApiMessage(response.message)
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


  return (
    <>
      <h1>Cluster Learn</h1>
      SignUp for This course
      <form onSubmit={handleForm} >
        <input type="email" title="email" placeholder="put in your email" value={email} readOnly={localStorageEmail} onChange={e=> setEmail(e.target.value)}/>
        {
          showCode ?  <input type="text" title="code" placeholder="verification code" onChange={e => setCode(e.target.value)} /> 
          : ''
        }
        <label htmlFor="remember-me">Remeber me</label>
        <input type="checkbox" id="remember-me" ref={RememberMe}/>
        <button>
          {verifyEmail ? "Join Group" :  showCode ?  "verify Email" : 'send email verification code' }
        </button>
        {apiMessage}
      </form>
    </>
  )
}

export default App
