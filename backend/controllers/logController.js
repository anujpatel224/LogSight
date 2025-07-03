const { z } = require("zod")
const { loadLogs, saveLog } = require("../utils/datastore")
const { isFuzzyMatch } = require("../utils/fuzzyMatch")
const validLevels = ["error", "warn", "info", "debug"]

exports.ingestLog = (req, res) => {
  const logSchema = z.object({
    level: z.enum(["error", "warn", "info", "debug"]),
    message: z.string().min(1),
    resourceId: z.string().min(1),
    timestamp: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid ISO timestamp",
    }),
    traceId: z.string().min(1),
    spanId: z.string().min(1),
    commit: z.string().min(1),
    metadata: z.record(z.any()),
  })
  const log = logSchema.parse(req.body)
  const requiredFields = [
    "level",
    "message",
    "resourceId",
    "timestamp",
    "traceId",
    "spanId",
    "commit",
    "metadata",
  ]

  const isValid =
    requiredFields.every((f) => f in log) && validLevels.includes(log.level)

  if (!isValid) {
    return res.status(400).json({ error: "Invalid log format" })
  }

  try {
    saveLog(log)
    res.status(201).json(log)
  } catch (err) {
    res.status(500).json({ error: "Internal server error" })
  }
}

exports.getLogs = (req, res) => {
  const querySchema = z.object({
    level: z.enum(["error", "warn", "info", "debug", ""]).optional(),
    message: z.string().optional(),
    resourceId: z.string().optional(),
    timestamp_start: z.string().datetime().optional(),
    timestamp_end: z.string().datetime().optional(),
  })

  try {
    const logs = loadLogs()
    const { level, message, resourceId, timestamp_start, timestamp_end } = querySchema.parse(req.query)
    console.log(timestamp_start);
    console.log(timestamp_end)
    const filtered = logs.filter((log) => {
      if (level && log.level !== level) return false
      if (message && !isFuzzyMatch(log.message, message)) return false
      if (resourceId && !isFuzzyMatch(log.resourceId, resourceId)) return false
      if (
        timestamp_start &&
        new Date(log.timestamp).getTime() < new Date(timestamp_start).getTime()
      )
        return false
      if (
        timestamp_end &&
        new Date(log.timestamp).getTime() > new Date(timestamp_end).getTime()
      )
        return false

      return true
    })
    const sorted = filtered.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    )
    res.status(200).json(sorted)
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve logs" })
  }
}
