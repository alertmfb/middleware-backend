export enum CompanyType {
  BUSINESS_NAME = 'BUSINESS_NAME',
  COMPANY = 'COMPANY',
  INCORPORATED_TRUSTESS = 'INCORPORATED_TRUSTESS',
  LIMITED_PARTNERSHIP = 'LIMITED_PARTNERSHIP',
  LIMITED_LIABILITY_PARTNERSHIP = 'LIMITED_LIABILITY_PARTNERSHIP',
}

export enum AdvancedType {
  co = 'co',
  bn = 'bn',
  it = 'it',
}

export const fetchBanksResponse = {
  entity: [
    {
      name: 'Parallex MFB',
      code: '015',
    },
    {
      name: 'Globus Bank',
      code: '00103',
    },
    {
      name: 'NOW NOW',
      code: '075',
    },
    {
      name: 'ALAT by WEMA',
      code: '035A',
    },
    {
      name: 'Eyowo',
      code: '50126',
    },
    {
      name: 'Lagos Building Investment Company Plc.',
      code: '90052',
    },
    {
      name: 'Zenith Bank',
      code: '057',
    },
    {
      name: 'Wema Bank',
      code: '035',
    },
    {
      name: 'VFD',
      code: '566',
    },
    {
      name: 'Unity Bank',
      code: '215',
    },
    {
      name: 'Union Bank of Nigeria',
      code: '032',
    },
    {
      name: 'United Bank For Africa',
      code: '033',
    },
    {
      name: 'Trustbond',
      code: '018',
    },
    {
      name: 'Titan Bank',
      code: '102',
    },
    {
      name: 'Teasy',
      code: '004',
    },
    {
      name: 'TCF MFB',
      code: '51211',
    },
    {
      name: 'TAJ Bank',
      code: '302',
    },
    {
      name: 'Suntrust Bank',
      code: '100',
    },
    {
      name: 'Sterling Bank',
      code: '232',
    },
    {
      name: 'Standard Chartered Bank',
      code: '068',
    },
    {
      name: 'Stanbic IBTC Bank',
      code: '221',
    },
    {
      name: 'Sparkle Microfinance Bank',
      code: '51310',
    },
    {
      name: 'Rubies MFB',
      code: '125',
    },
    {
      name: 'Providus Bank',
      code: '101',
    },
    {
      name: 'Polaris Bank',
      code: '076',
    },
    {
      name: 'Parallex Bank',
      code: '526',
    },
    {
      name: 'Parkway - ReadyCash',
      code: '311',
    },
    {
      name: 'PagaTech',
      code: '009',
    },
    {
      name: 'One Finance',
      code: '565',
    },
    {
      name: 'NPF',
      code: '002',
    },
    {
      name: 'NOVA',
      code: '105',
    },
    {
      name: 'Mutual Benefits',
      code: '107',
    },
    {
      name: 'Kuda Bank',
      code: '50211',
    },
    {
      name: 'Keystone Bank',
      code: '082',
    },
    {
      name: 'Jaiz Bank',
      code: '301',
    },
    {
      name: 'Heritage Bank',
      code: '030',
    },
    {
      name: 'Hasal Microfinance Bank',
      code: '50383',
    },
    {
      name: 'Hackman Microfinance Bank',
      code: '51251',
    },
    {
      name: 'Guaranty Trust Bank',
      code: '058',
    },
    {
      name: 'FSDH Merchant Bank Limited',
      code: '501',
    },
    {
      name: 'First Bank of Nigeria',
      code: '011',
    },
    {
      name: 'Fidelity Bank',
      code: '070',
    },
    {
      name: 'FETS',
      code: '003',
    },
    {
      name: 'First City Monument Bank',
      code: '214',
    },
    {
      name: 'Ekondo Microfinance Bank',
      code: '562',
    },
    {
      name: 'Ecobank Nigeria',
      code: '050',
    },
    {
      name: 'Covenant MFB',
      code: '052',
    },
    {
      name: 'Citibank Nigeria',
      code: '023',
    },
    {
      name: 'CEMCS Microfinance Bank',
      code: '50823',
    },
    {
      name: 'Bridgeway MFB',
      code: '363',
    },
    {
      name: 'Bowen Microfinance Bank',
      code: '50931',
    },
    {
      name: 'BOSAK',
      code: '104',
    },
    {
      name: 'ASO Savings and Loans',
      code: '401',
    },
    {
      name: 'Access Bank (Diamond)',
      code: '063',
    },
    {
      name: 'Access Bank',
      code: '044',
    },
  ],
};

export const bvnBasicResponse = {
  entity: {
    bvn: '22171234567',
    first_name: 'JOHN',
    last_name: 'DOE',
    middle_name: 'AHMED',
    gender: 'Male',
    date_of_birth: '1997-05-16',
    phone_number1: '08012345678',
    image: 'BASE 64 IMAGE',
    phone_number2: '08012345678',
  },
};

export const bvnAdvancedResponse = {
  entity: {
    bvn: '22171234567',
    first_name: 'JOHN',
    last_name: 'DOE',
    middle_name: 'AHMED',
    gender: 'Male',
    date_of_birth: '1997-05-16',
    phone_number1: '08012345678',
    image: 'BASE 64 IMAGE',
    email: 'johndoe@gmail.com',
    enrollment_bank: 'GTB',
    enrollment_branch: 'IKEJA',
    level_of_account: 'LEVEL 2',
    lga_of_origin: 'OSOGBO',
    lga_of_residence: 'IKEJA',
    marital_status: 'SINGLE',
    name_on_card: '',
    nationality: 'NIGERIAN',
    phone_number2: '08012345678',
    registration_date: '',
    residential_address: '',
    state_of_origin: 'OSUN',
    state_of_residence: 'LAGOS',
    title: 'MISS',
    watch_listed: 'NO',
  },
};

export const phoneNumberBasicResponse = {
  entity: {
    first_name: 'JOHN',
    middle_name: 'DOE',
    last_name: 'CHHUKWU',
    gender: 'Male',
    nationality: 'NGA',
    date_of_birth: '1990-05-16',
    msisdn: '23481222222222',
  },
};

export const phoneNumberAdvancedResponse = {
  entity: {
    first_name: 'JOHN',
    last_name: 'DOE',
    middle_name: 'CHHUKWU',
    date_of_birth: '1960-12-12',
    phone_number: '08012345678',
    photo: 'BASE 64 IMAGE',
    gender: 'M',
    customer: '9b2ac137-5360-4050-b412-4fa6728a31fb',
  },
};

export const nubanKycStatusResponse = {
  entity: {
    account_currency: 'NGN',
    account_name: 'MICHEAL ADEOSUN GABRIEL',
    account_number: '3046***407',
    bank: 'GTB',
    kyc_status: '2',
    first_name: 'John',
    identity_number: '*********556',
    identity_type: 'BVN',
    last_name: 'ADEOSUN',
    other_names: 'GABRIEL',
  },
};

export const ninResponse = {
  entity: {
    first_name: 'John',
    last_name: 'Doe',
    gender: 'Male',
    middle_name: '',
    photo: '/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgc...',
    date_of_birth: '1982-01-01',
    email: 'abc@gmail.com',
    phone_number: '08012345678',
    employment_status: 'unemployment',
    marital_status: 'Single',
  },
};

export const firsTinResponse = {
  entity: {
    search: '18609323-0001',
    taxpayer_name: 'BRYAN GODWIN NIG LTD',
    cac_reg_number: '3897612',
    firstin: '18609323-0001',
    jittin: 'N/A',
    tax_office: 'MSTO ALIMOSHO',
    phone_number: '08012345678',
    email: 'test@gmail.com',
  },
};

export const cacBasicResponse = {
  entity: {
    company_name: 'JOHN DOE LIMITED',
    type_of_company: 'BUSINESS_NAME',
    address: '25A James Street Magodo Phase I, Lagos, Nigeria.',
    status: 'Not Active',
    date_of_registration: '2021-03-18T09:53:20.310+00:00',
    rc_number: '1234567',
    business_number: '1234567',
    email: 'ABC@GMAIL.COM',
    state: 'Lagos',
    city: 'Lagos',
    lga: 'Kosofe',
    business: '7a666454-8ce0-44e2-ac32-3e8cb04b6b72',
  },
};

export const cacAdvancedResponse = {
  entity: {
    Branch_Address: 'No 42, Ewegbemi Bustop, Command Road, Lagos State.',
    City: '',
    Classification: 'BUSINESS NAME',
    Date_of_Registration: '2018-09-18T20:57:01.413+00:00',
    Email: '',
    Head_Office_Address: '',
    LGA: 'Alimosho',
    Name_of_Company: 'HAPPY DELI GRILLS',
    Number_of_Affiliates: '1',
    RC_Number: '2653386',
    Share_capital: '',
    Share_capital_in_words: '',
    State: 'LAGOS',
    Status: 'INACTIVE',
    Type_of_Company: 'BUSINESS_NAME',
    affiliates: [
      {
        accreditationnumber: '111111111',
        address: 'No 12, Adejumo Street, Last Bus stop, Meiran, Lagos State. ',
        affiliateType: 'PROPRIETOR',
        city: 'Lagos',
        companyId: 4927923,
        companyName: 'Dojah Inc',
        companyRcNumber: '11111111',
        corporateName: 'Dojah Inc',
        corporateRcNumber: '1111111',
        corporationName: 'Dojah Inc',
        countryName: 'NIGERIA',
        dateOfAppointment: '06-04-2018',
        dateOfBirth: '01-04-1986',
        dateOfTermination: null,
        email: 'olaofeyetunde@yahoo.com',
        firstname: 'Yetunde ',
        formerFirstName: null,
        formerName: null,
        formerNationality: null,
        formerOtherName: null,
        formerSurname: null,
        gender: 'FEMALE',
        id: 11547811,
        identityNumber: 'A25182063',
        identityType: "Permanent Voters' Card",
        isChairman: false,
        isCorporate: false,
        lga: null,
        name: 'Olaofe, Yetunde  Ayobami',
        nationality: 'Nigerian',
        occupation: 'Businesswoman',
        otherDirectorshipDetails: null,
        othername: 'Ayobami',
        phoneNumber: '07068774478',
        postcode: null,
        rcNumber: null,
        searchScore: null,
        shareAllotted: null,
        shareType: null,
        state: 'LAGOS',
        status: 'ACTIVE',
        streetNumber: null,
        surname: 'Olaofe',
        uuid: null,
      },
    ],
    imageReport:
      'https://dojah.s3.us-east-2.amazonaws.com/images/9cb091fe39054148a8e2b07177b7f408.pdf',
  },
};
