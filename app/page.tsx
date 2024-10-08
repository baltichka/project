"use client";

import { Tabs, Tab } from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import CargoData from '../components/cargodata';


export default function Home() {

  return (
  <section className="flex flex-col items-center min-h-screen w-full max-w-[57.5rem] h-auto md:h-[45rem] p-3 md:p-[0.75rem] bg-[#f0f3f7] rounded-[0.9375rem] overflow-x-hidden">
    <form className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="основные данные" title="Основные данные">
          <Card>
            <CardBody>
              <div className="container h-[21.6875rem] rounded-xl flex flex-col gap-4">
                <header className="flex items-center h-[2.5625rem] px-4 bg-white">
                  <h2 className="w-full text-[#455468] text-sm font-semibold leading-[1.6875rem]">
                    Карточка получателя
                  </h2>
                  </header>
                  </div>
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
    </form>
  </section>
  );
}