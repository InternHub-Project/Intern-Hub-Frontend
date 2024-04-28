import { useState } from 'react';
import Swal from 'sweetalert2';

const DynamicFieldForm = ({ onFieldsChange }) => {
  const [fields, setFields] = useState([]);
  const [newFieldType, setNewFieldType] = useState('text');
  const [newFieldValue, setNewFieldValue] = useState('');


  let inputValues = [];
    const showDynamicInputForm = async () => {
      // Prompt the user to enter the number of inputs
      const { value: numInputsStr } = await Swal.fire({
        title: 'Enter Number of Inputs',
        input: 'text',
        inputLabel: 'Number of Inputs',
        inputPlaceholder: 'Enter a number',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value || isNaN(value) || parseInt(value) <= 0) {
            return 'Please enter a valid positive number.';
          }
        }
      });
  
      if (numInputsStr) {
        const num = parseInt(numInputsStr);
        //setNumInputs(num); // Update the state with the number of inputs
        let inputElements = '';
        for(let i= 1 ; i<= num; i++){
          inputElements += `<input class="swal2-input" placeholder="Input ${i}" >`
        }
        // Display the SweetAlert dialog with dynamically generated input fields
        const { value: formValues } = await Swal.fire({
          title: 'Enter Information',
          html: inputElements,
          showCancelButton: true,
          focusConfirm: false,
          preConfirm: async () => {
            const inputs =  document.querySelectorAll('.swal2-input');
            let values = []
            inputs.forEach(e=>{
              values.push(e.value);
            })
            values.pop();
            return values
          },
        });
        //setInputValues(formValues);
        inputValues = formValues;
        // Display the collected input values in another SweetAlert dialog
        if (formValues) {
          let message = 'You entered:\n';
          for (let i = 0; i < num; i++) {
            message += `- Input ${i + 1}: ${formValues[i]}\n`;
          }
          Swal.fire({
            title: 'Inputs Received',
            text: message,
            icon: 'success'
          });
        }
      }
    }


  const handleAddField = async (e) => {
    e.preventDefault();
    if (newFieldValue.trim() === '') return; // Ignore empty field values
    if(newFieldType === "checkbox" || newFieldType === "multiple_choice"){
      await showDynamicInputForm()
    }
    const newField = {
      type: newFieldType,
      question: newFieldValue,
      options: inputValues
    };
    onFieldsChange([...fields, newField]);
    setFields([...fields, newField]);
    inputValues = [];
    setNewFieldValue(''); // Clear input after adding field
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const renderOptions = (option, i)=>{
    return(
      <label key={i}>
        <input type="radio"/> {option}
      </label>
    )
  }
  const renderCheckbox = (option, i)=>{
    return(
      <label key={i}>
        <input type="checkbox"/> {option}
      </label>
    )
  }
  const renderField = (field, index) => {
    return (
      <div key={index}>
        {field.type === 'text' && (
          <>
            <p>{field.question}</p>
            <textarea name="" id="" cols="30" rows="1"></textarea>
          </>
        )}
        {field.type === 'multiple_choice' && (
          <>
            <p>{field.question}</p>
            <div>
              {field.options.map((option, i) => renderOptions(option, i))}
            </div>
          </>
        )}
        {field.type === 'checkbox' && (
          <>
            <p>{field.question}</p>
            <div>
              {field.options.map((option, i) => renderCheckbox(option, i))}
            </div>
          </>
        )}
        <button onClick={() => handleRemoveField(index)}>Remove</button>
      </div>
    );
  };

  return (
    <div>
      <div>
        <select
          value={newFieldType}
          onChange={(e) => setNewFieldType(e.target.value)}
        >
          <option value="text">Text</option>
          <option value="multiple_choice">multiple_choice</option>
          <option value="checkbox">checkbox</option>
        </select>
        <input
          type="text"
          value={newFieldValue}
          onChange={(e) => setNewFieldValue(e.target.value)}
        />
        <button onClick={handleAddField}>Add Field</button>
      </div>
      <div>
        {fields.map((field, index) => renderField(field, index))}
      </div>
    </div>
  );
};

export default DynamicFieldForm;