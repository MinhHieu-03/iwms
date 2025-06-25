/**
 * Environment Configuration
 * 
 * This file centralizes all environment variable access to ensure type safety
 * and consistent usage across the application.
 */

interface EnvConfig {
  // API
  API_BASE_URL: string;
  WCS_BASE_URL: string;
  
  // Application
  APP_TITLE: string;
  APP_VERSION: string;
  
  // Features
  FEATURE_NOTIFICATIONS: boolean;
  FEATURE_WAREHOUSE_VISUALIZATION: boolean;
  
  // Auth
  AUTH_STORAGE_KEY: string;
  
  // Development
  DEV_SERVER_PORT: number;
  
  // Environment
  IS_DEV: boolean;
  IS_PROD: boolean;
}

function getEnvVariable(key: string, defaultValue: string = ''): string {
  return import.meta.env[`VITE_${key}`] || defaultValue;
}

function getBooleanEnvVariable(key: string, defaultValue: boolean = false): boolean {
  const value = import.meta.env[`VITE_${key}`];
  if (value === undefined || value === null) return defaultValue;
  return value === 'true' || value === '1' || value === 'yes';
}

function getNumberEnvVariable(key: string, defaultValue: number = 0): number {
  const value = import.meta.env[`VITE_${key}`];
  if (value === undefined || value === null) return defaultValue;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

const config: EnvConfig = {
  // API
  API_BASE_URL: getEnvVariable('API_BASE_URL', 'https://iwms-api.rostek.space'),
  WCS_BASE_URL: getEnvVariable('WCS_BASE_URL', 'http://35.184.194.168:3142'),
  
  // Application
  APP_TITLE: getEnvVariable('APP_TITLE', 'IWMS Dashboard'),
  APP_VERSION: getEnvVariable('APP_VERSION', '1.0.0'),
  
  // Features
  FEATURE_NOTIFICATIONS: getBooleanEnvVariable('FEATURE_NOTIFICATIONS', true),
  FEATURE_WAREHOUSE_VISUALIZATION: getBooleanEnvVariable('FEATURE_WAREHOUSE_VISUALIZATION', true),
  
  // Auth
  AUTH_STORAGE_KEY: getEnvVariable('AUTH_STORAGE_KEY', 'access_token'),
  
  // Development
  DEV_SERVER_PORT: getNumberEnvVariable('DEV_SERVER_PORT', 8080),
  
  // Environment
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
};

export default config;
