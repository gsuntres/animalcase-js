function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

const handlePreserveConsecutiveUppercase = (decamelized, separator) => {
  // Lowercase all single uppercase characters. As we
  // want to preserve uppercase sequences, we cannot
  // simply lowercase the separated string at the end.
  // `data_For_USACounties` → `data_for_USACounties`
  decamelized = decamelized.replace(/((?<![\p{Uppercase_Letter}\d])[\p{Uppercase_Letter}\d](?![\p{Uppercase_Letter}\d]))/gu, $0 => {
    return $0.toLowerCase();
  }); // Remaining uppercase sequences will be separated from lowercase sequences.
  // `data_For_USACounties` → `data_for_USA_counties`

  return decamelized.replace(/(\p{Uppercase_Letter}+)(\p{Uppercase_Letter}\p{Lowercase_Letter}+)/gu, (_, $1, $2) => {
    return $1 + separator + $2.toLowerCase();
  });
};

var decamelize = (text, {
  separator = '_',
  preserveConsecutiveUppercase = false
} = {}) => {
  if (!(typeof text === 'string' && typeof separator === 'string')) {
    throw new TypeError('The `text` and `separator` arguments should be of type `string`');
  } // Checking the second character is done later on. Therefore process shorter strings here.


  if (text.length < 2) {
    return preserveConsecutiveUppercase ? text : text.toLowerCase();
  }

  const replacement = `$1${separator}$2`; // Split lowercase sequences followed by uppercase character.
  // `dataForUSACounties` → `data_For_USACounties`
  // `myURLstring → `my_URLstring`

  const decamelized = text.replace(/([\p{Lowercase_Letter}\d])(\p{Uppercase_Letter})/gu, replacement);

  if (preserveConsecutiveUppercase) {
    return handlePreserveConsecutiveUppercase(decamelized, separator);
  } // Split multiple uppercase characters followed by one or more lowercase characters.
  // `my_URLstring` → `my_url_string`


  return decamelized.replace(/(\p{Uppercase_Letter}+)(\p{Uppercase_Letter}\p{Lowercase_Letter}+)/gu, replacement).toLowerCase();
};

const preserveCamelCase = string => {
  let isLastCharLower = false;
  let isLastCharUpper = false;
  let isLastLastCharUpper = false;

  for (let i = 0; i < string.length; i++) {
    const character = string[i];

    if (isLastCharLower && /[a-zA-Z]/.test(character) && character.toUpperCase() === character) {
      string = string.slice(0, i) + '-' + string.slice(i);
      isLastCharLower = false;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = true;
      i++;
    } else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(character) && character.toLowerCase() === character) {
      string = string.slice(0, i - 1) + '-' + string.slice(i - 1);
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = false;
      isLastCharLower = true;
    } else {
      isLastCharLower = character.toLowerCase() === character && character.toUpperCase() !== character;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = character.toUpperCase() === character && character.toLowerCase() !== character;
    }
  }

  return string;
};

const camelCase = (input, options) => {
  if (!(typeof input === 'string' || Array.isArray(input))) {
    throw new TypeError('Expected the input to be `string | string[]`');
  }

  options = Object.assign({
    pascalCase: false
  }, options);

  const postProcess = x => options.pascalCase ? x.charAt(0).toUpperCase() + x.slice(1) : x;

  if (Array.isArray(input)) {
    input = input.map(x => x.trim()).filter(x => x.length).join('-');
  } else {
    input = input.trim();
  }

  if (input.length === 0) {
    return '';
  }

  if (input.length === 1) {
    return options.pascalCase ? input.toUpperCase() : input.toLowerCase();
  }

  const hasUpperCase = input !== input.toLowerCase();

  if (hasUpperCase) {
    input = preserveCamelCase(input);
  }

  input = input.replace(/^[_.\- ]+/, '').toLowerCase().replace(/[_.\- ]+(\w|$)/g, (_, p1) => p1.toUpperCase()).replace(/\d+(\w|$)/g, m => m.toUpperCase());
  return postProcess(input);
};

var camelcase = camelCase; // TODO: Remove this for the next major release

var _default = camelCase;
camelcase.default = _default;

/**
 * Converts camelCase to snake_case and vise versa.
 * @class
 */

var CaseConvert = /*#__PURE__*/function () {
  function CaseConvert() {
    _classCallCheck(this, CaseConvert);
  }

  _createClass(CaseConvert, [{
    key: "_deepIterate",
    value:
    /**
     * Function should ignore any processing when the newKey is the same as the old one.
     *
     * @param {CaseConvert~operateOnKeyFunc} operateOnKeyFunc
     */
    function _deepIterate(obj, operateOnKeyFunc) {
      var _this = this;

      if (Array.isArray(obj)) {
        obj.forEach(function (entry) {
          if (_typeof(entry) === 'object') {
            _this._deepIterate(entry, operateOnKeyFunc);
          }
        });
      } else if (_typeof(obj) === 'object' && obj !== null) {
        Object.keys(obj).forEach(function (key) {
          var newKey = operateOnKeyFunc(obj, key);

          if (_typeof(obj[newKey]) === 'object') {
            _this._deepIterate(obj[newKey], operateOnKeyFunc);
          }
        });
      }
    }
    /**
     * Convert to camel case. This function mutates the original object
     *
     * @param {object} o Object to mutate
     */

  }, {
    key: "convertToCamelCase",
    value: function convertToCamelCase(o) {
      this._deepIterate(o, function (obj, key) {
        var newKey = camelcase(key);

        if (newKey !== key) {
          delete Object.assign(obj, _defineProperty({}, newKey, obj[key]))[key];
        }

        return newKey;
      });
    }
    /**
     * Convert to snake case. This function mutates the original object
     *
     * @param {object} o Object to mutate
     */

  }, {
    key: "convertToSnakeCase",
    value: function convertToSnakeCase(o) {
      this._deepIterate(o, function (obj, key) {
        debugger;
        var newKey = decamelize(key, {
          preserveConsecutiveUppercase: true
        });

        if (newKey !== key) {
          delete Object.assign(obj, _defineProperty({}, newKey, obj[key]))[key];
        }

        return newKey;
      });
    }
  }]);

  return CaseConvert;
}();

var index = new CaseConvert();
/**
 * Callback Change the key of the provided object.
 *
 * @callback CaseConvert~operateOnKeyFunc
 * @param {object} obj The object that has the key. This operation expects to mutate the object.
 * @param {string} key Property's key to mutate
 * @returns {string} The new key
 */

export default index;
