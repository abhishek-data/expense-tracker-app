import React, { useEffect, useState } from 'react';
import { Layout, Button, message, Modal } from 'antd';
import BuyPremium from '../../pages/buyPremium';
import axios from 'axios';
import { API_URL, decodeToken } from '../../utils/config';
import LeaderBoard from '../LeaderBoard';

const { Header, Content } = Layout;

const AppHeader = ({ setIsLoggin, isloggedIn }) => {
  const [showpremium, setShowPremium] = useState(false)
  const [ispremiumUser, setIsPremiumUser] = useState(false)
  const [isShowLeaderBoard, setIsLeaderBoard] = useState(false)
  const [LeaderBoardData, setLeaderBoardData] = useState([])
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const _ispreiumUser = decodeToken(token).ispremiumUser
      setIsPremiumUser(_ispreiumUser)
    }

  }, [isloggedIn])

  const handleLogout = () => {
    setIsLoggin(false)
    setIsPremiumUser(false)
    localStorage.removeItem('token')
    message.success("You have sucessfully logged out.")
  };

  const showBuyPremium = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/purchage/get-premium`, { headers: { 'Authorization': token } });

      const options = {
        key: response.data.key_id,
        order_id: response.data.order.id,
        handler: async function (response) {
          console.log(response);
          const res = await axios.post(`${API_URL}/purchage/updatepayment`, {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          }, { headers: { 'Authorization': token } });
          setIsPremiumUser(true)
          message.success("you are a premium user now.");
          localStorage.setItem('token', res.data.token)
        }
      };

      const rzp = new Razorpay(options);
      rzp.open();
      rzp.on('payment.failed', () => {
        message.error("Payment failed");
      });
    } catch (err) {
      message.error(err.message);
    }
  }

  const showLeaderBoard = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/purchage/leaderboard`, { headers: { 'Authorization': token } });
      if (!response) {
        throw new Error("Something went wrong")
      }
      setLeaderBoardData(response?.data?.users)
      setIsLeaderBoard(true)
    } catch (err) {
      message.error(err.message);
    }
  }


  return (
    <>
      <Layout>
        <Header className="header">
          <div className="logo">Expense Tracker</div>
          {isloggedIn && (ispremiumUser ? <div className="logo">You are premium user <Button type="primary" onClick={showLeaderBoard}>
            Show LeaderBoard
          </Button></div> : <Button type="primary" onClick={showBuyPremium}>
            Buy Premium
          </Button>)}
          {isloggedIn && <Button className="logout-button" type="primary" onClick={handleLogout}>
            Logout
          </Button>}
        </Header>
      </Layout>
      <Modal
        title="LeaderBoard"
        open={isShowLeaderBoard}
        onCancel={() => setIsLeaderBoard(false)}
        width={450}
        maskClosable={false}
        footer={null}
      >
        <LeaderBoard data={LeaderBoardData} />
      </Modal>
    </>
  );
};

export default AppHeader;
