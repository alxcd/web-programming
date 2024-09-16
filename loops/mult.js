
const arr = Array.from(
  { length: 13 }, 
  () => Math.floor(Math.random() * 10) + 1
);
console.log(arr);

const methods = {
  met1: function(arr) {
    let mult = 1;
    let i = 0;
    while (i < arr.length) {
      mult *= arr[i];
      i++;
    }
    return mult;
  },

  met2: function(arr) {
    let mult = 1;
    let i = 0;
    do {
      mult *= arr[i];
      i++;
    } while (i < arr.length);
    return mult;
  },

  met3: function(arr) {
    let mult = 1;
    for (let i = 0; i < arr.length; i++) {
      mult *= arr[i];
    }
    return mult;
  },

  met4: function(arr) {
    if (arr.length == 0) {
      return 1;
    }
    return arr[0] * this.met4(arr.slice(1));
  },

  met5: function(arr) {
    let mult = 1;
    for (const num of arr) {
      mult *= num;
    }
    return mult;
  },

  met6: function(arr) {
    let mult = 1;
    for (const index in arr) {
      mult *= arr[index];
    }
    return mult;
  },

  met7: function(arr) {
    let mult = 1;
    arr.forEach(num => mult *= num);
    return mult;
  },

  met8: function(arr) {
    return arr.reduce((acc, cur) => acc * cur, 1);
  },

  met9: function(arr) {
    return eval(arr.join("*"));
  },

  met10: function(arr) {
    return "I couldn't create anything clever"
  },
}

for (let i = 1; i <= 10; i++) {
  console.log(`met${i}`, methods[`met${i}`](arr));
}