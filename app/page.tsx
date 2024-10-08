"use client";

import CargoData from '../components/cargodata';


export default function Home() {

  return (
  <section className="flex flex-col items-center min-h-screen w-full max-w-[57.5rem] h-auto md:h-[45rem] p-3 md:p-[0.75rem] bg-[#f0f3f7] rounded-[0.9375rem] overflow-x-hidden">
    <CargoData />
  </section>
  );
}