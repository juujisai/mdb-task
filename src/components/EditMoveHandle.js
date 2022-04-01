import React from 'react';
import { MdDragIndicator } from 'react-icons/md'
import { connect } from 'react-redux'
import { copyMovedData, updateList } from '../redux/actions/pcPartsAction';


const EditMoveHandle = ({ data, pcParts: { listOfComponents, dataMoved }, copy, update }) => {
  let dragRef = React.useRef()

  // get all draggable rows
  const draggableElements = [...document.querySelectorAll('.table-row-draggable')]

  const handleDragStart = (e) => {
    const parent = dragRef.current.parentNode.parentNode
    parent.classList.add('dragging-right-now')

    // show where you can drag
    draggableElements.forEach(item => item.classList.add('drag-hint'))

    // remove dragging row from hints
    parent.classList.remove('drag-hint')

    // send copy of moved data to reducer
    copy(data)
  }

  const handleDragEnter = (e) => {
    const parent = dragRef.current.parentNode.parentNode

    // show where you are dragging right now
    parent.classList.add('drag-active')
  }

  const handleDragLeave = (e) => {
    const parent = dragRef.current.parentNode.parentNode

    // show that you left the place where you were dragging
    parent.classList.remove('drag-active')
  }

  const handleDragEnd = (e) => {
    // remove all hints
    draggableElements.forEach(item => {
      item.classList.remove('drag-hint')
      item.classList.remove('drag-active')
    })
  }

  const handleDragOver = (e) => {
    // remove default drop
    e.preventDefault()

    // draggableElements.forEach(item=> item.classList.remove())
  }


  const handleDrop = (e) => {
    e.preventDefault()
    // place where dragged item was
    const parent = document.querySelector('.dragging-right-now')

    // place where dragged item wants to be
    const droppedWhere = dragRef.current.parentNode.parentNode

    let others = [...draggableElements]

    // get ids of those 
    const idOfDragged = others.findIndex(i => i === parent)
    const idOfPlaceToDrop = others.findIndex(i => i === droppedWhere)
    // console.log(idOfDragged, idOfPlaceToDrop)

    parent.classList.remove('dragging-right-now')

    // switch data
    let copyOfData = [...listOfComponents]
    copyOfData.splice(idOfDragged, 1)
    copyOfData.splice(idOfPlaceToDrop, 0, dataMoved)

    // console.log(copyOfData)

    // send to reducer
    update(copyOfData)
    copy({})

  }



  return (
    <span className='drag-icon' ref={dragRef} draggable={true}
      onDragStart={(e) => handleDragStart(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDragEnd={(e) => handleDragEnd(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e)}
    >
      <MdDragIndicator style={{ pointerEvents: 'none' }} />
    </span>
  );
}

const mapStateToProps = ({ pcParts }) => {
  return { pcParts }
}

const mapDispatchToProps = (dispatch) => {
  return {
    copy: (data) => dispatch(copyMovedData(data)),
    update: (data) => dispatch(updateList(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMoveHandle);