import React, { useState } from 'react'
import { Button, Divider, Form, Input, Typography, message } from 'antd';
const Login = () => {

  const [haveAccount, setHaveAccount] = useState(false)

  const loginHandler = (value) => {
    message.success(`welcome! you have sucessfully ${haveAccount? "logged in.":"singned up."}`)
  }

  return (
    <div className='loginForm'>
      <Form onFinish={loginHandler}>
        <Typography.Title className='loginTitle'>{haveAccount?"Login":"SignUp"}</Typography.Title>
        <Form.Item name='email' rules={[{ required: true, message: "Please Enter Valid Email" }]}>
          <Input placeholder='Enter Your Email' />
        </Form.Item>
        <Form.Item name='password' rules={[{ required: true, message: "Please Enter Valid Password" }]}>
          <Input.Password placeholder='Enter Your Password' />
        </Form.Item>
        <Button type='primary' htmlType='submit' block='true'>{haveAccount?"Login":"SignUp"}</Button>
        <Divider style={{ borderColor: "blue", borderWidth: "2px" }}>
          <span className='loginText' onClick={()=>setHaveAccount(!haveAccount)}>{haveAccount?"Dont Have Account? SingnUp":"Already Have Account? Login"}</span>
        </Divider>
      </Form>
    </div>
  )
}

export default Login