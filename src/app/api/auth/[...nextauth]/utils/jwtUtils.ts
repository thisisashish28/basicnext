import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET as string; // Ensure you have this environment variable set

// Function to generate a JWT token
export function generateToken(payload: object, expiresIn: string | number = '1h'): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}
