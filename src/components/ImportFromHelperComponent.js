import React from 'react';
import { connect } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai'
import { showToolHelper } from '../redux/actions/toolsActions'
import Alert from './Alert';
import { updateListWithoutPost, updateList } from '../redux/actions/pcPartsAction'


const ImportFromHelperComponent = ({ tools, pcParts, showHelper, updateWithoutPost, update }) => {
  // state for downloading data
  const [dataReadyToImport, setDataReadyToImport] = React.useState(false)
  const [dataFromFile, setDataFromFile] = React.useState([])
  const [headersFromFile, setHeadersFromFile] = React.useState([])
  const [isNumberNumber, setIsNumberNumber] = React.useState(true)

  // state for headers that are the same headers (but maybe different names) in csv file 
  const [mainHeadersFromWebsite, setMainHeadersFromWebsit] = React.useState({ id: '', name: '', company: '', model: '', category: '', price: '' })

  const fileRef = React.useRef()

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

  React.useEffect(() => {
    // check if headers are matched
    if (mainHeadersFromWebsite.id !== '' && mainHeadersFromWebsite.name !== '' && mainHeadersFromWebsite.model !== '' && mainHeadersFromWebsite.company !== '' && mainHeadersFromWebsite.price !== '') {
      let prices = []

      // make an array with prices only
      dataFromFile.forEach(item => prices = [...prices, item[mainHeadersFromWebsite.price]])

      // check if values are numbers
      let pricesNumber = prices.map(item => !isNaN(Number(item)))

      // check if column is type number
      const pricesContainsNumbers = pricesNumber.findIndex(item => item === false) === -1 ? true : false


      // show button only when all data is filled and price is type number
      if (pricesContainsNumbers) {
        setIsNumberNumber(true)
        setDataReadyToImport(true)

      } else {
        setIsNumberNumber(false)
        setDataReadyToImport(false)

      }


    }

  }, [mainHeadersFromWebsite, dataFromFile])


  const handleClick = (e) => {
    e.preventDefault()

    let data = []
    console.log(dataFromFile)
    dataFromFile.forEach(item => data = [...data, { id: item[mainHeadersFromWebsite.id], name: item[mainHeadersFromWebsite.name], company: item[mainHeadersFromWebsite.company], model: item[mainHeadersFromWebsite.model], price: Number(item[mainHeadersFromWebsite.price]), category: item[mainHeadersFromWebsite.category] }])


    addToLocalStorage ? update(data) : updateWithoutPost(data)


    setShowAlert(true)
    setAlertData([`Pobrano dane z pliku csv`, 'success'])

  }
  // function co create array from csv file
  const csvStringToArray = (data, separator = ',') => {
    let x = data.split('').filter(item => item !== '"').join('')

    const headers = x.slice(0, x.indexOf("\n")).split(separator);

    const rows = x.slice(x.indexOf("\n") + 1).split("\n");

    let array = []

    // console.log(rows)
    array = rows.map(item => {
      const values = item.split(separator)
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    })


    // console.log(JSON.parse(array))
    return { array, headers }
  }

  // handle file upload
  const handleChange = (e) => {
    setDataFromFile([])
    setHeadersFromFile([])
    let file = e.target.files[0]
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      const response = csvStringToArray(text)

      setDataFromFile(response.array)
      setHeadersFromFile(response.headers)
    };

    reader.readAsText(file)
  }

  // values that can be selected
  const valuesToSelect = headersFromFile.map((item, id) => (
    <option key={id} value={item}>{item}</option>
  ))

  // handle change select in one function
  const handleSelectChange = (e) => {
    setMainHeadersFromWebsit({ ...mainHeadersFromWebsite, [e.target.name.split('-')[1]]: e.target.value })
  }

  // create select options for every header
  const valuesForSelectOptions = ['id', 'name', 'company', 'model', 'category', 'price']

  const selectOptions = valuesForSelectOptions.map((item, id) => (
    <label htmlFor={`select-${item}`} key={id} className='label-for-select-header'>{item}:
      <select name={`select-${item}`} className='select-import' id={`select-${item}`} value={mainHeadersFromWebsite[item]} onChange={(e) => handleSelectChange(e)} style={mainHeadersFromWebsite[item] === '' ? { color: 'red' } : { color: 'black' }}>
        {valuesToSelect}
      </select>
      {item === 'price' && !isNumberNumber && <span className='number-vali'>Musi zawierać liczby</span>}
    </label>
  ))


  // console.log(mainHeadersFromWebsite)

  return (
    <div className='helper-component helper-stats'>
      <span className="close-btn" onClick={() => showHelper('import')}><AiOutlineClose /></span>
      <h1 className="header-secondary">Importuj dane z pliku</h1>
      <form className="helper-stats-form">
        <div className="helper-stats-form__div">
          <label htmlFor="choose-type" className='choose-type'>Zamieść plik csv:</label>
          <input ref={fileRef} type="file" id="csvFile" accept=".csv" onChange={(e) => { handleChange(e) }} />

        </div>

        {dataFromFile.length !== 0 && <>
          <div className="helper-stats-form__div">
            <label htmlFor="choose-which-key" className='choose-type'>Wybierz kolumnę </label>
            {selectOptions}

          </div>
          <div className="helper-stats-form__div" >
            <label htmlFor="choose-type" className='choose-type'>Dodaj dane do localStorage</label>
            <label htmlFor="check-local-storage" className='check-local-storage'><input type="checkbox" name="check-local-storage" id="check-local-storage" value='check-local-storage' checked={addToLocalStorage} onChange={(e) => setAddToLocalStorage(e.target.checked)} /> dodaj</label>
          </div>

        </>}





        {dataReadyToImport && <button className='add-new' onClick={(e) => handleClick(e)} >Importuj</button>}
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
    updateWithoutPost: (data) => dispatch(updateListWithoutPost(data)),
    update: (list) => dispatch(updateList(list)),



  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ImportFromHelperComponent);