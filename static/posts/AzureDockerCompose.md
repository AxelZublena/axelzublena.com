# How to deploy Docker Compose app to Azure Web App

#### Disclaimer
Deploying an application with every containers/services in 1 unique repository with Docker Compose is not recommanded. But if like me, you want to "translate" your development environment to a production environment on Azure, this guide should help you.

## Prerequisites
* Working docker-compose application used for local development.
* **Azure CLI** - You can use the Azure Cloud Shell or a local installation of the Azure CLI to complete the Azure CLI steps. If you need to install or upgrade, see [Install Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli).
* **Azure container registry** - If you don't have one, create an Azure container registry in the Basic tier using the [Azure CLI](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-azure-cli), [Azure portal](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-portal), or other methods. Take note of the resource group used for the deployment, which is used for the GitHub workflow.

## File Structure
```bash
├── docker-compose-prod.yml
├── docker-compose.yml
├── README.md
├── Service1
│   ├── Dockerfile
│   └── main.py
└── Service2
    ├── Dockerfile
    ├── src/
    └── index.js
```
## Docker Compose configurations

### Architecture
The project is composed of 2 services which connect to a MongoDB database. Therefore, the Docker Compose configuration will be composed of 3 services.

### Development configuration
Below is an example of configuration for a development environment called `docker-compose.yml`. You should have somethig similar.
```yaml
services:
  Service1:
    depends_on:
      - mongodb
    build: 
      context: ./Service1
      target: dev
    environment:
      DB_HOST: "mongodb"
      DB_USER: $MONGODB_USER
      DB_PASSWORD: $MONGODB_PASSWORD
      DB_DATABASE: $MONGODB_DATABASE
      DB_PORT: 27017

  Service2:
    depends_on:
      - mongodb
    build: 
      context: ./Service2
      target: dev 
    ports:
      - 3000:3000
    environment:
      DB_HOST: "mongodb"
      DB_USER: $MONGODB_USER
      DB_PASSWORD: $MONGODB_PASSWORD
      DB_DATABASE: $MONGODB_DATABASE 
      DB_PORT: 27017
    volumes:
      - ./Service2/src:/usr/app/src

  mongodb:
    image: mongo:latest
    environment:
      MONGO_INITDB_ROOT_USERNAME: $MONGODB_USER
      MONGO_INITDB_ROOT_PASSWORD: $MONGODB_PASSWORD
    restart: always
    ports: 
      - 27016:27017
    volumes:
      - db_vol:/data/db

volumes:
  db_vol: 
```

### Production configuration
Below is an example of configuration for a production environment called `docker-compose-prod.yml`. You should have somethig similar.
Compared to the development configuration, the production configuration does not build  images, but specifies the URI of the images. Also, some environment variable are hardcoded.
```yaml
services:
  Service1:
    depends_on:
      - mongodb
    image: myacr.azurecr.io/service1:TAG
    container_name: service1
    environment:
      DB_HOST: "mongodb"
      DB_USER: myuser
      DB_PASSWORD: $MONGODB_PASSWORD
      DB_DATABASE: app-db
      DB_PORT: 27017

  Service2:
    depends_on:
      - mongodb
    image: myacr.azurecr.io/service2:TAG
    container_name: service2
    ports:
      - 3000:3000
    environment:
      DB_HOST: "mongodb"
      DB_USER: myuser
      DB_PASSWORD: $MONGODB_PASSWORD
      DB_DATABASE: app-db
      DB_PORT: 27017

  mongodb:
    image: mongo:latest
    environment:
      MONGO_INITDB_ROOT_USERNAME: myuser
      MONGO_INITDB_ROOT_PASSWORD: $MONGODB_PASSWORD
    restart: always
    ports: 
      - 27016:27017
    volumes:
      - db_vol:/data/db

volumes:
  db_vol: 
```

## Azure resources

[Helpful How-to guide](https://docs.microsoft.com/en-us/azure/container-instances/container-instances-github-action) by Microsoft

### Create an Azure 
### Create an Azure Container Registry


## Azure Services & preparation

### Azure CLI
### Resource Group
### Azure Container Registry

## Build

## Deploy

### Push to Azure Container Registry
### Update configuration


![1](/posts/img/azure1.png)
