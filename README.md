# Docker learning

pull - run - list - delete - create image
create dockerfile
.dockerignore
run - list -delete contailer
docker build --tag image_name .
docker run --name container_name -p 5000:5000 -d image_name
execute commands inside the container (docker exec -it container_name bash)

docker run --name node-api -p 5000:5000 -d node-server
docker run --name postgres-db -e POSTGRES_PASSWORD=postgres -d postgres
psql -d postgres -h localhost -p 5432 -U postgres
