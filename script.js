const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length; //среднее значение. Складывает все значения с массива и делится на длину массива

const getMedian = (array) => {
  const sorted = array.toSorted((a, b) => a - b);
  const medianIndex = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 === 0
    ? getMean([sorted[medianIndex], sorted[medianIndex - 1]])
    : sorted[medianIndex];
  return median;
} // Определяет центральное значение в массиве. Сортировка массива. Если массив имеет нечетное значение массива -  то выводится центральный элемент массива. Если четное -  среднее между двумя центральными индексами массива

const getMode = (array) => {
  const counts = {};
  array.forEach((el) => {
    counts[el] = (counts[el] || 0) + 1;
  })
  if (new Set(Object.values(counts)).size === 1) {
    return Object.keys(counts)[0].join(", ");
  }
  const highest = Object.keys(counts).sort(
    (a, b) => counts[b] - counts[a]
  )[0];
  const mode = Object.keys(counts).filter(
    (el) => counts[el] === counts[highest]
  );
  return mode.join(", ");
} // Определяет какие числа встречаются чаще всего. Создаем обьект. Перебираем массив. Если такой элемент есть - добавляем 1 к значению. Потом проверяем значения и по самым большим значениям выводим ключи

const getRange = (array) => {
  return Math.max(...array) - Math.min(...array);
} // Разница между максимальным и минимальным значением массива. Важно сделать копию массива чтоб избежать мутации

const getVariance = (array) => {
  const mean = getMean(array);
  const variance = array.reduce((acc, el) => {
    const difference = el - mean;
    const squared = difference ** 2;
    return acc + squared;
  }, 0) / array.length;
  return variance;
} //Дисперсия. Берем среднее значение (getMean). Вычисляется разница между текущим элементом и средним значением. Возводим в квадрат и сумируем. Делим на длину массива


const getStandardDeviation = (array) => {
  const variance = getVariance(array);
  const standardDeviation = Math.sqrt(variance);
  return standardDeviation;
} //отклонение. Корень из дисперсии

const calculate = () => {
  const value = document.querySelector("#numbers").value;
  if (value === "") {
    alert("Введите числа для расчета статистики")
  } else {
  const array = value.split(/,\s*/g);
  const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));
  
  const mean = getMean(numbers);
  const median = getMedian(numbers);
  const mode = getMode(numbers);
  const range = getRange(numbers);
  const variance = getVariance(numbers);
  const standardDeviation = getStandardDeviation(numbers);


  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
  document.querySelector("#mode").textContent = mode;
  document.querySelector("#range").textContent = range;
  document.querySelector("#variance").textContent = variance;
  document.querySelector("#standardDeviation").textContent = standardDeviation;}
}