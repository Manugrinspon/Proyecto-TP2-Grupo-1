
function createMultiNotifier(notifiers) {
  return {
    async notify(message) {
      const results = await Promise.allSettled(notifiers.map((n) => n.notify(message)));
      results.forEach((r) => {
        if (r.status === "rejected") {
          console.error(`[Notificaciones] Un notificador falló: ${r.reason?.message ?? r.reason}`);
        }
      });
    },
  };
}

export default createMultiNotifier;