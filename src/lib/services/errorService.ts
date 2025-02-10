export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof Error) {
    return new ApiError(error.message, 500);
  }

  return new ApiError('Une erreur inattendue est survenue', 500);
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Une erreur inattendue est survenue';
};

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof Error && 
    (error.message.includes('network') || 
     error.message.includes('Failed to fetch') ||
     error.message.includes('Network request failed'));
};

export const formatApiError = (error: unknown): string => {
  if (isNetworkError(error)) {
    return 'Erreur de connexion. Veuillez vérifier votre connexion internet.';
  }

  return getErrorMessage(error);
}; 