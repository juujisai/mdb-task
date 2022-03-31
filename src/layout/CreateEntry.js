import React from 'react';
import { connect } from 'react-redux'
import Loader from '../components/Loader'
import { addNewCategory, addItemToList } from '../redux/actions/pcPartsAction'
import Alert from '../components/Alert'

const CreateEntry = ({ pcParts: { selectCategories, listOfComponents }, addCategory, addItem }) => {
  // state value for select options
  const [optionsToSelect, setOptionsToSelect] = React.useState([])

  // state value for new option
  const [showNewOptionBox, setShowNewOptionBox] = React.useState(false)
  const [newOptionValue, setNewOptionValue] = React.useState('')
  const newOptionTxt = 'dodaj nową wartość'

  // state values for controlled form
  const [itemName, setItemName] = React.useState('')
  const [itemCompany, setItemCompany] = React.useState('')
  const [itemModel, setItemModel] = React.useState('')
  const [itemCategory, setItemCategory] = React.useState(selectCategories[0])
  const [itemPrice, setItemPrice] = React.useState(0)

  const [validation, setValidation] = React.useState({ name: false, company: false, model: false, passed: false })


  // state for alert
  const [showAlert, setShowAlert] = React.useState(false)
  const [alertData, setAlertData] = React.useState(['default', 'success'])
  const alertDuration = 3000

  // component cycle for reading categories
  React.useEffect(() => {
    console.log('render')
    setOptionsToSelect(selectCategories)
  }, [selectCategories])

  // component cycle for alert
  React.useEffect(() => {
    let timeout;
    if (showAlert) {
      timeout = setTimeout(() => { setShowAlert(false) }, alertDuration)
    }

    // clear timeout if component is unmounted
    return () => { clearTimeout(timeout) }

  }, [showAlert])



  if (!optionsToSelect.length) return <Loader />

  // for displaying options
  const options = optionsToSelect.map((item, id) => (
    <option value={item} key={id}>{item}</option>
  ))

  // validation
  const validate = () => {
    let name = false
    let company = false
    let model = false
    let passed = false

    if (!itemName.length) { name = true }
    if (!itemCompany.length) { company = true }
    if (!itemModel.length) { model = true }

    if (!name && !company && !model) { passed = true }

    setValidation({ name, company, model, passed })
    return passed
  }

  // clearInputs
  const clearInputs = () => {
    setItemName('')
    setItemCompany('')
    setItemModel('')
    setItemPrice(0)
    setItemCategory(selectCategories[0])
  }

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault()

    console.log('click')
    const validationResult = validate()

    if (validationResult) {
      setShowAlert(true)
      setAlertData(['Pomyślnie dodano przedmiot do listy', 'success'])

      addItem({ name: itemName, company: itemCompany, model: itemModel, price: itemPrice, category: itemCategory })
      clearInputs()

    } else {
      setShowAlert(true)
      setAlertData(['Uzupełnij brakujące dane', 'warning'])
    }

  }

  // handle new category
  const handleNewCategory = () => {

    const newValue = newOptionValue

    // add new option to reducer
    addCategory(newValue)

    // select new option after adding it
    setOptionsToSelect(selectCategories)

    // handle alert
    setAlertData(['dodano nową kategorię', 'success'])
    setShowAlert(true)

    // clear new option value
    setNewOptionValue('')

    // set value for new added one
    setItemCategory(newValue)

    setShowNewOptionBox(false)
  }



  return (
    <div className='createEntry-layout'>
      <h2 className="header-secondary">Dodaj przedmiot do tabeli</h2>
      <form className="new-entry-form">
        <div className="new-entry-form__div">
          <label htmlFor="name-of-item">Nazwa przedmiotu</label><input type="text" id='name-of-item' value={itemName} onChange={(e) => setItemName(e.target.value)} /> {validation.name && <span className="validation-failed">pozycja wymagana</span>}
        </div>
        <div className="new-entry-form__div">
          <label htmlFor="company-of-item">Firma</label><input type="text" id='company-of-item' value={itemCompany} onChange={(e) => setItemCompany(e.target.value)} /> {validation.company && <span className="validation-failed">pozycja wymagana</span>}
        </div>
        <div className="new-entry-form__div">
          <label htmlFor="model-of-item">Model</label><input type="text" id='model-of-item' value={itemModel} onChange={(e) => setItemModel(e.target.value)} /> {validation.model && <span className="validation-failed">pozycja wymagana</span>}
        </div>
        <div className="new-entry-form__div">
          <label htmlFor="model-of-item">Cena</label><input type="number" id='model-of-item' min='0' value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} /> zł {validation.price && <span className="validation-failed">pozycja wymagana</span>}
        </div>
        <div className="new-entry-form__div">
          <label htmlFor="category-of-item">Kategoria</label>
          <select id='category-of-item' value={itemCategory} onChange={(e) => {
            setItemCategory(e.target.value)

            // add new category 
            if (e.target.value !== newOptionTxt) {
              return setShowNewOptionBox(false)
            }
            setShowNewOptionBox(true)
          }}>
            {options}
            <option className='category-of-item--new' value={newOptionTxt} >... {newOptionTxt}</option>
          </select>

          {
            showNewOptionBox && <div className="new-option-popup">
              <label htmlFor="new-category">Dodaj nową kategorię<input type="text" id='new-category' value={newOptionValue} onChange={(e) => setNewOptionValue(e.target.value)} /></label>
              {newOptionValue.length > 0 && <button className='add-new' onClick={() => handleNewCategory()}>dodaj</button>}
              <button className='add-new add-new--close' onClick={() => {
                setShowNewOptionBox(false); setItemCategory(selectCategories[0]); setNewOptionValue('')
              }}>x</button>
            </div>
          }

        </div>
        <button className='submit-form-item' onClick={(event) => { handleSubmit(event) }}>Dodaj przedmiot</button>
      </form>

      {showAlert && <Alert txt={alertData[0]} type={alertData[1]} />}

    </div>
  );
}

const mapStateToProps = ({ pcParts }) => {
  return { pcParts }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCategory: (data) => dispatch(addNewCategory(data)),
    addItem: (item) => dispatch(addItemToList(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEntry);