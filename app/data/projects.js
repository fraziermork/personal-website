module.exports = [
  {
    title: 'Star Todo', 
    subtitle: 'To-do list manager',
    date: new Date(2016, 7), 
    tags: [
      'AngularJS', 
      'Express', 
      'Mongoose', 
      'MongoDB', 
      'Node.js', 
      'Bootstrap', 
      'CRUD', 
    ],
    deployLink: 'https://star-todo.herokuapp.com/', 
    githubLink: 'https://github.com/fraziermork/todo-app', 
    images: [
      {
        altText: 'Main screen', 
        source:  require('../assets/images/main-screen.png'),
      },
      {
        altText: 'Login screen', 
        source:  require('../assets/images/login-screen.png'),
      },
    ], 
    body: 'Star Todo is a to-do list manager built as a single page web application. Its server is written using Node.js, Express, and Mongoose/MongoDB. The frontend uses AngularJS for its MVC framework and Bootstrap for styling.', 
  }, 
  {
    title: 'Twitter-bot', 
    subtitle: 'Twitter bots made easy', 
    date: new Date(2016, 4), 
    tags: [
      'Node.js', 
      'Twitter', 
      'NPM', 
      'bot', 
    ],
    deployLink: 'https://www.npmjs.com/package/twitter-bot', 
    githubLink: 'https://github.com/fraziermork/twitter-bot', 
    images: [
      {
        altText: 'Node package manager', 
        source:  require('../assets/images/npm-logo.svg'),
      },
    ], 
    body: 'The majority of twitter bots fall into a few categories: those that reply to mentions, those that reply to a particular phrase or set of phrases, and those that post on an interval. This library reduces the code needed to these bots types to just what is necessary to produce the content. It is built using Node.js and the Twitter API.',
  }, 
  {
    title: 'SirenFinder', 
    subtitle: 'Seattle 911 calls', 
    date: new Date(2016, 3), 
    tags: [
      'jQuery', 
      'Page.js', 
      'AJAX', 
      'API', 
      'open data', 
      'Google maps', 
    ],
    deployLink: 'https://sirenfinder.herokuapp.com/', 
    githubLink: 'https://github.com/fraziermork/whereAreTheSirensGoing', 
    images: [
      {
        altText: 'siren finder', 
        source:  require('../assets/images/siren-finder.png'), 
      },
    ], 
    body: 'SirenFinder taps into the city of Seattle\'s 911 response API to track incidents across the city and display them using Google maps. SirenFinder uses jQuery for DOM manipulation and Page.js for client-side routing.', 
    
  }, 
];
