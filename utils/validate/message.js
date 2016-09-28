const message = {
  required: '%s为必填项',
  string: {
    min: '%s至少为%s个字符',
    max: '%s之多为%s个字符',
  },
  array: {
    default: '必须提供一个数组',
    min: '%s至少选择%s个选项',
    max: '%s至多选择%s个选项',
  },
  number: {
    default: '必须提供一个数字',
    min: '%s最小为%s',
    max: '%s最大为%s',
  },
};

export default message;
