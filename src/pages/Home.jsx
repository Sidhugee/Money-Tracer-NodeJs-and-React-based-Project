import { DatePicker, message, Select, Table } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AddEditTransactions from "../components/AddEditTransactions";
import DefaultLayout from "../components/DefaultLayout";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Spinner from "../components/Spinner";
import "../resources/transactions.css";
import Analytics from "../components/analytics/Analytics";

const { RangePicker } = DatePicker;
function Home() {
  const [showAddEditTransactionModel, setShowAddEditTransactionModel] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [selectedItemForEdit,setSelectedItemForEdit]=useState(null)
  const [selectedRange, setSelectedRange] = useState([]);
  const [viewType, setViewType] = useState("table");

  const getTransaction = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("SheyMoney-users"));
      setLoading(true);
      const response = await axios.post(
        "/api/transaction/get-all-transactions",
        {
          userid: user._id,
          frequency,
          ...(frequency === "custom" && { selectedRange }),
          type,
        }
      );
      console.log(response.data);
      setTransactionData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went Wrong");
    }
  };


  const deleteTransaction = async (record) => {
    try {
      setLoading(true);
      await axios.post(
        "/api/transaction/delete-transaction",
        {
          transactionId:record._id
        }
      );
      message.success('Transaction Deleted Successfully')
      getTransaction();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went Wrong");
    }
  };




  useEffect(() => {
    getTransaction();
  }, [frequency, selectedRange, type]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Action",
      render: (text, record) => {
        return (
          <div>
            <EditOutlined onClick={()=>{
              setSelectedItemForEdit(record);
              setShowAddEditTransactionModel(true);
            }}/>
            <DeleteOutlined className="mx-3" onClick={()=>deleteTransaction(record)}/>
          </div>
        );
      },
      dataIndex: "action",
    },
  ];
  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="filter d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <h6>Select Frequency</h6>
            <Select
              value={frequency}
              onChange={(values) => setFrequency(values)}
            >
              <Select.Option value="7">Last 1 week</Select.Option>
              <Select.Option value="30">Last 1 month</Select.Option>
              <Select.Option value="365">Last 1 year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>

            {frequency === "custom" && (
              <div className="mt-2">
                <RangePicker
                  value={selectedRange}
                  onChange={(values) => setSelectedRange(values)}
                />
              </div>
            )}
          </div>
          <div className="d-flex flex-column mx-5">
            <h6>Select Type</h6>
            <Select value={type} onChange={(values) => setType(values)}>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </div>
        </div>
        <div className="d-flex">
          <div>
            <div className="view-switch mx-5">
              <UnorderedListOutlined
                className={`mx-3 ${
                  viewType === "table" ? "active-icon" : "inactive-icon"
                }`}
                onClick={() => {
                  setViewType("table");
                }}
                size={30}
              />
              <AreaChartOutlined
                className={`${
                  viewType === "analytics" ? "active-icon" : "inactive-icon"
                }`}
                onClick={() => {
                  setViewType("analytics");
                }}
                size={30}
              />
            </div>
          </div>
          <button
            className="primary"
            onClick={() => setShowAddEditTransactionModel(true)}
          >
            ADD NEW
          </button>
        </div>
      </div>
      <div className="table-analtics">
        {viewType === "table" ? (
          <div className="table">
            <Table columns={columns} dataSource={transactionsData} />
          </div>
        ) : (
          <Analytics transactions={transactionsData} />
        )}
      </div>
      {showAddEditTransactionModel && (
        <AddEditTransactions
          showAddEditTransactionModel={showAddEditTransactionModel}
          setShowAddEditTransactionModel={setShowAddEditTransactionModel}
          selectedItemForEdit={selectedItemForEdit}
          getTransaction={getTransaction}
          setSelectedItemForEdit={setSelectedItemForEdit}
        />
      )}
    </DefaultLayout>
  );
}
export default Home;
