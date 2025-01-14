export const tw = (...classes: string[]) =>
  classes
    .map((cls) =>
      cls
        .split(" ")
        .map((className) => `shopping-${className}`)
        .join(" ")
    )
    .join(" ");
