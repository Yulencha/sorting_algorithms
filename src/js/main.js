// Функция для генерации массива заданного размера и типа
function generateArray(type, size = 5) {
  let arr = [];

  switch (type) {
    case "random":
      // Генерация случайного массива чисел от 1 до 100
      for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 100) + 1);
      }
      break;

    case "reversed":
      // Генерация массива в обратном порядке от size до 1
      for (let i = size; i > 0; i--) {
        arr.push(i);
      }
      break;

    case "nearlySorted":
      // Генерация почти отсортированного массива
      for (let i = 1; i <= size; i++) {
        arr.push(i);
      }
      // Добавление небольших изменений (перестановок) в массив
      for (let i = 0; i < size / 10; i++) {
        let idx1 = Math.floor(Math.random() * size);
        let idx2 = Math.floor(Math.random() * size);
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
      }
      break;

    case "fewUnique":
      // Генерация массива с несколькими уникальными значениями
      const uniqueValues = [25, 50, 75, 100]; // Пример уникальных значений
      for (let i = 0; i < size; i++) {
        arr.push(uniqueValues[Math.floor(Math.random() * uniqueValues.length)]);
      }
      break;

    default:
      // Возвращаем пустой массив, если тип не распознан
      break;
  }
  return arr;
}

// Функция для начала визуализации сортировки
function startSorting() {
  stopSorting(); // Останавливаем предыдущую сортировку, если она активна

  const visualization = document.getElementById("visualization");
  visualization.innerHTML = ""; // Очищаем содержимое контейнера визуализации

  // Получаем выбранный алгоритм сортировки и его описание
  const algorithm = document.getElementById("algorithm").value;

  // Создаем и добавляем описание алгоритма сортировки
  const descriptionDiv = document.createElement("div");
  descriptionDiv.classList.add("sorter__description");
  descriptionDiv.textContent = getSortingMethodDescription(algorithm);
  visualization.appendChild(descriptionDiv);

  // Генерируем массив на основе выбранного типа и размера
  const arraySize = parseInt(document.getElementById("arraySize").value);
  const arrayType = document.getElementById("arrayChoice").value;
  let array = generateArray(arrayType, arraySize);

  // Выбираем и запускаем функцию анимации в зависимости от выбранного алгоритма сортировки
  switch (algorithm) {
    case "bubbleSort":
      animateSorting(array, bubbleSort);
      break;
    case "insertionSort":
      animateSorting(array, insertionSort);
      break;
    case "selectionSort":
      animateSorting(array, selectionSort);
      break;
    case "quickSort":
      animateSorting(array, quickSort);
      break;
    case "mergeSort":
      animateSorting(array, startMergeSort);
      break;
  }
}

// Глобальная переменная для хранения интервала анимации
let animationInterval = null;

// Функция для остановки визуализации сортировки
function stopSorting() {
  // Очищаем интервал анимации, останавливая текущую визуализацию сортировки
  clearInterval(animationInterval);
}

// Функция анимации сортировки
function animateSorting(originalArray, sortingFunction) {
  // Получаем шаги сортировки, вызывая переданную функцию сортировки и передавая копию исходного массива
  let steps = sortingFunction(originalArray.slice());

  let step = 0; // Инициализируем счетчик шагов

  // Визуализируем исходное состояние массива перед началом сортировки
  updateVisualization({ array: originalArray, swappedIndices: [] }, "Исходный массив");

  // Устанавливаем интервал для анимации шагов сортировки
  animationInterval = setInterval(() => {
    // Проверяем, достигли ли мы конца массива шагов
    if (step >= steps.length) {
      clearInterval(animationInterval); // Останавливаем интервал, если все шаги выполнены
      return;
    }
    // Получаем текущий шаг сортировки
    const currentStep = steps[step];
    // Визуализируем текущий шаг
    updateVisualization(currentStep, `Шаг ${step + 1}`);
    step++; // Увеличиваем счетчик шагов
  }, 10);
}

// Функция обновления DOM для визуализации текущего состояния массива
function updateVisualization(stepData, stage) {
  const visualization = document.getElementById("visualization");

  // Создаем и добавляем новый div для этапа сортировки
  const stageDiv = document.createElement("div");
  stageDiv.classList.add("sorter__stage");

  // Добавляем подпись к этапу
  const stageLabel = document.createElement("div");
  stageLabel.textContent = stage;
  stageLabel.classList.add("sorter__stage-label");
  stageDiv.appendChild(stageLabel);

  // Контейнер для элементов массива
  const elementsContainer = document.createElement("div");
  elementsContainer.classList.add("sorter__elements-container");

  // Визуализация элементов массива
  stepData.array.forEach((value, index) => {
    const element = document.createElement("div");
    element.textContent = value;
    element.classList.add("sorter__element");

    // Проверяем, изменилось ли местоположение элемента
    if (stepData.swappedIndices.includes(index)) {
      element.classList.add("sorter__element--highlighted");
    }

    // Добавляем класс для опорного элемента
    if (index === stepData.pivotIndex) {
      element.classList.add("sorter__element--pivot");
    }

    // Добавляем класс для разделителя
    if (index === stepData.dividerIndex) {
      element.classList.add("sorter__divider");
    }

    elementsContainer.appendChild(element);
  });

  stageDiv.appendChild(elementsContainer);

  // Создаем и добавляем комментарий к текущему этапу сортировки
  const commentDiv = document.createElement("div");
  commentDiv.textContent = stepData.comment;
  commentDiv.classList.add("sorter__comment");
  stageDiv.appendChild(commentDiv);

  visualization.appendChild(stageDiv);
}

// Функция для получения описания метода сортировки
function getSortingMethodDescription(algorithm) {
  switch (algorithm) {
    case "bubbleSort":
      return "Пузырьковая сортировка: это простой алгоритм сортировки, который многократно проходит через список, сравнивая каждую пару соседних элементов и меняя их местами, если они находятся в неправильном порядке. Процесс повторяется до тех пор, пока не будет достигнута полная отсортированность списка.";

    case "insertionSort":
      return "Сортировка вставками: алгоритм построения отсортированного массива по одному элементу за раз. При каждом проходе выбирается один из элементов и вставляется в правильное положение в уже отсортированной части массива.";

    case "selectionSort":
      return "Сортировка выбором: алгоритм, который на каждом проходе выбирает наименьший (или наибольший, в зависимости от порядка сортировки) элемент из неотсортированной части и помещает его в конец отсортированной части.";

    case "quickSort":
      return "Быстрая сортировка: один из самых эффективных алгоритмов сортировки. Он использует стратегию 'разделяй и властвуй', выбирая 'опорный' элемент и перегруппировывая другие элементы вокруг него. Этот процесс повторяется рекурсивно для меньших групп элементов, в результате чего достигается полная отсортированность. В данном коде в качестве 'опорного' элемента принимается последний элемент массива/подмассива";

    case "mergeSort":
      return "Сортировка слиянием: использует принцип 'разделяй и властвуй'. Этот алгоритм разбивает массив на две части, рекурсивно сортирует их, а затем соединяет в один отсортированный массив.";

    default:
      return "Выберите метод сортировки.";
  }
}
