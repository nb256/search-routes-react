import CitySelection from "./CitySelection";
import { render, screen, fireEvent } from "@testing-library/react";

describe("CityInput", () => {
  it("should render", () => {
    const label = "testing this";
    render(<CitySelection label={label} />);
    expect(screen.getAllByText(label)[0]).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("should render with initial value", () => {
    const label = "testing this";
    const initialValue = "testing this";
    render(<CitySelection label={label} initialValue={initialValue} />);
    expect(screen.getAllByText(label)[0]).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue(initialValue);
  });

  it("should show loading while typing", () => {
    const label = "testing this";
    render(<CitySelection label={label} />);
    expect(screen.getAllByText(label)[0]).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    const selection = screen.getByRole("combobox");
    fireEvent.change(selection, { target: { value: "testing" } });
    expect(screen.getByText("Loading…")).toBeInTheDocument();
  });
});
