module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "modules": false,
      "targets": {
        "browsers": ["last 2 versions", "not dead"]
      }
    }]
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-syntax-dynamic-import",
    "transform-vue-jsx",
  ]
};