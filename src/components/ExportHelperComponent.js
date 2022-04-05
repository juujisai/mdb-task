import React from 'react';
import { connect } from 'react-redux';
import Alert from './Alert';
import { AiOutlineClose } from 'react-icons/ai'
import { showToolHelper } from '../redux/actions/toolsActions'
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas'
import { CSVLink } from "react-csv";
import exportFromJSON from "export-from-json";
import topdf from '../media/topdf.png'

const ExportHelperComponent = ({ tools, pcParts, showHelper, setFilter }) => {
  // state for type of statistic
  const [selectedValue, setSelectedValue] = React.useState('export-pdf')
  const [fileName, setFileName] = React.useState('dane')

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
    const tableWrap = document.querySelector('.wrap-table')

    // delete overflow from wrapper so the table wont look bad on pdf. Do it now so it wont change the look of table but still the pdf will look like it should have
    tableWrap.style.overflowX = 'visible'


    let margins = {
      top: 10,
      left: 10
    }
    let source = document.getElementById('table-to-export-wrap')

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

      // add empty png to pdf so it looks like a margin
      const pdfMargin = { source: topdf, width: 210, heigth: margins.top }


      height = ratio * width;
      // height = pcParts.listOfComponents.length * 7

      let a4 = 297
      let noPages = 0

      // check how many pages the image would take
      noPages = Math.floor(height / a4) + 1



      for (let i = 0; i < noPages; i++) {
        let x = margins.left;
        let y = 0
        // version without margins
        // y = -i * 297 + margins.top

        // version with margins 
        i > 0 ? y = -i * 297 + 3 * margins.top : y = -i * 297 + margins.top

        i > 0 && pdf.addPage()

        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, width - margins.left * 2, height - margins.top * 1);


        // version with margins
        // bottom
        noPages > 1 && pdf.addImage(pdfMargin.source, 'PNG', 0, 297 - pdfMargin.heigth, pdfMargin.width, margins.top)
        // top
        i > 0 && pdf.addImage(pdfMargin.source, 'PNG', 0, 0, pdfMargin.width, margins.top)

      }
      pdf.save(`${fileName}.pdf`);


    });

    // add overflow scroll back to wrapper so the table wont look bad on website. 
    tableWrap.style.overflowX = 'scroll'
  }

  const createXML = () => {
    // const data = JSON.stringify(pcParts.listOfComponents)
    const data = pcParts.listOfComponents
    const fieldsAsObjects = {
      "id": "Id of the item",
      "name": "Name of the item",
      "company": "Company that made the item",
      "model": "Model that company gave to the item",
      "category": "Category the item falls in",
      "price": "Price of the item"
    };

    const exportType = 'xml';
    const fields = fieldsAsObjects ? fieldsAsObjects : [];
    exportFromJSON({ data, fileName, fields, exportType })


  }

  const handleClick = (e) => {
    e.preventDefault()
    if (pcParts.listOfComponents.length === 0) {
      return alert('brak danych do wyeksportowania')
    }

    console.log(selectedValue)
    if (selectedValue === 'export-pdf') {
      createPDF()
    }

    if (selectedValue === 'export-xml') {
      console.log('x')
      createXML()
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
          <label htmlFor="export-pdf" className='export-radio'><input type="radio" name="export-pdf" id="export-pdf" value='export-pdf' checked={selectedValue === 'export-pdf'} onChange={(e) => setSelectedValue(e.target.value)} /> pdf</label>
          <label htmlFor="export-csv" className='export-radio'><input type="radio" name="export-csv" id="export-csv" value='export-csv' checked={selectedValue === 'export-csv'} onChange={(e) => setSelectedValue(e.target.value)} /> csv</label>
          <label htmlFor="export-xml" className='export-radio'><input type="radio" name="export-xml" id="export-xml" value='export-xml' checked={selectedValue === 'export-xml'} onChange={(e) => setSelectedValue(e.target.value)} /> xml</label>
        </div>

        <div className="helper-stats-form__div">
          <label htmlFor="choose-type" className='choose-type'>nazwa pliku:</label>
          <input className='name-of-file-input' type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} />.{selectedValue.split('-')[1]}

        </div>


        {selectedValue !== 'export-csv' && <button className='add-new' onClick={(e) => handleClick(e)}>Pobierz plik</button>
        }
        {selectedValue === 'export-csv' && <button className='add-new' onClick={(e) => { e.preventDefault(); pcParts.listOfComponents.length === 0 && alert('brak danych do wyeksportowania') }}>{pcParts.listOfComponents.length > 0 ? <CSVLink filename={fileName} data={pcParts.listOfComponents}>Pobierz plik</CSVLink> : 'Pobierz plik'}</button>}

      </form>

      {showAlert && <Alert txt={alertData[0]} type={alertData[1]} />}
      <div className="to-export"></div>
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