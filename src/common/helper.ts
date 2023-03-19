export function camelToUnderscore(key: string) {
  var result = key.replace(/([A-Z])/g, " $1");
  return result.split(" ").join("_").toUpperCase();
}
