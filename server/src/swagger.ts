export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "todo api",
    version: "1.0",
  },
  paths: {
    "/api/todos": {
      get: {
        summary: "list todos",
        responses: {
          "200": {
            description: "ok",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Todo" },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "create todo",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title"],
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Todo" },
              },
            },
          },
          "400": { description: "bad title" },
        },
      },
    },
    "/api/todos/{id}": {
      put: {
        summary: "update todo",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "ok",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Todo" },
              },
            },
          },
          "400": { description: "bad title" },
          "404": { description: "not found" },
        },
      },
      delete: {
        summary: "delete todo",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "204": { description: "deleted" },
          "404": { description: "not found" },
        },
      },
    },
    "/api/todos/{id}/done": {
      patch: {
        summary: "toggle done",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "ok",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Todo" },
              },
            },
          },
          "404": { description: "not found" },
        },
      },
    },
  },
  components: {
    schemas: {
      Todo: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          done: { type: "boolean" },
        },
      },
    },
  },
};
