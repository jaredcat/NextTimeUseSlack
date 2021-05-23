module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@atoms", "./src/components/atoms"],
          ["@constants", "./src/constants"],
          ["@molecules", "./src/components/molecules"],
          ["@organisms", "./src/components/organisms"],
          ["@shared", "./src/shared"],
          ["@templates", "./src/components/templates"],
        ],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      },
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  ignorePatterns: ["docs/", ".vscode/"],
  rules: {
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "import/extensions": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
  },
  globals: {
    React: "writable",
  },
};
