import React from 'react';

import { VscEdit } from 'react-icons/vsc'
import { TiExport } from 'react-icons/ti'
import { MdQueryStats } from 'react-icons/md'
import { GrSelect } from 'react-icons/gr'
import { connect } from 'react-redux';
import { switchEdit } from '../redux/actions/toolsActions'

const Tools = ({ switchEditR, tools }) => {
  const [editPressed, setEditPressed] = React.useState(false)

  React.useEffect(() => {
    setEditPressed(tools.editActive)
  }, [tools])

  return (
    <div className='tools'>
      <span className={`tools__span ${editPressed ? 'pressed' : 'notpressed'}`} data-text='edytuj'><VscEdit onClick={() => switchEditR()} /></span>
      <span className="tools__span" data-text='exportuj'><TiExport onClick={() => console.log('click')} /></span>
      <span className="tools__span" data-text='statystyka'><MdQueryStats onClick={() => console.log('click')} /></span>
      <span className="tools__span" data-text='wyświetlanie zaawansowane'><GrSelect onClick={() => console.log('click')} /></span>
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