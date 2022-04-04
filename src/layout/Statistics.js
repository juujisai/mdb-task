import React from 'react';
import { connect } from 'react-redux'

const Statistics = ({ pcParts }) => {
  // const [stats, setStats] = React.useState([])
  // let stats = [{ operator: 'avg', col: 'name', value: 'a' }]
  let stats = pcParts.partialStat



  const statsToShow = stats.map((item, id) => {
    let partsToCount = pcParts.listOfComponents

    let data = []
    item.col === 'price' ? data = partsToCount.filter(item2 => item2.price <= item.value) : data = partsToCount.filter(item2 => item2[item.col] === item.value)


    const sum = Number(data.reduce((partialSum, a) => partialSum + Number(a.price), 0))
    let avg
    data.length === 0 ? avg = 0 : avg = (sum / data.length).toFixed(2)

    return (
      <tr className="table-section__tr" key={id}>
        <td className="table-section__td">{id + 1}</td>
        <td className="table-section__td">{item.operator === 'sum' ? 'suma' : 'średnia'}</td>
        <td className="table-section__td">{item.col}</td>
        <td className="table-section__td">{item.col === 'price' && 'poniżej '}{item.value}</td>
        <td className="table-section__td">{item.operator === 'sum' ? sum : avg} zł</td>

      </tr>

    )
  })




  return (
    <div className='statistic-section' style={stats.length !== 0 ? { display: 'block' } : { display: 'none' }}>
      {stats.length !== 0 &&
        <>
          <h1 className="header-secondary">Statystyka</h1>
          <table className="table-section__table">
            <tbody>
              <tr className='table-section__tr' >
                <th className='table-section__th'>lp</th>
                <th className='table-section__th'>rodzaj</th>
                <th className='table-section__th'>kolumna</th>
                <th className='table-section__th'>komórka</th>
                <th className='table-section__th'>policzona wartość</th>
              </tr>
              {statsToShow}
            </tbody>
          </table>

        </>
      }

    </div>
  );
}

const mapStateToProps = ({ pcParts }) => {
  return { pcParts }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);