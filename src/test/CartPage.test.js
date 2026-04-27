import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartPage from "@/Components/Cart";

describe("CartPage Component", () => {
  let mockCartItems;
  let mockQuantityUpdate;

  beforeEach(() => {
    mockCartItems = [
      { id: "1", 
        prod_name: "Test Product", 
        unit_price: 100, 
        quantity: 2, 
        total_price: 200, 
        img_src: "/test-image.jpg" },
    ];

    mockQuantityUpdate = jest.fn();
  });

  it("renders cart items correctly", () => {
    render(<CartPage orderSumbit={mockCartItems} quantityUpdate={mockQuantityUpdate} />);
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("£200", { selector: "p" })).toBeInTheDocument();
  });

  it("increments item quantity correctly", async () => {
    render(<CartPage orderSumbit={mockCartItems} quantityUpdate={mockQuantityUpdate} />);
    
    const incrementButton = screen.getByRole("button", { name: "+" });
    const quantityInput = screen.getByDisplayValue("2");

    await userEvent.click(incrementButton);

    // Check if input value updated
    expect(quantityInput.value).toBe("3");
    // Check if total price updated in cart item
    expect(screen.getByText("£300", { selector: "p" })).toBeInTheDocument();
    // Check if quantityUpdate callback was called
    expect(mockQuantityUpdate).toHaveBeenCalledWith({ id: "1", quantity: 3, total_price: 300 });
  });

it("decrements item quantity correctly", async () => {
  render(<CartPage orderSumbit={mockCartItems} quantityUpdate={mockQuantityUpdate} />);
  
  const decrementButton = screen.getByRole("button", { name: "-" });
  const quantityInput = screen.getByDisplayValue("2");

  await userEvent.click(decrementButton);

  // Check input value updated
  expect(quantityInput.value).toBe("1");

  // Find total price element specifically
  const prices = screen.getAllByText(/£\s*100/);
  const totalPrice = prices.find(price =>
    price.className.includes('text-sm font-semibold')
  );
  expect(totalPrice).toBeInTheDocument();

  // Check callback
  expect(mockQuantityUpdate).toHaveBeenCalledWith({ id: "1", quantity: 1, total_price: 100 });
});


});
