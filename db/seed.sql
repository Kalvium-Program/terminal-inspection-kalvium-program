DROP TABLE IF EXISTS events;

CREATE TABLE events (
  id         SERIAL PRIMARY KEY,
  title      TEXT        NOT NULL,
  venue      TEXT        NOT NULL,
  starts_at  TIMESTAMPTZ NOT NULL,
  seats_left INTEGER     NOT NULL CHECK (seats_left >= 0)
);

INSERT INTO events (title, venue, starts_at, seats_left) VALUES
  ('Intro to Docker Workshop', 'Room 210',         '2027-01-12 10:00+05:30', 40),
  ('Hackathon Kickoff',        'Main Auditorium','2027-01-15 09:30+05:30', 120),
  ('Resume Review Clinic',     'Room 104',       '2027-01-18 14:00+05:30', 25),
  ('Open Source Friday',       'Library Hall',   '2027-01-22 16:00+05:30', 60);
