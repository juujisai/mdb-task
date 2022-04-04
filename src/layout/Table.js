import React from 'react';
import { connect } from 'react-redux'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { BsSaveFill } from 'react-icons/bs'
import { setSumOfComponents, updateList, updateListWithoutPost } from '../redux/actions/pcPartsAction'
import { TiCancel } from 'react-icons/ti'
import { FaSortAmountDown } from 'react-icons/fa'
import EditMoveHandle from '../components/EditMoveHandle';

const Table = ({ pcParts: { listOfComponents, selectCategories, filterByCategory }, tools: { editActive }, addSumToReducer, update, updateWithoutPost }) => {
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
    let d = listOfComponents
    if (filterByCategory !== 'all') {
      d = d.filter(item => item.category === filterByCategory)
    }


    const sum = d.reduce((partialSum, a) => partialSum + Number(a.price), 0)
    setSum(sum)
    addSumToReducer(sum)
  }, [listOfComponents, addSumToReducer, filterByCategory])

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

  const handleSave = (item) => {
    console.log('zapisuję')
    let copy = listOfComponents
    const idOfItemThatChanges = copy.findIndex(item => item === oldDataRef.current)

    const itemToPush = { id: item.id, name: itemName, company: itemCompany, model: itemModel, price: Number(itemPrice), category: itemCategory }

    copy.splice(idOfItemThatChanges, 1, itemToPush)

    update(copy)
    setEditedField('')



  }

  const cancelEdition = () => {

    setEditedField('')

  }
  const handleDelete = (item) => {
    let copy = listOfComponents
    copy = copy.filter(item2 => item2 !== item)
    update(copy)

    console.log(item)
    console.log('delete')
  }

  let dataToShowInTable = listOfComponents
  if (filterByCategory !== 'all') {

    dataToShowInTable = dataToShowInTable.filter(item => item.category === filterByCategory)
  }

  const tableContent = dataToShowInTable.map((item, id) => {
    const isRowEdited = item === editedField

    return (
      <tr className='table-section__tr table-row-draggable' key={id}>
        <td className="table-section__td">{id + 1}</td>
        <td className="table-section__td">
          <input className='table-section__input' type="text" value={isRowEdited ? itemName : item.name} disabled={!isRowEdited} onChange={(e) => setItemName(e.target.value)} />
        </td>
        <td className="table-section__td" >
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
            {!isRowEdited ? <span className='edit-btn' onClick={() => handleEdit(item, isRowEdited)}><AiFillEdit /></span>
              : <span className='edit-btn' onClick={() => handleSave(item)}><BsSaveFill /></span>}
            {isRowEdited && <span className="edit-btn" onClick={() => cancelEdition()}><TiCancel /></span>}
            <span className='edit-btn delete-tbl-btn' onClick={() => handleDelete(item)}><AiFillDelete /></span>
          </td>
        }
        {isEditActive && <td className='move-handle'><EditMoveHandle data={item} /></td>}

      </tr>
    )
  })


  // sorting button
  const handleSortBtn = (which) => {
    const element = document.querySelector(`.btn-${which}`)
    let allEmenents = [...document.querySelectorAll('.sort-table-btn')].filter(item => item !== element)
    // remove other sortings 
    allEmenents.forEach(item => item.classList.remove('rotate'))

    element.classList.toggle('rotate')
    // check direction
    const descending = element.classList.contains('rotate') ? true : false
    let copy = listOfComponents
    if (which === 'name') {
      if (descending) {
        copy.sort((a, b) => {
          if (b.name > a.name) { return 1 }
          if (b.name < a.name) { return -1 }
          return 0
        })
      } else {
        copy.sort((a, b) => {
          if (b.name < a.name) { return 1 }
          if (b.name > a.name) { return -1 }
          return 0
        })
      }
    }
    if (which === 'company') {
      if (descending) {
        copy.sort((a, b) => {
          if (b.company > a.company) { return 1 }
          if (b.company < a.company) { return -1 }
          return 0
        })
      } else {
        copy.sort((a, b) => {
          if (b.company < a.company) { return 1 }
          if (b.company > a.company) { return -1 }
          return 0
        })
      }
    }
    if (which === 'model') {
      if (descending) {
        copy.sort((a, b) => {
          if (b.model > a.model) { return 1 }
          if (b.model < a.model) { return -1 }
          return 0
        })
      } else {
        copy.sort((a, b) => {
          if (b.model < a.model) { return 1 }
          if (b.model > a.model) { return -1 }
          return 0
        })
      }
    }
    if (which === 'price') {
      if (descending) {
        copy.sort((a, b) => {
          if (b.price > a.price) { return 1 }
          if (b.price < a.price) { return -1 }
          return 0
        })
      } else {
        copy.sort((a, b) => {
          if (b.price < a.price) { return 1 }
          if (b.price > a.price) { return -1 }
          return 0
        })
      }
    }
    if (which === 'category') {
      if (descending) {
        copy.sort((a, b) => {
          if (b.category > a.category) { return 1 }
          if (b.category < a.category) { return -1 }
          return 0
        })
      } else {
        copy.sort((a, b) => {
          if (b.category < a.category) { return 1 }
          if (b.category > a.category) { return -1 }
          return 0
        })
      }
    }

    // update without posting to local storage or further - so it will go back to not sorted one after refreshing
    updateWithoutPost(copy)
  }

  return (
    <div className='table-section' id='table-to-export-section'>
      <div className='wrap-table' id='table-to-export-wrap'>
        <table className="table-section__table " id='table-to-export'>
          <caption className='caption-table'>Tabela kosztów nowego stanowiska</caption>

          <tbody>
            <tr className='table-section__tr' >
              <th className='table-section__th'>lp</th>
              <th className='table-section__th'>nazwa <span className="sort-table-btn btn-name" onClick={() => handleSortBtn('name')}><FaSortAmountDown /></span></th>
              <th className='table-section__th'>firma <span className="sort-table-btn btn-company" onClick={() => handleSortBtn('company')}><FaSortAmountDown /></span></th>
              <th className='table-section__th'>model <span className="sort-table-btn btn-model" onClick={() => handleSortBtn('model')}><FaSortAmountDown /></span></th>
              <th className='table-section__th'>kategoria <span className="sort-table-btn btn-category" onClick={() => handleSortBtn('category')}><FaSortAmountDown /></span></th>
              <th className='table-section__th'>cena <span className="sort-table-btn btn-price" onClick={() => handleSortBtn('price')}><FaSortAmountDown /></span></th>
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
    </div>
  );
}

const mapStateToProps = ({ pcParts, tools }) => {
  return { pcParts, tools }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addSumToReducer: (sum) => dispatch(setSumOfComponents(sum)),
    update: (list) => dispatch(updateList(list)),
    updateWithoutPost: (list) => dispatch(updateListWithoutPost(list))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Table);