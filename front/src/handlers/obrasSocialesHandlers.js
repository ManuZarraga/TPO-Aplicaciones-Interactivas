import { toast } from "react-toastify";

const API_BASE = "http://localhost:3000/api";

function getAuthHeaders() {
    const token = localStorage.getItem("token");
    if (!token) return {};
    return {
        Authorization: `Bearer ${token}`,
    };
}

export function createObrasSocialesHandlers({ setObrasSociales }) {
    const handleAddObraSocial = async (nuevaObraNombre) => {
        try {
            const res = await fetch(`${API_BASE}/obras_sociales`, {
                method: "POST",
                headers: { "Content-Type": "application/json", ...getAuthHeaders(), },
                body: JSON.stringify({ nombre: nuevaObraNombre }),
            });

            if (!res.ok) {
                if (res.status === 401 || res.status === 403) {
                    toast.error("No autorizado. Iniciá sesión nuevamente.");
                } else {
                    toast.error("No se pudo agregar la obra social");
                }
                return;
            }

            const created = await res.json();
            setObrasSociales((prev) => [...prev, created]);
            toast.success("Obra Social agregada correctamente");
        } catch (e) {
            console.error(e);
            toast.error("No se pudo agregar la obra social");
        }
    };

    const handleDeleteObraSocial = async (obraId) => {
        try {
            const res = await fetch(`${API_BASE}/obras_sociales/${obraId}`, {
                method: "DELETE",
                headers: { ...getAuthHeaders(), },
            });

            if (res.status === 204 || res.ok) {
                setObrasSociales((prev) => prev.filter((o) => o.id !== obraId));
                toast.success("Obra Social eliminada correctamente");
            } else {
                if (res.status === 401 || res.status === 403) {
                    toast.error("No autorizado. Iniciá sesión nuevamente.");
                } else {
                    toast.error("No se pudo eliminar la obra social");
                }
            }
        } catch (e) {
            console.error(e);
            toast.error("No se pudo eliminar la obra social");
        }
    };

    return { handleAddObraSocial, handleDeleteObraSocial };
}
