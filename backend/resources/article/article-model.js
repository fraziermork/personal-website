'use strict';

const mongoose = require('mongoose');
const debug    = require('debug')('fm:Article');

const articleSchema = new mongoose.Schema({
  title:            { type: String, required: true, unique: true, }, 
  content:          { type: String, required: true, },
  subtitle:         { type: String, },
  publication_date: { type: Date, set: setPublicationDate, }, 
  tableOfContents:  [{ 
    content: { type: String, }, 
    anchor:  { type: String, },
    level:   { type: Number, }
  }],
  url:              { 
    type:     String, 
    unique:   true, 
    required: true, 
    index:    true, 
    set:      setUrlFromArticleTitle, 
  },
});






/**
 * setUrlFromArticleTitle - Creates a url for the article based on the article's title which will be used as an index in the database for lookup 
 *  
 * @param  {String} val The article's title, added as the url property as well in seed-database 
 * @return {String}     The title with all nonword/number characters replaced with hyphens  
 */ 
function setUrlFromArticleTitle(val) {
  return val.toLowerCase().replace(/(\W+)/g, '-');
}



/**
 * setPublicationDate - Setter function for publication dates 
 *  
 * @param  {type} value description 
 * @return {type}       description 
 */ 
function setPublicationDate(value) {
  debug(value ? `date value existed: ${value}` : 'date value was null');
  return value ? new Date(value) : null; 
}





// If no publication date, then article isn't published 
articleSchema.virtual('published')
  .get(function() {
    return this.publication_date ? true : false; 
  });

module.exports = mongoose.model('Article', articleSchema);
