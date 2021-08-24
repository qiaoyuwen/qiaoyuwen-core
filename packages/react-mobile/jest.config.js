module.exports = {
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // 匹配 .ts 或者 .tsx 结尾的文件
  },
  collectCoverage: true, // 统计覆盖率
  testEnvironment: 'node', // 测试环境
  // 不算入覆盖率的文件夹
  coveragePathIgnorePatterns: ['/node_modules/', '/__test__/'],
  testPathIgnorePatterns: ['<rootDir>/dist'],
};
