** project setup **<br/><br/>
to run the project using docker, first install docker-engine and docker-compose(if using compose up) on your pc, then run these commands:<br/>
// starting mysql-server<br/>
// you can use my images from dockerhub or you can also build mysql image using Dockerfile in project's mysql folder or just use your existing mysql-server.<br/>
sudo docker run -p 3307:3306 ravi20930/backend:mysql-server<br/><br/>
// starting node backend<br/>
sudo docker run --env-file path/to/.env -p 3000:3000 ravi20930/backend:youtube-api<br/>
OR using docker-compose in the project's compose folder (make sure mysql-server is up)<br/>
sudo docker-compose up<br/><br/>

there is a cron job which updates the db with latest videos every one minute<br/>
/video/data -> all videos from mysql database(use size and page as query params)<br/>
/video/search -> search similar videos from mysql database using query(q)<br/>
for example /video/search?q=india?size=5?page=2<br/>

// sample env file <br/>
#youtube variables<br/>
API_KEY=<br/>
API_KEY1=<br/>
API_KEY2=<br/>
MAX_RESULTS=10<br/>
CATEGORY_ID=17<br/>
REGION_CODE=in<br/>
CHART=mostPopular<br/>
VIDEO_FETCH_INTERVAL_IN_MINUTES=1<br/><br/>

#mysql variables<br/>
DB_HOST=localhost<br/>
DB_PORT=3306<br/>
DB_USER=root<br/>
DB_PASSWORD=Password@123<br/>
DB_NAME=youtube<br/><br/>

#node server port<br/>
PORT=3000<br/><br/>
// added access and error logs for debug purpose when the app is deployed<br/>
// added wrapper to call youtube apis easily

