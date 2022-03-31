import React from 'react';
import { connect } from 'react-redux'

const Table = ({ pcParts: { listOfComponents } }) => {
  return (
    <div>Table</div>
  );
}

const mapStateToProps = ({ pcParts }) => {
  return { pcParts }
}

const mapDispatchToProps = (dispatch) => {
  return {


  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Table);