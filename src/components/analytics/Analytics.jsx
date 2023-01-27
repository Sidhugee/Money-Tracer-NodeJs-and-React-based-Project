import { Progress } from "antd";
import React from "react";
import "../../resources/analytics.css";

function Analytics({ transactions }) {
  const totalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomeTransactionPercentage =
    (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalEspenseTransactionPercentage =
    (totalExpenseTransactions.length / totalTransactions) * 100;

  const totalTurnOver = transactions.reduce(
    (acc, transactions) => acc + transactions.amount,
    0
  );
  const totalIncomeTurnOver = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transactions) => acc + transactions.amount, 0);
  const totalExpenseTurnOver = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transactions) => acc + transactions.amount, 0);
  console.log(totalExpenseTurnOver);
  const totalIncomeTurnOverPercentage =
    (totalIncomeTurnOver / totalTurnOver) * 100;
  const totalExpenseTurnOverPercentage =
    (totalExpenseTurnOver / totalTurnOver) * 100;

  const categories = [
    "salary",
    "freelancing",
    "entertainment",
    "food",
    "expense",
    "travel",
    "education",
    "medical",
    "tax",
  ];
  return (
    <div className="analytics ">
      <div className="row ">
        <div className="col-md-4 mt-3">
          <div className="transactions-count">
            <h4>Total Transactions :{totalTransactions}</h4>
            <hr />
            <h5>Income :{totalIncomeTransactions.length}</h5>
            <h5>Expense:{totalExpenseTransactions.length}</h5>

            <div className="progress-bars">
              <Progress
                className="mx-3"
                strokeColor="green"
                type="circle"
                percent={totalIncomeTransactionPercentage.toFixed(0)}
              />
              <Progress
                strokeColor="red"
                type="circle"
                percent={totalEspenseTransactionPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>

        <div className="col-md-4 mt-3">
          <div className="transactions-count">
            <h4>Total TurnOver :{totalTurnOver}</h4>
            <hr />
            <h5>Income :{totalIncomeTurnOver}</h5>
            <h5>Expense:{totalExpenseTurnOver}</h5>

            <div className="progress-bars">
              <Progress
                className="mx-3"
                strokeColor="green"
                type="circle"
                percent={totalIncomeTurnOverPercentage.toFixed(0)}
              />
              <Progress
                strokeColor="red"
                type="circle"
                percent={totalExpenseTurnOverPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div className="row">
        <div className="col-md-6">
          <div className="category-analysis">
            <h4>Income - category wise</h4>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type === "income" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className="category-card">
                    <h5>{category}</h5>
                    <Progress percent={((amount / totalIncomeTurnOver) * 100).toFixed(0)} />
                  </div>
                )
              );
            })}
          </div>
        </div>

        <div className="col-md-6">
          <div className="category-analysis">
            <h4>Expense - category wise</h4>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type === "expense" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
              amount >0 && (
                  <div className="category-card">
                    <h5>{category}</h5>
                    <Progress percent={((amount / totalExpenseTurnOver) * 100).toFixed(0)} />
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
