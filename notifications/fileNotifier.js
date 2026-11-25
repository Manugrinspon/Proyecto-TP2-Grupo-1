import { appendFile } from "node:fs/promises";
import { NOTIFICATIONS_LOG_PATH } from "../config/config.js";

const fileNotifier = {
  async notify({ subject, body }) {
    const line = `${new Date().toISOString()} | ${subject} | ${body}\n`;
    await appendFile(NOTIFICATIONS_LOG_PATH, line);
  },
};

export default fileNotifier;