module.exports = (args, flags) => {
  const task = args[0];
  const flagsCopy = [...flags]; // make a shallow copy to not mutate the original array
  const resultObject = {
    task,
  };
  if (task === `forecast`) {
    resultObject.location = args.slice(1).join(` `);
  }
  if (flagsCopy.includes(`--imperial`)) {
    resultObject.units = `imperial`;
    const index = flagsCopy.indexOf(`--imperial`);
    flagsCopy.splice(index, 1); // remove this flag from the array
  } else {
    resultObject.units = `metric`;
    const index = flagsCopy.indexOf(`--metric`);
    if (index >= 0) {
      flagsCopy.splice(index, 1);
    }
  }
  if (
    flagsCopy.some((element) => {
      const pattern = /--(\d+)/gi; // RegExp for checking flags with numbers on them
      return pattern.test(element);
    })
  ) {
    const match = flagsCopy.find((element) => {
      const pattern = /--(\d+)/gi;
      return pattern.test(element);
    });
    const index = flagsCopy.indexOf(match);
    flagsCopy.splice(index, 1);
    if (match.slice(2) > 0 && match.slice(2) < 40) resultObject.future = Number(match.slice(2));
    else resultObject.future = -1;
  }

  resultObject.displayIncluding = [...flagsCopy]; // put all remaining flags into array
  return resultObject;
};
