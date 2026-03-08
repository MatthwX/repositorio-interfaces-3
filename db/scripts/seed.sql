-- Seed data for the application tables
-- Order: roles -> permissions -> role_permissions -> users -> games -> sessions -> participants -> comments

-- Roles
INSERT INTO roles (name, description) VALUES
  ('admin', 'Administrator with full access'),
  ('moderator', 'Moderator with limited elevated privileges'),
  ('user', 'Regular user with limited access');

-- Permissions
INSERT INTO permissions (name, description) VALUES
  ('create', 'Create new resources'),
  ('read', 'Read resources'),
  ('update', 'Update existing resources'),
  ('delete', 'Delete resources'),
  ('manage_users', 'Manage user accounts'),
  ('manage_roles', 'Manage roles and permissions');

-- Role -> Permission relationships
-- Admin (role_id = 1) gets everything, moderator (2) gets read/update/manage_roles, user (3) gets read
INSERT INTO role_permissions (role_id, permission_id) VALUES
  (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
  (2, 2), (2, 3), (2, 6),
  (3, 2);

-- Users
-- Note: column names must match entities: password_hash, created_at, role_id
INSERT INTO users (username, email, password_hash, bio, role_id, created_at) VALUES
  ('admin_user', 'admin@example.com', '$2b$10$hashed_admin_pw', 'Administrator account', 1, NOW()),
  ('juan_perez', 'juan@example.com', '$2b$10$hashed_pw_juan', 'Lover of board games', 3, NOW()),
  ('maria_garcia', 'maria@example.com', '$2b$10$hashed_pw_maria', 'Strategic games enthusiast', 3, NOW()),
  ('carlos_lopez', 'carlos@example.com', '$2b$10$hashed_pw_carlos', 'Party games fan', 3, NOW()),
  ('ana_martinez', 'ana@example.com', '$2b$10$hashed_pw_ana', 'Competitive player', 3, NOW()),
  ('luis_fernandez', 'luis@example.com', '$2b$10$hashed_pw_luis', 'Game collector', 3, NOW());

-- Games
-- Columns: name, description, min_players, max_players, category, created_by
INSERT INTO games (name, description, min_players, max_players, category, created_by) VALUES
  ('Chess', 'The classic strategy game of kings', 2, 2, 'strategy', 2),
  ('Catan', 'Build and trade on an island', 3, 4, 'strategy', 3),
  ('Carcassonne', 'Tile-placement medieval landscape', 2, 5, 'abstract', 4),
  ('Pandemic', 'Cooperative disease-fighting game', 2, 4, 'cooperative', 5),
  ('Codenames', 'Teams guess secret words', 2, 8, 'party', 6);

-- Sessions
-- Columns: game_id, host_id, date_session, status, notes
INSERT INTO sessions (game_id, host_id, date_session, status, notes) VALUES
  (1, 2, '2026-02-28 18:30:00', 'completed', 'Quick ranked match'),
  (2, 3, '2026-03-01 20:00:00', 'completed', 'Weekend trade & build'),
  (4, 5, '2026-03-03 19:00:00', 'ongoing', 'Trying a new strategy'),
  (5, 6, '2026-03-04 21:00:00', 'scheduled', NULL);

-- Participants
-- Columns: session_id, user_id, score, position, is_winner
INSERT INTO participants (session_id, user_id, score, position, is_winner) VALUES
  (1, 2, 1, 1, true),
  (1, 3, 0, 2, false),
  (2, 3, 12, 1, true),
  (2, 4, 9, 2, false),
  (2, 5, 7, 3, false),
  (3, 5, 20, 1, true),
  (3, 2, 15, 2, false),
  (4, 6, 0, 0, false);

-- Comments
-- Columns: content, created_at, user_id, game_id
INSERT INTO comments (content, created_at, user_id, game_id) VALUES
  ('Great game! Very strategic and engaging.', '2026-02-28 19:00:00', 2, 1),
  ('Catan is perfect for game nights with friends!', '2026-03-01 22:30:00', 3, 2),
  ('Love the tile-placement mechanics in Carcassonne', '2026-03-02 10:15:00', 4, 3),
  ('Pandemic is an excellent cooperative experience', '2026-03-03 20:30:00', 5, 4),
  ('Codenames is so much fun with large groups!', '2026-03-04 21:30:00', 6, 5),
  ('Chess never gets old', '2026-03-01 08:00:00', 3, 1);

-- End of seed data
