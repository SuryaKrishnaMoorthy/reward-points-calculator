import { render, waitFor, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Home from "../Home";
import { getCustomers } from "../../../apis/customerApi";

jest.mock("../../../apis/customerApi");

describe("Home", () => {

    // After each test clear the mock
    beforeEach(() => jest.clearAllMocks());
    
    it('should correctly set default option', () => {
        render(<Home />)
        expect(screen.getByRole('option', { name: 'Select a customer' }).selected).toBe(true)
    });

    it('should display the correct number of customer options', async () => {
        getCustomers.mockResolvedValue({
            data: [{ "id": 1, "customerName": "Nick"  }],
          });
        render(<Home />);
        await waitFor(() => expect(screen.getByText("Nick")).toBeInTheDocument());
        expect(await (waitFor(() => screen.findAllByRole('option')))).toHaveLength(2) // (Select a customer, Nick)
    });

    it('should allow user to change customer', async () => {
        getCustomers.mockResolvedValue({
            data: [{ "id": 1, "customerName": "Nick"  }],
            });
        render(<Home />);
        await waitFor(() => expect(screen.getByText("Nick")).toBeInTheDocument());
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByRole('combobox'),
            // Find and select the Nick option, like a real user would.
            screen.getByRole('option', {name: 'Nick'}),
        )
        expect(screen.getByRole('option', {name: 'Nick'}).selected).toBe(true)
    });

    it('should display Month dropdown when a customer is selected', async () => {
        getCustomers.mockResolvedValue({
            data: [{ "id": 1, "customerName": "Nick"  }],
            });
        render(<Home />);
        await waitFor(() => expect(screen.getByText("Nick")).toBeInTheDocument());
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByRole('combobox'),
            // Find and select the Nick option, like a real user would.
            screen.getByRole('option', {name: 'Nick'}),
        )
        expect(screen.getByText('Select a Month').toBeInTheDocument)
    });

    it('should display Rewards table when a customer is selected', async () => {
        getCustomers.mockResolvedValue({
            data: [{ "id": 1, "customerName": "Nick"  }],
            });
        render(<Home />);
        await waitFor(() => expect(screen.getByText("Nick")).toBeInTheDocument());
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            screen.getByRole('combobox'),
            // Find and select the Nick option, like a real user would.
            screen.getByRole('option', {name: 'Nick'}),
        )
        expect(screen.getByRole('table').toBeInTheDocument)
    });
})


