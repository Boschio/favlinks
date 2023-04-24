\echo 'Delete and recreate Game On db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE favlinks;
CREATE DATABASE favlinks;
\connect favlinks;

\i favlinks-schema.sql