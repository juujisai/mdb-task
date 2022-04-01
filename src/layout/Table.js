import React from 'react';
import { connect } from 'react-redux'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsSave } from 'react-icons/bs'
import { setSumOfComponents, updateList } from '../redux/actions/pcPartsAction'

const Table = ({ pcParts: { listOfComponents, selectCategories }, tools: { editActive }, addSumToReducer, update }) => {
  // active tools state
  const [isEditActive, setIsEditActive] = React.useState(false)
  const [sum, setSum] = React.useState(0)
  const [editedField, setEditedField] = React.useState('')

  // state of edited item
  const [itemName, setItemName] = React.useState('')
  const [itemCompany, setItemCompany] = React.useState('')
  const [itemModel, setItemModel] = React.useState('')
  // const [itemCategory, setItemCategory] = React.useState(selectCategories[0])
  const [itemCategory, setItemCategory] = React.useState('')
  const [itemPrice, setItemPrice] = React.useState(0)

  // copy of old data - that is now edited
  let oldDataRef = React.useRef({})



  React.useEffect(() => {
    setIsEditActive(editActive)

  }, [editActive])

  React.useEffect(() => {

    const sum = listOfComponents.reduce((partialSum, a) => partialSum + Number(a.price), 0)
    setSum(sum)
    addSumToReducer(sum)
  }, [listOfComponents, addSumToReducer])

  // console.log(isEditActive)
  // console.log('renderuje table')

  const handleEdit = (item, isRowEdited) => {

    if (editedField !== '') {
      console.log('edit')
      alert('najpierw zakończ edycję poprzedniego')
      return console.log('najpierw zakończ edycję poprzedniego')
    }

    setEditedField(item)
    setItemName(item.name)
    setItemCompany(item.company)
    setItemModel(item.model)
    setItemCategory(item.category)
    setItemPrice(item.price)
    oldDataRef.current = item
  }

  const handleSave = () => {
    console.log('zapisuję')
    let copy = listOfComponents
    const idOfItemThatChanges = copy.findIndex(item => item === oldDataRef.current)

    const itemToPush = { name: itemName, company: itemCompany, model: itemModel, price: itemPrice, category: itemCategory }

    copy.splice(idOfItemThatChanges, 1, itemToPush)

    update(copy)
    setEditedField('')



  }

  const handleDelete = (item) => {
    let copy = listOfComponents
    copy = copy.filter(item2 => item2 !== item)
    update(copy)

    console.log(item)
    console.log('delete')
  }


  const tableContent = listOfComponents.map((item, id) => {
    const isRowEdited = item === editedField

    return (
      <tr className='table-section__tr' key={id}>
        <td className="table-section__td">{id + 1}</td>
        <td className="table-section__td">
          <input className='table-section__input' type="text" value={isRowEdited ? itemName : item.name} disabled={!isRowEdited} onChange={(e) => setItemName(e.target.value)} />
        </td>
        <td className="table-section__td">
          <input className='table-section__input' type="text" value={isRowEdited ? itemCompany : item.company} disabled={!isRowEdited} onChange={(e) => setItemCompany(e.target.value)} />
        </td>
        <td className="table-section__td">
          <input className='table-section__input' type="text" value={isRowEdited ? itemModel : item.model} disabled={!isRowEdited} onChange={(e) => setItemModel(e.target.value)} />
        </td>
        <td className="table-section__td">
          <input className='table-section__input' type="text" value={isRowEdited ? itemCategory : item.category} disabled={!isRowEdited} onChange={(e) => setItemCategory(e.target.value)} />
        </td>
        <td className="table-section__td">
          <input className='table-section__input' type="number" min='0' value={Number(isRowEdited ? itemPrice : item.price)} disabled={!isRowEdited} onChange={(e) => setItemPrice(e.target.value)} />
        </td>
        {
          isEditActive && <td className="table-section__td table-section__td--edit">
            {!isRowEdited ? <span className='edit-btn' onClick={() => handleEdit(item, isRowEdited)}><AiOutlineEdit /></span>
              : <span className='edit-btn' onClick={() => handleSave()}><BsSave /></span>}

            <span className='edit-btn delete-tbl-btn' onClick={() => handleDelete(item)}><AiOutlineDelete /></span>
          </td>
        }


      </tr>
    )
  })



  return (
    <div className='table-section'>
      <table className="table-section__table">
        <tbody>
          <tr className='table-section__tr'>
            <th className='table-section__th'>lp</th>
            <th className='table-section__th'>nazwa</th>
            <th className='table-section__th'>firma</th>
            <th className='table-section__th'>model</th>
            <th className='table-section__th'>kategoria</th>
            <th className='table-section__th'>cena</th>
            {
              isEditActive && <th className='table-section__th table-section__th--edit'>edit</th>
            }
          </tr>
          {tableContent}
        </tbody>
      </table>
      <div className="small-statistics">
        <div className="small-statistics__div">
          <span className="small-statistics__span">łączny koszt stanowiska:</span> <span className="small-statistics__span">{sum} zł</span>
        </div>
        <div className="small-statistics__div">

          <span className="small-statistics__span">pozycji w zestawieniu:</span> <span className="small-statistics__span">{listOfComponents.length}</span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ pcParts, tools }) => {
  return { pcParts, tools }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addSumToReducer: (sum) => dispatch(setSumOfComponents(sum)),
    update: (list) => dispatch(updateList(list))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Table);