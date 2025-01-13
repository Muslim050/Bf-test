// import axios from 'axios'
// import toast from 'react-hot-toast'

// // Настройка интерцепторов Axios
// axios.interceptors.response.use(
//   (response) => {
//     // Обработка успешных ответов здесь
//     // Например, вы можете показать сообщение об успешном запросе
//     toast.success('Запрос успешно выполнен')
//     return response
//   },
//   (error) => {
//     // Обработка ошибок здесь
//     if (error.response) {
//       toast.error('Ошибка на сервере')
//     } else if (error.request) {
//       toast.error('Ошибка отправки запроса')
//     } else {
//       toast.error('Неизвестная ошибка')
//     }

//     return Promise.reject(error)
//   },
// )

// export default axios
