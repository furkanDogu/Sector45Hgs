type TObj = { [key in string]: any };
export const propertyExtractor = (obj: TObj, keysToExtract: string[]) =>
    Object.entries(obj).reduce<Object>(
        (acc, curr) =>
            keysToExtract.includes(curr[0]) ? { ...acc } : { ...acc, [curr[0]]: curr[1] },
        {}
    );
