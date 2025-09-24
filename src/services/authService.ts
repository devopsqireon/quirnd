// Define the structure for the API response for better type safety
interface ApiResponse {
  success: boolean;
  message: string;
  sessionId?: string;
  email?: string;
  expiresAt?: string;
  nextStep?: string;
  attemptCount?: number;
  maxAttempts?: number;
}

// Define the structure for the data being sent to the API
interface OnboardingData {
  email: string;
  clientIp: string;
  userAgent: string;
  consentGiven: boolean;
  marketingOptIn: boolean;
}

/**
 * Sends a request to the backend to initiate the sign-up process.
 * This will trigger the backend to send a verification code to the user's email.
 *
 * @param onboardingData The complete data required for the onboarding process.
 * @returns A promise that resolves to the API response.
 */
export const requestVerificationCode = async (onboardingData: OnboardingData): Promise<ApiResponse> => {
  // Construct the full API endpoint URL from the environment variable and the provided path
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/iaums/onboarding/start`;

  try {
    // Log the data being sent for easier debugging
    console.log('Sending this data to API:', JSON.stringify(onboardingData, null, 2));

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(onboardingData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      // Handle non-successful responses (e.g., 400, 409, 500)
      // Throw an error with the message from the backend
      throw new Error(responseData.message || responseData.error || 'An unexpected error occurred.');
    }

    // If the request was successful, return the full response data
    return responseData;

  } catch (error) {
    console.error('API Error:', error);
    // Re-throw the error so the form component can catch it
    if (error instanceof Error) {
        throw error;
    }
    throw new Error('An unknown error occurred during the API call.');
  }
};

