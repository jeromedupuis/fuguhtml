export default () => {
  return [
    {
      key: 'templateEngine',
      label: 'Template Engine',
      question: 'What template engine whould we use ?',
      inputType: 'select',
      options: ['ANYTHING', 'EJS', 'PUG', 'NONE', 'OTHER'],
      value: {
        client: null,
        freelancer: 'ANYTHING'
      }
    },
    {
      key: 'css',
      label: 'CSS',
      question: 'What kind of CSS style should we code ?',
      inputType: 'select',
      options: ['ANYTHING', 'BEM', 'OOCSS', {
        value: 'NONE',
        label: 'Freelancer\'s CSS'
      }, 'OTHER'],
      value: {
        client: 'ANYTHING',
        freelancer: 'ANYTHING'
      }
    },
    {
      key: 'gulp',
      label: 'GULP',
      question: 'May we use gulp ?',
      inputType: 'switch',
      value: {
        client: true,
        freelancer: true
      }
    },
    {
      key: 'eslint',
      label: 'Eslint',
      question: 'Do you have Eslint rules ?',
      note: 'We use Eslint by default',
      inputType: 'textarea',
      twoCols: true,
      onlyClient: true,
      value: {
        client: '',
        freelancer: ''
      }
    },
    {
      key: 'jquery',
      label: 'jQuery',
      question: 'May we use jQuery ?',
      inputType: 'switch',
      onlyClient: true,
      value: {
        client: null,
      }
    },
    {
      key: 'exportImage',
      label: 'Export image',
      question: 'Export images from PSD files might be needed ?',
      note: 'Additional costs might be added',
      inputType: 'switch',
      onlyClient: true,
      value: {
        client: null,
      }
    },
    {
      key: 'download',
      label: 'PSD Download link',
      question: 'Can you provide your PSD file ?',
      note: 'Import file is not available at this moment.<br />A download link would be thankful.',
      inputType: 'input',
      twoCols: true,
      onlyClient: true,
      value: {
        client: null,
      }
    }
  ];
};
