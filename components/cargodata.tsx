import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Skeleton, Tab, Tabs } from '@nextui-org/react';


type CargoDataProps = {
    finalRecipient: {
      fio: string;
      passport: string;
      email: string;
      contacts: string;
      addressReg: string;
      address: string;
    };
    cargoStatus: {
      title: string;
    };
    issuanceDate: string;
    amountStorage: number;
    accountFile: {
      name: string;
      link: string;
    } | null;
  };

export default function CargoData() {
  const [cargo, setCargo] = useState<CargoDataProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mock.apidog.com/m1/609671-576197-default/cargos/1"
        );
        const data = await response.json();
        console.log(data);
        setCargo(data);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке данных", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  if (!cargo) {
    return <div>Данные не найдены</div>;
  }

  return (
<div className="flex w-full flex-col">
      <Tabs aria-label="Options" 
        className="px-3 py-[7px] rounded-lg flex gap-2.5 text-[#101827] text-sm md:text-base font-semibold leading-snug">
        <Tab key="основные данные" title="Основные данные" >
          <Card>

        <CardHeader>
            <header className="h-[2.25rem] px-[1rem] py-[0.4375rem] bg-white gap-2.5 inline-flex justify-start">
                <h2 className="w-[831px] text-[#455468] text-sm font-semibold leading-[27px]">
                    Карточка получателя
                </h2>
            </header>
        </CardHeader>

            <CardBody>
              <p><strong>ФИО:</strong> {cargo.finalRecipient.fio}</p>
              <p><strong>Паспорт:</strong> {cargo.finalRecipient.passport}</p>
              <p><strong>Контакт:</strong> {cargo.finalRecipient.contacts}</p>
              <p><strong>Email:</strong> {cargo.finalRecipient.email}</p>
              <p><strong>Адрес регистрации:</strong> {cargo.finalRecipient.addressReg}</p>
              <p><strong>Адрес:</strong> {cargo.finalRecipient.address}</p>
              <p><strong>Статус груза:</strong> {cargo.cargoStatus.title}</p>
              <p><strong>Дата выдачи:</strong> {new Date(cargo.issuanceDate).toLocaleDateString()}</p>
              <p><strong>Сумма за хранение:</strong> {cargo.amountStorage} ₽</p>
              {cargo.accountFile && (
                <a href={cargo.accountFile.link} download>
                  <strong>Скачать файл:</strong> {cargo.accountFile.name}
                </a>
              )}
            </CardBody>
          </Card>
        </Tab>
        <Tab key="наименования" title="Наименования">
          <Card>
            <CardBody>
              тут пусто
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
