/**
 * Standardized Response Utilities & Helpers for PrimordiaOS Workers
 */

export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Primordia-Key, X-Bridge-Signature",
  "Access-Control-Max-Age": "86400"
};

export function jsonResponse<T>(data: T, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      ...CORS_HEADERS,
      ...headers
    }
  });
}

export function errorResponse(message: string, status = 400, details?: any): Response {
  return jsonResponse(
    {
      success: false,
      error: message,
      details: details || null,
      timestamp: new Date().toISOString()
    },
    status
  );
}

export function handleCorsPreflight(): Response {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}
