[Font Awesome](http://fontawesome.io/) is a great icon font library. The fontawesome npm package comes with a sass version of the source files, which makes it possible to use all the mixins that fontawesome provides.

[Webpack](https://webpack.github.io/) is a popular library for bundling code. Unfortunately, the 'standard' way of loading sass files using webpack doesn't work with fontawesome's distribution sass files in its npm package--a little bit more configuration is needed. 

#### 'Standard' Webpack Configuration for Sass 

Normally, I would load Sass files with a loader like this: 

```javascript
{
  test:   /\.scss$/, 
  loader: 'style!css!sass',
}
``` 
<!-- {.data-read-only} -->


I'm loading the files with  [sass-loader](https://www.npmjs.com/package/sass-loader), [style-loader](https://www.npmjs.com/package/style-loader), and [css-loader](https://www.npmjs.com/package/css-loader), which is the way that the sass-loader documentation recommends loading them. 

However, importing fontawesome into a sass file or requiring it into a javascript file will cause a webpack error. Fontawesome's distribution files import things using relative filepaths, but webpack will treat these as relative to the file that fontawesome was imported or required into, not relative to the file that was imported in. As a result, all of those relative paths become invalid, and webpack won't be able to find any of the font files it needs. 

#### Configuring Webpack for Fontawesome 

Luckily, there is a loader designed to solve this problem, the [resolve-url-loader](https://www.npmjs.com/package/resolve-url-loader). It converts relative filepaths in sass files into absolute paths that webpack can handle. 

```javascript
{
  test:   /\.scss$/, 
  loader: 'style!css!resolve-url!sass?sourceMap'
},
```

The only differences between this set of loaders and the one above are the inclusion of the resolve-url loader after the sass loader (webpack loaders run from right to left for some reason), and turning on source mapping for the sass loader. 

Because the resolve-url loader needs to translate relative urls into absolute urls, it needs to know where the import statements it alters came from. So, source mapping must be turned on for the webpack loaders that run before the resolve-url loader. 

#### Font File Loaders 

Since Font Awesome provides fonts, we also need to include some loaders for font files.  

```javascript 
{ 
  test:   /\.(ttf|eot|svg|woff(2)?)$/, 
  loader: 'url?limit=10000'
}
```

Files of these types (.ttf, .eot, .svg, .woff, and .woff2) will be loaded with the webpack [url-loader](https://www.npmjs.com/package/url-loader), which just includes their content as a string into the file they were imported into. In this case, I've also included a file size limit, so files larger than 10kb will be loaded with the [file-loader](https://www.npmjs.com/package/file-loader) instead. 
