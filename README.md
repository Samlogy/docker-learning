# Docker learning

pull - run - list - delete - create image
create dockerfile
.dockerignore
run - list -delete contailer
docker build --tag image_name .
docker run --name container_name -p 5000:5000 -d image_name
execute commands inside the container (docker exec -it container_name bash)
working with volumes (reflecting changes in app on container)
docker-compose (multiple images / containers)

docker run --name node-api -p 5000:5000 -d node-server
docker run --name postgres-db -e POSTGRES_PASSWORD=postgres -d postgres
psql -d postgres -h localhost -p 5432 -U postgres

(add this syntax to docker run ...)
-v /home/sam/Desktop/docker-learning/single-image:/usr/app
-v /usr/app/node_modules (do not touch the node_modules)

docker build --tag node-image .
docker run --name node-api -p 5000:5000 -d node-image -v $(pwd):/usr/app -v /sur/app/node_modules
docker-compose up
