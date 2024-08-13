let otpStorage: Record<string, { name: string; otp: string; createdAt: number }> = {};

export const storeOtpAndUserDetails = async ({ name, email, otp }: { name: string; email: string; otp: string }) => {
  otpStorage[email] = { name, otp, createdAt: Date.now() };
  //console.log(otpStorage);
};

export const getStoredOtpAndUserDetails = async (email: string) => {
  return otpStorage[email];
};

export const clearStoredOtpAndUserDetails = async (email: string) => {
  delete otpStorage[email];
};

