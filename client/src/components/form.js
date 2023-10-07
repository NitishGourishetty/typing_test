import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import './form.css'


function Input() {
  return (
    <>
      <Form.Control className = "form" size="lg" type="text" placeholder="Start Typing" />
    </>
  );
}

export default Input;