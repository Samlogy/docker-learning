# Docker learning

pull - run - list - delete - create image
create dockerfile
.dockerignore
run - list -delete contailer
docker build --tag image_name .
docker run --name container_name -p 5000:5000 -d image_name
execute commands inside the container (docker exec -it container_name bash)

docker-compose (multiple images / containers)

exposing port (single/multiple)
working with volumes (reflecting changes in app on container)
share volumes between containers (docker run --name website --volumes-from another_container -d -p 8080:80 nginx)

docker run --name node-api -p 5000:5000 -d node-server
docker run --name postgres-db -e POSTGRES_PASSWORD=postgres -d postgres
psql -d postgres -h localhost -p 5432 -U postgres

(volume inside container app / annonymous container for node_modules-> avoid reinstall node_modules each time)
-v $(pwd):/app -v /app/node_modules

docker build --tag node-image .
docker run --name node-api -p 5000:5000 -d node-image -v $(pwd):/app -v /app/node_modules
docker-compose up (run docker compose file)
docker-compose down


// to launch app with docker --> dockerfile (api) run: npm run dev:deploy --> first time (create all migrations)
// run dev --> the other times

client:
client_c 3000
api_c 5000
cache_c 6780
db_c 5433