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
      {
        name: 'Bootstrap', 
        icon: require('../assets/images/bootstrap-icon.svg'),
      },
    ],
    body: 'Star Todo is a web application based on Trello. It is a fully authenticated, CRUD-based to-do list manager built as a single page web application. Its server is written using Node.js, Express, and Mongoose/MongoDB. The frontend uses AngularJS for its MVC framework and Bootstrap for styling.', 
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
    body: 'SirenFinder taps into the city of Seattle\'s 911 response API to track incidents across the city and display them using Google maps. SirenFinder uses jQuery for DOM manipulation and Page.js for client-side routing.', 
    
  },
  // {
  //   title: 'Sternshus', 
  //   subtitle: 'Company Website', 
  //   date: new Date(2016, 3), 
  //   tags: [
  //     'AngularJS', 
  //     'Bootstrap', 
  //   ],
  //   deployLink: 'https://sternshus.com',
  //   githubLink: null, 
  //   image: {
  //     altText: 'Sternshus', 
  //     source:  require('../assets/images/sternshus-landing.png'), 
  //   },
  //   skills: [
  //     {
  //       name: 'Angular', 
  //       icon: require('../assets/images/angular-icon.svg'),
  //     },
  //     {
  //       name: 'Bootstrap', 
  //       icon: require('../assets/images/bootstrap-icon.svg'),
  //     },
  //   ], 
  //   body: 'Built a website prototype and converted it into angular, allowing the view to be populated from JSON files.', 
  // },
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
    body: 'The majority of twitter bots fall into a few categories: those that reply to mentions, those that reply to a particular phrase or set of phrases, and those that post on an interval. This library reduces the code needed to these bots types to just what is necessary to produce the content. It is built using Node.js and the Twitter API.',
  },
  {
    title: 'Calculator', 
    subtitle: 'Modelled after the tiny annoying ones',
    date: new Date(2016, 4), 
    tags: [
      'jQuery', 
    ],
    deployLink: 'http://fraziermork.github.io/calculator/', 
    githubLink: 'https://github.com/fraziermork/calculator', 
    image: {
      altText: 'Calculator', 
      source:  require('../assets/images/calculator.png'),
    },
    skills: [
      {
        name: 'jQuery', 
        icon: require('../assets/images/jquery-icon.png'),
      },
    ],
    body: 'This is a simple calculator I built independently as a learning exercise.', 
  },
];
