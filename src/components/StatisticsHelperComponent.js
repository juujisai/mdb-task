import React from 'react';
import { connect } from 'react-redux';

const ToolsHelperComponent = ({ tools, pcParts }) => {
  // state for getting every unique value to pick in this helper
  const [listNames, setListNames] = React.useState([])
  const [listCompanies, setListCompanies] = React.useState([])
  const [listModels, setListModels] = React.useState([])
  const [listPrices, setListPrices] = React.useState([])
  const listCategories = pcParts.selectCategories

  // state for checking what user picked
  const [itemName, setItemName] = React.useState('')
  const [itemCompany, setItemCompany] = React.useState('')
  const [itemModel, setItemModel] = React.useState('')
  const [itemCategory, setItemCategory] = React.useState(pcParts.selectCategories[0])
  const [itemPrice, setItemPrice] = React.useState(0)

  // state for type of statistic
  const [typeOfStatistic, setTypeOfStatistic] = React.useState('')

  // get list values when component is loaded
  React.useEffect(() => {
    if (!listNames.length) {
      const list = pcParts.listOfComponents
      let values = { names: [], companies: [], models: [], prices: [] }

      list.forEach(item => {
        // get names
        values = { ...values, names: [...values.names, item.name], companies: [...values.companies, item.company], models: [...values.models, item.model], prices: [...values.prices, Number(item.price)] }

      })

      values = { names: [...new Set(values.names)], companies: [...new Set(values.companies)], models: [...new Set(values.models)], prices: [...new Set(values.prices)] }
      console.log(values)
    }
    console.log('kek',)
  }, [listNames, pcParts])






  return (<div className='helper-component helper-stats'>
    <h1 className="header-secondary">Wybierz rodzaj statystyki</h1>
    helper
  </div>);
}

const mapStateToProps = ({ tools, pcParts }) => {
  return { tools, pcParts }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolsHelperComponent);