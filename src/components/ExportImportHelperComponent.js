import React from 'react';
import { connect } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai'
import { showToolHelper } from '../redux/actions/toolsActions'
import Alert from './Alert';
import { handleImportFromNode, handlePostToNode, handlePutToNode } from '../redux/actions/pcPartsAction'


const ExportImponrtHelperComponent = ({ tools, pcParts, showHelper, handleImport, handlePost, handlePut }) => {
  // state for type of statistic
  const [selectedValue, setSelectedValue] = React.useState('import-api')

  // state for deciding if app should add data to localstorage
  const [addToLocalStorage, setAddToLocalStorage] = React.useState(false)


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



  const handleClick = (e) => {
    e.preventDefault()

    if (selectedValue === 'import-api') {
      handleImport(addToLocalStorage)
    }
    if (selectedValue === 'export-post-api') {
      handlePost(pcParts.listOfComponents[pcParts.listOfComponents.length - 1])
    }
    if (selectedValue === 'export-put-api') {
      handlePut(pcParts.listOfComponents)
    }


    setShowAlert(true)
    setAlertData([`Wykonano ${selectedValue.split('-').join(' ')}`, 'success'])

  }


  return (
    <div className='helper-component helper-stats'>
      <span className="close-btn" onClick={() => showHelper('exp-imp')}><AiOutlineClose /></span>
      <h1 className="header-secondary">Wybierz rodzaj działania</h1>
      <form className="helper-stats-form">
        <div className="helper-stats-form__div">
          <label htmlFor="choose-type" className='choose-type'>Exportuj / importuj dane do:</label>
          <label htmlFor="import-api" className='import-radio'><input type="radio" name="import-api" id="import-api" value='import-api' checked={selectedValue === 'import-api'} onChange={(e) => setSelectedValue(e.target.value)} /> import z node api</label>
          <label htmlFor="export-post-api" className='export-radio'><input type="radio" name="export-post-api" id="export-post-api" value='export-post-api' checked={selectedValue === 'export-post-api'} onChange={(e) => setSelectedValue(e.target.value)} /> export POST do node api (ostatni rekord)</label>
          <label htmlFor="export-put-api" className='export-radio'><input type="radio" name="export-put-api" id="export-put-api" value='export-put-api' checked={selectedValue === 'export-put-api'} onChange={(e) => setSelectedValue(e.target.value)} /> export PUT do node api</label>
        </div>
        <div className='overflow-hidden'>
          <div className="helper-stats-form__div helper-div-that-shows-after-selection" style={selectedValue === 'import-api' ? { transform: `translateY(-0%)` } : { transform: `translateY(-200%)` }}>
            <label htmlFor="choose-type" className='choose-type'>Dodaj dane do localStorage</label>
            <label htmlFor="check-local-storage" className='check-local-storage'><input type="checkbox" name="check-local-storage" id="check-local-storage" value='check-local-storage' checked={addToLocalStorage} onChange={(e) => setAddToLocalStorage(e.target.checked)} /> dodaj</label>
          </div>
        </div>

        <button className='add-new' onClick={(e) => handleClick(e)}>{selectedValue.split('-').join(' ')}</button>
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
    handleImport: () => dispatch(handleImportFromNode()),
    handlePost: (data) => dispatch(handlePostToNode(data)),
    handlePut: (data) => dispatch(handlePutToNode(data)),

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ExportImponrtHelperComponent);