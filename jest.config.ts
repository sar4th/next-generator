import nextJest from 'next/jest';

const createJestConfig = nextJest({
    dir: './'
});

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    }
};

export default createJestConfig(customJestConfig);
