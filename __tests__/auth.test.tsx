import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/page";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import ErrorPage from "@/app/api/auth/custom-error/page";
import { useSearchParams } from 'next/navigation';

// Erstelle eine Mock-Sitzung
const mockSession: Session = {
  user: { email: "test@example.com", name: "TestUser", image: "" },
  expires: "2024-12-31T23:59:59.999Z", 
  
};
// Mock useSearchParams
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

function renderWithSessionProvider(
  component: React.ReactNode,
  session: Session | null = null
) {
  return render(
    <SessionProvider session={session}>{component}</SessionProvider>
  );
}

describe("Page", () => {
  it("renders a heading", () => {
    renderWithSessionProvider(<Page />);
    const heading = screen.getByRole("heading", { level: 1 });
    /*     screen.debug() */
    expect(heading).toBeInTheDocument();
  });

  it("renders sign in button when user is not authenticated (Session = null)", () => {
    renderWithSessionProvider(<Page />, null);
    const signInBtn = screen.getByText("Sign in");
    expect(signInBtn).toBeInTheDocument();
  });
});
describe("Page", () => {
  it("renders user information when user is authenticated", () => {
    renderWithSessionProvider(<Page />, mockSession);
    const userName = screen.getByText(/TestUser/);
    const userEmail = screen.getByText(/test@example\.com/);

    expect(userName).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
  });

  it("renders sign out button when user is authenticated", () => {
    renderWithSessionProvider(<Page />, mockSession);
    const signOutBtn = screen.getByText("Sign out");
    expect(signOutBtn).toBeInTheDocument();
  });
  it('renders error message when session provider encounters an error of OAuthAccountNotLinked', () => {
    // define errormessage in queryparams to be tested
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('OAuthAccountNotLinked'),
    });

    render(<ErrorPage />);

    const errorMessage = screen.getByText('Das Konto ist nicht mit einem OAuth-Provider verknüpft.');
    expect(errorMessage).toBeInTheDocument();
  });
});
