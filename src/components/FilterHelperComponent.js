import React from 'react';
import { connect } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai'
import { showToolHelper } from '../redux/actions/toolsActions'
import Alert from './Alert';
import { filtrByCategory } from '../redux/actions/pcPartsAction'


const FilterHelperComponent = ({ tools, pcParts, showHelper, setFilter }) => {
  const [listCategories, setListCategories] = React.useState([])
  // state for checking what user picked
  const [valuePicked, setValuePicked] = React.useState('')


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
    if (!listCategories.length) {
      const list = pcParts.listOfComponents
      let values = { categories: [] }
      list.forEach(item => {
        values = { ...values, categories: [...values.categories, item.category] }
      })

      values = { categories: [...new Set(values.categories)] }


      setListCategories(values.categories)

      setValuePicked('all')
      console.log('got values')
    }

  }, [listCategories, pcParts])


  const handleClick = (e) => {
    e.preventDefault()
    setShowAlert(true)
    setAlertData([`Filtruję dane po kategorii ${valuePicked}`, 'success'])
    setFilter(valuePicked)
  }

  const optionsCategories = listCategories.map((item, id) =>
    (<option value={item} key={id}>{item}</option>)
  )


  return (
    <div className='helper-component helper-stats'>
      <span className="close-btn" onClick={() => showHelper('selection')}><AiOutlineClose /></span>
      <h1 className="header-secondary">Wybierz kategorię filtrowania</h1>
      <form className="helper-stats-form">
        <div className="helper-stats-form__div">
          <select name="select-category" id="select-category" value={valuePicked} onChange={(e) => setValuePicked(e.target.value)}>
            <option value={'all'} >wszystkie</option>
            {optionsCategories}
          </select>
        </div>



        <button className='add-new' onClick={(e) => handleClick(e)}>Filtruj dane</button>
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
    setFilter: (name) => dispatch(filtrByCategory(name))

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(FilterHelperComponent);