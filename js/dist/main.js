"use strict";

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.regexp.match");

window.addEventListener('DOMContentLoaded', function () {
  /* ПЕРЕКЛЮЧЕНИЕ ТАБОВ */
  var tab = document.getElementsByClassName('info-header-tab'),
      tabContent = document.getElementsByClassName('info-tabcontent'),
      info = document.getElementsByClassName('info-header')[0];

  function hideTabContent(a) {
    for (var i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  ;
  hideTabContent(1);

  function showTabcontent(b) {
    if (tabContent[b].classList.contains('hide')) {
      hideTabContent(0);
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  ;
  info.addEventListener('click', function (e) {
    var target = e.target;

    if (target.className === 'info-header-tab') {
      for (var i = 0; i < tab.length; i++) {
        if (target === tab[i]) {
          showTabcontent(i);
          break;
        }
      }
    }
  });
  /* ТАЙМЕР ОБРАТНОГО ОТСЧЕТА */

  var deadline = '2018-09-20 23:59:59'; //Задаем конечную дату
  //Функция расчета оставшегося времени

  function getTimeRemaining(endtime) {
    //Установка текущей даты и даты окончания акции	
    var t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor(t / 1000 % 60),
        minutes = Math.floor(t / 1000 / 60 % 60),
        hours = Math.floor(t / (1000 * 60 * 60)); //Возврат объекта данных времени

    return {
      'total': t,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  ; //Функция запуска таймера 

  function initializeClock(id, endtime) {
    //Задание элементов для вывода данных
    var clock = document.getElementById(id),
        hours = clock.querySelector('.hours'),
        minutes = clock.querySelector('.minutes'),
        seconds = clock.querySelector('.seconds'),
        //Установка интервала работы таймера в 1 секунду
    timeInterval = setInterval(updateClock, 1000); //Функция таймера обратного отсчета		

    function updateClock() {
      var t = getTimeRemaining(endtime); //Задаем функцию для добавления 0 к числам до 9 (01, 02 и т.д.)

      function addZero(num) {
        if (num <= 9) {
          return "0".concat(num);
        } else return num;
      }

      ; //Вывод оставшегося времени 

      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds); //Действия, выполняющиеся после завершения отсчета таймера

      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      }
    }

    ;
    updateClock();
  }

  ;
  initializeClock('timer', deadline); //Запуск таймера по id

  /* ПЛАВНАЯ ПРОКРУТКА */

  function animate(draw, duration) {
    var start = performance.now();
    requestAnimationFrame(function animate(time) {
      var timePassed = time - start;

      if (timePassed > duration) {
        timePassed = duration;
      }

      draw(timePassed);

      if (timePassed < duration) {
        requestAnimationFrame(animate);
      }
    });
  }

  ;
  var navigation = document.getElementsByTagName('nav')[0];
  navigation.addEventListener('click', function (event) {
    event.preventDefault();
    animate(function (timePassed) {
      var target = event.target,
          section = document.getElementById(target.getAttribute('href').slice(1));
      window.scrollBy(0, section.getBoundingClientRect().top / 20 - 3);
    }, 1200);
  });
  /* ОПРЕДЕЛЕНИЕ ТИПА БРАУЗЕРА */
  //Получение версии IE или Edge

  var version = detectIE(),
      //Задаем функцию определения IE или EDGE в переменную
  browser; //Присваиваем переменной true или false в зависимости от определения браузера

  if (version === false) {
    browser = true;
  } else if (version >= 12) {
    browser = false;
  } else {
    browser = false;
  } //Функция определения браузера возвращает версию IE или афдыу если браузер другой


  function detectIE() {
    //Определяем, является ли текущий браузер IE
    var ua = window.navigator.userAgent,
        msie = ua.indexOf('MSIE ');

    if (msie > 0) {
      //Если IE 10 или младшей версии функция возвращает номер версии
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');

    if (trident > 0) {
      //Если IE 11 версии функция возвращает номер версии
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');

    if (edge > 0) {
      //Усли Edge (или IE 12 версии и выше) функция возвращает номер версии
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    } //Функция возвращает false,если текущий браузер не IE и не EDGE


    return false;
  }

  ; //Функция проверки на мобильный браузер

  var mobileBrowser;

  function mobileBrowserCheck() {
    //Проверка на конкретный мобильный браузер
    var isMobile = {
      Android: function Android() {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function BlackBerry() {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function iOS() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function Opera() {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function Windows() {
        return navigator.userAgent.match(/IEMobile/i);
      },
      //Проверка на любой мобильный браузер
      any: function any() {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
      }
    }; //Возврат функцией true, если браузер мобильный

    if (isMobile.any()) {
      mobileBrowser = true;
    }
  }

  ;
  mobileBrowserCheck();
  /* МОДАЛЬНОЕ ОКНО */
  //Задаем переменные кнопки открытия модального окна, оверлея и закрытия

  var more = document.querySelector('.more'),
      overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close'); //Открытие модального окна

  more.addEventListener('click', function () {
    if (mobileBrowser !== true) {
      more.classList.add('more-splash');
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    } else {
      return false;
    }
  }); //Закрытие модального окна

  close.addEventListener('click', function () {
    if (mobileBrowser !== true) {
      overlay.style.display = 'none';
      more.classList.remove('more-splash');
      document.body.style.overflow = '';
    } else {
      return false;
    }
  }); //Закрытие модального окна нажатем Esc

  document.onkeydown = function (e) {
    if (e.keyCode === 27) {
      overlay.style.display = 'none';
      more.classList.remove('more-splash');
      document.body.style.overflow = '';
    }
  };
  /* ПРИВЯЗКА МОДАЛЬНОГО ОКНА К КНОПКАМ В ТАБАХ */
  //Функция реализации обработчика события


  function descBtnFunc() {
    //Получение псевдомассива кнопок
    var descBtns = document.querySelectorAll('.description-btn');

    if (mobileBrowser !== true) {
      var _loop = function _loop(i) {
        //Привязка к кнопкам обработчика события
        descBtns[i].addEventListener('click', function () {
          descBtns[i].classList.add('more-splash');
          overlay.style.display = 'block';
          document.body.style.overflow = 'hidden';
        });
      };

      //Перебор циклом всех кнопок в псевдомассиве
      for (var i = 0; i < descBtns.length; i++) {
        _loop(i);
      }
    } else {
      return false;
    }
  }

  ;
  descBtnFunc();
  /* ОТПРАВКА ДАННЫХ С ФОРМЫ */
  //Форма

  var message = new Object();
  message.loading = "Загрузка...";
  message.success = "Спасибо. Скоро мы с вами свяжемся!";
  message.failure = "Что-то пошло не так...";
  var form = document.getElementsByClassName('main-form')[0],
      input = form.getElementsByTagName('input'),
      statusMessage = document.createElement('div'),
      statusMsg = document.createElement('div');
  statusMessage.classList.add('form__send__answer');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    form.appendChild(statusMessage); // AJAX

    var request = new XMLHttpRequest();
    request.open("POST", 'server.php');
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var formData = new FormData(form);
    request.send(formData);

    request.onreadystatechange = function () {
      var promise = new Promise(function (resolve, reject) {
        if (request.readyState < 4) {
          resolve();
        } else if (request.readyState === 4) {
          if (request.status == 200 && request.status < 300) {
            resolve();
          } else {
            reject();
          }
        }
      });
      promise.then(function () {
        return statusMessage.innerHTML = message.loading;
      }).then(function () {
        return statusMessage.innerHTML = message.success;
      }).catch(function () {
        return statusMessage.innerHTML = message.failure;
      }).then(clearInput);
    }; //Очистка инпутов


    function clearInput() {
      for (var i = 0; i < input.length; i++) {
        input[i].value = '';
      }
    }
  }); //Оправка данных с формы в разделе "Контакты"

  var contactForm = document.getElementById('form'),
      contactFormInput = contactForm.getElementsByTagName('input');
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    contactForm.appendChild(statusMsg); // AJAX

    var request = new XMLHttpRequest();
    request.open("POST", 'server.php');
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var contactFormData = new FormData(contactForm);
    request.send(contactForm);

    request.onreadystatechange = function () {
      var promise = new Promise(function (resolve, reject) {
        if (request.readyState < 4) {
          resolve();
        } else if (request.readyState === 4) {
          if (request.status == 200 && request.status < 300) {
            resolve();
          } else {
            reject();
          }
        }
      });
      promise.then(function () {
        return statusMsg.classList.add('form-awaiting__contact-form');
      }).then(function () {
        return statusMsg.classList.add('form-success__contact-form');
      }).catch(function () {
        return statusMsg.classList.add('form-failure__contact-form');
      }).then(clearInput);
    }; //Очистка инпутов


    function clearInput() {
      for (var i = 0; i < input.length; i++) {
        input[i].value = '';
      }
    }
  });
  /* СЛАЙДЕР */

  var slideIndex = 1,
      //Устанавливаем текущий слайд
  //Получаем псевдомассив слайдов
  slides = document.getElementsByClassName('slider-item'),
      slider = document.querySelector('.wrap'),
      //Получаем контейнер слайдера
  prev = document.querySelector('.prev'),
      //Стрелка влево
  next = document.querySelector('.next'),
      //Стрелка вправо
  dotsWrap = document.querySelector('.slider-dots'),
      //Блок точек
  dots = document.getElementsByClassName('dot'),
      //Псевдомассив точек
  timer; //Переменная для установки таймера

  function showSlides(n) {
    if (n > slides.length) {
      //Возврат к первому слайду после перебора всего псевдомассива слайдов
      slideIndex = 1;
    }

    ;

    if (n < 1) {
      //Возврат в конец псевдомассива после перебора всего псевдомассива слайдов в оратном направлении
      slideIndex = slides.length;
    }

    ; //Скрытие через цикл всех слайдов

    for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    ; //Удаление через цикл класса dot-active у точек слайдера

    for (var _i = 0; _i < dots.length; _i++) {
      dots[_i].classList.remove('dot-active');
    }

    ; //Установка видимости текущего слайда и точки

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
  }

  ;
  /* Функция увеличения индекса активного слайда.
  Получает данные (n) из обработчика событий prev и next */

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  ;

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  ; //Возврат на один слайд назад по клику

  prev.addEventListener('click', function () {
    plusSlides(-1);
  }); //Переключение на один слайд вперед по клику

  next.addEventListener('click', function () {
    plusSlides(1);
  }); //Переключение активной точки в соответствии с текущим слайдом

  dotsWrap.addEventListener('click', function (e) {
    for (var i = 0; i < dots.length + 1; i++) {
      if (e.target.classList.contains('dot') && e.target == dots[i - 1]) {
        currentSlide(i);
      }
    }
  });
  /* Приостановка автоматического переключения слайдов 
  при наведении курсора на контейнер (wrap) */

  slider.addEventListener('mouseenter', function (e) {
    clearInterval(timer);
  });
  /* Возобновление автоматического переключения слайдов 
  при выводе курсора за пределы контейнера (wrap) */

  slider.addEventListener('mouseleave', function (e) {
    timer = setInterval(function () {
      next.click();
    }, 5000);
    showSlides(slideIndex);
  }); //Переключение слайдов вперед/назад стрелками курсора

  window.addEventListener('keyup', function (e) {
    if (e.key === 'ArrowLeft') {
      prev.click();
    }

    if (e.key === 'ArrowRight') {
      next.click();
    }
  }); //установка таймера автоматического переключения слайдов с интервалом в 5 секунд

  timer = setInterval(function () {
    next.click();
  }, 5000);
  showSlides(slideIndex);
  /* КАЛЬКУЛЯТОР */

  var persons = document.getElementsByClassName('counter-block-input')[0],
      //Инпут ввода количества людей
  restDays = document.getElementsByClassName('counter-block-input')[1],
      //Инпут ввода количества дней
  place = document.getElementById('select'),
      //Выбор туристического направления 
  totalValue = document.getElementById('total'),
      //Ячейка вывода общей суммы
  personsSum = 0,
      //Переменная количества людей
  daysSum = 0,
      //Переменная количества дней
  total = 0,
      //Переменная общей суммы
  result = 0; //Переменная общей суммы с учетом коэффициента туристического направления

  totalValue.innerHTML = 0; //Изначальная установка нуля в ячейке общей суммы

  persons.addEventListener('keyup', function () {
    //Проверка инпута на запрет ввода ё, точки, запятой, букв и спецсимволов
    this.value = this.value.replace(/[^\d]*/g).replace(/^[^\d]*(\d+([.,]\d{0,5})?).*$/g, '$1'); // this.value = this.value.replace(/[+\.\,ёЁ]/,'');

    personsSum = +this.value; //Присвоение переменной значения инпута
    //Обнуление итогового числа, если одно из полей пустое

    if (restDays.value == '' || persons.value == '') {
      totalValue.innerHTML = 0;
      total = 0; //Обнуление итогового числа, если в одно из полей введен 0
    } else if (restDays.value == 0 || persons.value == 0) {
      totalValue.innerHTML = 0;
      total = 0;
    } else {
      total = (daysSum + personsSum) * 4000; //Вычисление итоговой суммы
      //Вычисление итоговой суммы с учетом коэффициента выбранного направления путеществия

      result = total * place.options[place.selectedIndex].value;
      animateValue('total', 0, result, 2000); //Запуск функции анимации числа
    }
  });
  restDays.addEventListener('keyup', function () {
    //Проверка инпута на запрет ввода ё, точки, запятой, букв и спецсимволов
    this.value = this.value.replace(/[^\d]*/g).replace(/^[^\d]*(\d+([.,]\d{0,5})?).*$/g, '$1'); // this.value = this.value.replace(/[+\.\,ёЁ]/,'');

    daysSum = +this.value; //Присвоение переменной значения инпута
    //Обнуление итогового числа, если одно из полей пустое		

    if (persons.value == '' || restDays.value == '') {
      totalValue.innerHTML = 0;
      total = 0; //Обнуление итогового числа, если в одно из полей введен 0
    } else if (restDays.value == 0 || persons.value == 0) {
      totalValue.innerHTML = 0;
      total = 0;
    } else {
      total = (daysSum + personsSum) * 4000; //Вычисление итоговой суммы
      //Вычисление итоговой суммы с учетом коэффициента выбранного направления путеществия	

      result = total * place.options[place.selectedIndex].value;
      animateValue('total', 0, result, 2000); //Запуск функции анимации числа
    }
  }); //Обнуление итогового числа, если одно из полей пустое

  place.addEventListener('change', function () {
    if (restDays.value == '' || persons.value == '') {
      totalValue.innerHTML = 0;
      total = 0;
    } else if (restDays.value == 0 || persons.value == 0) {
      totalValue.innerHTML = 0;
      total = 0;
    } else {
      //Вычисление итоговой суммы с учетом коэффициента выбранного направления путеществия
      result = total * place.options[place.selectedIndex].value;
      animateValue('total', 0, result, 2000); //Запуск функции анимации числа	
    }
  });
  /* ПЕРЕБОР ЦИФР */

  /* Функция принимает id элемента вывода результата, начало и конец перебора цифр
  и длительность анимации */

  function animateValue(id, start, end, duration) {
    var range = end - start,
        //Период перебора цифр
    current = start,
        //Текущее число (изменяется в процессе перебора цифр)
    increment = 1000,
        //Шаг с которым будет увеличиваться итоговая сумма
    //Расчет скорости перебора, которая зависит от длительности и конечного числа
    stepTime = Math.abs(Math.floor(duration / range)),
        element = document.getElementById(id); //Элемент (ячейка) вывода числа на экран
    //Функция таймера

    var timer = setInterval(function () {
      current += increment; //Увеличение текущего значения на заданный шаг

      element.innerHTML = current; //Вывод текущего числа в элемент на экран

      if (current >= end) {
        //Обнуление таймера при достижении конечного числа
        clearInterval(timer);
      }
    }, stepTime);
  }
});