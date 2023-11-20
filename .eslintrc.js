module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true,
    },
    "extends": [
        "standard-with-typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:storybook/recommended",
        // "prettier-standard",
        "eslint:recommended",
        "prettier"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script",
            }
        },
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
              "multiline": {
                "delimiter": "semi",
                "requireLast": true
              },
              "singleline": {
                "delimiter": "semi",
                "requireLast": true
              }
            }
          ],
        "@typescript-eslint/semi": ["error", "always"],
        "semi": "off",
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}
