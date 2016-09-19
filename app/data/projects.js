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
    image: {
      altText: 'Main screen', 
      source:  require('../assets/images/main-screen.png'),
    },
    skills: [
      {
        name: 'Angular', 
        icon: require('../assets/images/angular-icon.svg'),
      },
      {
        name: 'MongoDB', 
        icon: require('../assets/images/mongo-icon.png'),
      },
      // {
      //   name: 'Node', 
      //   icon: require('../assets/images/node-icon.png'),
      // },
      {
        name: 'Bootstrap', 
        icon: require('../assets/images/bootstrap-icon.svg'),
      },
      // {
      //   name: 'Webpack', 
      //   icon: require('../assets/images/webpack-icon.png'),
      // },
      // {
      //   name: 'Sass', 
      //   icon: require('../assets/images/sass-icon.svg'),
      // },
    ],
    // images: [
    //   {
    //     altText: 'Main screen', 
    //     source:  require('../assets/images/main-screen.png'),
    //   },
    //   {
    //     altText: 'Login screen', 
    //     source:  require('../assets/images/login-screen.png'),
    //   },
    // ], 
    body: 'Star Todo is a fully authenticated, CRUD-based to-do list manager built as a single page web application. Its server is written using Node.js, Express, and Mongoose/MongoDB. The frontend uses AngularJS for its MVC framework and Bootstrap for styling.', 
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
    image: {
      altText: 'siren finder', 
      source:  require('../assets/images/siren-finder.png'), 
    },
    skills: [
      {
        name: 'jQuery', 
        icon: require('../assets/images/jquery-icon.png'),
      },
      {
        name: 'Javascript', 
        icon: require('../assets/images/javascript-icon.png'),
      },
    ], 
    // images: [
    //   {
    //     altText: 'siren finder', 
    //     source:  require('../assets/images/siren-finder.png'), 
    //   },
    // ], 
    body: 'SirenFinder taps into the city of Seattle\'s 911 response API to track incidents across the city and display them using Google maps. SirenFinder uses jQuery for DOM manipulation and Page.js for client-side routing.', 
    
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
    image: {
      altText: 'Node package manager', 
      source:  require('../assets/images/npm-logo.svg'),
    },
    skills: [
      {
        name: 'Node', 
        icon: require('../assets/images/node-icon.png'),
      },
      {
        name: 'Mocha', 
        icon: require('../assets/images/mocha-icon.svg'),
      },
      {
        name: 'Chai', 
        icon: require('../assets/images/chai-icon.png'),
      },
    ], 
    // images: [
    //   {
    //     altText: 'Node package manager', 
    //     source:  require('../assets/images/npm-logo.svg'),
    //   },
    // ], 
    body: 'The majority of twitter bots fall into a few categories: those that reply to mentions, those that reply to a particular phrase or set of phrases, and those that post on an interval. This library reduces the code needed to these bots types to just what is necessary to produce the content. It is built using Node.js and the Twitter API.',
  },
];
