import axios from "axios";

export const getCustomers = () => {
    return axios.get("http://localhost:3001/customers");
};

export const getTransactionsOfSingleCustomer = (selectedCustomer) => {
    return axios.get(
        `http://localhost:3001/transactions/?customerId=${selectedCustomer}`
      );
};