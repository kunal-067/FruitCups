import axios from "axios";

const customerId = process.env.MESSAGECENTRAL_CUSTOMER_ID || 'C-98D612E3E848484';
const authToken = process.env.MESSAGECENTRAL_AUTH_TOKEN || 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLTk4RDYxMkUzRTg0ODQ4NCIsImlhdCI6MTc1Nzc3Nzg4NiwiZXhwIjoxOTE1NDU3ODg2fQ.vqOw5w0lOkCbU6eV70FS5OVW44ApfbbcMQhMPk5LJMAFtP2XsBC_49vVYf-0daVrAWwh1jUneLDeL6gL8-j-8Q'; // Note: This should be dynamically generated as it expires; consider adding a function to refresh it

const otpSendingUri = `${process.env.MESSAGECENTRAL_BASE_URL || 'https://cpaas.messagecentral.com'}/verification/v3/send?countryCode=91&customerId=${customerId}&flowType=SMS`;

export async function sendOtp(mobileNumber) {
  try {
    const response = await axios.post(`${otpSendingUri}&mobileNumber=${mobileNumber}`, {}, {
      headers: {
        'authToken': authToken
      }
    });

    // Check for success based on response code from doc (200 = SUCCESS)
    if (response.status === 200 && response.data.responseCode === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to send OTP');
    }
  } catch (error) {
    let errMessage = error.message || 'Error in generating OTP';
    let errStatus = 500;
    let errDetails = { message: error.message };

    if (error.response) {
      errStatus = error.response.status;
      errDetails = error.response.data || errDetails;
      switch (error.response.data.responseCode) {
        case 400:
          errMessage = 'Bad request - Invalid parameters';
          break;
        case 409:
          errMessage = 'Duplicate resource - OTP already sent';
          break;
        case 500:
          errMessage = 'Server error - Try again later';
          break;
        case 501:
          errMessage = 'Invalid customer ID';
          break;
        case 511:
          errMessage = 'Invalid country code';
          break;
        default:
          errMessage = errDetails.message || errMessage;
      }
    } else if (error.request) {
      errMessage = 'No response from server - Network issue';
      errStatus = 502;
    } else if (error.name === 'TokenExpiredError') {
      errMessage = 'Authentication token expired';
      errStatus = 401;
    }

    console.error('Send OTP error:', { status: errStatus, details: errDetails });
    const err = new Error(errMessage);
    err.status = errStatus;
    err.details = errDetails;
    throw err;
  }
}

const otpVerifyingUri = `${process.env.MESSAGECENTRAL_BASE_URL || 'https://cpaas.messagecentral.com'}/verification/v3/validateOtp?countryCode=91&customerId=${customerId}`;
export async function verifyOtp(otp, mobileNumber, verificationId) {
  try {
    const response = await axios.get(`${otpVerifyingUri}&verificationId=${verificationId}&mobileNumber=${mobileNumber}&code=${otp}`, {
      headers: {
        'authToken': authToken
      }
    });

    // Check for success based on response code from doc (200 = SUCCESS)
    if (response.status === 200 && response.data.responseCode === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to verify OTP');
    }
  } catch (error) {
    console.log('Verify OTP error details:', {
      message: error.message,
      status: error.response?.status,
      responseData: error.response?.data,
      responseCode: error.response?.data?.responseCode,
    }, 'uilojodoisod');

    let errMessage = error.message || 'Error in verifying OTP';
    let errStatus = 500;
    let errDetails = { message: error.message };

    if (error.response) {
      errStatus = error.response.status;
      errDetails = error.response.data || errDetails;

      // Check message or responseCode for specific cases
      const errorMsg = errDetails.message?.toLowerCase() || '';
      const responseCode = errDetails.responseCode;

      if (responseCode === 705 || errorMsg.includes('verification expired')) {
        errMessage = 'Verification expired';
        errStatus = 400; // Typical for expired verification
      } else if (responseCode === 702 || errorMsg.includes('wrong otp')) {
        errMessage = 'Wrong OTP provided';
        errStatus = 400;
      } else if (responseCode === 700 || errorMsg.includes('verification failed')) {
        errMessage = 'Verification failed - Incorrect OTP';
        errStatus = 400;
      } else if (responseCode === 703 || errorMsg.includes('already verified')) {
        errMessage = 'Already verified';
        errStatus = 400;
      } else if (responseCode === 505 || errorMsg.includes('invalid verification')) {
        errMessage = 'Invalid verification ID';
        errStatus = 404;
      } else if (responseCode === 400) {
        errMessage = 'Bad request - Invalid parameters';
        errStatus = 400;
      } else if (responseCode === 500) {
        errMessage = 'Server error - Try again later';
        errStatus = 500;
      } else {
        errMessage = errDetails.message || errMessage;
      }
    } else if (error.request) {
      errMessage = 'No response from server - Network issue';
      errStatus = 502;
    } else if (error.name === 'TokenExpiredError') {
      errMessage = 'Authentication token expired';
      errStatus = 401;
    }

    console.error('Verify OTP error:', { status: errStatus, details: errDetails });
    const err = new Error(errMessage);
    err.status = errStatus;
    err.details = errDetails;
    throw err;
  }
}