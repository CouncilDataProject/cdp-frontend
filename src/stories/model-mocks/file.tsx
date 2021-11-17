function mockImageFile(width: number, height: number, name: string) {
  return {
    uri: `https://via.placeholder.com/${width}x${height}?text=${name.split(" ").join("+")}`,
    id: `test-picture-${name}`,
    name: `${name}.jpg`,
    description: "a populated test pic",
    media_type: "jpeg",
  };
}

export { mockImageFile };
