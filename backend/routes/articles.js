'use strict';

// npm modules 
const debug       = require('debug')('fm:articlesRouter');
const express     = require('express');
const router      = express.Router();

// internal modules 
const articleCtrl = require('../resources/article/article-controller');

module.exports    = router;

router.get('/', (req, res, next) => {
  debug('GET /articles');
  articleCtrl.findArticles()
    .then((articles) => {
      debug('articles: ', articles);
      return res.status(200).json(articles);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  debug('GET /articles/:id');
  articleCtrl.findArticleById(req.params.id)
    .then((article) => {
      debug('article: ', article);
      return res.status(200).json(article);
    })
    .catch(next);
});