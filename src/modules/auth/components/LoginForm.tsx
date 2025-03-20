import Button from '@/components/ui/Button/button';
import { useState } from 'react';

const LoginForm = ({
    onSubmit
}: {
    onSubmit: (data: { email: string; password: string }) => void;
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ email, password });
            }}
        >
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Login</Button>
        </form>
    );
};

export default LoginForm;
