import { NOTIFIER_TYPE } from "../config/config.js";
import consoleNotifier from "./consoleNotifier.js";
import fileNotifier from "./fileNotifier.js";
import createMultiNotifier from "./multiNotifier.js";

function getNotifier() {
  if (NOTIFIER_TYPE === "file") {
    console.log("[Notificaciones] Usando archivo (notifications.log)");
    return fileNotifier;
  }

  if (NOTIFIER_TYPE === "both") {
    console.log("[Notificaciones] Usando consola y archivo");
    return createMultiNotifier([consoleNotifier, fileNotifier]);
  }
  console.log("[Notificaciones] Usando consola");
  return consoleNotifier;
}

export { getNotifier };