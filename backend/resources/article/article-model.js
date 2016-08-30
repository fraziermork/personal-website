'use strict';

const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title:            { type: String, required: true }, 
  content:          { type: String, required: true },
  subtitle:         { type: String },
  publication_date: { type: Date, set: handlePublicationDate }, 
});



/**
 * handlePublicationDate - Setter function for publication dates 
 *  
 * @param  {type} value description 
 * @return {type}       description 
 */ 
function handlePublicationDate(value) {
  return value ? new Date(value) : null;
}

// If no publication date, then article isn't published 
articleSchema.virtual('published')
  .get(function() {
    return this.publication_date ? true : false;
  });

module.exports = mongoose.model('Article', articleSchema);
