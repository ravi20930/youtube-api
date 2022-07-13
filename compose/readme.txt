#project setup
sudo docker run -p 3307:3306 ravi20930/backend:mysql-server

sudo docker run --env-file ./env.list -p 3000:3000 ravi20930/backend:youtube-api
OR
sudo docker-compose up