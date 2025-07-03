export const logs = [
    {
      level: "error",
      message: "Failed to connect to database.",
      resourceId: "server-1234",
      timestamp: "2025-07-03T09:15:00Z",
      traceId: "abc-xyz-001",
      spanId: "span-001",
      commit: "5e5342f",
      metadata: {
        parentResourceId: "server-9999"
      }
    },
    {
      level: "info",
      message: "User successfully logged in.",
      resourceId: "auth-service",
      timestamp: "2025-07-03T09:16:45Z",
      traceId: "abc-xyz-002",
      spanId: "span-002",
      commit: "5e5342f",
      metadata: {
        parentResourceId: "load-balancer"
      }
    },
    {
      level: "warn",
      message: "CPU usage exceeded threshold.",
      resourceId: "monitoring-agent",
      timestamp: "2025-07-03T09:18:30Z",
      traceId: "abc-xyz-003",
      spanId: "span-003",
      commit: "5e5342f",
      metadata: {
        parentResourceId: "server-4321"
      }
    }
  ];