const generate_token = (length) => {
  const a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  const b = [];
  for (let i = 0; i < length; i += 1) {
    let j = (Math.floor(Math.random() * (a.length - 1)));
    b.push(a[j]);
  }
  return b.join('');
};
console.log(generate_token(32));

////// Update timer.user  set ?
// [
//   token_user : token_user
// ]