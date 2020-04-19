const isSubstring = (string: string, substring: string): boolean =>
  string.toLowerCase().indexOf(substring.toLowerCase()) !== -1;

export default isSubstring;
