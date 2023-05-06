export function chunker(data, parts = 3) {
    const chunkSize = Math.ceil(data.length / parts);
    const result = [];
  
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      result.push(chunk);
    }
  
    return result;
}
