import React from 'react';
import HanddiForm from "../src/components/HandiForm/HanddiForm.tsx";
import PropTypes from 'prop-types'
import "./App.css";
class App extends React.Component {
        render() {
            return (
                 <div className="container-fluid">
                    <HanddiForm />
                </div>
            );
            }
         }
export default App;