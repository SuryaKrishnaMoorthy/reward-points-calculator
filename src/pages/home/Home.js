import React, { useEffect, useState } from "react";
import Dropdown from "../../components/dropdown/Dropdown";
import RewardsTable from "../../components/table/RewardsTable";
import Loading from "../../components/loading/Loading";
import { calculateMonthlyRewards, Months } from "../../utils";
import { getCustomers, getTransactionsOfSingleCustomer } from "../../apis/customerApi";
import "./home.css";

// Change Months to dropdown format
const months = Object.values(Months).map((month, index) => ({
  id: index,
  label: month,
}));

function Home() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [rewards, setRewards] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Get the list of customers
    const getCustomersList = async () => {
      try {
        setIsLoading(true);
        const res = await getCustomers();
        const customerDropdownData = res.data.map(({ id, customerName }) => ({
          id,
          label: customerName,
        }));
        setCustomers(customerDropdownData);
        setError(null);
      } catch (error) {
        setIsLoading(false);
        setCustomers([]);
        setError("Something went wrong!");
        setCustomers([]);
      } finally {
        setIsLoading(false);
      }
    };
    getCustomersList();
  }, []);

  useEffect(() => {
    // Get all the transactions of specified customer
    const getCustomerTransactions = async () => {
      try {
        setIsLoading(true);
        const res = await getTransactionsOfSingleCustomer(selectedCustomer);
        setTransactions(res.data);
        setIsLoading(false);
        const rewards = calculateMonthlyRewards(res.data, selectedMonth);
        setRewards(rewards);
      } catch (error) {
        setIsLoading(false);
        setTransactions([]);
        console.log(error.message);
        setError("Something went wrong!");
        setTransactions([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedCustomer) {
      getCustomerTransactions();
    }
  }, [selectedCustomer]);

  useEffect(() => {
    // Get the total rewards of 3 months
    const rewards = calculateMonthlyRewards(transactions, selectedMonth);
    setRewards(rewards);
  }, [selectedMonth]);

  const handleCustomer = (e) => {
    setSelectedCustomer(e.target.value);
  };

  const handleMonth = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <main className="home">
      <section className="dropdown-section">
        {/* Customer dropdown */}
        <Dropdown
          options={customers}
          handleDropdown={handleCustomer}
          selected={selectedCustomer}
          placeholder="Select a customer"
        />
        {/* Months dropdown if customer is selected */}
        {selectedCustomer && (
          <Dropdown
            options={months}
            handleDropdown={handleMonth}
            selected={selectedMonth}
            placeholder="Select a month"
          />
        )}
      </section>

      {/* Rewards table to display reward points of 3 months */}
      <section>
        {selectedCustomer && rewards && <RewardsTable rewards={rewards} />}
      </section>
      {isLoading && <Loading />}
      {error && <p style={{ textAlign: "center", color: "salmon" }}>{error}</p>}
    </main>
  );
}

export default Home;
