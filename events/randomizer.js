function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

// function randomizer(...callbacks) {
//   let n = callbacks.length;
//   let order = [];
//   callbacks.forEach(callback => {
//     let times = order.map(callback => callback.time);
//     let time = randomSecond(2, 2 * n);
//     while (times.includes(time)) {
//       time = randomSecond(2, 2 * n);
//     }
//     order.push({func: callback, time});
//   });
//   for (let i = 1; i <= n * 2; i += 1) {
//     let callback = order.filter(func => func.time === i);
//     if (callback.length === 0) {
//       setTimeout(() => console.log(i), i * 1000);
//     } else {
//       setTimeout(callback[0].func, i * 1000);
//     }
//   }
// }

// function randomSecond(min, max) {
//   return Math.floor(Math.random() * (max - min) + min);
// }

randomizer(callback1, callback2, callback3);

function randomizer(...callbacks) {
  if (callbacks.length < 1) {
    return;
  }

  const secondsEnd = 2 * callbacks.length;
  let secondsElapsed = 0;

  const timeLogger = setInterval(() => {
    secondsElapsed += 1;
    console.log(secondsElapsed);

    if (secondsElapsed >= secondsEnd) {
      clearInterval(timeLogger);
    }
  },1000);

  callbacks.forEach(callback => {
    const executeTime = Math.floor(Math.random() * secondsEnd * 1000);
    setTimeout(callback, executeTime);
  });
}
