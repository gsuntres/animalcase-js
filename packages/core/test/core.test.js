import casefilter from '..'

describe('CaseFitler', function() {

  it('casefilter#convertToSnakeCase no conversion', function() {

    const camel = {
      willnotconvert: 1,
      willConvert: 2
    }

    casefilter.convertToSnakeCase(camel)
    assert.deepEqual(camel, {
      willnotconvert: 1,
      will_convert: 2
    })
  })

  it('casefilter#convertToCamelCase no conversion', function() {
    const camel = {
      willnotconvert: 1,
      will_convert: 2
    }

    casefilter.convertToCamelCase(camel)
    assert.deepEqual(camel, {
      willnotconvert: 1,
      willConvert: 2
    })
  })

  it.only('casefilter#convertToSnakeCase', function() {
    const camel = {
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

    casefilter.convertToSnakeCase(camel)
    assert.deepEqual(camel, {
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

  it('casefilter#convertToCamelCase', function() {
    const snake = {
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

    casefilter.convertToCamelCase(snake)
    assert.deepEqual(snake, {
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
