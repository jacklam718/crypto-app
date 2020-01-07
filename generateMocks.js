const getRandomNum = (min, max) => Math.random() * (max - min) + min;

const generateDates = (n) => {
  const numbers = [];
  while (n) {
    numbers.push(getRandomNum(0, 15));
    n--;
  }
  numbers.sort((a, b) => a - b);
  const formate = d => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  return numbers.map(i => formate(new Date(2019, 10, i)) );
  // return numbers.map(i => new Date(2019, 10, i));
}

const generateTransaction = (min, max) => {
  const generateType = () => {
    return '';
    const types = ['shopping', 'withdraw', 'transfer'];
    return types[Math.round(getRandomNum(0, 2))];
  }
  const generateAmount = (min, max) => getRandomNum(min, max).toFixed(2);

  return {
    type: generateType(),
    amount: Number(generateAmount(min, max)),
  };
}

const generateMockData = (n, { min, max } = { min: 6000, max: 12000 }) => {
  const data = [];
  const dates = generateDates(n);
  for (let i = 0; i < n; i++) {
    const transaction = {
      date:  dates[i],
      data: [generateTransaction(min, max)],
    };
    const exists = data.find((item) => item.date === dates[i]);
    if (exists) {
      exists.data.push(generateTransaction(min, max));
    } else {
      data.push(transaction);  
    }
  }
  return data;
}

const makeMock = (nums = 100) => {
  const mockData = generateMockData(nums)
  for (let item of mockData) {
    item.data = item.data.map(i => ({
      ...i,
      color: Math.round(Math.random()) ? '#47fb9b' : '#ed4369',
      timeSeriesData: generateMockData(nums)
        .map((data, idx) => ({
          ...data,
          date: new Date(data.date) || new Date(),
          // date: data.date,
          x: idx,
          y: data.data.reduce((acc, obj) => acc + obj.amount, 0),
        }))
    }))
  }
  return mockData
}

export default makeMock;