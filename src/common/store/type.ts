export interface IResponseToken {
  access_token: string;
  refresh_token: string;
  scope: string;
  id_token: string;
  token_type: string;
  expires_in: number;
}

export interface IResponseUserProfile {
  data: {
    userId: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    lastLoginAt: string;
    contacts: any[];
    addresses: any[];
    listCustomFields: {
      customFieldId: string;
      customKey: string;
      customValue: string;
    }[];
    employmentDetails: any[];
    memberships: {
      membershipId: string;
      organisationId: string;
      roleName: string;
      token: string;
    }[];
    kycDetails: {
      documents: any[];
    };
    apps: {
      appName: string;
    }[];
    listRoles: string[];
    permissions: any[];
    createdAt: string;
    passwordExpired: boolean;
    updatedAt: string;
  };
  status: {
    code: string;
    message: string;
  };
}

export interface IResponseInvoices {
  data: {
    invoiceId: string;
    invoiceNumber: string;
    type: string;
    currency: string;
    invoiceDate: string;
    createdAt: string;
    dueDate: string;
    status: {
      key: string;
      value: boolean;
    }[];
    subStatus: [];
    numberOfDocuments: number;
    totalTax: number;
    totalAmount: number;
    balanceAmount: number;
    description: string;
    totalPaid: number;
    invoiceSubTotal: number;
    customFields: {
      key: string;
      value: string;
    }[];
    totalDiscount: number;
    extensions: [];
    version: string;
    customer: {
      id: string;
      addresses: [];
    };
    merchant: {
      id: string;
    };
    purchaseOrderMatched: boolean;
    isRegulated: boolean;
    isInsured: boolean;
  }[];
  paging: {
    totalRecords: number;
    pageSize: number;
    pageNumber: number;
  };
  status: {
    code: string;
    message: string;
  };
}

export interface IInvoicesQuery {
  pageNum: number;
  pageSize: number;
  dateType?: string;
  sortBy?: string;
  ordering?: "ASCENDING" | "DESCENDING";
}

export interface IInvoiceInfo {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  description?: string;
}

export interface IInvoiceResponseCreate {
  data: {
    bankAccount: {
      bankId: string;
      sortCode: string;
      accountNumber: string;
      accountName: string;
    };
    currency: string;
    currencySymbol: string;
    customer: {
      id: string;
      firstName: string;
      lastName: string;
      name: string;
      contact: {
        email: string;
        mobileNumber: string;
      };
      addresses: {
        addressType: string;
        override: boolean;
        isDefault: boolean;
        premise: string;
        city: string;
        county: string;
        postcode: string;
        countryCode: string;
        customFields: any[];
      }[];
    };
    description: string;
    dueDate: string;
    extensions: {
      id: string;
      addDeduct: string;
      name: string;
      total: number;
      type: string;
      value: number;
    }[];
    invoiceDate: string;
    invoiceId: string;
    invoiceNumber: string;
    invoiceSubTotal: number;
    totalDiscount: number;
    totalTax: number;
    totalAmount: number;
    totalPaid: number;
    balanceAmount: number;
    numberOfDocuments: number;
    documents: {
      documentId: string;
      documentName: string;
      documentUrl: string;
    }[];
    items: {
      itemReference: string;
      description: string;
      quantity: number;
      rate: number;
      amount: number;
      orderIndex: number;
      itemName: string;
      itemUOM: string;
      customFields: {
        key: string;
        value: string;
      }[];
      extensions: {
        id: string;
        addDeduct: string;
        name: string;
        total: number;
        type: string;
        value: number;
      }[];
      netAmount: number;
    }[];
    merchant: {
      id: string;
      addresses: any[];
    };
    payments: any[];
    referenceNo: string;
    invoiceReference: string;
    status: {
      key: string;
      value: boolean;
    }[];
    subStatus: any[];
    type: string;
    version: string;
    invoiceGrossTotal: number;
    customFields: {
      key: string;
      value: string;
    }[];
  }[];
}

export interface ICommonSlice {
  navigate: any;
  setNavigate: (navigate: any) => void;
  clearAllStore: () => void;
  getToken: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<IResponseToken>;
  getUerProfile: () => Promise<IResponseUserProfile>;
  getInvoices: (query: IInvoicesQuery) => Promise<IResponseInvoices>;
  createInvoice: (invoice: IInvoiceInfo) => Promise<IInvoiceResponseCreate>;
}
