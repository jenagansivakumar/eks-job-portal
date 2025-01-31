kubectl exec -it postgres-7d66448c9d-z29rt -- sh -c "echo 'Persistent storage test' > /var/lib/postgresql/data/testfile"

kubectl exec -it postgres-7d66448c9d-z29rt -- sh -c "cat /var/lib/postgresql/data/testfile"

kubectl delete pod postgres-7d66448c9d-z29rt

kubectl exec -it $(kubectl get pod -l app=postgres -o jsonpath='{.items[0].metadata.name}') -- sh -c "cat /var/lib/postgresql/data/testfile"
