export function mapTurnoToAppointment(
    t,
    obras = [],
    doctorNameFallback = "Dr. John Gosling"
) {
    function parseFechaHora(fecha, hora) {
        if (!fecha) return new Date();

        if (String(fecha).includes("T") || String(fecha).includes(" ")) {
            const dt = new Date(fecha);
            if (!isNaN(dt.getTime())) {
                if (!hora) return dt;
                const y = dt.getFullYear();
                const m = dt.getMonth() + 1;
                const d = dt.getDate();
                fecha = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(
                    2,
                    "0"
                )}`;
            }
        }

        const parts = String(fecha).split("-");
        if (parts.length !== 3) {
            const dt = new Date(fecha);
            if (!isNaN(dt.getTime())) return dt;
            return new Date();
        }

        const [y, m, d] = parts;
        let hh = 0,
            mm = 0,
            ss = 0;
        if (hora) {
            const match = String(hora).match(/^(\d{2}:\d{2}(?::\d{2})?)/);
            const timePart = match ? match[1] : String(hora);
            const tparts = timePart.split(":");
            hh = Number(tparts[0] || 0);
            mm = Number(tparts[1] || 0);
            ss = Number(tparts[2] || 0);
        }

        return new Date(Number(y), Number(m) - 1, Number(d), hh, mm, ss);
    }

    const start = parseFechaHora(t.fecha, t.hora);
    const obraObj =
        obras.find((o) => Number(o.id) === Number(t.obra_social_id)) || null;

    return {
        id: t.id,
        nombre: t.nombre_paciente || "",
        nombreMedico: t.nombre_medico || doctorNameFallback,
        fecha: start.toLocaleString("es-AR", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
        }),
        obraSocial: obraObj
            ? obraObj.nombre
            : t.obra_social_nombre || t.obra_social_id,
        obraSocialId: t.obra_social_id,
        estado: t.estado,
        title: `Consulta ${t.nombre_paciente || ""}`,
        start,
        end: new Date(start.getTime() + 30 * 60 * 1000),
        email: t.email,
    };
}
