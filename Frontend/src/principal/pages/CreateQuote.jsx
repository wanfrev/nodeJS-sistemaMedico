import{ useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateQuote.css';

export const CreateQuote = () => {
  const [data, setData] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/createQuoteData.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    navigate('/home'); // Navigate to HomePage after form submission
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="create-quote-container">
      <header className="header">
        <h1>Crear cita</h1>
      </header>
      <form className="quote-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reason">Razón de cita</label>
          <input type="text" id="reason" className="form-control" placeholder="Especifica el motivo de la consulta médica" />
        </div>
        <div className="form-group">
          <label htmlFor="files">Adjuntar archivos</label>
          <div id="files" className="file-drop-area" onClick={handleFileButtonClick}>
            Drop files
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="doctor">Doctor a solicitar</label>
          <select id="doctor" className="form-control">
            {data.doctors.map((doctor, index) => (
              <option key={index}>{doctor}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Fechas disponibles</label>
          <select id="date" className="form-control">
            {data.availableDates.map((date, index) => (
              <option key={index}>{date}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-confirm">Confirmar cita</button>
      </form>
    </div>
  );
};