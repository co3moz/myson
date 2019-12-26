MYSON
=======================

Yet another object notation for node.js. 

```ts
const { MYSON } = require('myson');
const binary = MYSON.binarify("Hello, world!"); // <Buffer 81 51 48 65 6c 6c 6f 2c 20 77 6f 72 6c 64 21>
```

and decoding

```ts
const text = MYSON.parse(binary); // "Hello, world!"
```

### Differences over json

* Object types supported
* Decoding objects as tuples possible
* Not designed to read by humans
* Little bit more complicated structure
* Carry any kind of data

### Details

Minimum size of an object is 1 byte. Many objects can decoded with 1 byte. Empty arrays, numbers, booleans, empty strings, NaN, null and undefined can be single byte. Each object has unique id total of 4 bits (can be increased if needed). Other bits used for flags or extension of information. Flag area has 3 bits, but if you need more It can grow to 32 bits (24 bit will use 4 byte, 32 will use 5 byte)

#### null / undefined / boolean

Unlike json, myson can decode undefined. 

```ts
const binary = MYSON.binarify(null); // <Buffer 00>
// type = null (0), flag = 0  => \x00
```

```ts
const binary = MYSON.binarify(undefined); // <Buffer 10>
// type = null (0), flag = 1 => \x00 + (\x01 << 4) = \x10
```

Boolean actually uses same practise with different type code = 3

```ts
const binary = MYSON.binarify(false); // <Buffer 03>
// type = boolean (3), flag = false(0) => \x03 + (\x00 << 4) = \x03
```

```ts
const binary = MYSON.binarify(true); // <Buffer 13>
// type = boolean (3), flag = true(1) => \x03 + (\x01 << 4) = \x13
```


#### Arrays

Arrays can use flag area to store their element counts. 

```ts
const binary = MYSON.binarify([ ]); // <Buffer 02>
// type = array (2), flag = 0 => \x02
```

```ts
const binary = MYSON.binarify([ true ]); // <Buffer 12 13>
// type = array (2), flag = 1 => \x02 + (\x01 << 4) = \x12
// type = boolean (3), flag = 1 => \x03 + (\x01 << 4) = \x13
```

```ts
const binary = MYSON.binarify(Array(10).fill(0)); // <Buffer 81 22 04 04 04 04 04 04 04 04 04 04>
// in this case 10 value cannot directly fit into flags. so flags has to extend is self, <81 22> simply says this is an array and it has 10 elemets in it
// 04's are number(value = 0) representations in myson
```

#### Strings

Strings uses same standards of arrays. Flags will be used for length.


```ts
const binary = MYSON.binarify('hi'); // <Buffer 21 68 69>
// type = string (1), flag = 2 (length) => \x01 + (\x02 << 4) = \x21 + 'hi'
```

#### Numbers

Numbers are tricky things in javascript. They stored as 64bit in memory. but sending it as is doesn't make any sense. Thats why we have rules to decode them.

* NaN **1 byte**
* 0 <= number <= 4 : **1 byte**
* number is short / integer : **2-5 byte**
* number is double : **9 byte**

```ts
const binary = MYSON.binarify(0); // <Buffer 04>
// type = number (4), flag = 0 => \x04 + (\x00 << 4) = \x04
```

```ts
const binary = MYSON.binarify(1); // <Buffer 14>
// 1 can fit in flags
// type = number (4), flag = 1 => \x04 + (\x01 << 4) = \x14
```

```ts
const binary = MYSON.binarify(7); // <Buffer 64 07>
// 7 cannot fit flags due special case uses thats why we declare it in second byte
// type = number (4), flag = 6 (not float but big) => \x04 + (\x06 << 4) = \x64 + \x07 (our number)
```

#### Objects

Objects use flags to store how much key they has. For each, it decodes KEY and ELEMENT.

```ts
const binary = MYSON.binarify({}); // <Buffer 05>
// type = object (5), flag = 0 (no key)
```

```ts
const binary = MYSON.binarify({a: 1}); // <Buffer 15 11 61 14>
// type = object (5), flag = 1 (has one key) => \x15
// type = string (1), len = 1 => \x11
// \x61 = "a"
// type = number (4), value = 1 => \x14
```

```ts
const binary = MYSON.binarify({a: 1, b: 2}); // <Buffer 25 11 61 14 11 62 24>
// type = object (5), flag = 2 (has two key) => \x25
// type = string (1), len = 1 => \x11
// \x61 = "a"
// type = number (4), value = 1 => \x14
// type = string (1), len = 1 => \x11
// \x62 = "b"
// type = number (4), value = 2 => \x24
```

As you can see, objects aren't that efficient at all. If you have some T[] then you get same fields over and over again.

### Custom classes

Objects are cool, but not good enough to send same data structure over and over again. If we handshake between client and server then we somehow fix this size issue..

```ts
class Person {
  constructor(public name: string, public surname: string, public age: number, public isOkay: boolean) {}
}

const binary = MYSON.binarify(new Person('name', 'surname', 1, false)); // throws Unsupported type
```

Person won't be considered as regular old objects, thats why it says unsupported but that's what we planned.

```ts
MYSON.learn(0, Person, 'name', 'surname', 'age', 'isOkay'); 

const binary = MYSON.binarify(new Person('me', 'you', 1, false)); // <Buffer 07 21 6d 65 31 79 6f 75 14 03>
// type = Custom (7), class_id = 0 => \07
// type = string (1), len = 2 => \x21
// "6d 65 " me
// type = string (1), len = 3 => \x31
// "79 6f 75" you
// type = number (4), value = 1 => \x14
// type = boolean (3), value = false => \x03
```

### Custom rules

You can create and parse any kind of data with this mechanism.

> **Note:** `MYSON.parseEntity( )` function can parse single entity with current index data which MBuffer holds. 

```ts
import { MYSON, MBuffer, MResult } from 'myson';
// MBuffer is basically buffer with index used to decode binary data
// MResult is MYSON data entity, you provide it with flag or buffer then MYSON will call instances finish method with rule instance

MYSON.addRule({
  unique: MYSON.nextUnique(),
  matchObject(data: any) {
    // called when binarify()
    return data.constructor == String;
  },
  toMYSON(data: string): MResult {
    // called after matchObject is true
    return MResult.from(flags, buffer);
  },
  fromMYSON(buf: MBuffer, flags: number): string {
    // called when parse()
    // MYSON.parseEntity(buf) can be used for decode subentities
    return 1;
  }
});
```

> **Note:** There is rule limit. Only 16 rule can be created total, 8 of them used by default so only 8 new rule can be declared.