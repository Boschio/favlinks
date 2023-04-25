\echo 'Delete and recreate favlinks db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE favlinks;
CREATE DATABASE favlinks;
\connect favlinks;

\i favlinks-schema.sql