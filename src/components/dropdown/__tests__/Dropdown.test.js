import { render, screen } from "@testing-library/react";
import Dropdown from "../Dropdown";

describe("Dropdown", () => {
    it("should render the Dropdown without crashing", () => {
        render(<Dropdown options={[
            { id: 1, label: 'Nick' }]} handleDropdown={()=>{}} selected="1" />);
    });

    it("should correctly set default option", () => {
        render(<Dropdown options={[
            { id: 1, label: 'Nick' }]} handleDropdown={()=>{}} selected="" placeholder="Select a customer"/>);
        expect(screen.getByRole('option', {name: 'Select a customer'}).selected).toBe(true)
    });
})

