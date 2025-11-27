import { toast } from "react-toastify";

const API_BASE = "http://localhost:3000/api";

export function createObrasSocialesHandlers({ setObrasSociales }) {
    const handleAddObraSocial = async (nuevaObraNombre) => {
        try {
            const res = await fetch(`${API_BASE}/obras_sociales`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre: nuevaObraNombre }),
            });
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
            });
            if (res.status === 204 || res.ok) {
                setObrasSociales((prev) => prev.filter((o) => o.id !== obraId));
                toast.success("Obra Social eliminada correctamente");
            } else {
                toast.error("No se pudo eliminar la obra social");
            }
        } catch (e) {
            console.error(e);
            toast.error("No se pudo eliminar la obra social");
        }
    };

    return { handleAddObraSocial, handleDeleteObraSocial };
}
