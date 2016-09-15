[Font Awesome](http://fontawesome.io/) is a great icon font library. The npm package comes with a sass version of the source files, which makes it possible to use things like the mixins that come with the package. Unfortunately, using these Font Awesome with Webpack isn't entirely straightforward--

###### Normal webpack config for sass files

Normally, I load Sass files with a loader like this: 

```javascript 
{
  test:   /\.scss$/, 
  loader: 'style!css!postcss!sass',
}
```

I'm loading the files with the normal [sass-loader](https://www.npmjs.com/package/sass-loader), [style-loader](https://www.npmjs.com/package/style-loader), and [css-loader](https://www.npmjs.com/package/css-loader), as well as with the [postcss-loader](https://www.npmjs.com/package/postcss-loader) so that I have access to the [autoprefixer](https://www.npmjs.com/package/autoprefixer) plugin. 

However, if I import Font Awesome or require Font Awesome using this loader, I'll get a webpack error. Font Awesome's distribution files import things using relative filepaths, but webpack will treat these as relative to the file that Font Awesome was imported or required into. As a result, webpack won't be able to find any of the files that font-awesome imports in, even if you have all the loaders necessary to deal with those files. 

###### Webpack config for Font Awesome

Luckily, there is a loader that can solve this problem, the [resolve-url-loader](https://www.npmjs.com/package/resolve-url-loader). It turns all the relative filepaths  that would normally confuse webpack into absolute filepaths that webpack can deal with. Once it's been npm installed, we can include it in our webpack config like this: 

```javascript
{
  test:   /\.scss$/, 
  loader: 'style!css!postcss!resolve-url!sass?sourceMap'
},
```
Because the resolve-url loader needs to translate relative urls into absolute urls, it needs to know where the import statements it is altering with are coming from. As a result, we also have to turn on sourceMap for the webpack loaders ahead of it. In this case, that's only the sass loader. 

Since Font Awesome provides fonts, we also need to include some loaders for font files.  

```javascript 
{ 
  test:   /\.(ttf|eot|svg|woff(2)?)$/, 
  loader: 'url?limit=10000'
}
```

Files of these types (.ttf, .eot, .svg, .woff, and .woff2) will be loaded with the webpack [url-loader](https://www.npmjs.com/package/url-loader), which just inlines their content as a string. In this case, I've limited it by file size, so files over 10kb will be loaded with the [file-loader](https://www.npmjs.com/package/file-loader) instead. 
