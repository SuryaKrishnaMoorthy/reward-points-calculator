import {render, screen} from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
    it("should render the heading as 'Rewards Calculator'", () => {
        render(<Header />);
        expect(screen.getByText(/Rewards Calculator/i)).toBeInTheDocument();
    });
})