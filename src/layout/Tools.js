import React from 'react';

import { VscEdit } from 'react-icons/vsc'
import { TiExport } from 'react-icons/ti'
import { MdQueryStats } from 'react-icons/md'
import { AiOutlineSelect, AiOutlineExport } from 'react-icons/ai'
import { connect } from 'react-redux';
import { switchEdit, showToolHelper } from '../redux/actions/toolsActions'
import StatisticsHelperComponent from '../components/StatisticsHelperComponent';
import FilterHelperComponent from '../components/FilterHelperComponent';
import ExportHelperComponent from '../components/ExportHelperComponent';
import ExportImportHelperComponent from '../components/ExportImportHelperComponent';

const Tools = ({ switchEditR, tools, showHelper }) => {
  const [editPressed, setEditPressed] = React.useState(false)

  React.useEffect(() => {
    setEditPressed(tools.editActive)
  }, [tools])

  return (
    <>
      <div className='tools'>
        <span className={`tools__span ${editPressed ? 'pressed' : 'notpressed'}`} data-text='edytuj' onClick={() => switchEditR()}><VscEdit /></span>
        <span className="tools__span" data-text='exportuj' onClick={() => showHelper('export')}><TiExport /></span>
        <span className="tools__span" data-text='statystyka' onClick={() => showHelper('stats')}><MdQueryStats /></span>
        <span className="tools__span" data-text='wyświetlanie zaawansowane' onClick={() => showHelper('selection')} ><AiOutlineSelect /></span>
        <span className="tools__span" data-text='export/import api' onClick={() => showHelper('exp-imp')} ><AiOutlineExport /></span>
      </div>
      {tools.showStats && <StatisticsHelperComponent />}
      {tools.showSelection && <FilterHelperComponent />}
      {tools.showExport && <ExportHelperComponent />}
      {tools.showExportApi && <ExportImportHelperComponent />}

    </>
  );
}

const mapStateToProps = ({ tools }) => {
  return { tools }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchEditR: () => dispatch(switchEdit()),
    showHelper: (name) => dispatch(showToolHelper(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tools);