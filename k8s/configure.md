kubectl exec -it <postgres-pod-name> -- bash


psql -U postgres

ALTER USER postgres WITH PASSWORD 'password';

