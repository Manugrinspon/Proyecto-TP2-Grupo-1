import EVENTS from "../events/eventNames.js";

function safe(eventName, handler) {
  return async (payload) => {
    try {
      await handler(payload);
    } catch (err) {
      console.error(`[Alertas] Falló el listener de "${eventName}": ${err.message}`);
    }
  };
}

function registerAlertListeners(bus, notifier) {

    bus.on(
    EVENTS.INSCRIPCION_CREADA,
    safe(EVENTS.INSCRIPCION_CREADA, ({ alumno, curso }) =>
      notifier.notify({
        subject: "Nueva inscripción",
        body: `${alumno.nombre} ${alumno.apellido} se inscribió en "${curso.nombre}" (cupo disponible: ${curso.cupo_disponible}/${curso.cupo_maximo})`,
      })
    )
  );

  bus.on(
    EVENTS.CURSO_CUPO_BAJO,
    safe(EVENTS.CURSO_CUPO_BAJO, (curso) =>
      notifier.notify({
        subject: "Cupo bajo",
        body: `Al curso "${curso.nombre}" le quedan ${curso.cupo_disponible} lugares de ${curso.cupo_maximo}`,
      })
    )
  );
}

export default registerAlertListeners;