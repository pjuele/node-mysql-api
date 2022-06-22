[![Web Design Pablo Juele](https://res.cloudinary.com/wdpj/image/upload/c_scale,q_auto,w_100/v1636746639/web-design-pablo-juele/logos/wdpj-logo_ddlpop.jpg)](https://pablojuele.com)


# node-mysql-api


## Run the System
We can easily run the whole with only a single command:
```bash
docker-compose up
```

Docker will pull the MySQL and Node.js images (if our machine does not have it before).

The services can be run on the background with command:
```bash
docker-compose up -d
```

## Stop the System
Stopping all the running containers is also simple with a single command:
```bash
docker-compose down
```

If you need to stop and remove all containers, networks, and all images used by any service in <em>docker-compose.yml</em> file, use the command:
```bash
docker-compose down --rmi all
```

For more detail, please visit the inspiration for this template:
> [Dockerize Node.js Express and MySQL example - Docker Compose](https://www.bezkoder.com/docker-compose-nodejs-mysql/)
