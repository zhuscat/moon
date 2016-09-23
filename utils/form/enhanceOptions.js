export default function enhanceOptions(options) {
  const newOptions = [];
  options.forEach(option => {
    if (typeof option === 'string') {
      newOptions.push({ text: option, value: option });
    } else {
      newOptions.push(option);
    }
  });
  return newOptions;
}
