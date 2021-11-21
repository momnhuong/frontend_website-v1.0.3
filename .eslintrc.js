module.exports = {
  "parser": "babel-eslint",
  "rules": {
    "strict": 0
  },
  "env": {
    "browser": true,
    "es6": true,
    "jquery": true
  },

  "extends": "airbnb",
  "parserOptions": {
    "sourceType": "module"
  },
 
  "plugins": [
    "react"
  ],
  "rules": {
    "comma-dangle": [
      "warn",
      "never"
    ],
    "eol-last": 0,
    "indent": [
      "warn",
      2
    ],
    "linebreak-style": [
      "warn",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to" ],
    }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "no-console": 0,
    /* Advanced Rules*/
    "no-unused-expressions": "warn",
    "no-useless-concat": "warn",
    "block-scoped-var": "error",
    "consistent-return": "error"
  },
}

