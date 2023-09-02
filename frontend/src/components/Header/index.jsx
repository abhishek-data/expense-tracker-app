// AppLayout.js
import React from 'react';
import { Layout, Button } from 'antd';

const { Header, Content } = Layout;

const AppLayout = () => {
  const handleLogout = () => {

  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo">Expense Tracker</div>
        <Button className="logout-button" type="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Header>
      <Content className="content">Content goes here</Content>
    </Layout>
  );
};

export default AppLayout;
