const formatRegex = /%s/g;

export default function format(s, ...args) {
  let i = 0;
  const str = s.replace(formatRegex, x => {
    if (x === '%s') {
      return String(args[i++]);
    }
  });
  return str;
}
