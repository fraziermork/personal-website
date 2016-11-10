[Font Awesome](http://fontawesome.io/) is a popular font icon library. The npm package includes the sass source, including the mixins that it uses. 

I ran into problems trying to load font awesome using [webpack](https://webpack.github.io/), an increasingly common build system, and couldn't find a decent explanation of how to resolve the problems. 

### Standard Sass Loader  

The simplest way to load sass files is with a loader like this: 
 
```javascript
{
  test:   /\.scss$/, 
  loader: 'style!css!sass',
}
``` 

This tells webpack that if one of the files it's bundling together has the '.scss' extension, run it through the  [sass-loader](https://www.npmjs.com/package/sass-loader), then the  [css-loader](https://www.npmjs.com/package/css-loader), then the [style-loader](https://www.npmjs.com/package/style-loader). 

### Webpack Loaders for Font Awesome 

A little bit more configuration is necessary to configure this to work with Font Awesome. First off, I need to include a loader for the font files themselves: 
```javascript 
{ 
  test:   /\.(ttf|eot|svg|woff(2)?)$/, 
  loader: 'url?limit=10000'
}
```
This tells webpack to load those filetypes with the [url-loader](https://www.npmjs.com/package/url-loader), which inlines their content into the file they were required into. In this case, I've also passed it a query string to tell it to fall back to the [file-loader](https://www.npmjs.com/package/file-loader) if the file being required is larger than 10kb. 


 Even with this loader, I get an error with a require statement like this in my sass files: 

```css
@import '~font-awesome/scss/font-awesome';
```

This throws a bunch of errors like `Error: Cannot resolve 'file' or 'directory' ../fonts/fontawesome-webfont.eot`, but also for .woff, .woff2, .ttf, and .svg files with the same name. Reading a little further shows that webpack tried to resolve these urls relative to the file they were imported into, not relative to the file that was imported. 

The [resolve-url-loader](https://www.npmjs.com/package/resolve-url-loader) is designed to fix this issue. I can include it in my loader for .scss files like this: 

```javascript
{
  test:   /\.scss$/, 
  loader: 'style!css!resolve-url!sass?sourceMap',
}
``` 

The resolve url loader will fix the problems with those relative urls, but it requires that every loader that runs before it turn on source map so that resolve-url will know which files those filepaths were in originally (in this case, the only loader that runs before is the sass-loader). 

A final webpack.config.js might look like: 

```javascript
module.exports = {
  entry: 'index.js', 
  output: {
    path:     './build', 
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test:   /\.scss$/, 
        loader: 'style!css!resolve-url!sass?sourceMap',
      }, 
      { 
        test:   /\.(ttf|eot|svg|woff(2)?)$/, 
        loader: 'url?limit=10000',
      },
      // other loaders 
    ], 
  }, 
  // rest of webpack config 
};   
```

With those loaders, the import statement works just fine, and I have access to all the font awesome sass stuff like mixins.


### Loading Font Awesome with Webpack 2 

Webpack is expected to release a new major version soon, which will break the configuration above. 

An equivalent webpack.config.js would look like:

```javascript 
const webpack    = require('webpack');
const production = NODE_ENV === 'production';

module.exports = {
  context: `${__dirname}/src`,
  plugins: [
    new webpack.LoaderOptionsPlugin({
    test:  /\.scss$/,
    debug: !production, 
    options: {
      // Fix for 'Cannot resolve property path of undefined' because of sass loader
      // See https://github.com/jtangelder/sass-loader/issues/298
      output:  {
        path: PATHS.output,
      }, 
      context: PATHS.context,
    },
  }),
  // other plugins 
  ],
  entry: 'index.js', 
  output: {
    path:     './build', 
    filename: '[name].js',
  }, 
  module: {
    rules: {
      {
        test: /\.scss$/, 
        loader: [
          // You can also just pass an array of strings to be less pretentious 
          { loader: 'style' },
          { loader: 'css' },
          { loader: 'postcss' }, 
          { loader: 'resolve-url' }, 
          { 
            loader: 'sass', 
            query: {
              sourceMap: true, 
            },
          },
        ], 
      },
      // rule for loading font files 
      {
        test: /\.(ttf|eot|svg|woff(2)?)$/,
        loader: {
          loader: 'url', 
          query: {
            limit: 10000,
          },
        },
      }, 
      
      // Other rules 
    }, 
  }, 
  
  // rest of webpack config 
};
```

For reference, I am using these packages: 

```javascript 
{
  "dependencies": {
      "css-loader": "^0.25.0",
      "file-loader": "^0.9.0",
      "font-awesome": "^4.7.0",
      "node-sass": "^3.11.2",
      "resolve-url-loader": "^1.6.0",
      "sass-loader": "^4.0.2",
      "style-loader": "^0.13.1",
      "url-loader": "^0.5.7",
      "webpack": "^2.1.0-beta.25"
  }
}
```




<!-- For reference, I am using: 
  * css-loader:   ^0.25.0,
  * file-loader:  ^0.9.0,
  * font-awesome: ^4.7.0,
  * node-sass:    ^3.11.2,
  * sass-loader:  ^4.0.2,
  * style-loader: ^0.13.1,
  * url-loader:   ^0.5.7,
  * webpack:      ^2.1.0-beta.25 -->


<!-- ```JSON 
"dependencies": {
    "css-loader": "^0.25.0",
    "file-loader": "^0.9.0",
    "font-awesome": "^4.7.0",
    "node-sass": "^3.11.2",
    "resolve-url-loader": "^1.6.0",
    "sass-loader": "^4.0.2",
    "style-loader": "^0.13.1",
    "url-loader": "^0.5.7",
    "webpack": "^2.1.0-beta.25"
}
``` -->
