import os
import logging
from telegram import Bot
from telegram.ext import Updater, CommandHandler
from datetime import datetime, timedelta
import time

# Установка логирования
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# Инициализация бота
TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'
bot = Bot(TOKEN)
updater = Updater(TOKEN, use_context=True)
dispatcher = updater.dispatcher

# Инициализация данных о докторах и клиентах
doctors = {
    'doctor_telegram_id': {
        'name': 'Doctor Name',
        'appointments': []
    }
}

def notify_doctor_on_appointment(doctor_id, client_info):
    if doctor_id in doctors:
        doctor = doctors[doctor_id]
        message = f"Запись произведена. Клиент: {client_info['name']}. Дата: {client_info['date']}. Время: {client_info['time']}."
        bot.send_message(chat_id=doctor_id, text=message)
        # Добавляем запись в список встреч доктора
        doctor['appointments'].append(client_info)
    else:
        logger.warning(f"Доктор с ID {doctor_id} не найден")

def notify_doctor_before_appointment():
    while True:
        current_time = datetime.now()
        for doctor_id, doctor in doctors.items():
            for appointment in doctor['appointments']:
                appointment_time = datetime.strptime(f"{appointment['date']} {appointment['time']}", "%Y-%m-%d %H:%M")
                if current_time >= appointment_time - timedelta(minutes=15) and current_time < appointment_time:
                    message = f"Напоминание: через 15 минут у вас сеанс с клиентом {appointment['name']}. Дата: {appointment['date']}. Время: {appointment['time']}."
                    bot.send_message(chat_id=doctor_id, text=message)
                    # Удаляем запись о встрече, чтобы не отправлять повторно
                    doctor['appointments'].remove(appointment)
        time.sleep(60)  # Проверяем каждую минуту

def start(update, context):
    update.message.reply_text('Бот для уведомлений активирован!')

start_handler = CommandHandler('start', start)
dispatcher.add_handler(start_handler)

# Функция для тестирования
def test_notify(update, context):
    doctor_id = 'doctor_telegram_id'
    client_info = {
        'name': 'John Doe',
        'date': '2024-06-23',
        'time': '15:00'
    }
    notify_doctor_on_appointment(doctor_id, client_info)
    update.message.reply_text('Уведомление отправлено!')

test_notify_handler = CommandHandler('test_notify', test_notify)
dispatcher.add_handler(test_notify_handler)

# Запуск потоков для уведомлений
from threading import Thread
notification_thread = Thread(target=notify_doctor_before_appointment)
notification_thread.start()

# Запуск бота
updater.start_polling()
updater.idle()
