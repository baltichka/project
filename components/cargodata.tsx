import { useEffect, useState, useMemo } from 'react';
import { Card, CardHeader, CardBody, CircularProgress, Tab, Tabs, Chip, Button } from '@nextui-org/react';

export default function CargoData() {
  const [cargo, setCargo] = useState<CargoDataProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mock.apidog.com/m1/609671-576197-default/cargos/1');
        const data = await response.json();
        setCargo(data);
        console.log('Fetched data:', data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formattedPassport = useMemo(
    () => cargo?.finalRecipient.passport
      ? `${cargo.finalRecipient.passport.slice(0, 4)} ${cargo.finalRecipient.passport.slice(4)}`
      : '',
    [cargo]
  );

  const formattedContacts = useMemo(
    () => cargo?.finalRecipient.contacts
      ? `+7 ${cargo.finalRecipient.contacts.replace(/[()\-]/g, ' ').replace(/\s+/g, ' ').trim()}`
      : '',
    [cargo]
  );

  if (loading) {
    return <CircularProgress label="Загрузка..." />;
  }

  if (!cargo) {
    return <div className="text-center text-gray-500">Данные не найдены</div>;
  }

  return (
    <div className="w-full md:w-[942px] h-[732px] px-3 pt-3 bg-[#f0f3f7] rounded-[0.9375rem] overflow-y-hidden">
      <Tabs aria-label="Options" className="flex w-full gap-2 px-4 rounded-lg text-[#101827] text-sm md:text-base font-semibold leading-snug">
        <Tab key="основные данные" title="Основные данные">
          <Card className="mb-[0.5rem] px-4">
            <CardHeader>
              <h2 className="text-[#455468] text-base font-semibold leading-snug bg-white">Карточка получателя</h2>
            </CardHeader>
            <CardBody className="grid grid-cols-2 gap-4 mb-[0.875rem]">
              <div className="space-y-2">
                <div>
                  <span className="text-gray-600 font-medium">ФИО</span>
                  <p className="font-semibold">{cargo.finalRecipient.fio}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Паспорт</span>
                  <p className="font-semibold">{formattedPassport}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Контактная информация</span>
                  <p className="font-semibold">{formattedContacts}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">E-mail</span>
                  <p className="font-semibold">{cargo.finalRecipient.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-gray-600 font-medium">Способ выдачи груза</span>
                  <p className="font-semibold">{cargo.finalRecipient.issuanceMethod.title}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Адрес прописки</span>
                  <p className="font-semibold">{cargo.finalRecipient.addressReg}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Адрес</span>
                  <p className="font-semibold">{cargo.finalRecipient.address}</p>
                </div>
              </div>
            </CardBody>
          </Card>

      <Card 
      className="mb-[0.5rem] px-4">
        <CardHeader>
          <header className="py-1 bg-white flex items-center gap-2.5">
            <Chip
              color="warning"
              classNames={{
                base: "absolute top-2 right-2 rounded-lg bg-[#fac300]",
                content: "text-white",
              }}
            >
              На досмотре
            </Chip>
            <h2 className="text-[#455468] text-base font-semibold leading-snug">
              Отслеживание груза
            </h2>
          </header>
        </CardHeader>

        <CardBody className="grid grid-cols-3 gap-4">
        <div className="space-y-4 overflow-hidden bg-gray-50/0 rounded-lg border border-[#e2e8ee] w-[266px] h-[px]">
  <table aria-label="Таблица отслеживания" className="w-full table-auto">
    <thead className=" w-[266px] h-[30px] bg-zinc-100 rounded-tl-lg rounded-tr-lg">
      <tr>
        <th className="px-[17.5px] pt-[9px] pb-[6px] text-left text-slate-500 text-xs font-bold">Пункт</th>
        <th className="pt-[9px] pb-[6px] text-slate-500 text-xs font-bold">Дата</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-300 rounded-lg border border-[#e2e8ee]">
      {cargo.cargoDirectionCalculation.cargoDirection.checkpoints.map((checkpoint, index) => (
        <tr key={index} className="rounded-lg border border-[#e2e8ee]">
          <td className="px-4 py-2 text-xs text-slate-500 rounded-lg border border-[#e2e8ee]">
            <li>{checkpoint.code}</li>
          </td>
          <td className="px-4 py-2 text-xs">{checkpoint.date || ' '}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


  <div>
  <span>
    <Button
    as="a"
    href={cargo.accountFile?.link}
    download={cargo.accountFile?.name}
    isDisabled={!cargo.accountFile}   
    className='w-[238px] h-9 px-3 py-[7px] bg-[#4c67f7]/10 text-[#4c67f7] justify-start mb-2'>
      Счет
    </Button>
  </span>
  <span className="text-gray-600 font-medium">
    <Button 
    as="a"
    href={cargo.gtdFile?.link}
    download={cargo.gtdFile?.name}
    isDisabled={!cargo.gtdFile} 
    className='w-[238px] h-9 px-3 py-[7px] bg-[#4c67f7]/10 text-[#4c67f7] justify-start mb-2'>
      ГТД
    </Button>
  </span>
  <span className="text-gray-600 font-medium">
    <Button 
    as="a"
    href={cargo.ttnFile?.link}
    download={cargo.ttnFile?.name}
    isDisabled={!cargo.ttnFile}
    className='w-[238px] h-9 px-3 py-[7px] bg-[#4c67f7]/10 text-[#4c67f7] justify-start mb-2'>
      ТТН
    </Button>
  </span>
  <span className="text-gray-600 font-medium">
    <Button 
    as="a"
    href={cargo.invoiceFile?.link}
    download={cargo.invoiceFile?.name}
    isDisabled={!cargo.invoiceFile}
    className='w-[238px] h-9 px-3 py-[7px] bg-[#4c67f7]/10 text-[#4c67f7] justify-start mb-2'>
      Накладная на выдачу
    </Button>
  </span>
  <span className="text-gray-600 font-medium">
  <Button 
    as="a"
    href={cargo.accountFile?.link}
    download={cargo.accountFile?.name}
    isDisabled={!cargo.accountFile}
    className='w-[238px] h-9 px-3 py-[7px] bg-[#4c67f7]/10 text-[#4c67f7] justify-start mb-2'>
    УПД
  </Button>
</span>


</div>

  <div>

<div className="mb-[12px]">
  <div className="text-gray-600 font-medium">Дата выдачи груза</div>
  <div className="flex items-center mt-1">
    <img src="/calendar.svg" className="w-[18px] h-[18px] mr-2" alt="Календарь" />
    <span className="font-semibold">
      {new Date(cargo.issuanceDate).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })}
    </span>
  </div>
</div>

<div className="mb-[12px]">
  <div className="text-gray-600 font-medium">Дата оприходования в МСК</div>
  <div className="flex items-center mt-1">
    <img src="/calendar.svg" className="w-[18px] h-[18px] mr-2" alt="Календарь" />
    <span className="font-semibold">
      {new Date(cargo.mskDate).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })}
    </span>
  </div>
</div>

<div className="mb-[12px]">
  <div className="text-gray-600 font-medium">Сумма за хранение</div>
  <div className="flex items-center mt-1">
    <img src="/ruble.svg" className="w-[18px] h-[18px] mr-2" alt="Рубль" />
    <span className="font-semibold">
      {cargo.amountStorage}
    </span>
  </div>
</div>


              </div>

        </CardBody>
      </Card>
      </Tab>
        <Tab key="наименования" title="Наименования">
          <Card>
            <CardBody className="p-4">тут пусто</CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}