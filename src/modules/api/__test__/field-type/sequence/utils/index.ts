export function valid(
  data: Array<{ sequence: number }>,
  step: number,
  starts: number,
): boolean {
  let valid = true;

  let expected = starts;
  for (let i = 0; i < data.length && valid; i++) {
    if (data[i].sequence !== expected) {
      valid = false;
    }

    expected += step;
  }

  return valid;
}
