import React from 'react';
import { connect } from 'react-redux'
import Loader from '../components/Loader'

const CreateEntry = ({ pcParts: { selectCategories } }) => {
  // state value for select options
  const [optionsToSelect, setOptionsToSelect] = React.useState([])

  // state value for new option
  const [showNewOptionBox, setShowNewOptionBox] = React.useState(false)
  const [newOptionValue, setNewOptionValue] = React.useState('')

  // state values for controlled form
  const [itemName, setItemName] = React.useState('')
  const [itemCompany, setItemCompany] = React.useState('')
  const [itemModel, setItemModel] = React.useState('')
  const [itemCategory, setItemCategory] = React.useState(selectCategories[0])



  React.useState(() => {
    if (!optionsToSelect.length) {
      setOptionsToSelect(selectCategories)
    }
  }, [])

  if (!optionsToSelect.length) return <Loader />

  // for displaying options
  const options = optionsToSelect.map((item, id) => (
    <option value={item} key={id}>{item}</option>
  ))

  // handle submit
  const handleSubmit = (event) => {
    console.log('click', itemName, itemCompany, itemModel, itemCategory)

    event.preventDefault()
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
          <label htmlFor="category-of-item">Kategoria</label>
          <select id='category-of-item' value={itemCategory} onChange={(e) => setItemCategory(e.target.value)}>
            {options}
            <option className='category-of-item--new' value="new">dodaj nową wartość</option>
          </select>
        </div>
        <button className='submit-form-item' onClick={(event) => handleSubmit(event)}>Dodaj przedmiot</button>
      </form>


    </div>
  );
}

const mapStateToProps = ({ pcParts }) => {
  return { pcParts }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEntry);