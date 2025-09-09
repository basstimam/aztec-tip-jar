import 'dotenv/config';

// Server-side configuration (for scripts)
export const PXE_URL = process.env.PXE_URL || 'http://localhost:8080';
export const AZTEC_NODE_URL = process.env.AZTEC_NODE_URL!;
export const OWNER_ADDRESS = process.env.OWNER_ADDRESS!;
export const ACCEPTED_TOKEN = process.env.ACCEPTED_TOKEN!;
export const TIPJAR_ADDRESS = process.env.TIPJAR_ADDRESS || '';
export const PRIVATE_KEY = process.env.PRIVATE_KEY || '';

// Client-side configuration (for frontend)
export const CLIENT_CONFIG = {
  PXE_URL: process.env.NEXT_PUBLIC_PXE_URL || 'http://localhost:8080',
  TIPJAR_ADDRESS: process.env.NEXT_PUBLIC_TIPJAR_ADDRESS || '',
  ACCEPTED_TOKEN: process.env.NEXT_PUBLIC_ACCEPTED_TOKEN || '',
} as const;

