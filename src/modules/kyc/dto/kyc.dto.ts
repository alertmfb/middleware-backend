import { ApiProperty, ApiQuery } from '@nestjs/swagger';

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
