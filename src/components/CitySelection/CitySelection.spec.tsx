import CitySelection from "./CitySelection";
import { render, screen } from "@testing-library/react";

describe("CityInput", () => {
  it("should render", () => {
    const label = "testing this";
    render(<CitySelection label={label} />);
    expect(screen.getAllByText(label)[0]).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
