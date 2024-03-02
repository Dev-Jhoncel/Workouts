import PropTypes from 'prop-types';

function MyComponent ({name,age}){
 return (`${name} ${age}`);
};

MyComponent.prototype = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
};