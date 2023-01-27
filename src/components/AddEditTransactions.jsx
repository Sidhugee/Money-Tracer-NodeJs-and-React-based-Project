import React, { useState } from "react";
import { Form, Input, message, Modal, Select } from "antd";
import Spinner from "./Spinner";
import axios from "axios";

function AddEditTransactions({
  setShowAddEditTransactionModel,
  showAddEditTransactionModel,
  selectedItemForEdit,
  setSelectedItemForEdit,
  getTransaction,
}) {
  console.log(
    "🚀 ~ file: AddEditTransactions.jsx:11 ~ getTransaction",
    getTransaction
  );
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("SheyMoney-users"));
      setLoading(true);
      if (selectedItemForEdit) {
        await axios.post("/api/transaction/edit-transaction", {
          payload: { ...values, userid: user._id },
          transactionId: selectedItemForEdit._id,
        });

        getTransaction();
        message.success("Transaction Updated Successfully");
      } else {
        await axios.post("/api/transaction/add-transaction", {
          ...values,
          userid: user._id,
        });

        getTransaction();
        message.success("Transaction Added Successfully");
      }
      setShowAddEditTransactionModel(false);
      setSelectedItemForEdit(null)
      setLoading(false);
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
      setLoading(false);
    }
  };
  return (
    <Modal
      title={selectedItemForEdit ? "Edit Transaction" : "Add Transaction"}
      open={showAddEditTransactionModel}
      onCancel={() => setShowAddEditTransactionModel(false)}
      footer={false}
    >
      {loading && <Spinner />}
      <Form
        layout="vertical"
        className="transaction-form"
        onFinish={onFinish}
        initialValues={selectedItemForEdit}
      >
        <Form.Item label="Amount" name="amount">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Type" name="type">
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Select>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelancing">Freelancing</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            <Select.Option value="expense">Investment</Select.Option>
            <Select.Option value="travel">Travel</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="medical">Medical</Select.Option>
            <Select.Option value="tax">Tax</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>
        <Form.Item label="Reference" name="reference">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input type="text" />
        </Form.Item>
        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditTransactions;
