import LoginForm from '@/modules/auth/components/LoginForm';
import { render, screen, fireEvent } from '@testing-library/react';

test('allows user to input email and password, then submit the form', () => {
    const handleSubmit = jest.fn(); // Mock function

    render(<LoginForm onSubmit={handleSubmit} />);

    // Find email and password fields
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Login');

    // Simulate user typing
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit form
    fireEvent.click(submitButton);

    // Expect the form to be submitted with correct values
    expect(handleSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
    });

    expect(handleSubmit).toHaveBeenCalledTimes(1);
});
