import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Проверьте, доступен ли объект Telegram Web App API
    if (window.Telegram && window.Telegram.WebApp) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      
      // Если пользователь уже авторизован
      if (user) {
        localStorage.setItem('telegramUser', JSON.stringify(user));
        navigate('/language');
      } else {
        // Инициализация виджета Telegram для авторизации
        const script = document.createElement('script');
        script.src = "https://telegram.org/js/telegram-widget.js?7";
        script.async = true;
        script.setAttribute('data-telegram-login', 'YourBotName'); // Замените 'YourBotName' на имя вашего бота
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-radius', '5');
        script.setAttribute('data-auth-url', 'https://your-backend.com/auth'); // Замените на ваш URL обработки авторизации
        script.setAttribute('data-request-access', 'write');
        script.setAttribute('data-userpic', 'false');
        script.onload = () => {
          if (window.TelegramLoginWidget) {
            window.TelegramLoginWidget.dataOnauth = handleTelegramLogin;
          }
        };
        document.getElementById('telegram-login').appendChild(script);
      }
    } else {
      console.error('Telegram WebApp is not available.');
    }
  }, [navigate]);

  const handleTelegramLogin = (user) => {
    localStorage.setItem('telegramUser', JSON.stringify(user));
    navigate('/language');
  };

  return (
    <div>
      <h1>Login via Telegram</h1>
      <div id="telegram-login"></div>
    </div>
  );
};

export default Login;
