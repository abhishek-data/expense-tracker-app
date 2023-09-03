import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, message, Select, Table, InputNumber } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { API_URL } from '../../util/config';

const { Option } = Select



const AddExpense = () => {
    const [expenseList, setExpenseList] = useState([])
    const [expenseFlag, setExpenseFlag] = useState(true)

    useEffect(() => {
        const getExpense = async () => {
            try {
                const response = await axios.get(`${API_URL}/expense`)
                if (response?.data) {
                    setExpenseList(response.data)
                }
            } catch (error) {
                message.error(error)
            }
        }
        getExpense()
    }, [expenseFlag])

    const columns = [
        { title: "Expense Amount", dataIndex: "expenseAmount", key: "expenseAmount" },
        { title: "Description", dataIndex: "description", key: "description" },
        { title: "Category", dataIndex: "category", key: "category" },
        {
            title: "Actions",
            dataIndex: "id",
            render: (id) => (
                <span>
                    <Button type='primary' icon={<EditOutlined />} onClick={() => onEdit(id)} />
                    <Button type='danger' icon={<DeleteOutlined />} onClick={() => onDelete(id)} />
                </span>
            )
        }
    ]

    const onDelete = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/expense/delete-expense/${id}`)
            if (response?.data) {
                message.success(response.data.message)
                setExpenseFlag(prev => !prev)
            }
        } catch (error) {
            message.error(error)
        }
    }
    const onEdit = async (id) => {
        try {
            const response = await axios.put(`${API_URL}/expense/update-expense/${id}`)
            if (response?.data) {
                message.success(response.data.message)
                setExpenseFlag(prev => !prev)
            }
        } catch (error) {
            message.error(error)
        }
    }

    const onFinish = async (values) => {
        console.log(values);
        try {
            const response = await axios.post(`${API_URL}/expense/add-expense`, values)
            if (response?.data) {
                message.success(response.data.message)
                setExpenseFlag(prev => !prev)
            }
        } catch (error) {
            message.error(error)
        }
    }

    return (
        <div className='expense-form'>
            <Card title="Add Expense" style={{ width: 400 }}>
                <Form onFinish={onFinish}>
                    <Form.Item label="Expense Amount" name="expenseAmount" rules={[{ required: true, message: 'Please input your Expense Amount' }]}>
                        <InputNumber size="default" />
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
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <div style={{ width: 400, height: '100%', overflow: 'auto' }}>
                <Table dataSource={expenseList} columns={columns} style={{ width: 400 }} rowKey='id' pagination={{ pageSize: 3, hideOnSinglePage: true }} />

            </div>
        </div>
    );
};

export default AddExpense; 