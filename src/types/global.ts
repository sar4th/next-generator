export interface ApiError {
    response: {
        data: {
            errorMessage?: string;
            statusCode?: number;
        };
    };
    request?: any;
    status?: number;
    headers?: Record<string, string>;
}

export interface ErrorResponse {
    error: ApiError;
}

export type ToastType = 'error' | 'success' | 'info' | 'warning';

export interface ToastOptions {
    autoClose: number;
    position:
        | 'top-right'
        | 'top-left'
        | 'top-center'
        | 'bottom-right'
        | 'bottom-left'
        | 'bottom-center';
    className?: string;
}
