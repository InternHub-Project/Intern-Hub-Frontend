import { useState } from 'react';

const DynamicFieldForm = () => {
  const [fields, setFields] = useState([]);
  const [newFieldType, setNewFieldType] = useState('text');
  const [newFieldValue, setNewFieldValue] = useState('');

  const handleAddField = () => {
    if (newFieldValue.trim() === '') return; // Ignore empty field values

    const newField = {
      type: newFieldType,
      value: newFieldValue,
    };

    setFields([...fields, newField]);
    setNewFieldValue(''); // Clear input after adding field
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const renderField = (field, index) => {
    return (
      <div key={index}>
        {field.type === 'text' && (
          <input type="text" value={field.value} readOnly />
        )}
        {field.type === 'radio' && (
          <label>
            <input type="radio" checked={field.value} readOnly />
            {field.value}
          </label>
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
          <option value="radio">Radio</option>
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