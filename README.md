# tc-id

`tc-id` is a package to validate Turkish Citizenship Identity Numbers. You can simply use it as:

```js
import { validateTCID } from "tc-id";

const id = "YOUR_TC_ID";

const validatedId = validateTCID(id);
```

It throws error if validation falied. It returns its input as result. You may use function with both numbers and strings. You may include additional returnType argument, which is `"string"` by default. `"number"` is also allowed.

```js
const id = "YOUR_TC_ID";

const validatedId = validateTCID(id, "number")
```

NOTE: It is not guaranteed to validated TC ID number is been having by someone. It is not verification, just validation works with TC_ID derivation rules.

#### [MIT License](https://github.com/urtuba/turkish-id/blob/main/LICENSE)
