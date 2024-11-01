// eslint.config.js
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    // Ustawienia parsowania i języka
    files: ['react/**/*.ts', 'react/**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      globals: {
        // Definiowanie zmiennych globalnych dla przeglądarki i Node.js
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        process: 'readonly',
        module: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect', // Automatyczne wykrywanie wersji React
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // Reguły i konfiguracja pluginów
      ...typescriptPlugin.configs.recommended.rules, // Zalecane reguły TypeScript
      ...reactPlugin.configs.recommended.rules, // Zalecane reguły React
      ...reactHooksPlugin.configs.recommended.rules, // Zalecane reguły dla hooków Reacta
      ...prettierConfig.rules, // Reguły Prettiera
      'prettier/prettier': 'error', // Ustawienie Prettiera jako błędu
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react/react-in-jsx-scope': 'off', // Wyłączone dla nowego JSX transform
      'react/prop-types': 'off', // Wyłączone, bo TS obsługuje typowanie propsów
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];
