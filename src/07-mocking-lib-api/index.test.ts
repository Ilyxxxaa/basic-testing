// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const testPath = '/foo';

jest.mock('axios');

const axiosMock = jest.mocked(axios);

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const getMock = jest.fn(async () => ({ data: 'foo' }));
    axiosMock.create.mockReturnValue({ get: getMock } as never);

    await throttledGetDataFromApi('');

    expect(axiosMock.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const getMock = jest.fn(async () => ({ data: 'foo' }));
    axiosMock.create.mockReturnValue({ get: getMock } as never);

    jest.runAllTimers();
    await throttledGetDataFromApi(testPath);

    expect(getMock).toHaveBeenCalledWith(testPath);
  });

  test('should return response data', async () => {
    // Write your test here
    const getMock = jest.fn(async () => ({ data: 'foo' }));
    axiosMock.create.mockReturnValue({ get: getMock } as never);

    jest.runAllTimers();
    const responseData = await throttledGetDataFromApi(testPath);

    expect(responseData).toBe('foo');
  });
});
