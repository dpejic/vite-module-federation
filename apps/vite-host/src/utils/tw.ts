export const tw = (...classes: string[]) =>
  classes
    .map((cls) =>
      cls
        .split(" ")
        .map((className) => `host-${className}`)
        .join(" ")
    )
    .join(" ");
