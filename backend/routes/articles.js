'use strict';

// npm modules 
const debug       = require('debug')('fm:articlesRouter');
const express     = require('express');
const router      = express.Router();

// internal modules 
const AppError    = require('../lib/app-error');
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

router.get('/id/:id', (req, res, next) => {
  debug('GET /articles/id/:id');
  articleCtrl.findArticleById(req.params.id)
    .then((article) => {
      debug('article: ', article);
      return res.status(200).json(article);
    })
    .catch(next);
});

router.get('/:url', (req, res, next) => {
  debug('GET /articles/:url');
  articleCtrl.findArticleUrl(req.params.url)
    .then((article) => {
      debug('article: ', article);
      return res.status(200).json(article);
    })
    .catch(next);
});

router.all('*', function return404NotFound(_, res, next) {
  debug('*404');
  return next(new AppError(404, 'hit /articles 404 route'));
});
