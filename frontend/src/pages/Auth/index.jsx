import React, { useState } from 'react'
import axios from 'axios'
import { Button, Divider, Form, Input, Typography, message } from 'antd';
import { API_URL } from '../../util/config';
const Login = () => {

  const [haveAccount, setHaveAccount] = useState(false)

  const loginHandler = async (value) => {
    console.log(value);
    try {
      if (haveAccount) {
        const response = await axios.post(`${API_URL}/login`, value)
      } else {
        const response = await axios.post(`${API_URL}/signup`, value)

      }
      message.success(`welcome! you have sucessfully ${haveAccount ? "logged in." : "singned up."}`)

    } catch (error) {
      message.error(error.message)
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
          <Input placeholder='Enter Your Email' type='email'/>
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