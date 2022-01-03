function mockImageUrl(width: number, height: number, name: string): string {
  return `https://via.placeholder.com/${width}x${height}?text=${name.split(" ").join("+")}`;
}

export { mockImageUrl };
