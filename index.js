import { Kefir as K } from "kefir";

function mediaContext(viewport, query) {
  const matcher = viewport.matchMedia(query);

  return K.stream(emitter => {
    const emitMatches = e => emitter.emit(e.matches);

    matcher.addListener(emitMatches);

    return () => {
      matcher.removeListener(emitMatches);
    };
  }).toProperty(() => matcher.matches);
}

export default mediaContext;
