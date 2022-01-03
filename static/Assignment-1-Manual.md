# Create custom LAMP/LEMP stack with Docker

### Create and configure docker-compose.yml

To start the configuration of the LAMP/LEMP stack with Docker, we need to create a `docker-compose.yml` file in the root directory of our php application. This file, written in YAML, will enable us to use docker-compose to start, stop and manage our containers.

We first start by setting the version used (it is recommended to use the latest version available):<br>
`version: "3.8"`

The LAMP/LEMP stack needs a container for the network rules and access to our containerized application, a container for php and a container for the database (MySQL in our case).

For the web/network service (container), I used Nginx:
```yaml
services:
    nginx:
        image: nginx:latest
        ports:
            - 80:80
        volumes:
            - ./nginx.conf:/etc/nginx/conf.d/nginx.conf
            - ./:/var/www
```
* `nginx:latest` tells Docker to use the latest Nginx image.
* `80:80` configures the ports used by the container.
* `./nginx.conf:/etc/nginx/conf.d/nginx.conf` synchronizes the Nginx configs we will make later with the one present in the container.
* `./:/var/www` maps our laravel app root directory to /var/www in the container.


For the php service (container), I used php-fpm:
```yaml
services:
    php:
        build:
            context: .
            dockerfile: PHP.Dockerfile
        working_dir: /var/www
        volumes:
            - ./:/var/www
```
* Unlike the Nginx container, we will build our own image because we want to have special properties and tools in our container.
* `working_dir: /var/www` sets the working directory of our php container to /var/www.
* `./:/var/www` maps our laravel app root directory to /var/www in the container.


For the database service (container), I used MySQL:
```yaml
services:
    mysql:
        image: mariadb:latest
        environment:
            MYSQL_ROOT_PASSWORD: <password>
            MYSQL_USER: <username>
            MYSQL_PASSWORD: <password>
            MYSQL_DATABASE: <db name>
        volumes:
            - mysqldata:/var/lib/mysql
        ports:
            - 3306:3306
volumes:
    mysqldata: {}
```
* `mariadb:latest` tells Docker to use the latest MariaDB image. MariaDB is used because it is a slightly better database management system than mysql and will work the same way.
* `MYSQL_ROOT_PASSWORD`, `MYSQL_USER`, `MYSQL_PASSWORD` and `MYSQL_DATABASE` are properties that need to be filled in to set up the database.
* `mysqldata:/var/lib/mysql/` synchronizes container data with a persistent volume.
* `3306:3306` configures the ports used by the container.
* `mysqldata: {}` enables data to be persistent, meaning that the container can be shut down and then restarted without losing data.

Here is my final file:
```yaml
version: "3.8"
services:
    nginx:
        image: nginx:latest
        ports:
            - 80:80
        volumes:
            - ./nginx.conf:/etc/nginx/conf.d/nginx.conf
            - ./:/var/www
    php:
        build:
            context: .
            dockerfile: PHP.Dockerfile
        working_dir: /var/www
        volumes:
            - ./:/var/www
    mysql:
        image: mariadb:latest
        environment:
            MYSQL_ROOT_PASSWORD: secret
            MYSQL_USER: axelz
            MYSQL_PASSWORD: secret
            MYSQL_DATABASE: docker-test
        volumes:
            - mysqldata:/var/lib/mysql
        ports:
            - 3306:3306
volumes:
    mysqldata: {}

```

### Create and configure nginx.conf

Now that docker-compose will create and start an Nginx container, we need to configure this container. To do that we need to create a file name `nginx.conf` in the application's root directory (see `docker-compose.yml`).

To go faster, I used the recommended Nginx configuration provided by [Laravel](https://laravel.com/docs/8.x/deployment#nginx), which I then tweaked to work with my configuration.

Here is the final file:
```nginx
server {
    listen 80 default_server;
    root /var/www/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass php:9000;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### Create and configure PHP.Dockerfile

In a previous chapter, we configured a php service but we still need to build an image for it. In order to do that we need to create a file called `PHP.Dockerfile` in the application's root directory (see `docker-compose.yml`).

First, this image will be based on another image:
```dockerfile
FROM php:8.0-fpm
```
* 8.0 because it is the php version used in my laravel application.
* fpm because it is a very popular php module used with Nginx. 

Then, we need to add necessary dependencies to this image:
* Some needed for Composer:
```dockerfile
RUN apt-get update && apt-get install -y git zip unzip
```
* Some required to interact with the database:
```dockerfile
RUN docker-php-ext-install pdo pdo_mysql
```
* And some for development purposes:
```dockerfile
RUN pecl install xdebug && docker-php-ext-enable xdebug
```

We then need to add Composer to this image:
```dockerfile
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
```

To make Composer (and Artisan) work properly, we need to run multiple commands (replace `<user>` by your user):
```dockerfile
RUN useradd -G www-data,root -u 1000 -d /home/<user> <user>
RUN mkdir -p /home/<user>/.composer && \
    chown -R <user>:<user> /home/<user>
```

It is then important to set the working directory:
```dockerfile
WORKDIR /var/www
```

And finally, set the user (replace `<user>` by your user):
```dockerfile
USER <user>
```

Here is my final file:
```dockerfile
FROM php:8.0-fpm

# Install necessary dependencies
RUN apt-get update && apt-get install -y git zip unzip

# Install mysql pdo
RUN docker-php-ext-install pdo pdo_mysql

# Install xdebug for development
RUN pecl install xdebug && docker-php-ext-enable xdebug

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u 1000 -d /home/axelz axelz
RUN mkdir -p /home/axelz/.composer && \
    chown -R axelz:axelz /home/axelz

# Set working directory
WORKDIR /var/www

COPY . .

USER axelz
```

### Configure .env
```bash
cp .env.example .env
```

Here is my `.env` configuration:
```dosini
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=docker-test
DB_USERNAME=root
DB_PASSWORD=secret

BROADCAST_DRIVER=log
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=null
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```

* `DB_HOST` needs to be set as the name of the service created in `docker-compose.yml`.
* `DB_DATABASE` needs to be the same as the `MYSQL_DATABASE` property in `docker-compose.yml`.


### Start the containers
This command will build our custom image, download the Nginx and MariaDB images, and start the containers in detached mode. 
```bash
docker-compose up -d
```


Here is an overview of all the containers of the Docker LAMP/LEMP stack:

![2](2.png)

Once the execution of the command is done, we can open a browser and reach [127.0.0.1:80](127.0.0.1:80). 

![1](1.png)

While our development server is up and running, we still need to set up our laravel application (composer install, key, migration, seeder, ...).

### Install Composer Dependencies
```bash
docker-compose exec php composer install
```

![3](3.png)

From now on, the command `docker-compose exec php` will be used to execute laravel related tools. `php` is the "main" service/container, it is where the php code is executed.


### Generate an app encryption key
```bash
docker-compose exec php php artisan key:generate
```

![4](4.png)

### Create a new schema

Before executing any migration we need to create a new schema with the appropriate name (see `docker-compose.yml` and `.env`). You can use the CLI with `docker-compose exec mysql mysql -u root -p` or use any database design tool.

I used MySQL Workbench with the following parameters:
* **Hostname:** 127.0.0.1
* **Port:** 3306
* **Username:** root
* **Password:** secret

![5](5.png)
![6](6.png)
![7](7.png)

###  Migrate the database
```bash
docker-compose exec php php artisan migrate
```
![8](8.png)
![9](9.png)

### Seed the database
```bash
docker-compose exec php php artisan db:seed
```
![10](10.png)

### Stop the containers
This command will stop the containers. 
```bash
docker-compose down
```
![11](11.png)
![12](12.png)
