import {
    ApiError,
    ErrorResponse,
    ToastOptions,
    ToastType
} from '../types/global';

export function useApiErrorHandler() {
    const displayToast = (
        type: ToastType,
        message: string,
        options: ToastOptions
    ) => {
        console.log(message);
    };

    const handleError = (error: unknown) => {
        const defaultToastOptions: ToastOptions = {
            autoClose: 5000,
            position: 'bottom-right',
            className: 'custom-toast-error'
        };

        if (isApiError(error)) {
            const { errorMessage, statusCode } = error.response.data;
            const displayMessage = errorMessage || 'An error occurred';

            displayToast('error', displayMessage, defaultToastOptions);
        } else if (isErrorResponse(error)) {
            displayToast(
                'error',
                'No response from server. Please check your internet connection.',
                defaultToastOptions
            );
        } else {
            return;
        }
    };

    const isApiError = (error: unknown): error is ApiError => {
        return (error as ApiError).response !== undefined;
    };

    const isErrorResponse = (error: unknown): error is ErrorResponse => {
        return (error as ErrorResponse).error !== undefined;
    };

    return handleError;
}
