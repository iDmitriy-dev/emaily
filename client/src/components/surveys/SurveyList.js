import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class SurveyList extends Component {
   state = {
      sortFieldTitle: 'Date Sent',
      isDropped: false
   }

   componentDidMount() {
      this.fetchSurveyHandler();
   }

   fetchSurveyHandler() {
      this.props.fetchSurveys();
   }

   deleteSurveyHandler(Id) {
      this.props.deleteSurvey(Id);
      this.fetchSurveyHandler();
   }

   changeSortingField(field, fieldTitle) {
      this.setState(prevState => { return { isDropped: !prevState.isDropped } })
      this.setState({ sortFieldTitle: fieldTitle });
      this.props.fetchSurveys(field);
   }

   renderSurveys() {

      return (
         <>
            <div className='row pt-3 align-items-center mr-3 mb-1'>
               <span className='ml-auto mr-1'>Sort by:</span>
               <div className="dropdown">
                  <button className="btn btn-sm btn-secondary dropdown-toggle bg-transparent text-dark"
                     type="button"
                     id="dropdownMenu2"
                     data-toggle="dropdown"
                     aria-haspopup="true"
                     aria-expanded={this.state.isDropped}
                     onClick={() => this.setState(prevState => { return { isDropped: !prevState.isDropped } })}
                  >
                     {this.state.sortFieldTitle}
                  </button>
                  <div className={`dropdown-menu ${this.state.isDropped && 'show'} dropdown-menu-right`} aria-labelledby="dropdownMenu2">
                     <button
                        className="dropdown-item"
                        type="button"
                        onClick={(field, fieldTitle) => this.changeSortingField('dateSent', 'Date Sent')}
                     >
                        Date Sent
                        </button>
                     <button
                        className="dropdown-item"
                        type="button"
                        onClick={(field, fieldTitle) => this.changeSortingField('no', 'NO votes')}
                     >
                        NO votes
                        </button>
                     <button
                        className="dropdown-item"
                        type="button"
                        onClick={(field, fieldTitle) => this.changeSortingField('yes', 'YES votes')}
                     >
                        YES votes
                        </button>
                  </div>
               </div>
            </div>
            <div className='container'>
               {this.props.surveys.map(survey => {
                  return (
                     <div className="card mb-2" key={survey._id}>
                        <div className="card-header">
                           <div className='row mx-2 align-items-center'>
                              <h4 className='mb-0'>{survey.title}</h4>
                              <span className='ml-auto'>
                                 Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                              </span>
                           </div>
                        </div>
                        <div className="card-body">
                           <p>
                              {survey.body}
                           </p>
                        </div>
                        <div className="card-footer py-0 text-muted">
                           <div className='row mx-2 align-items-center'>
                              <span className="badge badge-primary mr-1">YES:</span>{survey.yes}
                              <span className="badge badge-warning mr-1 ml-3">NO:</span>{survey.no}
                              <button
                                 onClick={(Id) => this.deleteSurveyHandler(survey._id)}
                                 type="button"
                                 className="ml-auto btn btn-sm btn-light bg-transparent border-0 rounded-circle"
                                 title='delete forever'
                              >
                                 <i className=''><FontAwesomeIcon icon={faTrash} /></i>
                              </button>
                           </div>
                        </div>
                     </div>

                  );
               })}
            </div>
         </>
      )
   }

   render() {
      return (
         <div className="section">
            {this.renderSurveys()}
         </div>
      );
   }
}

function mapStateToProps({ surveys }) {
   return { surveys: surveys }
}

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(SurveyList)