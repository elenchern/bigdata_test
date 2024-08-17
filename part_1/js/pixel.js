let clientIp;
let maxScroll = 0;
let clickHistory = [];
let timeSpent = 0;
let timer;
window.addEventListener("beforeunload", function(e){
    clearInterval(timer);
    function sendData() {
        let data = {
            'url': window.location.href,
            'datetime': new Date(),
            'ip': clientIp,
            'user_agent': navigator.userAgent,
            'browser': getBrowserName(),
            'device': getDeviceType(),
            'operating_system': operatingSytem(),
            'max_scroll' : maxScroll,
            'history_click': JSON.stringify(clickHistory),
            'time_spent': timeSpent,
        }
        let xhr = new XMLHttpRequest();
        let url = 'in.php';
        xhr.open("POST", url, true);
        //отправка данных
        xhr.send(JSON.stringify(data));
    }

    // Функция для установки куки
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // установка времени жизни куки
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/"; // устанавливаем куки
    }

    // Функция для получения куки
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length); // убираем пробелы
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length); // возвращаем значение
        }
        return null; // если куки нет
    }

    // Проверка существования куки
    if (!getCookie("visited")) {
        setCookie("visited", "true", 7); // устанавливаем куки на 7 дней
        sendData(); // вызов функции отправки данных
    } else {
        console.log("С возвращением!"); // если куки есть, значит, это не первый визит
    }
});


//получаем браузер
function getBrowserName() {
    const userAgent = navigator.appVersion;

    if (userAgent.includes("Chrome")) {
        return "Chrome";
    } else if (userAgent.includes("Firefox")) {
        return "Firefox";
    } else if (userAgent.includes("Safari")) {
        return "Safari";
    } else if (userAgent.includes("Edge")) {
        return "Edge";
    } else {
        return "Неизвестный браузер";
    }
}

//получаем девайс
function getDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent);
    
    if (isMobile) {
        return "mobile";
    } else {
        return "desktop";
    }
}

//получаем IP
async function getClientIp() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        clientIp = data.ip; // Присваиваем значение
        console.log("IP-адрес клиента: " + clientIp);
    } catch (error) {
        console.error("Ошибка при получении IP-адреса:", error);
    }
}
getClientIp();

//получаем операционную систему
function operatingSytem() {
    let system = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") != -1) system = "Windows";
    if (navigator.appVersion.indexOf("Mac") != -1) system = "MacOS";
    if (navigator.appVersion.indexOf("X11") != -1) system = "UNIX";
    if (navigator.appVersion.indexOf("Linux") != -1) system = "Linux";
    return system;
}

//получаем максимальный скролл клиента
window.addEventListener('scroll', () => {
    // Получаем текущую позицию скролла
    const scrollTop = window.scrollY;
    // Получаем общую высоту документа
    const documentHeight = document.body.scrollHeight - window.innerHeight;
    
    // Вычисляем процент скролла
    const scrollPercent = (scrollTop / documentHeight) * 100;
  
    // Устанавливаем максимальный процент скролла
    maxScroll = Math.max(maxScroll, scrollPercent);
});

// получаем историю кликов
function logClick(event) {
  const clickData = {
    x: event.clientX,   // Координата X клика
    y: event.clientY,   // Координата Y клика
    time: new Date().toISOString(), // Время клика
    element: event.target.tagName // Тег элемента, по которому кликнули
  };

  clickHistory.push(clickData);
}

// Добавляем обработчик кликов на весь документ
document.addEventListener('click', logClick);

// получаем историю кликов
function updateTimeSpent() {
    timeSpent += 1; // Увеличиваем время на 1 секунду
}

// Запускаем таймер, который будет обновлять время каждую секунду
timer = setInterval(updateTimeSpent, 1000); // 1000 мс = 1 секунда



