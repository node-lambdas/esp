import { compile } from "@homebots/espresso-compiler";

export default {
  version: 2,
  actions: {
    compile: {
      default: true,
      input: "text",
      output: "text",
      handler(input, output) {
        try {
          const bytes = compile(input.body);
          const buffer = Buffer.from(bytes);
          const formatted = input.options.buffer
            ? buffer
            : buffer.toString("hex");

          output.send(formatted);
        } catch (error) {
          output.reject(error.message);
          return;
        }
      },
    },
  },
};
