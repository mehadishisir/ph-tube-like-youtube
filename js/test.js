function getTimestring(time) {
  const hour = parseInt(time / 3600);
  let minute = parseInt(time % 3600);
  const secound = parseInt(minute % 60);
  return `${hour} hour,${minute} minute ${secound} secound ago`;
}
console.log(getTimestring(430000));
