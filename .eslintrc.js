module.exports = {
  root: true,
  extends: '@react-native-community',
  parserOptions: {
      ecmaFeatures: {
          "jsx": true
      },
      ecmaVersion: 12,
      sourceType: "module",
  },
  rules: {
    "comma-dangle": "off",
    "@typescript-eslint/comma-dangle": ["error", "only-multiline"],
    "@typescript-eslint/no-unused-vars": 1
  }
};
