export default function keyBindingFn(event) {
  if (event.meta && event.keyCode === 66) {
    return 'text-bold';
  }
  if (event.meta && event.keyCode === 73) {
    return 'text-italic';
  }
  if (event.meta && event.keyCode === 85) {
    return 'text-underline';
  }
}
