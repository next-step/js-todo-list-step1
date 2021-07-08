module.exports = {
  // 코드 포맷을 prettier로 설정
  plugins: ['prettier'],
  // eslint의 룰을 기본 권장설정으로 설정
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  // 코드를 해석하는 parser에 대한 설정
  parserOptions: {
    // 자바스크립트 버전, 7은 ECMA2016
    ecmaVersion: 7,
    // 모듈 export를 위해 import, export를 사용 가능여부를 설정, script는 사용불가
    sourceType: 'module',
    // jsx 허용을 설정, back-end 설정이기 때문에 사용 안함
    ecmaFeatures: {
      jsx: false,
    },
  },
  // linter가 파일을 분석할 때, 미리 정의된 전역변수에 무엇이 있는지 명시하는 속성
  env: {
    // 브라우저의 document와 같은 객체 사용 여부
    browser: true,
    // node.js에서 console과 같은 전역변수 사용 여부
    node: true,
  },
  // ESLint가 무시할 디렉토리, 파일을 설정
  ignorePatterns: ['node_modules/'],
  // ESLint 룰을 설정
  rules: {
    'no-console': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        trailingComma: 'all',
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'avoid',
        endOfLine: 'auto',
      },
    ],
  },
};
