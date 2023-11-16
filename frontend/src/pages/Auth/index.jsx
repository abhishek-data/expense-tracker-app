import React, { useState } from 'react'
import axios from 'axios'
import { Button, Divider, Form, Input, Typography, message } from 'antd';
import { API_URL } from '../../utils/config';
const Login = ({ setIsLoggin }) => {

  const [haveAccount, setHaveAccount] = useState(false)

  const loginHandler = async (value) => {
    try {
      if (haveAccount) {
        const response = await axios.post(`${API_URL}/login`, value)
        setIsLoggin(true)
        localStorage.setItem('token', response.data.token)
        message.success(`welcome! ${response.data.message}`,2)

      } else {
        const response = await axios.post(`${API_URL}/signup`, value)
        setHaveAccount(true)
        message.success(`welcome! ${response.data.message}`,2)

      }

    } catch (error) {
      message.error(error.message,2)
    }
  }

  return (
    <div className='loginForm'>
      <Form onFinish={loginHandler}>
        <Typography.Title className='loginTitle'>{haveAccount ? "Login" : "SignUp"}</Typography.Title>
        {!haveAccount && <Form.Item name='fullname' rules={[{ required: true, message: "Please Enter Valid FullName" }]}>
          <Input placeholder='Enter Your FullName' />
        </Form.Item>}
        <Form.Item name='email' rules={[{ required: true, message: "Please Enter Valid Email" }]}>
          <Input placeholder='Enter Your Email' type='email' />
        </Form.Item>
        <Form.Item name='password' rules={[{ required: true, message: "Please Enter Valid Password" }]}>
          <Input.Password placeholder='Enter Your Password' />
        </Form.Item>
        <Button type='primary' htmlType='submit' block='true'>{haveAccount ? "Login" : "SignUp"}</Button>
        <Divider style={{ borderColor: "blue", borderWidth: "2px" }}>
          <span className='loginText' onClick={() => setHaveAccount(!haveAccount)}>{haveAccount ? "Dont Have Account? SingnUp" : "Already Have Account? Login"}</span>
        </Divider>
      </Form>
    </div>
  )
}

export default Login