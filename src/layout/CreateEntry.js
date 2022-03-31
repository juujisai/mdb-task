import React from 'react';
import { connect } from 'react-redux'
import Loader from '../components/Loader'
import { addNewCategory } from '../redux/actions/pcPartsAction'


const CreateEntry = ({ pcParts: { selectCategories }, addCategory }) => {
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



  React.useEffect(() => {
    console.log('render')
    setOptionsToSelect(selectCategories)

  }, [selectCategories])

  if (!optionsToSelect.length) return <Loader />

  // for displaying options
  const options = optionsToSelect.map((item, id) => (
    <option value={item} key={id}>{item}</option>
  ))

  // handle submit
  const handleSubmit = (event) => {
    console.log('click', itemName, itemCompany, itemModel, itemPrice, itemCategory)

    event.preventDefault()
  }

  // handle new category
  const handleNewCategory = () => {

    const newValue = newOptionValue

    // add new option to reducer
    addCategory(newValue)

    // select new option after adding it
    setOptionsToSelect(selectCategories)

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
          <label htmlFor="name-of-item">Nazwa przedmiotu</label><input type="text" id='name-of-item' value={itemName} onChange={(e) => setItemName(e.target.value)} />
        </div>
        <div className="new-entry-form__div">
          <label htmlFor="company-of-item">Firma</label><input type="text" id='company-of-item' value={itemCompany} onChange={(e) => setItemCompany(e.target.value)} />
        </div>
        <div className="new-entry-form__div">
          <label htmlFor="model-of-item">Model</label><input type="text" id='model-of-item' value={itemModel} onChange={(e) => setItemModel(e.target.value)} />
        </div>
        <div className="new-entry-form__div">
          <label htmlFor="model-of-item">Cena</label><input type="number" id='model-of-item' min='0' value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} /> zł
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


    </div>
  );
}

const mapStateToProps = ({ pcParts }) => {
  return { pcParts }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCategory: (data) => dispatch(addNewCategory(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEntry);