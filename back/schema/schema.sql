
CREATE TABLE IF NOT EXISTS obras_sociales (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS turnos (
  id SERIAL PRIMARY KEY,
  nombre_paciente TEXT NOT NULL,
  telefono TEXT NOT NULL,
  email TEXT NOT NULL,
  obra_social_id INTEGER REFERENCES obras_sociales(id) ON DELETE SET NULL,
  fecha DATE NOT NULL,
  hora TIME WITH TIME ZONE NOT NULL,
  estado TEXT NOT NULL DEFAULT 'Reservado',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- datos prueba
INSERT INTO obras_sociales (nombre) VALUES ('OSDE') ON CONFLICT DO NOTHING;
INSERT INTO obras_sociales (nombre) VALUES ('Swiss Medical') ON CONFLICT DO NOTHING;

INSERT INTO users (name, email) VALUES ('Secretaria', 'secretaria@example.com') ON CONFLICT DO NOTHING;
INSERT INTO users (name, email) VALUES ('John Gosling', 'drjohngosling@mail.com') ON CONFLICT DO NOTHING;

INSERT INTO turnos (nombre_paciente, telefono, email, obra_social_id, fecha, hora, estado) VALUES 
('Ana Perez', '123456789', 'anaperez@gmail.com', 1, '2025-11-28', '10:00:00+00', 'Reservado');

INSERT INTO turnos (nombre_paciente, telefono, email, obra_social_id, fecha, hora, estado) VALUES 
('Carlos Leclerc', '166145236', 'tifozzi@gmail.com', 2, '2025-11-27', '10:00:00+00', 'Reservado');
