export default () => {
  return [
    {
      key: 'startAt',
      label: 'Start Date',
      question: 'When do we start ?',
      inputType: 'datepicker',
      onlyClient: true,
      value: {
        client: ''
      }
    },
    {
      key: 'endAt',
      label: 'End Date',
      question: 'When do we need it ?',
      inputType: 'datepicker',
      onlyClient: true,
      value: {
        client: ''
      }
    },
    {
      key: 'description',
      label: 'Description',
      question: 'Could you explain it ?',
      inputType: 'textarea',
      onlyClient: true,
      twoCols: true,
      value: {
        client: ''
      }
    },
    {
      key: 'budget',
      label: 'About your budget',
      question: 'Do you have a budget ?',
      note: 'If you don\'t, keep it blank.<br />Default currency is Japanese Yen',
      inputType: 'input',
      onlyClient: true,
      value: {
        client: null
      }
    },
    {
      key: 'github',
      label: 'Github',
      question: 'Do you have a Github repository ?',
      note: 'Credentials might be required',
      inputType: 'input',
      onlyClient: true,
      value: {
        client: null
      }
    }
  ];
};
