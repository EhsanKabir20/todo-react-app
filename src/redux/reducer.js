import { add  } from 'react-sortly';

const initialState = {
  projects: [
    {
      id: 1,
      name: "Workflow Management System",
      parentId: null,
      depth: 0
    },
    {
      id: 2,
      name: "Task Management System",
      parentId: 1,
      depth: 1      
    },
    {
      id: 3,
      name: "Team Management",
      parentId: 1,
      depth: 1      
    },
    {
      id: 4,
      name: "Business Automation",
      parentId: null,
      depth: 0      
    },
    {
      id: 5,
      name: "Communication",
      parentId: 4,
      depth: 1      
    },
    {
      id: 6,
      name: "Task Monitoring",
      parentId: 4,
      depth: 1      
    }            
  ],
  isAddProjectPanelShown: false
};

const reducer = (state = initialState, action) => {
  let updatedState = { ...state };
  switch (action.type) {
    case "INSERT_PROJECT":
      updatedState.projects = add(updatedState.projects, action.data);
      updatedState.isAddProjectPanelShown = false;
      break;
    case "REORDER_PROJECT":
      updatedState.projects = action.data.map((ci, index)=>{
        let previousItem = null;
        for (let innerIndex = index; innerIndex >= 0; innerIndex--) {
          if(action.data[innerIndex].depth === (ci.depth - 1)){
            previousItem = action.data[innerIndex];
          }
        }
        if(ci.depth === 0){
          ci.parentId = null;
        }
        else if(previousItem != null &&  previousItem.id > 0){
          ci.parentId = previousItem.id;
        }
        return ci;
      });
      break;
    case "SHOW_HIDE_PANEL":
      updatedState.isAddProjectPanelShown = !updatedState.isAddProjectPanelShown;
      break;        
    default:
      break;
  }
  return updatedState;
};

export default reducer;
