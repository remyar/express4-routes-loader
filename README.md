# express4-routes-loader
A Simple routes Loader for express

## Install
```sh
npm install --save express4-routes-loader
```

## Basic usage
```js
var express = require('express');
var routerExpress = require('express4-routes-loader');

var app = express();

var routes = {
    'index': {
        url: '/',
        controller: './controller/index',
        view: 'index'
    }
}


// view engine setup ( handlebars )
app.set('views', path.join(__dirname , '/views'));
app.set('view engine', '.hbs');
app.engine('.hbs', handlebars({ extname: '.hbs' }));


routerExpress.load(app , routes);

```


### Controller file
```js
// ./controller/index.js or other, you can place the file anywhere !!!
module.exports.get = (req, res, next , render) => {     //--> Create http GET Method
    let objRet = {};

    objRet.hello = "world";

    return objRet;
}

module.exports.post = (req, res, next , render) => {    //--> Create http POST Method
    let objRet = {};

    //-- or with callback

    fs.readFile("/path/to/file",function(file){


        render(file);
    });
}

```

### Views file
```html

<div>
    {{hello}}
</div>

Print => 

<div>
    world
</div>
```