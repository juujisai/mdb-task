import React from 'react';
import { connect } from 'react-redux';
import Alert from './Alert';
import { AiOutlineClose } from 'react-icons/ai'
import { showToolHelper } from '../redux/actions/toolsActions'
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas'
import { CSVLink, CSVDownload } from "react-csv";


const ExportHelperComponent = ({ tools, pcParts, showHelper, setFilter }) => {
  // state for type of statistic
  const [selectedValue, setSelectedValue] = React.useState('export-pdf')


  // state for alert
  const [showAlert, setShowAlert] = React.useState(false)
  const [alertData, setAlertData] = React.useState(['default', 'success'])
  const alertDuration = 3000


  // component cycle for alert
  React.useEffect(() => {
    let timeout;
    if (showAlert) {
      timeout = setTimeout(() => { setShowAlert(false) }, alertDuration)
    }

    // clear timeout if component is unmounted
    return () => { clearTimeout(timeout) }

  }, [showAlert])

  const createPDF = () => {
    let margins = {
      top: 20,
      left: 10
    }
    let source = document.getElementById('table-to-export-wrap')
    // let source = document.getElementById('table-to-export')
    const contentWidth = source.clientWidth;
    const contentHeight = source.clientHeight;

    let ratio = contentHeight / contentWidth;

    html2canvas(source,
      {
        height: contentHeight,
        width: contentWidth,
        scale: 1,
      }
    ).then(canvas => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      let width = pdf.internal.pageSize.getWidth();
      let height = pdf.internal.pageSize.getHeight();

      height = ratio * width;
      // console.log(height)

      let a4 = 297
      let noPages = 0

      noPages = Math.floor(height / a4) + 1
      // console.log(noPages)

      for (let i = 0; i < noPages; i++) {
        let x = margins.left;
        let y = -i * 297 + margins.top
        i > 0 && pdf.addPage()
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, width - margins.left * 2, height - margins.top * 2);
        // console.log('add page')
      }


      pdf.save('tabela.pdf');
    });










  }

  const handleClick = (e) => {
    e.preventDefault()
    console.log(selectedValue)
    if (selectedValue === 'export-pdf') {
      createPDF()
    }


    setShowAlert(true)
    setAlertData([`Wyeksportowano tabelę do pliku ${selectedValue.split('-')[1]}`, 'success'])
  }


  return (
    <div className='helper-component helper-export'>
      <span className="close-btn" onClick={() => showHelper('export')}><AiOutlineClose /></span>
      <h1 className="header-secondary">Wybierz rodzaj exportu</h1>
      <form className="helper-stats-form">
        <div className="helper-stats-form__div">
          <label htmlFor="choose-type" className='choose-type'>Exportuj tabelę do:</label>
          <label htmlFor="export-pdf"><input type="radio" name="export-pdf" id="export-pdf" value='export-pdf' checked={selectedValue === 'export-pdf'} onChange={(e) => setSelectedValue(e.target.value)} /> pdf</label>
          <label htmlFor="export-csv"><input type="radio" name="export-csv" id="export-csv" value='export-csv' checked={selectedValue === 'export-csv'} onChange={(e) => setSelectedValue(e.target.value)} /> csv</label>
          <label htmlFor="export-xml"><input type="radio" name="export-xml" id="export-xml" value='export-xml' checked={selectedValue === 'export-xml'} onChange={(e) => setSelectedValue(e.target.value)} /> xml</label>
        </div>



        {selectedValue !== 'export-csv' && <button className='add-new' onClick={(e) => handleClick(e)}>Pobierz plik</button>
        }
        {selectedValue === 'export-csv' && <button className='add-new'><CSVLink filename='dane-z-tabeli' data={pcParts.listOfComponents}>Pobierz plik</CSVLink></button>}

      </form>

      {showAlert && <Alert txt={alertData[0]} type={alertData[1]} />}

    </div>
  );
}

const mapStateToProps = ({ tools, pcParts }) => {
  return { tools, pcParts }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showHelper: (name) => dispatch(showToolHelper(name)),


  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ExportHelperComponent);