import Handlebars from 'handlebars';

// Helper to check if a value equals another
Handlebars.registerHelper('if_eq', function (this: any, a: any, b: any, opts: any) {
  if (a === b) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

// Helper to check if an array includes a value
Handlebars.registerHelper('includes', function (this: any, array: any[], value: any, opts: any) {
  if (Array.isArray(array) && array.includes(value)) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

// Helper to iterate over an array
Handlebars.registerHelper('each', function (this: any, context: any, options: any) {
  let ret = '';
  for (let i = 0, j = context.length; i < j; i++) {
    ret = ret + options.fn(context[i]);
  }
  return ret;
});

export function registerHelpers() {
  // Helpers are registered when this module is imported
}
