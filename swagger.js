export default {
  openapi: "3.0.0",
  info: {
    title: "Ticket Service API",
    version: "1.0.0"
  },
  paths: {
    "/purchase": {
      post: {
        summary: "Purchase tickets",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  accountId: { type: "integer" },
                  adult: { type: "integer" },
                  child: { type: "integer" },
                  infant: { type: "integer" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Success" },
          400: { description: "Invalid request" }
        }
      }
    },
    "/health": {
      get: {
        summary: "Health check",
        responses: {
          200: { description: "OK" }
        }
      }
    }
  }
};