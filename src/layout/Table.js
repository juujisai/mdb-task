import React from 'react';
import { connect } from 'react-redux'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { setSumOfComponents } from '../redux/actions/pcPartsAction'

const Table = ({ pcParts: { listOfComponents }, tools: { editActive }, addSumToReducer }) => {
  // active tools state
  const [isEditActive, setIsEditActive] = React.useState(false)
  const [sum, setSum] = React.useState(0)

  React.useEffect(() => {
    setIsEditActive(editActive)

  }, [editActive])

  React.useEffect(() => {

    const sum = listOfComponents.reduce((partialSum, a) => partialSum + Number(a.price), 0)
    setSum(sum)
    addSumToReducer(sum)
  }, [listOfComponents, addSumToReducer])

  // console.log(isEditActive)

  const handleEdit = (item) => {
    console.log('edit')
  }

  const handleDelete = (item) => {
    console.log('delete')
  }


  const tableContent = listOfComponents.map(({ name, company, model, category, price }, id) => (
    <tr className='table-section__tr' key={id}>
      <td className="table-section__td">{id + 1}</td>
      <td className="table-section__td">{name}</td>
      <td className="table-section__td">{company}</td>
      <td className="table-section__td">{model}</td>
      <td className="table-section__td">{category}</td>
      <td className="table-section__td">{price}</td>
      {
        isEditActive && <td className="table-section__td table-section__td--edit"><span className='edit-btn' onClick={(item) => handleEdit(item)}><AiOutlineEdit /></span><span className='edit-btn delete-tbl-btn' onClick={(item) => handleDelete(item)}><AiOutlineDelete /></span></td>
      }


    </tr>
  ))



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
    addSumToReducer: (sum) => dispatch(setSumOfComponents(sum))

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Table);