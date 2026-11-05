import { appendFile } from "node:fs/promises";


const LOG_PATH = process.env.NOTIFICATIONS_LOG_PATH || "notifications.log";

const fileNotifier = {
  async notify({ subject, body }) {
    const line = `${new Date().toISOString()} | ${subject} | ${body}\n`;
    await appendFile(LOG_PATH, line);
  },
};

export default fileNotifier;