import {render, screen} from "@testing-library/react";
import Loading from "../Loading";

describe("Loading", () => {
    it("should render the loading message as 'Loading...'", () => {
        render(<Loading />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
})