import { describe, expect, test } from '@jest/globals'
import { caseconv } from '../src/index'

describe('CaseFitler', function () {

  test('casefilter#convertToSnakeCase no conversion', function () {

    const camel: Record<string, number> = {
      willnotconvert: 1,
      willConvert: 2
    }

    caseconv.convertToSnakeCase(camel)

    expect(camel).toStrictEqual({
      willnotconvert: 1,
      will_convert: 2
    })
  })

  test('casefilter#convertToCamelCase no conversion', function () {
    let camel: Record<string, number> = {
      willnotconvert: 1,
      will_convert: 2
    }

    camel = caseconv.convertToCamelCase(camel)
    expect(camel).toStrictEqual({
      willnotconvert: 1,
      willConvert: 2
    })
  })

  test('casefilter#convertToSnakeCase', function () {
    const camel: Record<string, number | string | object> = {
      myKey: 1,
      myNameHere: 'George',
      nestedObject: {
        varOne: '1',
        varTwo: '2'
      },
      myArr: [
        '1',
        '2'
      ],
      myNestedArr: [
        {
          myObj: {
            myId: 1,
            myName: 'GEORGE'
          }
        }, [
          1,
          'something',
          null,
          undefined
        ]
      ]
    }

    caseconv.convertToSnakeCase(camel)

    expect(camel).toStrictEqual({
      my_key: 1,
      my_name_here: 'George',
      nested_object: {
        var_one: '1',
        var_two: '2'
      },
      my_arr: [
        '1',
        '2'
      ],
      my_nested_arr: [
        {
          my_obj: {
            my_id: 1,
            my_name: 'GEORGE'
          }
        },
        [
          1,
          'something',
          null,
          undefined
        ]
      ]
    })
  })

  test('casefilter#convertToCamelCase', function () {
    const snake: Record<string, number | string | object> = {
      my_key: 1,
      my_name_here: 'George',
      nested_object: {
        var_one: '1',
        var_two: '2'
      },
      my_arr: [
        '1',
        '2'
      ],
      my_nested_arr: [
        {
          my_obj: {
            my_id: 1,
            my_name: 'GEORGE'
          }
        },
        [
          1,
          'something',
          null,
          undefined
        ]
      ]
    }

    const camel = caseconv.convertToCamelCase(snake)

    expect(camel).toStrictEqual({
      myKey: 1,
      myNameHere: 'George',
      nestedObject: {
        varOne: '1',
        varTwo: '2'
      },
      myArr: [
        '1',
        '2'
      ],
      myNestedArr: [
        {
          myObj: {
            myId: 1,
            myName: 'GEORGE'
          }
        },
        [
          1,
          'something',
          null,
          undefined
        ]
      ]
    })
  })

})
