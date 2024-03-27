## Freezerlist
Manage the contents of your freezer. Add Freezeritems with Content, Freezedate, Drawer, an optional Photo and manage everything in the table overview.

## Run with Docker
Docker image can be found under (https://hub.docker.com/r/thisiselsueco/freezerlist).
Select a desired version or use tag `:latest` to have the latest (more or less) stable running image.


### Configuration
#### volumes:
`'/path/to/freezerlist/data:/data'` - Provide a path for the DB to the host to persist over restarts of the container

#### environment:
`'app.config.drawerAmount=3' (DEFAULT 3)` - Configure how many drawers your freezer has

#### ports:
`'8080:8080'` - Configure the exposed port, internally is always 8080

### Docker-Compose

```bash
version: '3'

services:
  freezerlist:
    image: thisiselsueco/freezerlist:latest
    container_name: freezerlist
    volumes:
      - '/path/to/freezerlist/data:/data'
    environment:
      - 'app.config.drawerAmount=3'
    ports:
      - '8080:8080'
    restart: unless-stopped

```

### Docker

```bash
docker run --name freezerlist -v /mnt/freezerlist/data:/data -e app.config.drawerAmount=3 -p 8080:8080 --restart unless-stopped thisiselsueco/freezerlist:latest
```

## Appendix
A solution to a problem we had around the house as we had a lot of stuff in our freezer we couldn't even make up what it was anymore and to further enhance my skills regarding frontend development and some CICD-stuff - win-win I guess :)
Expect some bugs and weird behaviour, but if you encounter anything strange or have a feature request please open a issue over on Github (https://github.com/El-Sueco/freezerlist/issues) - I will check t


## Links
- https://hub.docker.com/u/thisiselsueco
- https://github.com/El-Sueco