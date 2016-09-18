let seed = 0;

export default function getId(prefix) {
  return `${prefix}_${Date.now()}_${seed++}`;
}
