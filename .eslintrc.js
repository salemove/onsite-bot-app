module.exports = {
  "parser": "babel-eslint",
  "extends": "salemove",
  "env": {
    "browser": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins" : [
    "react"
  ],
  "globals": {
    "sm": true
  },
  "rules": {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  }
};
