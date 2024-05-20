import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '../src/app/page';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

// Erstelle eine Mock-Sitzung
const mockSession: Session = {
  user: { email: 'test@example.com', name: 'Test User', image: '' },
  expires: '2022-12-31T23:59:59.999Z',
};

function renderWithSessionProvider(component: React.ReactNode, session: Session | null = null) {
  return render(
    <SessionProvider session={session}>
      {component}
    </SessionProvider>
  );
}
describe('Page', () => { 
  it('renders a heading', () => {
    renderWithSessionProvider(<Page />);
    const heading = screen.getByRole('heading', { level: 1 });
    screen.debug()
    expect(heading).toBeInTheDocument();
  });

  
  it('renders sign in button when user is not authenticated (Session = null)', () => {
    renderWithSessionProvider(<Page />, null);
    const signInBtn = screen.getByText('Sign in');
    expect(signInBtn).toBeInTheDocument();
  });
});
