import { Table } from 'antd';
import moment from 'moment';



const ExpenseReport = ({ expenseReportData }) => {



    const columns = [
        {
            title: "Date", dataIndex: 'createdAt', key: 'createdAt',
            render: text => (
                <span>{moment(text).format("YYYY-MM-DD")}</span>
            ),
            width:200
        },
        { title: "Expense Amount", dataIndex: "expenseAmount", key: "expenseAmount", width:200 },
        { title: "Description", dataIndex: "description", key: "description", width:100 },
        { title: "Category", dataIndex: "category", key: "category", width:100 },
    ]



    return (
        <div style={{ width: 400, height: '100%', overflow: 'auto' }}>
            <Table dataSource={expenseReportData} columns={columns} style={{ width: 700 }} rowKey='id' pagination={{ pageSize: 3, hideOnSinglePage: true }} />

        </div>
    );
};

export default ExpenseReport; 