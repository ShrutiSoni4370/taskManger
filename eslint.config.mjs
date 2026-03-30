import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // ✅ fixes 'process' error
      },
    },
  },

  js.configs.recommended,

  pluginReact.configs.flat.recommended,

  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    settings: {
      react: {
        version: 'detect', // ✅ removes warning
      },
    },

    rules: {
      'no-unused-vars': 'error', // ✅ ADD THIS
      'react/react-in-jsx-scope': 'off', // ✅ fixes JSX error
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'warn',
    },
  },
]);
