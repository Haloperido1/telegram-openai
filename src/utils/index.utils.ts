function randomArrayElement(arr: Array<any>) {
  const rng = Math.floor(Math.random() * arr.length);
  return arr[rng];
}

export default randomArrayElement;
