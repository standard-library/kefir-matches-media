# matchesMedia

Wraps the browser [`matchMedia` API](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) in a Kefir property stream. The resulting property is the boolean value equal to the media query match.

```es6
import matchesMedia from "@standard-library/kefir-matchesMedia";

const isNarrow = matchesMedia(window, "(max-width: 500px)");
# <value> true
# ... resize browser to be narrow
# <value> false
```
