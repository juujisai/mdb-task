import React from 'react';
import { connect } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai'
import { showToolHelper } from '../redux/actions/toolsActions'
import { addNewStatToShow } from '../redux/actions/pcPartsAction';
import Alert from './Alert';

const ToolsHelperComponent = ({ tools, pcParts, showHelper, newStat }) => {
  // state for getting every unique value to pick in this helper
  const [listNames, setListNames] = React.useState([])
  const [listCompanies, setListCompanies] = React.useState([])
  const [listModels, setListModels] = React.useState([])
  const [listPrices, setListPrices] = React.useState([])
  const [listCategories, setListCategories] = React.useState([])

  // state for checking what user picked
  const [colPicked, setColPicked] = React.useState('name')
  const [valuePicked, setValuePicked] = React.useState('')

  // state for type of statistic
  const [selectedValue, setSelectedValue] = React.useState('sum')

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



  // get list values when component is loaded
  React.useEffect(() => {
    if (!listNames.length) {
      const list = pcParts.listOfComponents
      let values = { names: [], companies: [], models: [], prices: [], categories: [] }

      list.forEach(item => {
        // get names
        values = { ...values, names: [...values.names, item.name], companies: [...values.companies, item.company], models: [...values.models, item.model], prices: [...values.prices, Number(item.price)], categories: [...values.categories, item.category] }

      })

      values = { names: [...new Set(values.names)], companies: [...new Set(values.companies)], models: [...new Set(values.models)], prices: [...new Set(values.prices)], categories: [...new Set(values.categories)] }


      setListNames(values.names)
      setListCompanies(values.companies)
      setListModels(values.models)
      setListPrices(values.prices)
      setListCategories(values.categories)

      setValuePicked(values.names[0])

    }

  }, [listNames, pcParts])

  const handleClick = (e) => {
    e.preventDefault()
    newStat({ operator: selectedValue, col: colPicked, value: valuePicked })
    setShowAlert(true)
    setAlertData([`Dodano nową statystykę: ${selectedValue} dla kolumny: ${colPicked} o wartości: ${valuePicked}`, 'success'])
  }

  const optionsName = listNames.map((item, id) =>
    (<option value={item} key={id}>{item}</option>)
  )
  const optionsCompanies = listCompanies.map((item, id) =>
    (<option value={item} key={id}>{item}</option>)
  )
  const optionsModels = listModels.map((item, id) =>
    (<option value={item} key={id}>{item}</option>)
  )

  const optionsCategories = listCategories.map((item, id) =>
    (<option value={item} key={id}>{item}</option>)
  )


  React.useEffect(() => {
    const decideInitialValue = () => {
      colPicked === 'name' ? setValuePicked(listNames[0]) : colPicked === 'company' ? setValuePicked(listCompanies[0]) : colPicked === 'model' ? setValuePicked(listModels[0]) : colPicked === 'price' ? setValuePicked(listPrices.sort()[listPrices.length - 1]) : setValuePicked(listCategories[0])

    }


    decideInitialValue()

  }, [colPicked, listNames, listCategories, listCompanies, listModels, listPrices])



  return (<div className='helper-component helper-stats'>
    <span className="close-btn" onClick={() => showHelper('stats')}><AiOutlineClose /></span>
    <h1 className="header-secondary">Wybierz rodzaj statystyki</h1>
    <form className="helper-stats-form">
      <div className="helper-stats-form__div">
        <label htmlFor="choose-type" className='choose-type'>Wybierz rodzaj statystyki</label>
        <label htmlFor="stat-sum"><input type="radio" name="stat-sum" id="stat-sum" value='sum' checked={selectedValue === 'sum'} onChange={(e) => setSelectedValue(e.target.value)} /> suma</label>
        <label htmlFor="stat-avg"><input type="radio" name="stat-avg" id="stat-avg" value='avg' checked={selectedValue === 'avg'} onChange={(e) => setSelectedValue(e.target.value)} /> średnia</label>
      </div>

      <div className="helper-stats-form__div">
        <label htmlFor="choose-which-key" className='choose-type'>Wybierz kolumnę </label><select name='select-col' id="select-col" value={colPicked} onChange={(e) => { setColPicked(e.target.value) }}>
          <option value="name">nazwa</option>
          <option value="company">firma</option>
          <option value="model">model</option>
          <option value="category">kategoria</option>
          <option value="price">cena</option>
        </select>
      </div>
      <div className="helper-stats-form__div">
        <label htmlFor="select-name" className='choose-type'>Wybierz wartość</label>
        {colPicked === 'name' && <select name="select-name" id="select-name" value={valuePicked} onChange={(e) => setValuePicked(e.target.value)}>{optionsName}</select>}
        {colPicked === 'company' && <select name="select-company" id="select-company" value={valuePicked} onChange={(e) => setValuePicked(e.target.value)}>{optionsCompanies}</select>}
        {colPicked === 'model' && <select name="select-model" id="select-model" value={valuePicked} onChange={(e) => setValuePicked(e.target.value)}>{optionsModels}</select>}
        {colPicked === 'category' && <select name="select-category" id="select-category" value={valuePicked} onChange={(e) => setValuePicked(e.target.value)}>{optionsCategories}</select>}
        {colPicked === 'price' && <>
          <input type="range" min={listPrices.sort()[0]} max={listPrices.sort()[listPrices.length - 1]} value={valuePicked} onChange={(e) => setValuePicked(e.target.value)} /> <span className="price-show">{valuePicked}</span></>
        }


      </div>


      <button className='add-new' onClick={(e) => handleClick(e)}>Dodaj statystykę</button>
    </form>
    {showAlert && <Alert txt={alertData[0]} type={alertData[1]} />}

  </div>);
}

const mapStateToProps = ({ tools, pcParts }) => {
  return { tools, pcParts }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showHelper: (name) => dispatch(showToolHelper(name)),
    newStat: (data) => dispatch(addNewStatToShow(data))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolsHelperComponent);