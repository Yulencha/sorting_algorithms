//  Сортировка пузырьком (Bubble Sort)
function bubbleSort(arr) {
  let steps = []; // Массив для хранения шагов алгоритма
  let n = arr.length; // Длина исходного массива

  // Внешний цикл, который проходит по всему массиву
  for (let i = 0; i < n - 1; i++) {
    // Внутренний цикл, который сравнивает элементы попарно и выполняет их обмен, если необходимо
    for (let j = 0; j < n - i - 1; j++) {
      let snapshot = arr.slice(); // Создаем снимок текущего состояния массива
      let swapped = false; // Флаг, указывающий был ли выполнен обмен элементов

      // Если текущий элемент больше следующего, меняем их местами
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true; // Помечаем, что обмен был выполнен
      }

      // Формируем комментарий к текущему шагу
      let comment = swapped
        ? `${arr[j]} меньше ${arr[j + 1]}. Элементы меняются местами`
        : `${arr[j]} и ${arr[j + 1]} стоят в правильном порядке. Ничего не меняется`;

      // Добавляем информацию о текущем шаге в массив шагов
      steps.push({ array: snapshot, comment, swappedIndices: swapped ? [j, j + 1] : [] });
    }
  }
  return steps; // Возвращаем массив всех шагов алгоритма
}

// Сортировки вставками (Insertion sort)
function insertionSort(arr) {
  let steps = []; // Массив для хранения шагов сортировки
  let n = arr.length; // Длина исходного массива

  // Проходим по массиву, начиная со второго элемента
  for (let i = 1; i < n; i++) {
    let key = arr[i]; // Ключевой элемент для сравнения
    let j = i - 1; // Начальный индекс для сравнения с ключевым элементом

    // Проверяем, нужно ли перемещать ключевой элемент
    if (arr[j] > key) {
      // Создаем "пустое" место для ключевого элемента
      arr[i] = null;
      steps.push({
        array: arr.slice(),
        comment: `Вынимаем ${key} и создаем пространство для вставки`,
        swappedIndices: [i],
      });

      // Сдвигаем элементы, которые больше ключевого элемента
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        arr[j] = null; // Перемещаем "пустое" место
        steps.push({
          array: arr.slice(),
          comment: `Элемент ${arr[j + 1]} больше, чем ${key}, сдвигаем его вперед`,
          swappedIndices: [j, j + 1],
        });
        j--;
      }

      // Вставляем ключевой элемент на его новое место
      arr[j + 1] = key;
      steps.push({
        array: arr.slice(),
        comment: `Вставляем ${key} на свое место`,
        swappedIndices: [j + 1],
      });
    } else {
      // Если элемент уже находится на своем месте
      steps.push({
        array: arr.slice(),
        comment: `Элемент ${key} уже на правильном месте, перемещения не требуется`,
        swappedIndices: [],
      });
    }
  }
  return steps; // Возвращаем массив шагов сортировки
}

/* Сортировки вставками (Insertion sort) в оригинале

function insertionSort1(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i;
    while (j > 0 && arr[j - 1] > key) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = key;
  }
  return arr;
} */

//  Сортировка выбором (Selection Sort)
function selectionSort(arr) {
  let steps = []; // Массив для хранения шагов сортировки
  let n = arr.length; // Определение длины массива

  // Внешний цикл, который проходит по всему массиву
  for (let i = 0; i < n; i++) {
    let minIdx = i; // Индекс наименьшего элемента, начально установлен на текущий элемент цикла

    // Внутренний цикл для поиска наименьшего элемента в оставшейся части массива
    for (let j = i + 1; j < n; j++) {
      // Если найден элемент меньше текущего минимального, обновляем индекс минимального
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    // Если нашли элемент меньше текущего, меняем их местами
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        array: arr.slice(),
        comment: `Среди элементов массива правее текущего элемента (${arr[minIdx]}), находим наименьшее значение - ${arr[i]}. Меняем местами ${arr[i]} и ${arr[minIdx]}`,
        swappedIndices: [i, minIdx],
      });
    } else {
      // Если текущий элемент уже на минимальной позиции, переходим к следующему
      steps.push({
        array: arr.slice(),
        comment: `Элемент ${arr[i]} уже на правильном месте`,
        swappedIndices: [],
      });
    }
  }
  return steps; // Возвращаем массив шагов сортировки
}

/*  Сортировка выбором (Selection Sort) в оригинале
function selectionSort1(arr) {
  for (let i = 0; i < arr.length; i++) {
    // Находим индекс наименьшего числа в правой части массива
    let minIdx = i; // начинаем с i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx != i) {
      // Меняем элементы местами
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}
*/

// Быстрая сортировка (Quick Sort)
function quickSort(arr, left = 0, right = arr.length - 1, steps = []) {
  // Условие выхода из рекурсии
  if (left >= right) {
    return steps;
  }

  // Выбор опорного элемента
  let pivot = arr[right];
  // Разделение массива на две части относительно опорного элемента
  let partitionIndex = partition(arr, left, right);

  // Формирование массива индексов для текущего подмассива
  let currentIndices = [];
  for (let i = left; i <= right; i++) {
    currentIndices.push(i);
  }

  // Добавление информации о текущем шаге в массив шагов
  steps.push({
    array: arr.slice(),
    comment: `Опорный элемент ${pivot}. Разделение на подмассивы. Значения меньше ${pivot} перемещены влево, больше - вправо.`,
    swappedIndices: currentIndices,
    pivotIndex: partitionIndex, // Индекс опорного элемента
  });

  // Рекурсивный вызов функции для левой и правой части массива
  quickSort(arr, left, partitionIndex - 1, steps);
  quickSort(arr, partitionIndex + 1, right, steps);

  return steps;
}

function partition(arr, left, right) {
  let pivot = arr[right];
  let i = left;

  // Перестановка элементов массива относительно опорного элемента
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }

  // Размещение опорного элемента в правильной позиции
  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i; // Возвращение индекса опорного элемента
}

/*Быстрая сортировка (Quick Sort)в оригинале
function quickSort(arr) {
  // Условие остановки, выхода из рекурсии, возвращаем массив с 1 элементом
  if (arr.length < 2) return arr;
  // Выбираем опорный элемент
  let pivot = arr[0];

  // Определяем массивы для тех, что меньше и больше опорного
  const left = [];
  const right = [];

  // Проходим циклом по всем элементам из массива и разносим их в массивы созданные ранее согласно условию, больше опорного - в правый, меньше - в левый
  for (let i = 1; i < arr.length; i++) {
    if (pivot > arr[i]) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  // Рекурсивно повторяем процесс для новых двух массивов, текущий опорный элемент - кладем как первый в правый массив.
  // Метод arr.concat создаёт новый массив
  return quickSort(left).concat(pivot, quickSort(right));
}
*/

// Сортировка слиянием (Merge Sort)
function mergeSort(arr, steps = [], start = 0) {
  // Условие выхода из рекурсии, когда длина массива меньше 2
  if (arr.length < 2) {
    return arr;
  }

  // Находим середину массива для разделения
  let middle = Math.floor(arr.length / 2);

  // Разделяем массив на два подмассива: левый и правый
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  // Добавляем шаг визуализации разделения массива на подмассивы
  steps.push({
    array: [...left, "—", ...right], // Используем символ '—' как разделитель
    comment: `Разделяем на подмассивы`,
    swappedIndices: [],
    dividerIndex: left.length, // Индекс разделителя между подмассивами
  });

  // Рекурсивно сортируем левый и правый подмассивы
  const sortedLeft = mergeSort(left, steps, start);
  const sortedRight = mergeSort(right, steps, start + middle);

  // Возвращаем результат слияния отсортированных подмассивов
  return merge(sortedLeft, sortedRight, steps);
}

function merge(left, right, steps) {
  let arr = [];
  let leftIndex = 0,
    rightIndex = 0;

  // Слияние двух отсортированных подмассивов
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift());
      leftIndex++;
    } else {
      arr.push(right.shift());
      rightIndex++;
    }
  }

  // Формирование итогового упорядоченного массива путем слияния
  let mergedArray = [...arr, ...left, ...right];
  steps.push({
    array: [...arr, ...left, ...right],
    comment: `Формируем упорядоченный массив путем слияния элементов из двух подмассивов`,
    swappedIndices: [],
  });

  return mergedArray;
}

// Вспомогательная функция для запуска сортировки и получения шагов
function startMergeSort(arr) {
  let steps = [];
  mergeSort(arr, steps);
  return steps;
}

/* Сортировка слиянием (Merge Sort)  в оригинале
// делим массивы пополам до тех пор, пока в них не останется элементов
function mergeSort(array) {
  // если в нашем массиве и так меньше двух элементов — возвращаем его
  if (array.length < 2) {
    return array;
  }
  // находим середину
  let middle = Math.floor(arr.length / 2);

  // делим массив на две части и левую отправляем в новый массив
  const left = array.splice(0, middle);

  // запускаем рекурсию и отдаём ей правую и левую части массива
  return merge(mergeSort(left), mergeSort(array));
}

// слияние массивов с одновременной сортировкой
// на вход подаются уже отсортированные левая и правая части
function merge(left, right) {
  // сюда будем складывать результат
  let arr = [];
  // пока в каждой части есть хотя бы один элемент — выполняем цикл
  while (left.length && right.length) {
    // смотрим на наименьший элемент из тех, что стоят в начале обоих массивов
    if (left[0] < right[0]) {
      // если слева был элемент меньше —
      // забираем его оттуда и отправляем в массив с результатом
      arr.push(left.shift());
    } else {
      // в противном случае забираем элемент из правой части
      arr.push(right.shift());
    }
  }
  // возвращаем отсортированный массив и добавляем к нему в конец отсортированный остаток от какой-либо части, если её так и не обработали в цикле
  return [...arr, ...left, ...right];
}
*/
