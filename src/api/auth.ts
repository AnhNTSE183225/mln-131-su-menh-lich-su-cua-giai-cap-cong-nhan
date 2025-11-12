const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export type RegisterRequest = {
    username: string;
    password: string;
    displayName: string;
};

export type LoginRequest = {
    username: string;
    password: string;
};

export type AuthResponse = {
    userId: string;
    username: string;
    displayName: string;
    token: string;
};

/**
 * Register a new user
 */
export async function register(request: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Registration failed');
    }

    return response.json();
}

/**
 * Login with username and password
 */
export async function login(request: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Login failed');
    }

    return response.json();
}

