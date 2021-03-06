module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint",
        "react",
        "react-hooks"
    ],
    env: {
        browser: true,
        jest: true
    },
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
    ],
    parserOptions: {
        project: [
            "tsconfig.json",
        ],
        tsconfigRootDir: __dirname,
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/member-delimiter-style": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".tsx"] }],
        "react/prop-types": "off",
        "react/no-direct-mutation-state": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
    },
    settings: {
        react: {
            version: "detect"
        }
    }
};
