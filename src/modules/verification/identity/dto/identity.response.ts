export const ninSelfieResponse = {
  entity: {
    first_name: 'John',
    last_name: 'Doe',
    middle_name: 'Chinwe',
    gender: 'M',
    image:
      '/9j/4AAQScXJSgBBAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwg...',
    phone_number: '0812345678',
    date_of_birth: '1993-05-06',
    nin: '70123456789',
    selfie_verification: {
      confidence_value: 99.90354919433594,
      match: true,
    },
  },
};

export const bvnSelfieResponse = {
  entity: {
    bvn: '1234567890',
    first_name: 'JOHN',
    middle_name: 'ANON',
    last_name: 'DOE',
    date_of_birth: '01-January-1907',
    phone_number1: '08103817187',
    phone_number2: '',
    gender: 'Male',
    image: '/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKD...',
    selfie_verification: {
      confidence_value: 99.99620056152344,
      match: true,
    },
    selfie_image_url:
      'https://image-rekognitions.s3.amazonaws.com/bvn_n_selfie_172.jpg',
  },
};

export const livelinessResponse = {
  entity: {
    liveness: {
      liveness_check: false,
      liveness_probability: 0.014614949759561568,
    },
    face: {
      face_detected: true,
      message: 'face detected',
      multiface_detected: false,
      details: {
        age_range: {
          low: 25,
          high: 35,
        },
        smile: {
          value: false,
          confidence: 92.67727661132812,
        },
        gender: {
          value: 'Female',
          confidence: 99.92608642578125,
        },
        eyeglasses: {
          value: false,
          confidence: 96.146484375,
        },
        sunglasses: {
          value: false,
          confidence: 99.99609375,
        },
        beard: {
          value: false,
          confidence: 85.18626403808594,
        },
        mustache: {
          value: false,
          confidence: 96.13561248779297,
        },
        eyes_open: {
          value: true,
          confidence: 88.61351776123047,
        },
        mouth_open: {
          value: false,
          confidence: 76.0062484741211,
        },
        emotions: [
          {
            type: 'CALM',
            confidence: 81.77631378173828,
          },
          {
            type: 'FEAR',
            confidence: 6.811796188354492,
          },
          {
            type: 'SURPRISED',
            confidence: 6.772216320037842,
          },
          {
            type: 'SAD',
            confidence: 6.691151142120361,
          },
          {
            type: 'ANGRY',
            confidence: 2.304255723953247,
          },
          {
            type: 'DISGUSTED',
            confidence: 2.147843599319458,
          },
          {
            type: 'HAPPY',
            confidence: 1.2251189947128296,
          },
          {
            type: 'CONFUSED',
            confidence: 0.9095264673233032,
          },
        ],
      },
      quality: {
        brightness: 65.93645477294922,
        sharpness: 97.45164489746094,
      },
      confidence: 99.99896240234375,
      bounding_box: {
        width: 0.4954420328140259,
        height: 0.39241859316825867,
        left: 0.27790528535842896,
        top: 0.3333175778388977,
      },
    },
  },
};
