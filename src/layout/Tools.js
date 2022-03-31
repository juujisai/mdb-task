import React from 'react';

import { VscEdit } from 'react-icons/vsc'
import { TiExport } from 'react-icons/ti'
import { MdQueryStats } from 'react-icons/md'
import { AiOutlineSelect } from 'react-icons/ai'
import { connect } from 'react-redux';
import { switchEdit } from '../redux/actions/toolsActions'

const Tools = ({ switchEditR, tools }) => {
  const [editPressed, setEditPressed] = React.useState(false)

  React.useEffect(() => {
    setEditPressed(tools.editActive)
  }, [tools])

  return (
    <div className='tools'>
      <span className={`tools__span ${editPressed ? 'pressed' : 'notpressed'}`} data-text='edytuj' onClick={() => switchEditR()}><VscEdit /></span>
      <span className="tools__span" data-text='exportuj' onClick={() => console.log('click')}><TiExport /></span>
      <span className="tools__span" data-text='statystyka' onClick={() => console.log('click')}><MdQueryStats /></span>
      <span className="tools__span" data-text='wyświetlanie zaawansowane' onClick={() => console.log('click')} ><AiOutlineSelect /></span>
    </div>
  );
}

const mapStateToProps = ({ tools }) => {
  return { tools }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchEditR: () => dispatch(switchEdit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tools);