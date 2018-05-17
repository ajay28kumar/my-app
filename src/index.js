import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import './App.css';

//TODO: Javascripts method will be added here

//
// if (!Array.prototype.includes) {
//   Object.defineProperty(Array.prototype, 'includes', {
//     enumerable: false,
//     value(obj) {
//       const newArr = this.filter(el => el === obj); // eslint-disable-line eqeqeq
//       return newArr.length > 0;
//     },
//   });
// }
//
// if (!String.prototype.includes) {
//   String.prototype.includes = function includesPolyfill() {
//     return String.prototype.indexOf.apply(this, arguments) !== -1;
//   };
// }
//
// if (!String.prototype.capitalize) {
//   // eslint-disable-next-line func-names
//   String.prototype.capitalize = function includesPolyfill() {
//     return this.charAt(0).toUpperCase() + this.slice(1);
//   };
// }

ReactDOM.render(<App/>, document.getElementById('root'));
// registerServiceWorker();
