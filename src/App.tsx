import { useState, useRef, useEffect } from 'react'
import { AxiosError } from 'axios'
import { ErrorResponseData, NewResponse, StatesTypesObject } from './types/APIresponse'
import { addToCluster, getCurrentTab, sendVerificationCode, verifyCode } from './helper'

function App() {
  const [verifyEmail, setVerifyEmail] = useState(localStorage.getItem('remembermeToken') ? true : false)
  const [email, setEmail] = useState(localStorage.getItem('email') || '')
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [apiMessage, setApiMessage] = useState('')
  const RememberMe = useRef<HTMLInputElement|null>(null)
  
  const changeStates = (data : StatesTypesObject) => {
    const newdata  = {verifyEmail, email, code, showCode, apiMessage, ...data}
    setVerifyEmail(newdata.verifyEmail)
    setEmail(newdata.email)
    setCode(newdata.code)
    setShowCode(newdata.showCode)
    setApiMessage(newdata.apiMessage)
  }
  
 
  const handleForm = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const url = await getCurrentTab()
    console.log(url)
    try{
      if(!url) throw new Error('Invalid url')
      if(verifyEmail){
        const response = await addToCluster(email, url)
        if(response.status == 'success') changeStates({verifyEmail:false,showCode:false,email:'',code:'',apiMessage : response.message})
        return
      }
      if(code){
        const response = await verifyCode(email, code, RememberMe.current?.checked)
        if(response.status == 'success') {
          RememberMe.current?.setAttribute('checked', 'false')
          changeStates({verifyEmail:true,showCode:false, code:'',apiMessage:response.message})
          if(response.data.deviceToken && RememberMe.current?.checked){
             localStorage.setItem('remembermeToken', response.data.deviceToken)
             localStorage.setItem('email', email)
          }
        }
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
        <input type="email" title="email" placeholder="put in your email" value={email} readOnly={showCode} onChange={e=> setEmail(e.target.value)}/>
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
