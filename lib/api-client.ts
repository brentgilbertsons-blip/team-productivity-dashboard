/**
 * API Client for Team Productivity Dashboard
 * Handles all communication with the backend API
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface RequestOptions extends RequestInit {
  token?: string;
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error(`API Request Failed: ${endpoint}`, error);
    throw error;
  }
}

// Health check
export async function healthCheck(): Promise<{ status: string }> {
  return apiRequest('/health');
}

// Teams API
export async function getTeams(token: string) {
  return apiRequest('/teams', { token });
}

export async function createTeam(name: string, token: string) {
  return apiRequest('/teams', {
    token,
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export async function getTeam(teamId: string, token: string) {
  return apiRequest(`/teams/${teamId}`, { token });
}

// Metrics API
export interface MetricsResponse {
  velocity: {
    current: number;
    trend: number[];
  };
  cycleTime: {
    average: number;
    distribution: Record<string, number>;
  };
  burndown: {
    day: number[];
    ideal: number[];
  };
  blockedItems: Array<{
    issueId: string;
    title: string;
    blockedSince: string;
  }>;
}

export async function getTeamMetrics(
  teamId: string,
  token: string
): Promise<MetricsResponse> {
  return apiRequest(`/teams/${teamId}/metrics`, { token });
}

// Auth API (when implemented)
export async function login(email: string, password: string) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function signup(email: string, password: string, name: string) {
  return apiRequest('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  });
}
