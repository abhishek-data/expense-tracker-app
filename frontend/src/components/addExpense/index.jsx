import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, message, Select } from 'antd';
import axios from 'axios';

const AddCandy = () => {
    const [expenseList, setExpenseList] = useState([])

    const onFinish = (values) => {

    }

    return (
        <div className='candy-form'>
            <Card title="Add Candy" style={{ width: 600 }}>
                <Form onFinish={onFinish}>
                    <Form.Item label="Expense Amount" name="expense-amount" rules={[{ required: true, message: 'Please input your Expense Amount' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input your description' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: 'Please select your category' }]}
                    >
                        <Select>
                            <Option value="food">Food</Option>
                            <Option value="petrol">Petrol</Option>
                            <Option value="shopping">Shopping</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card style={{ width: 700, marginTop: 20 }}>
                <table>
                    <thead>
                        <tr className='candy-row'>
                            <th className='candy-item'>Candy Name</th>
                            <th className='candy-item'>Description</th>
                            <th className='candy-item'>Price</th>
                            <th className='candy-item'>Quantity</th>
                            <th className='candy-item shop'>Shop</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candyStock?.map(((item, index) => (
                            <tr className='candy-row' key={index}>
                                <td className='candy-item'>{item?.candy}</td>
                                <td className='candy-item'>{item?.description}</td>
                                <td className='candy-item'>{item?.price}</td>
                                <td className='candy-item'>{item?.quantity}</td>
                                <td className='candy-item shop'>
                                    <Button onClick={() => buyCandy(item, 1)}>Buy 1</Button>
                                    <Button onClick={() => buyCandy(item, 2)}>Buy 2</Button>
                                    <Button onClick={() => buyCandy(item, 3)}>Buy 3</Button>
                                </td>
                            </tr>
                        )))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default AddCandy;