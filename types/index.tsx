type Checkpoint = {
  code: string;
  date: string; 
};

type CargoDataProps = {
    finalRecipient: { 
      fio: string;
      passport: string;
      email: string;
      contacts: string;
      addressReg: string;
      address: string;
      issuanceMethod: {
        id: number;
        title: string;
      };
    };
    cargoStatus: {
      title: string;
    };
    issuanceDate: string;
    mskDate: string;
    amountStorage: number;
    accountFile: {
      link: string;
      name: string;
    } | null;
    updFile: {
      link: string;
      name: string;
    } | null;
    gtdFile: {
      link: string;
      name: string;
    } | null;
    ttnFile: {
      link: string;
      name: string;
    } | null;
    invoiceFile: {
      link: string;
      name: string;
    } | null;
    cargoDirectionCalculation: {
      cargoDirection: {
        checkpoints: Checkpoint[];
      };
    };
  };