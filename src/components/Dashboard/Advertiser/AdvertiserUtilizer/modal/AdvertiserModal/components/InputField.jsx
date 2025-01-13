import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";


const InputField = ({ label, name, register, rules, placeholder, error }) => (
  <div className="grid w-full mb-4">
    <Label className="text-sm text-white pb-2">
      {label} <span className="text-red-500">*</span>
    </Label>
    <Input
      {...register(name, rules)}
      placeholder={placeholder}
      className={`border ${
        error ? 'border-red-500' : 'border-gray-300'
      } transition-all duration-300 text-sm`}
    />
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);

export default InputField