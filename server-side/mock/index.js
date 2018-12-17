module.exports = () => {
  const data = { values: [] };

  for (let i = 0; i < 1000; i++) {
    data.values.push({ id: i, name: `value${i}` });
  }
  return data;
}