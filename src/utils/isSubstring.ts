const isSubstring = (string = "", substring = ""): boolean =>
  string.toLowerCase().indexOf(substring.toLowerCase()) !== -1;

export default isSubstring;
