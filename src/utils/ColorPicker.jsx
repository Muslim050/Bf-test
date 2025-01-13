
import { SketchPicker } from 'react-color';

const ColorPicker = ({ color, onChange }) => {
  return (

     <div className=''>
       <SketchPicker
         color={color}
         onChangeComplete={onChange}
       />
     </div>
  );
};

export default ColorPicker;
// #fafafc

