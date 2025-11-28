import { toast } from "react-toastify";
import { mapTurnoToAppointment } from "../utils/appointments";

const API_BASE = "http://localhost:3000/api";

function getAuthHeaders() {
    const token = localStorage.getItem("token");
    if (!token) return {};
    return {
        Authorization: `Bearer ${token}`,
    };
}

export function createAppointmentsHandlers({
    obrasSociales,
    doctorName,
    setAppointments,
}) {
    const handleAddAppointment = async (appointment) => {
        const toastId = toast.loading("Reservando turno...");
        try {
            const payload = {
                nombre_paciente: appointment.nombre,
                telefono: appointment.telefono || "",
                email: appointment.email || "",
                obra_social_id:
                    typeof appointment.obraSocial === "object"
                        ? appointment.obraSocial.id
                        : appointment.obraSocial,
                fecha: appointment.start.toISOString(),
                hora: appointment.start.toTimeString().slice(0, 5),
                estado: appointment.estado || "Reservado",
            };

            const res = await fetch(`${API_BASE}/turnos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const created = await res.json();

            const mapped = mapTurnoToAppointment(created, obrasSociales, doctorName);

            try {
                const all = await fetch(`${API_BASE}/turnos`);
                const allData = await all.json();
                const remapped = (allData || []).map((t) =>
                    mapTurnoToAppointment(t, obrasSociales, doctorName)
                );
                setAppointments(remapped);
            } catch (e) {
                setAppointments((prev) => [...prev, mapped]);
            }

            toast.update(toastId, {
                render: "Turno reservado correctamente",
                type: "success",
                isLoading: false,
                autoClose: 2500,
            });
        } catch (e) {
            console.error(e);
            toast.update(toastId, {
                render: "No se pudo reservar el turno",
                type: "error",
                isLoading: false,
                autoClose: 3500,
            });
        }
    };

    const handleEditAppointment = async (id, newEstado) => {
        const toastId = toast.loading("Procesando cambio de estado...");
        try {
            const res = await fetch(`${API_BASE}/turnos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", ...getAuthHeaders() },
                body: JSON.stringify({ estado: newEstado }),
            });
            const updated = await res.json();

            const mapped = mapTurnoToAppointment(updated, obrasSociales, doctorName);

            setAppointments((prev) => prev.map((a) => (a.id === id ? mapped : a)));
            toast.update(toastId, {
                render: "Se modificó el estado del turno",
                type: "success",
                isLoading: false,
                autoClose: 2200,
            });
        } catch (e) {
            console.error(e);
            toast.update(toastId, {
                render: "No se pudo modificar el estado del turno",
                type: "error",
                isLoading: false,
                autoClose: 3500,
            });
        }
    };

    const handleDeleteAppointment = async (id) => {
        const toastId = toast.loading("Eliminando turno...");
        try {
            const res = await fetch(`${API_BASE}/turnos/${id}`, {
                method: "DELETE",
                headers: { ...getAuthHeaders(), },
            });
            if (res.status === 204 || res.ok) {
                setAppointments((prev) => prev.filter((app) => app.id !== id));
                toast.update(toastId, {
                    render: "Turno eliminado correctamente",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                });
            } else {
                toast.update(toastId, {
                    render: "No se pudo eliminar el turno",
                    type: "error",
                    isLoading: false,
                    autoClose: 3500,
                });
            }
        } catch (e) {
            console.error(e);
            toast.update(toastId, {
                render: "No se pudo eliminar el turno",
                type: "error",
                isLoading: false,
                autoClose: 3500,
            });
        }
    };

    return {
        handleAddAppointment,
        handleEditAppointment,
        handleDeleteAppointment,
    };
}
