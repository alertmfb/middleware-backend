export const basicBvnLookupResponse = {
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

export const advancedBvnLookupResponse = {
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

export const bvnValidateResponse = {
  entity: {
    bvn: {
      value: '23456789012',
      status: true,
    },
    first_name: {
      confidence_value: 100,
      status: true,
    },
  },
};

export const phoneNumberBasicLookupResponse = {
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

export const phoneNumberAdvancedLookupResponse = {
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

export const ninLookupResponse = {
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
