import FormDatepicker from '../components/form/Datepicker';
import InputRadio from '../components/form/InputRadio';
import InputPassword from '../components/form/InputPassword';
import InputCheckbox from '../components/form/InputCheckbox';
import InputSwitchCheckbox from '../components/form/InputSwitchCheckbox';
import InputText from '../components/form/InputText';
import InputNumber from '../components/form/InputNumber';
import InputSubmit from '../components/form/InputSubmit';
import Select from '../components/form/Select';
import LoaderCircle from '../components/loader/LoaderCircle';

export default {
  components: {
    'ui-input-password': InputPassword,
    'ui-datepicker': FormDatepicker,
    'ui-input-radio': InputRadio,
    'ui-input-checkbox': InputCheckbox,
    'ui-input-switch-checkbox': InputSwitchCheckbox,
    'ui-input-text': InputText,
    'ui-input-number': InputNumber,
    'ui-input-submit': InputSubmit,
    'ui-select': Select,
    'ui-loader-circle': LoaderCircle
  }
};
