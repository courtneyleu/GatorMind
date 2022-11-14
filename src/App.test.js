import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


describe("Teset login", ()=>{
  test("sign in process works", () => {
    render(<App />);
    expect(screen.getByRole("heading")).toHaveTextContent("Email Address");
    expect(screen.getByRole("combobox")).toHaveDisplayValue("Enter Email");
    expect(screen.getByRole("heading")).toHaveTextContent("Password");
    expect(screen.getByRole("combobox")).toHaveDisplayValue("Password");
        render(<Login/>);
        const buttonList = await screen.findAllByRole("button");
        expect(buttonList).toHaveLength(2);
  });

  test("test should fail login", ()=> {
      const testEmail = "test.com";
      expect(validateEmail(testEmail)).not.toBe(true);
  });

});



