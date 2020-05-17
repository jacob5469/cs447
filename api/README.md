# Baltimore Crime Data Project API

## Project setup

First install mysql and setup a database https://dev.mysql.com/doc/mysql-getting-started/en/

Second, install mysql workbench, connect to the database you just created and run the following sql script:
https://drive.google.com/file/d/11XhD5AR9a3iAEBftcNCXrLeeNczru8qq/view?usp=sharing

Third, create a file called ".env" side-by-side with this file and populate it with two values:

```
DB_PASSWORD=YOUR DATABASE PASSWORD GOES HERE
DB_NAME=cs447
```

Finally, install modules:

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve-dev
```

### Compiles and minifies for production
```
npm run build
```

### Run without hot rebuilds
```
npm run serve
```

### Clean a previous build and rebuild the code
```
npm run rebuild
```

### Access API documentation while API is running
Navigate to http://localhost:3000/doc