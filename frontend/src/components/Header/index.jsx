import React from 'react';
import { Layout, Button, message } from 'antd';

const { Header, Content } = Layout;

const AppHeader = ({setIsLoggin, isloggedIn}) => {
  const handleLogout = () => {
    setIsLoggin(false)
    message.success("You have sucessfully logged out.")
  };
  
  return (
    <Layout>
      <Header className="header">
        <div className="logo">Expense Tracker</div>
        {isloggedIn&&<Button className="logout-button" type="primary" onClick={handleLogout}>
          Logout
        </Button>}
      </Header>
    </Layout>
  );
};

export default AppHeader;
