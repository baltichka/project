
import { useEffect, useState } from 'react';

export default function CargoData() {
    const [cargo, setCargo] = useState<any>(null);
    const [loading, setLoading] = useState(true); // Флаг загрузки
    
    useEffect(() => {
    // Функция для отправки запроса
    const fetchData = async () => {
        const response = await fetch('https://mock.apidog.com/m1/609671-576197-default/cargos/1');
        const data = await response.json();
        setCargo(data); // Сохраняем данные
        setLoading(false); // Останавливаем индикатор загрузки
    };
    
    fetchData();
    }, []); // Пустой массив зависимостей для выполнения только один раз
    
    if (loading) {
    return <div>Загрузка...</div>;
    }
    
    return (
    <div>
        <h1>Данные о грузе</h1>
        {cargo ? (
        <div>
            <p>Идентификатор: {cargo.id}</p>
            <p>Название: {cargo.title}</p>
            {/* Вставьте сюда любые данные, которые возвращает ваш API */}
        </div>
        ) : (
        <p>Данных нет</p>
        )}
    </div>
    );
}
    