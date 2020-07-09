import React from "react";
import { Container, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import Sortly, { ContextProvider } from 'react-sortly';
import styled from 'styled-components';
import { Flipper } from 'react-flip-toolkit';
import Project from '../components/Project/Project'

const AddPanel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 200px;
  background: rgb(212, 212, 212);
  overflow: auto;
  padding: 20px 10px;
  display: ${props => (props.isAddProjectPanelShown ? 'block' : 'none')}
`;

class ProjectsContainer extends React.Component {
  state= {
    newProjectName: ""
  }

  handleChange = (newItems) => {
    this.props.reorderProject(newItems);
  };

  showPanel = () =>{
    this.setState({newProjectName: ""});
    this.props.showHidePanel();
  }

  setProjectName = (value) =>{
    this.setState({newProjectName: value});
  }

  insertNewProject = () => {
    this.props.insertProject({id: this.props.projects.length + 1, name: this.state.newProjectName, depth: 0, parentId: null})
  }

  render() {
    return (
      <div>
        <Container>
          <div className="ProjectsContainer">
            <h2>
              Projects
              <span className="ml-2" onClick={this.showPanel}>+</span>
            </h2>
            <hr />
            <DndProvider backend={HTML5Backend}>
              <ContextProvider>
                <Flipper flipKey={this.props.projects.map(({ id }) => id).join('.')}      >
                  <Sortly items={this.props.projects} onChange={this.handleChange}>
                    {(props) => <Project {...props} />}
                  </Sortly>
                </Flipper>
              </ContextProvider>
            </DndProvider>
          </div>
        </Container>
        <AddPanel isAddProjectPanelShown={this.props.isAddProjectPanelShown}>
          <div className="cardHeader">
            Add Project
            <span onClick={this.showPanel}>X</span>
          </div>
          <b>Name</b><br/>
          <Form.Group controlId="newProjectName" className="mb-2">
            <Form.Control value={this.state.newProjectName} onChange={e => this.setProjectName(e.target.value)} type="text" />
          </Form.Group>
          <Button variant="primary" onClick={this.insertNewProject}>Save</Button>
        </AddPanel>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    isAddProjectPanelShown: state.isAddProjectPanelShown
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    insertProject: (project) =>
      dispatch({ type: "INSERT_PROJECT", data: project }),
    reorderProject: (projectList) =>
      dispatch({ type: "REORDER_PROJECT", data: projectList }),  
    showHidePanel: () =>
      dispatch({ type: "SHOW_HIDE_PANEL" }), 
      
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);
