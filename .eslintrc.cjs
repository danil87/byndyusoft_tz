module.exports = {
    root: true,
    env: { browser: true, es2020: true, node: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: [
        'react-refresh',
        'eslint-plugin-react',
        'simple-import-sort',
        'import',
        'prettier',
    ],
    rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        'no-console': 'warn',
        curly: 'error',
        'no-unused-expressions': 'error',

        'import/prefer-default-export': 'off',

        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',

        'react-refresh/only-export-components': 'off',

        'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],

        'prettier/prettier': 'error',
        'arrow-body-style': ['error', 'as-needed'],
        indent: ['error', 4],
    },
}
