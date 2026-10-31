const PORT = Number(process.env.PORT) || 8000;
const NODE_ENV = process.env.NODE_ENV || "development";
const PERSISTENCE_TYPE = process.env.PERSISTENCE_TYPE || "memory";

const NOTIFIER_TYPE = process.env.NOTIFIER_TYPE || "console";

export { PORT, NODE_ENV, PERSISTENCE_TYPE, NOTIFIER_TYPE };