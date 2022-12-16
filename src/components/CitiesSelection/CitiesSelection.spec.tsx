import { fireEvent, render, screen } from "@testing-library/react";
import CitiesSelection from "./CitiesSelection";

describe("CitiesSelection", () => {
  it("should render", () => {
    render(<CitiesSelection />);
  });

  it("should show 2 CitySelection components on initial load", () => {
    render(<CitiesSelection />);
    const citySelections = screen.getAllByRole("combobox");
    expect(citySelections.length).toBe(2);
  });

  it("should show 3 CitySelection components after clicking on add intermediate city button", () => {
    render(<CitiesSelection />);
    const addIntermediateCityButton = screen.getByText(
      "Add an intermediate city"
    );
    fireEvent.click(addIntermediateCityButton);
    const citySelections = screen.getAllByRole("combobox");
    expect(citySelections.length).toBe(3);
  });

  it("should show 2 CitySelection components after clicking on remove intermediate city button", () => {
    render(<CitiesSelection />);
    const addIntermediateCityButton = screen.getByText(
      "Add an intermediate city"
    );
    fireEvent.click(addIntermediateCityButton);
    const removeIntermediateCityButton = screen.getByText(
      "Remove an intermediate city"
    );
    fireEvent.click(removeIntermediateCityButton);
    const citySelections = screen.getAllByRole("combobox");
    expect(citySelections.length).toBe(2);
  });
});
