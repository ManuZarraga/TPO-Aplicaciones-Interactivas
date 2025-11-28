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
            // comprobar duplicados (case-insensitive) consultando servidor
            const existingRes = await fetch(`${API_BASE}/obras_sociales`);
            if (!existingRes.ok) {
                toast.error("Error comprobando obras sociales existentes");
                return;
            }
            const existing = await existingRes.json();
            const exists = existing.some(
                (o) => o.nombre && o.nombre.trim().toLowerCase() === nuevaObraNombre.trim().toLowerCase()
            );
            if (exists) {
                toast.info("Ya existe una Obra Social con ese nombre");
                return;
            }

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

    const handleEditObraSocial = async (obraId, nuevoNombre) => {
        try {
            if (!nuevoNombre || !nuevoNombre.trim()) {
                toast.error("El nombre no puede quedar vacío");
                return;
            }

            // comprobar que no exista otra obra con ese nombre
            const existingRes = await fetch(`${API_BASE}/obras_sociales`);
            if (!existingRes.ok) {
                toast.error("Error comprobando obras sociales existentes");
                return;
            }
            const existing = await existingRes.json();
            const exists = existing.some(
                (o) => o.id !== obraId && o.nombre && o.nombre.trim().toLowerCase() === nuevoNombre.trim().toLowerCase()
            );
            if (exists) {
                toast.info("Ya existe una Obra Social con ese nombre");
                return;
            }

            const res = await fetch(`${API_BASE}/obras_sociales/${obraId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", ...getAuthHeaders() },
                body: JSON.stringify({ nombre: nuevoNombre }),
            });

            if (!res.ok) {
                if (res.status === 401 || res.status === 403) {
                    toast.error("No autorizado. Iniciá sesión nuevamente.");
                } else {
                    toast.error("No se pudo editar la obra social");
                }
                return;
            }

            const updated = await res.json();
            setObrasSociales((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
            toast.success("Obra Social actualizada correctamente");
        } catch (e) {
            console.error(e);
            toast.error("No se pudo editar la obra social");
        }
    };

    return { handleAddObraSocial, handleDeleteObraSocial, handleEditObraSocial };
}
