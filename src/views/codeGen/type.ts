import { IDatePickerType } from "element-plus/es/components/date-picker/src/date-picker.type";
import { ElInput, ElInputNumber, ElSelect, ElDatePicker } from "element-plus";
type InputTypes = "input" | "select" | "inputNumber" | "date" | "input-textarea";

type GeneralFormItemType = {
  prop: string;
  label: string;
  value: any;
  // inputType: InputTypes;
  required?: boolean;
  trigger?: "change" | "blur";
  style?: Record<string, any>;
  clearable?: true;
  filterable?: true;
  disabled?: false;
  multiple?: false;
  placeholder?: boolean;
};

type InputNumberType = Partial<typeof ElInputNumber> &
  GeneralFormItemType & {
    inputType: "inputNumber";
  };

type SelectType = Partial<typeof ElSelect> &
  GeneralFormItemType & {
    inputType: "select";
    multiple?: false;
  };

type DateType = Partial<typeof ElDatePicker> &
  GeneralFormItemType & {
    inputType: "date";
    "value-format"?: string;
    type?: IDatePickerType;
  };

type InputType = Partial<typeof ElInput> &
  GeneralFormItemType & {
    inputType: "input";
  };

type InputText = Omit<typeof ElInput, "inputType"> & {
  rows?: number;
  inputType: "input-textarea";
};
export type FormItem = InputType | SelectType | DateType | InputText | InputNumberType;
export type FormConfig = {
  formConfig?: {
    inline?: true;
    size?: string;
    labelWidth?: string;
    refName?: string;
    fieldName?:string; // 类似 exam , 则就是考试的 crud
  };
  items: FormItem[];
};
