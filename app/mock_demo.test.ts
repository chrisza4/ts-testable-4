jest.mock('./to_be_mock.ts')
import * as ToBeMock from './to_be_mock'
import { mocked } from 'ts-jest/utils'

describe('MockDemo', () => {
  it('This is how mocking works', () => {
    const mockedSubject = mocked(ToBeMock)
    mockedSubject.returnFive.mockReturnValue(6)
    console.log('Five after mock will be:', ToBeMock.returnFive(2))
    expect(ToBeMock.returnFive(1)).toEqual(6)

    mockedSubject.returnFive.mockImplementation(() => 1111)

    expect(ToBeMock.returnFive(2)).toEqual(1111)
    console.log('Called', mockedSubject.returnFive.mock.calls)

    // Should be called 3 times
    expect(mockedSubject.returnFive.mock.calls.length).toEqual(3)
    // First call by paramerter just 2
    expect(mockedSubject.returnFive.mock.calls[0]).toEqual([2])
    // Second call by paramerter just 1
    expect(mockedSubject.returnFive.mock.calls[1]).toEqual([1])
    // Third call by paramerter just 2
    expect(mockedSubject.returnFive.mock.calls[2]).toEqual([2])
  })
})
