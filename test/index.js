import test from "tape";
import { Kefir as K } from "kefir";
import EventEmitter from "events";

import matchesMedia from "..";

const Viewport = () => {
  const matcher = new EventEmitter();

  return {
    emit: (...args) => matcher.emit("ping", ...args),
    matchMedia: () => {
      const update = value => {
        media.matches = value;
        return media
      };

      const media = {
        matches: true,
        addListener: fn => matcher.addListener("ping", v => fn(update(v))),
        removeListener: fn => matcher.removeListener("ping", v => fn(update(v)))
      }

      return media;
    }
  };
};

test("default is true", t => {
  const view = Viewport();
  const matches = matchesMedia(view, "(max-width: 900px)");

  matches.take(1).observe(m => {
    t.equal(m, true);
    t.end();
  });
});

test("emits new values", t => {
  const view = Viewport();
  const matches = matchesMedia(view, "(max-width: 900px)");
  const values = [];

  matches.observe(m => {
    values.push(m);
  });

  view.emit(false);

  t.deepEqual(values, [true, false]);
  t.end();
});
