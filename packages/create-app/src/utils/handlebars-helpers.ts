import type Handlebars from 'handlebars';
import HandlebarsLib from 'handlebars';

type HelperOptions = Handlebars.HelperOptions;

// Helper to check if a value equals another
HandlebarsLib.registerHelper(
  'if_eq',
  function (this: unknown, a: unknown, b: unknown, opts: HelperOptions) {
    if (a === b) {
      return opts.fn(this);
    }
    return opts.inverse(this);
  },
);

// Helper to check if an array includes a value
HandlebarsLib.registerHelper(
  'includes',
  function (this: unknown, array: unknown, value: unknown, opts: HelperOptions) {
    if (Array.isArray(array) && array.includes(value)) {
      return opts.fn(this);
    }
    return opts.inverse(this);
  },
);

// Helper to iterate over an array
HandlebarsLib.registerHelper(
  'each',
  function (this: unknown, context: unknown[], options: HelperOptions) {
    let ret = '';
    for (let i = 0, j = context.length; i < j; i++) {
      ret = ret + options.fn(context[i]);
    }
    return ret;
  },
);

export function registerHelpers() {
  // Helpers are registered when this module is imported
}
