import fs from "fs";
import path from "path";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4001;

function findPropertiesPath() {
    const candidates = [
        path.resolve(__dirname, "smtp", "app.properties"),
        path.resolve(__dirname, "..", "src", "smtp", "app.properties"),
    ];
    for (const p of candidates) {
        if (fs.existsSync(p)) return p;
    }
    return null;
}

function loadSmtpConfig() {
    const propsPath = findPropertiesPath();
    if (!propsPath) {
        throw new Error("SMTP properties file not found. Expected server/smtp/app.properties or src/smtp/app.properties");
    }
    const raw = fs.readFileSync(propsPath, "utf8");
    const lines = raw.split(/\r?\n/);
    const obj = {};
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const idx = trimmed.indexOf("=");
        if (idx === -1) continue;
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        obj[key] = val;
    }
    const host = obj["notification.smtp.host"];
    const port = Number(obj["notification.smtp.port"] || 465);
    const user = obj["notification.smtp.username"];
    const pass = obj["notification.smtp.password"];
    const from = obj["notification.smtp.from"] || user;
    const ssl = (obj["notification.smtp.ssl"] || "false") === "true";

    return { host, port, user, pass, from, ssl, propsPath };
}

let smtp;
try {
    smtp = loadSmtpConfig();
    console.log("Loaded SMTP properties from:", smtp.propsPath);
} catch (err) {
    console.error(err.message);
    smtp = null;
}

let transporter = null;
if (smtp) {
    transporter = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.ssl || smtp.port === 465,
        auth: smtp.user && smtp.pass ? { user: smtp.user, pass: smtp.pass } : undefined,
    });
}

async function sendMail(to, subject, html) {
    if (!transporter) throw new Error("transporter-not-configured");
    const info = await transporter.sendMail({ from: smtp.from, to, subject, html });
    return info;
}

app.post("/api/email/reservation", async (req, res) => {
    if (!smtp) return res.status(500).json({ error: "smtp_not_configured" });
    try {
        const { to, nombre, fecha } = req.body;
        if (!to || !fecha) return res.status(400).json({ error: "missing" });
        const html = `<p>Hola ${nombre || ""},</p>
			<p>Tu turno para <strong>${fecha}</strong> ha sido <strong>RESERVADO</strong>.</p>
			<p>Te informaremos cuando el turno sea confirmado.</p>
			<p>Saludos,<br/>Cardiología Gosling</p>`;
        const info = await sendMail(to, "Turno reservado - Cardiología Gosling", html);
        res.json({ ok: true, messageId: info && info.messageId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "send_failed" });
    }
});

app.post("/api/email/confirmation", async (req, res) => {
    if (!smtp) return res.status(500).json({ error: "smtp_not_configured" });
    try {
        const { to, nombre, fecha } = req.body;
        if (!to || !fecha) return res.status(400).json({ error: "missing" });
        const html = `<p>Hola ${nombre || ""},</p>
			<p>Tu turno para <strong>${fecha}</strong> ha sido <strong>CONFIRMADO</strong>.</p>
			<p>Te esperamos en el consultorio.</p>
			<p>Saludos,<br/>Cardiología Gosling</p>`;
        const info = await sendMail(to, "Turno confirmado - Cardiología Gosling", html);
        res.json({ ok: true, messageId: info && info.messageId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "send_failed" });
    }
});

app.get("/api/health", (req, res) => res.json({ ok: true, smtpConfigured: Boolean(smtp) }));

app.listen(PORT, () => console.log(`Mailer server listening ${PORT}`));

